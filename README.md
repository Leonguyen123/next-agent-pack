# 🚀 next-agent-pack

> **The composable rule pack and engineering standards for AI Coding Agents (Cursor & Antigravity) in Next.js 15 and React 19.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js 15](https://img.shields.io/badge/Next.js-15.x-black?logo=nextdotjs)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-Components-black)](https://ui.shadcn.com/)

---

## ⚡ The Problem
Next.js 15 and React 19 introduced groundbreaking paradigms:
- **Async Request APIs**: `params` and `searchParams` are now asynchronous Promises.
- **Changed Caching Semantics**: `fetch` requests are no longer cached by default (`no-store` default).
- **React 19 Modern Hooks**: `useActionState` replaces deprecated `useFormState`, native `ref` props replace `forwardRef`, and `useOptimistic` powers optimistic UI.

Without dedicated rules, AI Coding Agents (Cursor, Antigravity, Claude, Copilot) often hallucinate outdated Next.js 13/14 or React 18 patterns, causing silent runtime failures and broken builds.

**`next-agent-pack`** provides clean, token-optimized, battle-tested system rules so your AI assistant writes production-ready Next.js 15 code from day one.

---

## 📦 1-Line Quick Installation

Run inside your project root:

```bash
# Install everything (Cursor .mdc rules + Antigravity AGENTS.md & Skill):
curl -fsSL https://raw.githubusercontent.com/egitech/next-agent-pack/main/install.sh | bash

# Or install specifically for Cursor:
curl -fsSL https://raw.githubusercontent.com/egitech/next-agent-pack/main/install.sh | bash -s cursor

# Or install specifically for Antigravity:
curl -fsSL https://raw.githubusercontent.com/egitech/next-agent-pack/main/install.sh | bash -s antigravity
```

---

## 🤖 Multi-Agent Support

`next-agent-pack` supports multiple AI Coding Assistants out of the box:

| AI Agent | Target File(s) | Trigger Mechanism |
| :--- | :--- | :--- |
| **Cursor AI** | `.cursor/rules/*.mdc` | Automatic activation based on `globs` matching active editor files. |
| **Antigravity (Rules)** | `AGENTS.md` | Hierarchical context injection for the entire project. |
| **Antigravity (Skill)** | `.agents/skills/next-agent-pack/SKILL.md` | **Progressive Disclosure**: Antigravity automatically reads detailed skill rules when tasked with Next.js/React work. |

---

## 🧩 Included Rules

| Rule File | Target Domain | Core Focus |
| :--- | :--- | :--- |
| **`00-next15-core.mdc`** | Framework Core | `await params`, App Router layouts, Server Components by default, Server Actions with validation, and Next.js 15 un-cached `fetch` defaults. |
| **`01-react19-modern.mdc`** | Modern React | `useActionState`, optimistic updates via `useOptimistic`, `use()` hook for promises, and clean ref-as-prop usage. |
| **`02-tailwind-styling.mdc`** | Styling & Theme | `cn()` helper with `tailwind-merge`, logical class ordering, design tokens (`bg-background`, `text-foreground`), and mobile-first responsiveness. |
| **`03-shadcn-components.mdc`** | UI Architecture | Clean separation between `components/ui` primitives and feature composite widgets, `cva` variant definitions, and polymorphic `asChild` composition. |

---

## 🏗️ Architecture: Composable Registry

`next-agent-pack` is designed as a **Lego-like Registry**, making it easy to maintain and extend:

```text
next-agent-pack/
├── registry/                           # Atomic modular rule blocks
│   ├── frameworks/
│   │   ├── nextjs-15/                  # Next.js 15 core rules & metadata
│   │   └── react-19/                   # React 19 hooks & patterns
│   └── ui/
│       ├── tailwind/                   # Utility-first styling & theme rules
│       └── shadcn/                     # Primitives & component composition
│
├── stacks/                             # Pre-assembled presets
│   └── next15-shadcn-minimal/          # Manifest linking registry modules
│
├── dist/                               # Ready-to-use compiled bundles
│   └── next15-shadcn/
│       ├── 00-next15-core.mdc          # Cursor rules
│       ├── ...
│       ├── AGENTS.md                   # Antigravity project rules
│       └── skills/next-agent-pack/     # Antigravity progressive skill
│
├── scripts/
│   ├── build.mjs                       # Bundler compiling dist packages & multi-agent outputs
│   └── validate.mjs                    # Linter verifying frontmatter & token budgets
│
└── install.sh                          # 1-command installer script (supports all, cursor, antigravity)
```

---

## 🛡️ Upgradability & Custom Rules (Namespacing)

To safely update `next-agent-pack` in the future without losing your company or personal project rules, follow this namespacing convention:

- **`0x-*.mdc`**: **System Rules** managed by `next-agent-pack` (safe to update/re-run installer).
- **`9x-*.mdc`**: **Your Custom Team Rules** (e.g. `90-company-guidelines.mdc`). The installer will **never** touch or overwrite `9x-*.mdc` files.

---

## 🗺️ Roadmap

- [x] **Phase 1: Composable Registry** — Next.js 15 + React 19 + Tailwind + shadcn preset with 1-line curl installer.
- [x] **Phase 2: Multi-Agent Adapter** — Automated compilation for Cursor (`.mdc`) and Antigravity (`AGENTS.md` + Progressive `SKILL.md`).
- [ ] **Phase 3: Interactive CLI** — `npx next-agent-pack init` with interactive selector for ORMs (Drizzle, Prisma), auth, and editors.

---

## 🤝 Contributing

Contributions are welcome! If you find edge-cases or new conventions:
1. Fork the repo & create a branch.
2. Edit or add modules under `registry/`.
3. Run `npm run build && npm run validate`.
4. Submit a Pull Request.

---

## 📄 License

Distributed under the MIT License.
