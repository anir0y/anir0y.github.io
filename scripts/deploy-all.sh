#!/usr/bin/env bash
# Build once, deploy the same dist/ to every configured mirror, verify health.
# Mirrors deploy independently: one failing does NOT block the others. The
# script exits non-zero if the build fails or if ANY attempted mirror fails.
set -uo pipefail
cd "$(dirname "$0")/.."

if [ ! -f secret.conf ]; then
  echo "✘ secret.conf not found. Copy secret.conf.example to secret.conf and fill it in."; exit 1
fi
set -a; source ./secret.conf; set +a

echo "▶ building…"
if ! npm run build; then
  echo "✘ build failed — nothing deployed."; exit 1
fi

failures=()

echo "▶ Cloudflare Pages…"
if [ -n "${CLOUDFLARE_API_TOKEN:-}" ] || { [ -n "${CLOUDFLARE_API_KEY:-}" ] && [ -n "${CLOUDFLARE_EMAIL:-}" ]; }; then
  if DEPLOY_TARGET=cloudflare npx -y wrangler pages deploy dist --project-name "${CLOUDFLARE_PAGES_PROJECT:-anir0y}" --branch main; then
    echo "  ✓ Cloudflare Pages deployed"
  else
    echo "  ✘ Cloudflare Pages deploy failed"; failures+=("cloudflare")
  fi
else
  echo "  (skipped — no Cloudflare credentials set)"
fi

echo "▶ Netlify…"
if [ -n "${NETLIFY_AUTH_TOKEN:-}" ]; then
  if DEPLOY_TARGET=netlify npx -y netlify-cli deploy --prod --dir dist ${NETLIFY_SITE_ID:+--site "$NETLIFY_SITE_ID"}; then
    echo "  ✓ Netlify deployed"
  else
    echo "  ✘ Netlify deploy failed"; failures+=("netlify")
  fi
else
  echo "  (skipped — NETLIFY_AUTH_TOKEN is empty)"
fi

echo "▶ verifying mirrors…"
for u in "${CF_URL:-}" "${NETLIFY_URL:-}"; do
  [ -z "$u" ] && continue
  got=$(curl -fsS "$u/health.json" 2>/dev/null | tr -d '\n ' | grep -o '"commit":"[^"]*","host":"[^"]*"' || echo "unreachable")
  echo "  $u → ${got:-unreachable}"
done

if [ "${#failures[@]}" -gt 0 ]; then
  echo "✘ done with failures: ${failures[*]}"; exit 1
fi
echo "✓ done"
