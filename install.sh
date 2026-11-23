#!/usr/bin/env bash
set -e

# next-agent-pack installer
# Cross-agent rules for Cursor, Antigravity, and Claude Code

REPO_RAW_URL="https://raw.githubusercontent.com/egitech/next-agent-pack/main"
MODE="${1:-all}" # Options: cursor, antigravity, claude, all

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" 2>/dev/null && pwd || echo "")"
LOCAL_DIST="${SCRIPT_DIR}/dist/next15-shadcn"

install_cursor() {
  local target_dir=".cursor/rules"
  echo "⚡ [Cursor] Installing rules into ${target_dir}..."
  mkdir -p "$target_dir"

  local rules=(
    "00-next15-core.mdc"
    "01-react19-modern.mdc"
    "02-tailwind-styling.mdc"
    "03-shadcn-components.mdc"
  )

  for rule in "${rules[@]}"; do
    if [ -d "$LOCAL_DIST" ] && [ -f "$LOCAL_DIST/$rule" ]; then
      cp "$LOCAL_DIST/$rule" "$target_dir/$rule"
      echo "  ✓ Installed $rule"
    else
      curl -fsSL "${REPO_RAW_URL}/dist/next15-shadcn/${rule}" -o "${target_dir}/${rule}"
      echo "  ✓ Downloaded $rule"
    fi
  done
}

install_antigravity() {
  echo "⚡ [Antigravity] Installing AGENTS.md and Skill..."
  
  # 1. Install AGENTS.md
  if [ -d "$LOCAL_DIST" ] && [ -f "$LOCAL_DIST/AGENTS.md" ]; then
    cp "$LOCAL_DIST/AGENTS.md" "./AGENTS.md"
    echo "  ✓ Installed AGENTS.md (Root Rules)"
  else
    curl -fsSL "${REPO_RAW_URL}/dist/next15-shadcn/AGENTS.md" -o "./AGENTS.md"
    echo "  ✓ Downloaded AGENTS.md"
  fi

  # 2. Install Skill to .agents/skills/
  local skill_dir=".agents/skills/next-agent-pack"
  mkdir -p "$skill_dir"
  if [ -d "$LOCAL_DIST" ] && [ -f "$LOCAL_DIST/skills/next-agent-pack/SKILL.md" ]; then
    cp "$LOCAL_DIST/skills/next-agent-pack/SKILL.md" "$skill_dir/SKILL.md"
    echo "  ✓ Installed .agents/skills/next-agent-pack/SKILL.md (Progressive Skill)"
  else
    curl -fsSL "${REPO_RAW_URL}/dist/next15-shadcn/skills/next-agent-pack/SKILL.md" -o "$skill_dir/SKILL.md"
    echo "  ✓ Downloaded .agents/skills/next-agent-pack/SKILL.md"
  fi
}

install_claude() {
  echo "⚡ [Claude Code] Installing CLAUDE.md..."
  if [ -d "$LOCAL_DIST" ] && [ -f "$LOCAL_DIST/CLAUDE.md" ]; then
    cp "$LOCAL_DIST/CLAUDE.md" "./CLAUDE.md"
    echo "  ✓ Installed CLAUDE.md (Project Memory)"
  else
    curl -fsSL "${REPO_RAW_URL}/dist/next15-shadcn/CLAUDE.md" -o "./CLAUDE.md"
    echo "  ✓ Downloaded CLAUDE.md"
  fi
}

echo "📦 next-agent-pack Installation (Mode: ${MODE})"
echo "------------------------------------------------"

case "$MODE" in
  cursor)
    install_cursor
    ;;
  antigravity)
    install_antigravity
    ;;
  claude)
    install_claude
    ;;
  all)
    install_cursor
    install_antigravity
    install_claude
    ;;
  *)
    echo "Unknown mode: $MODE (choose: cursor, antigravity, claude, all)"
    exit 1
    ;;
esac

echo ""
echo "🎉 next-agent-pack setup finished successfully!"
echo "💡 Tip: Keep team-specific overrides in 90-custom.mdc to avoid upgrade conflicts."
