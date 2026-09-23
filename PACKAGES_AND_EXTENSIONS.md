# 📦 Packages & Extensions Guide

This document lists all software packages, dependencies, and recommended developer extensions (for code editors and web browsers) needed to run, develop, and maintain **VibeDocker**.

---

## 1. 📚 Project Packages & Dependencies

The project relies on **Next.js 16 (App Router)** and **React 19** with a curated set of libraries for UI primitives, animation engines, vector charts, and styling.

### 🚀 Production Dependencies (`dependencies`)

| Package | Version | Purpose & Usage in VibeDocker |
| :--- | :--- | :--- |
| **`next`** | `16.2.6` | Core Full-Stack React framework (App Router, Server Components, API Route Handlers). |
| **`react`** | `19.2.4` | UI component library powering client and server views. |
| **`react-dom`** | `19.2.4` | React DOM rendering integration. |
| **`framer-motion`** | `^12.39.0` | Motion graphics, smooth page transitions, interactive tabs, spring modals, and card hover physics. |
| **`animejs`** | `^4.5.0` | High-frequency telemetry number counters (`AnimeCounter.tsx`) and pulsating audio/signal bars (`AnimePulseBar.tsx`). |
| **`@radix-ui/react-dialog`** | `^1.1.15` | Accessible, screen-reader-compliant modal dialog primitives (used in `OnboardingModal.tsx`). |
| **`@radix-ui/react-tabs`** | `^1.1.13` | Accessible tabs used across Dashboard analytics, settings, and filter switches. |
| **`@radix-ui/react-progress`** | `^1.1.8` | Accessible progress bars for viral readiness meters and retention indicators. |
| **`@radix-ui/react-slot`** | `^1.2.4` | Slot utility for creating polymorphic, composable UI components without DOM bloat. |
| **`recharts`** | `^3.8.1` | Declarative charting library for audience demographic breakdowns, velocity analytics, and engagement graphs. |
| **`lucide-react`** | `0.468.0` | Comprehensive SVG icon library used across all sidebars, badges, buttons, and telemetry cards. |
| **`clsx`** | `^2.1.1` | Utility for constructing `className` strings conditionally. |
| **`tailwind-merge`** | `^3.6.0` | Merges Tailwind CSS classes without stylesheet specificity collisions. |
| **`class-variance-authority`** | `^0.7.1` | Type-safe CSS variant composition utility. |
| **`@types/animejs`** | `^3.1.13` | TypeScript type declarations for Anime.js. |

---

### 🛠️ Developer Dependencies (`devDependencies`)

| Package | Version | Purpose & Usage |
| :--- | :--- | :--- |
| **`typescript`** | `^5` | Strict static typing, interfaces, and compile-time error detection. |
| **`tailwindcss`** | `^4` | Next-generation utility-first styling engine with native CSS cascade layers. |
| **`@tailwindcss/postcss`** | `^4` | Official PostCSS integration plugin for Tailwind CSS v4. |
| **`eslint`** | `^9` | JavaScript and TypeScript static code analyzer. |
| **`eslint-config-next`** | `16.2.6` | Official Next.js ESLint rules (App Router linting, font optimization checks, Core Web Vitals checks). |
| **`@types/node`** | `^20` | Node.js runtime type definitions for TypeScript. |
| **`@types/react`** | `^19` | TypeScript declarations for React 19. |
| **`@types/react-dom`** | `^19` | TypeScript declarations for React DOM 19. |

---

### 🌐 External Services & APIs

| Service | Model / Endpoint | Role in VibeDocker |
| :--- | :--- | :--- |
| **OpenRouter AI** | `meta-llama/llama-3.3-70b-instruct:free` | Powers the `/api/generate-script` route for instant viral hook generation, audience retention scripts, and creative direction. |
| **Google Fonts** | `Inter`, `JetBrains Mono` | Cloud-delivered modern typography linked in `app/layout.tsx`. |

---

## 2. 🧩 Recommended Code Editor Extensions

To maximize productivity and ensure consistent code formatting, we strongly recommend installing these extensions in **VS Code**, **Cursor**, **Windsurf**, or **Antigravity IDE**:

### 🎯 Primary Extensions

| Extension Name | Extension Identifier | Why It Is Needed |
| :--- | :--- | :--- |
| **Tailwind CSS IntelliSense** | `bradlc.vscode-tailwindcss` | Auto-completion for class names, hover previews of computed CSS, and syntax highlighting for Tailwind v4. |
| **ESLint** | `dbaeumer.vscode-eslint` | Live in-editor feedback for Next.js and React 19 lint errors, warnings, and code standards. |
| **Prettier - Code Formatter** | `esbenp.prettier-vscode` | Consistent formatting on file save across `.ts`, `.tsx`, `.css`, and `.json`. |
| **Pretty TypeScript Errors** | `yoavbls.pretty-ts-errors` | Formats cryptic TypeScript error messages into readable, highlighted markdown inside the editor. |
| **Auto Rename Tag** | `formulahendry.auto-rename-tag` | Automatically syncs opening and closing JSX tags when refactoring React elements. |
| **Path Intellisense** | `christian-kohler.path-intellisense` | Autocompletes file path imports when importing components (`@/components/...`), icons, and static assets. |
| **Material Icon Theme** | `PKief.material-icon-theme` | Visual icons for Next.js App Router folders (`app`, `dashboard`, `components`, `public`). |

### ⚡ API Testing & Utility Extensions

| Extension Name | Extension Identifier | Why It Is Needed |
| :--- | :--- | :--- |
| **Thunder Client** or **REST Client** | `rangav.vscode-thunder-client` / `humao.rest-client` | Quickly trigger and test `/api/generate-script` POST endpoints without leaving your editor. |
| **GitLens** | `eamodio.gitlens` | Track revisions, line history, and commit authors in team environments. |

---

## 3. 🌐 Recommended Web Browser Extensions

When testing and debugging VibeDocker locally in Chrome, Edge, or Brave:

1. **React Developer Tools**
   - Inspect the React 19 component hierarchy, hooks state (`useUser`, `useNotifications`), and re-render profiling.
   - [Chrome Web Store Link](https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)

2. **ColorZilla / Eyedropper**
   - Useful for inspecting the precise Obsidian neon palette (`#050508`, `#0c0c14`, cyan and violet accents).

3. **Window Resizer**
   - Quickly verify responsive breakpoints (Mobile drawer navigation vs. Desktop persistent sidebar).

---

## 4. ⚙️ Automatic One-Click VS Code Extension Setup

To allow your editor to automatically prompt developers to install these recommended extensions, a `.vscode/extensions.json` file is provided in the repository with the following configuration:

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "yoavbls.pretty-ts-errors",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "PKief.material-icon-theme"
  ]
}
```
