// Writes public/health.json at build time. Load balancers poll /health.json on
// each origin; the `commit` lets you verify every mirror serves the same build.
import { writeFileSync, mkdirSync } from "node:fs";
const data = {
  app: "anir0y-secops",
  status: "ok",
  version: "3.0.0",
  builtAt: new Date().toISOString(),
  commit:
    process.env.GITHUB_SHA ||
    process.env.CF_PAGES_COMMIT_SHA ||
    process.env.COMMIT_REF ||
    "local",
  host: process.env.DEPLOY_TARGET || "unknown",
};
mkdirSync("public", { recursive: true });
writeFileSync("public/health.json", JSON.stringify(data, null, 2) + "\n");
console.log("[gen-health]", data);
