# NichePlan — Local Development Setup Guide

Welcome to the **NichePlan** code-base!  
This document walks you from a blank OS install to a hot-reloading dev server in **≈ 10 minutes**.

---

## 1 — Prerequisites

| Tool | Min Version | Install |
|------|-------------|---------|
| **Git** | 2.40+ | `brew install git` \| `winget install Git.Git` \| `apt install git` |
| **Node.js** | 18 LTS / 20 LTS | https://nodejs.org |
| **pnpm** | 8.15+ | `npm i -g pnpm` |
| **Rust** (for WASM) | 1.74+ | `curl https://sh.rustup.rs -sSf | sh`<br>`rustup target add wasm32-unknown-unknown` |
| **wasm-pack** | 0.12+ | `cargo install wasm-pack` |
| **GitHub CLI** (optional) | 2.0+ | `brew install gh` / `winget install GitHub.cli` |

> 📱 **Apple Pencil testing** → Safari 18+ on iPadOS 17+

---

## 2 — Repository Bootstrap

```bash
# 1. Clone
git clone https://github.com/mark-orme/NichePlanNew.git
cd NichePlanNew

# 2. Install JS deps
pnpm install

# 3. Install Git hooks
pnpm dlx husky install
```

**Windows first-time PowerShell users**

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## 3 — Project Scripts

| Script | Purpose |
|--------|---------|
| `pnpm dev` | Vite dev server <http://localhost:5173> + HMR |
| `pnpm build` | Type-check then build PWA to `dist/` |
| `pnpm preview` | Serve built app with service-worker |
| `pnpm test` | Run Jest unit tests once |
| `pnpm test:watch` | Jest in watch mode |
| `pnpm lint` / `pnpm lint:fix` | ESLint check / auto-fix |
| `pnpm build:wasm` | Compile Rust smoothing module |

---

## 4 — Initial Run

```bash
# 1. Compile WASM (first time only)
pnpm build:wasm

# 2. Start dev server
pnpm dev
```

Open the URL displayed in the console:

* **Chrome 113+ / Edge 113+** – WebGPU stable  
* **Safari 18+** – WebGPU + Apple Pencil  
* **Firefox 120** – set `dom.webgpu.enabled = true`

You should see a blank canvas with a top menu that reads **"Phase 1 Foundation Complete"**.

---

## 5 — Next Steps

1. **Phase 1 foundation** is ready locally.  
2. Pull the latest changes (`git pull`) on other machines.  
3. Start **Phase 2 – Input System Recovery** (`feature/input-system`).  
4. Always run `pnpm lint && pnpm test` before pushing.  

Enjoy Sketching 🏡🎨
