# 🚀 next-agent-pack

> **The composable rule pack and engineering standards for AI Coding Agents in Next.js 15 and React 19.**

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

Without dedicated rules, AI Coding Agents (Cursor, Claude, Copilot, Antigravity) often hallucinate outdated Next.js 13/14 or React 18 patterns, causing silent runtime failures and broken builds.

**`next-agent-pack`** provides clean, token-optimized, battle-tested system rules so your AI assistant writes production-ready Next.js 15 code from day one.

---

## 📦 1-Line Quick Installation

Run this inside your project root to instantly install the preset rules into `.cursor/rules/`:

```bash
curl -fsSL https://raw.githubusercontent.com/egitech/next-agent-pack/main/install.sh | bash
```

Or copy the files directly from the [`dist/next15-shadcn/`](./dist/next15-shadcn) directory.

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
│   └── next15-shadcn/                  # Standard distribution for users
│
├── scripts/
│   ├── build.mjs                       # Bundler script for dist packages
│   └── validate.mjs                    # Linter verifying frontmatter & token budgets
│
└── install.sh                          # 1-command installer script
```

---

## 🛡️ Upgradability & Custom Rules (Namespacing)

To safely update `next-agent-pack` in the future without losing your company or personal project rules, follow this namespacing convention:

- **`0x-*.mdc`**: **System Rules** managed by `next-agent-pack` (safe to update/re-run installer).
- **`9x-*.mdc`**: **Your Custom Team Rules** (e.g. `90-company-guidelines.mdc`). The installer will **never** touch or overwrite `9x-*.mdc` files.

---

## 🗺️ Roadmap

- [x] **Phase 1: Static Registry** — Production-ready Next.js 15 + React 19 + Tailwind + shadcn preset with 1-line curl installer.
- [ ] **Phase 2: Multi-Agent Adapter** — Automated builder to compile registry rules into `CLAUDE.md`, `AGENTS.md`, and `.github/copilot-instructions.md`.
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
