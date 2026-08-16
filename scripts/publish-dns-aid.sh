#!/usr/bin/env bash
# Publish DNS-AID (DNS for AI Discovery) records for anir0y.in on Cloudflare DNS.
# Records published (see public/docs/dns-aid-records.md):
#   _index._agents.anir0y.in.  3600 IN HTTPS 1 anir0y.in. alpn="h2,h3" mandatory=alpn
#   _mcp._agents.anir0y.in.    3600 IN HTTPS 1 anir0y.in. alpn="h2,h3" mandatory=alpn
#   _webmcp._agents.anir0y.in. 3600 IN HTTPS 1 anir0y.in. alpn="h2,h3" mandatory=alpn
#
# Auth: needs a Cloudflare API token with Zone ▸ DNS ▸ Edit on anir0y.in.
#   export CLOUDFLARE_DNS_API_TOKEN=...   (or put it in ./secret.conf)
# Idempotent: creates missing records, updates existing ones in place.
set -euo pipefail

ZONE_NAME="anir0y.in"
TARGET="anir0y.in."
VALUE='alpn="h2,h3" mandatory="alpn"'
TTL=3600
NAMES=(_index._agents _mcp._agents _webmcp._agents)

repo_root="$(cd "$(dirname "$0")/.." && pwd)"
[ -f "$repo_root/secret.conf" ] && { set -a; source "$repo_root/secret.conf"; set +a; }
TOKEN="${CLOUDFLARE_DNS_API_TOKEN:-${CLOUDFLARE_API_TOKEN:-}}"
if [ -z "$TOKEN" ]; then
  echo "ERROR: set CLOUDFLARE_DNS_API_TOKEN (Zone ▸ DNS ▸ Edit on $ZONE_NAME)" >&2
  exit 1
fi

api() { # api METHOD PATH [JSON_BODY]
  local method="$1" path="$2" body="${3:-}"
  if [ -n "$body" ]; then
    curl -sf -X "$method" "https://api.cloudflare.com/client/v4$path" \
      -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
      --data "$body"
  else
    curl -sf -X "$method" "https://api.cloudflare.com/client/v4$path" \
      -H "Authorization: Bearer $TOKEN"
  fi
}

zone_id=$(api GET "/zones?name=$ZONE_NAME" | jq -r '.result[0].id // empty')
[ -n "$zone_id" ] || { echo "ERROR: zone $ZONE_NAME not visible to this token" >&2; exit 1; }
echo "zone $ZONE_NAME = $zone_id"

for name in "${NAMES[@]}"; do
  fqdn="$name.$ZONE_NAME"
  record=$(jq -n --arg fqdn "$fqdn" --arg target "$TARGET" --arg value "$VALUE" --argjson ttl "$TTL" \
    '{type:"HTTPS", name:$fqdn, ttl:$ttl, data:{priority:1, target:$target, value:$value}}')
  existing_id=$(api GET "/zones/$zone_id/dns_records?type=HTTPS&name=$fqdn" | jq -r '.result[0].id // empty')
  if [ -n "$existing_id" ]; then
    api PUT "/zones/$zone_id/dns_records/$existing_id" "$record" | jq -r --arg f "$fqdn" '"updated \($f): \(.success)"'
  else
    api POST "/zones/$zone_id/dns_records" "$record" | jq -r --arg f "$fqdn" '"created \($f): \(.success)"'
  fi
done

echo
echo "Verifying via DNSSEC-validating DoH (records have a 300s edge TTL; re-run if stale)..."
sleep 5
for name in "${NAMES[@]}"; do
  fqdn="$name.$ZONE_NAME"
  curl -s "https://cloudflare-dns.com/dns-query?name=$fqdn&type=HTTPS&do=1" \
    -H 'accept: application/dns-json' \
    | jq -r --arg f "$fqdn" '"\($f): AD=\(.AD) \([.Answer[]? | select(.type==65) | .data] | join(" | "))"'
done
