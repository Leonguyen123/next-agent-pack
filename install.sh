#!/usr/bin/env bash
set -e

# next-agent-pack installer
# Installs battle-tested Cursor & AI Agent rules for Next.js 15, React 19, Tailwind CSS, and shadcn/ui.

REPO_RAW_URL="https://raw.githubusercontent.com/egitech/next-agent-pack/main"
TARGET_DIR=".cursor/rules"

echo "⚡ Installing next-agent-pack into ${TARGET_DIR}..."

mkdir -p "$TARGET_DIR"

RULES=(
  "00-next15-core.mdc"
  "01-react19-modern.mdc"
  "02-tailwind-styling.mdc"
  "03-shadcn-components.mdc"
)

# If installed from within a clone, copy locally; otherwise download via curl
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" 2>/dev/null && pwd || echo "")"
LOCAL_DIST="${SCRIPT_DIR}/dist/next15-shadcn"

for RULE in "${RULES[@]}"; do
  if [ -d "$LOCAL_DIST" ] && [ -f "$LOCAL_DIST/$RULE" ]; then
    cp "$LOCAL_DIST/$RULE" "$TARGET_DIR/$RULE"
    echo "  ✓ Installed $RULE (local source)"
  else
    curl -fsSL "${REPO_RAW_URL}/dist/next15-shadcn/${RULE}" -o "${TARGET_DIR}/${RULE}"
    echo "  ✓ Downloaded $RULE"
  fi
done

echo ""
echo "🎉 next-agent-pack installed successfully!"
echo "💡 Tip: Keep your team's custom rules in ${TARGET_DIR}/90-custom.mdc to avoid future upgrade conflicts."
