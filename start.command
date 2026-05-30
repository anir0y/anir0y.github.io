#!/bin/bash
# ─────────────────────────────────────────────────────────────
# anir0y // Security Operations Command — dev launcher
# Double-click to install deps (first run) and start the Vite dev
# server at http://localhost:8009, opening your browser.
# ─────────────────────────────────────────────────────────────
cd "$(dirname "$0")" || exit 1

echo ""
echo "  anir0y // SECOPS  —  Vite + React + TypeScript"
echo ""

if ! command -v node >/dev/null 2>&1; then
  echo "  ✘ Node.js is not installed. Get it from https://nodejs.org (LTS), then double-click again."
  read -n 1 -s -r -p "  Press any key to close..."; exit 1
fi

if [ ! -d node_modules ]; then
  echo "  first run — installing dependencies (this can take a minute)…"
  npm install --no-audit --no-fund || { echo "  ✘ npm install failed."; read -n 1 -s -r -p "  Press any key to close..."; exit 1; }
fi

# Free port 8009 if something is holding it
if lsof -ti tcp:8009 >/dev/null 2>&1; then lsof -ti tcp:8009 | xargs kill -9 2>/dev/null; sleep 1; fi

echo "  starting dev server on http://localhost:8009  (Ctrl+C to stop)"
exec npm run dev -- --port 8009 --strictPort --open
