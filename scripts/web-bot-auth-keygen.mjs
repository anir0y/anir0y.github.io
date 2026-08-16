#!/usr/bin/env node
// Generate the Web Bot Auth Ed25519 keypair for anir0y.in.
//   - private key -> ./secret.webbotauth-ed25519.pem   (gitignored, used by web-bot-auth-fetch.mjs)
//   - public JWKS -> ./public/.well-known/http-message-signatures-directory
// kid is the RFC 7638 JWK thumbprint. Re-running rotates the key (old signatures stop verifying).
import { generateKeyPairSync, createHash } from "node:crypto";
import { writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const privPath = join(repoRoot, "secret.webbotauth-ed25519.pem");
const jwksPath = join(repoRoot, "public/.well-known/http-message-signatures-directory");

if (existsSync(privPath) && !process.argv.includes("--rotate")) {
  console.error(`Refusing to overwrite ${privPath} — pass --rotate to generate a new key.`);
  process.exit(1);
}

const { publicKey, privateKey } = generateKeyPairSync("ed25519");
const jwk = publicKey.export({ format: "jwk" });

// RFC 7638 thumbprint: SHA-256 over the JSON of required members in lexicographic order.
const thumbprint = createHash("sha256")
  .update(JSON.stringify({ crv: jwk.crv, kty: jwk.kty, x: jwk.x }))
  .digest("base64url");

const jwks = { keys: [{ kty: jwk.kty, crv: jwk.crv, kid: thumbprint, x: jwk.x, use: "sig" }] };

writeFileSync(privPath, privateKey.export({ type: "pkcs8", format: "pem" }), { mode: 0o600 });
writeFileSync(jwksPath, JSON.stringify(jwks, null, 2) + "\n");
console.log(`private key: ${privPath}`);
console.log(`jwks:        ${jwksPath}`);
console.log(`kid:         ${thumbprint}`);
