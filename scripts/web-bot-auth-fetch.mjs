#!/usr/bin/env node
// Send an HTTP request signed with Web Bot Auth (RFC 9421 HTTP Message Signatures).
// Signs "@authority" and "signature-agent" with the Ed25519 key published in
// https://anir0y.in/.well-known/http-message-signatures-directory so receiving
// sites can verify the request came from anir0y.in's agent.
//
// Usage: node scripts/web-bot-auth-fetch.mjs <url> [method] [--dry-run]
import { createPrivateKey, createPublicKey, createHash, sign } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const SIGNATURE_AGENT = "https://anir0y.in";
const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const privateKey = createPrivateKey(readFileSync(join(repoRoot, "secret.webbotauth-ed25519.pem")));

const [url, method = "GET"] = process.argv.slice(2).filter((a) => !a.startsWith("--"));
if (!url) {
  console.error("usage: web-bot-auth-fetch.mjs <url> [method] [--dry-run]");
  process.exit(1);
}

const jwk = createPublicKey(privateKey).export({ format: "jwk" });
const keyid = createHash("sha256")
  .update(JSON.stringify({ crv: jwk.crv, kty: jwk.kty, x: jwk.x }))
  .digest("base64url");

const created = Math.floor(Date.now() / 1000);
const expires = created + 300;
const nonce = createHash("sha256").update(String(Math.random()) + created).digest("base64url");
const authority = new URL(url).host;

const params = `("@authority" "signature-agent");created=${created};expires=${expires};keyid="${keyid}";alg="ed25519";nonce="${nonce}";tag="web-bot-auth"`;
const signatureBase = [
  `"@authority": ${authority}`,
  `"signature-agent": "${SIGNATURE_AGENT}"`,
  `"@signature-params": ${params}`,
].join("\n");

const signature = sign(null, Buffer.from(signatureBase), privateKey).toString("base64");
const headers = {
  "Signature-Agent": `"${SIGNATURE_AGENT}"`,
  "Signature-Input": `sig1=${params}`,
  Signature: `sig1=:${signature}:`,
  "User-Agent": "anir0y-agent/1.0 (+https://anir0y.in)",
};

if (process.argv.includes("--dry-run")) {
  console.log(JSON.stringify({ url, method, headers, signatureBase }, null, 2));
  process.exit(0);
}

const res = await fetch(url, { method, headers });
console.log(`${res.status} ${res.statusText}`);
for (const h of ["cf-verified-bot", "cf-ray", "content-type"]) {
  if (res.headers.get(h)) console.log(`${h}: ${res.headers.get(h)}`);
}
console.log((await res.text()).slice(0, 500));
