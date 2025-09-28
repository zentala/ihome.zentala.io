#!/bin/bash

# Smart Apartment Blog Install Script
# This script checks/installs JS deps and ensures Hugo is installed

set -euo pipefail

echo "🏠 Smart Apartment Blog - Install prerequisites"
echo "=============================================="

# Ensure Node dependencies (prefer pnpm, fallback to npm)
if command -v pnpm >/dev/null 2>&1; then
  INSTALL_CMD=(pnpm install)
else
  echo "⚠️  pnpm not found, falling back to npm. Consider installing pnpm: https://pnpm.io/installation"
  INSTALL_CMD=(npm install)
fi

if [ ! -d "node_modules" ]; then
  echo "📦 Installing JavaScript dependencies..."
  "${INSTALL_CMD[@]}"
  echo "✅ JS dependencies installed"
else
  echo "📦 node_modules present, skipping JS install"
fi

# Ensure Hugo is installed
ensure_hugo() {
  if command -v hugo >/dev/null 2>&1; then
    return 0
  fi

  echo "🔎 Hugo not found. Attempting installation..."

  if command -v brew >/dev/null 2>&1; then
    brew install hugo && return 0
  fi
  if command -v apt-get >/dev/null 2>&1; then
    sudo apt-get update -y && sudo apt-get install -y hugo && return 0
  fi
  if command -v dnf >/dev/null 2>&1; then
    sudo dnf install -y hugo && return 0
  fi
  if command -v pacman >/dev/null 2>&1; then
    sudo pacman -S --noconfirm hugo && return 0
  fi
  if command -v zypper >/dev/null 2>&1; then
    sudo zypper install -y hugo && return 0
  fi

  return 1
}

if ! ensure_hugo; then
  echo "❌ Could not install Hugo automatically. Please install manually:"
  echo "   - Hugo Releases: https://github.com/gohugoio/hugo/releases"
  echo "   - Docs: https://gohugo.io/getting-started/installing/"
  exit 1
fi

echo "✅ Hugo available: $(hugo version)"
echo "🎉 Install step completed."
