#!/usr/bin/env bash
set -euo pipefail

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

cd "$APP_DIR"

if [ ! -d node_modules ]; then
  echo "[ELP] Installing dependencies..."
  npm install
fi

echo "[ELP] Starting Vite dev server on 0.0.0.0:5173..."
npm run dev -- --host 0.0.0.0 --port 5173
