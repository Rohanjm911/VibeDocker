# ⚡ VibeDocker • Turning Ideas Into Visual Pieces

[![Next.js](https://img.shields.io/badge/Next.js-16.2.6-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-149eca?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06b6d4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.x-ff0055?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![OpenRouter](https://img.shields.io/badge/OpenRouter_AI-Llama_3.3_70B-6366f1?style=for-the-badge&logo=openai&logoColor=white)](https://openrouter.ai/)

**VibeDocker** is an ultra-premium, obsidian-grade creator operations platform and digital studio. Built around the ethos **"Turning Ideas Into Visual Pieces"**, VibeDocker unifies real-time AI neural script generation, second-by-second audience telemetry, hook virality diagnostics, multi-platform publishing schedules, and brand voice morphing into a singular, high-performance command center.

---

## 📑 Documentation Quick Links

| Document | Description |
| :--- | :--- |
| 📖 **[HOW_TO_RUN.md](HOW_TO_RUN.md)** | Complete step-by-step instructions on prerequisites, installation, environment setup, local execution, and production deployment. |
| 📦 **[PACKAGES_AND_EXTENSIONS.md](PACKAGES_AND_EXTENSIONS.md)** | Deep dive into every installed package, runtime library, recommended IDE extensions (VS Code / Cursor), and browser dev tools. |

---

## 🛠️ Tech Stack & Architecture

VibeDocker is engineered using modern, performance-first web technologies:

### Core Framework & Runtime
- **[Next.js 16 (App Router)](https://nextjs.org/)**: Server Components, streaming SSR, hardware-accelerated transitions, and unified API route handlers.
- **[React 19](https://react.dev/)**: Latest React runtime with concurrent rendering and optimal client state management.
- **[TypeScript 5](https://www.typescriptlang.org/)**: Strict static typing across creator data models, telemetry streams, and API contracts.

### Styling & Design System
- **[Tailwind CSS v4](https://tailwindcss.com/)**: CSS-first utility styling powered by `@tailwindcss/postcss`.
- **Obsidian Theme System**: Deep obsidian background with optimized GPU ambient grid radiance (`#030305`), sub-micron glassmorphic borders, and hardware-accelerated surface rendering (`translateZ(0)`).
- **[Class Variance Authority (CVA)](https://cva.style/docs)** + **`tailwind-merge`** + **`clsx`**: Type-safe component variant management without stylesheet specificity collisions.

### Motion, Animation & Hardware Acceleration
- **[Framer Motion 12](https://www.framer.com/motion/)**: Fluid page navigation, spring-physics modals, interactive cards, and layout animations.
- **[Anime.js 4](https://animejs.com/)**: High-frequency metric tick counters (`AnimeCounter`) and real-time audio/signal telemetry pulse bars (`AnimePulseBar`).
- **[Lucide React](https://lucide.dev/)**: Crisp, scalable iconography across all platform navigation and telemetry cards.

### UI Primitives & Accessibility
- **[Radix UI](https://www.radix-ui.com/)**: Unstyled, fully accessible primitives for Dialogs (`@radix-ui/react-dialog`), Tabs (`@radix-ui/react-tabs`), Progress bars (`@radix-ui/react-progress`), and Polymorphic Slots (`@radix-ui/react-slot`).

### Data Visualization
- **[Recharts 3](https://recharts.org/)**: High-performance SVG charts for retention curves, subscriber velocity, and platform engagement heatmaps.

### AI Engine & API Layer
- **[OpenRouter AI](https://openrouter.ai/)**: Next.js route handler (`/api/generate-script`) integrating the `meta-llama/llama-3.3-70b-instruct:free` model to formulate high-retention creator scripts, viral hooks, and pacing cues.

---

## 🌟 Key Features & Modules

- **⚡ Central Command Deck (`/dashboard`)**: Instant executive overview of net audience velocity, cross-platform retention, active campaign statuses, and high-priority action alerts.
- **🎮 Twitch & Multi-Platform Personas**: First-class support for game streamers, digital directors, and multi-format creators (including Priya Patel's dedicated Twitch FPS persona).
- **🧠 Neural Script Studio (`/dashboard/brain`)**: AI-assisted scriptwriting engine powered by OpenRouter that generates 3-second scroll-stopping hooks, retention-engineered bodies, and conversion CTAs.
- **🎯 Virality & Hook Diagnostics (`/dashboard/hook`, `/dashboard/virality`)**: Real-time scoring of content ideas against algorithmic retention factors and curiosity gaps.
- **👥 Audience Telemetry (`/dashboard/audience`)**: Second-by-second analytics, cohort demographics, and engagement drop-off tracking.
- **🎨 Brand Voice & Style Morphing (`/dashboard/voice`, `/dashboard/morph`, `/dashboard/brand`)**: Tailor your tone across Twitch, YouTube, Instagram, X (Twitter), and LinkedIn without diluting your signature identity.
- **📅 Release Calendar & Growth Engine (`/dashboard/calendar`, `/dashboard/growth`)**: Interactive scheduling matrix and milestone projection engine.
- **🔗 Multi-Platform Connect Hub (`/dashboard/connect`)**: Centralized integration dashboard for synchronizing accounts and tokens.
- **💡 Interactive System Walkthrough**: Integrated on-demand modal tutorial guiding users through key cockpit features upon initial onboarding.

---

## 📂 Project File Structure

```text
VibeDocker/
├── .vscode/
│   └── extensions.json            # Recommended editor extensions (Tailwind, ESLint, Prettier, etc.)
├── app/                           # Next.js 16 App Router directory
│   ├── api/                       # Server-side API Route Handlers
│   │   └── generate-script/
│   │       └── route.ts           # OpenRouter AI script & hook generation API endpoint
│   ├── dashboard/                 # Creator Command Center pages & nested submodules
│   │   ├── layout.tsx             # Persistent Dashboard layout (Sidebar, HeaderBar, Auth guard)
│   │   ├── page.tsx               # Main Dashboard overview & telemetry metrics
│   │   ├── analytics/page.tsx     # Deep-dive audience & performance analytics
│   │   ├── audience/page.tsx      # Audience demographic & subscriber growth breakdown
│   │   ├── brain/page.tsx         # AI Script Studio & neural idea generator
│   │   ├── brand/page.tsx         # Brand identity, media kits & sponsor metrics
│   │   ├── calendar/page.tsx      # Multi-platform content release scheduling
│   │   ├── connect/page.tsx       # Platform accounts connection manager (Twitch, YT, IG, X, TikTok)
│   │   ├── growth/page.tsx        # Growth experiments & algorithmic velocity tracker
│   │   ├── hook/page.tsx          # Hook analyzer & 3-second retention tester
│   │   ├── morph/page.tsx         # Content repurposing & cross-platform transformer
│   │   ├── settings/page.tsx      # Creator configuration, API keys, and theme settings
│   │   ├── trend/page.tsx         # Emerging real-time cultural & niche trends radar
│   │   ├── virality/page.tsx      # Virality scoring predictor & benchmark tool
│   │   └── voice/page.tsx         # Creator tone calibration & acoustic engine
│   ├── login/
│   │   └── page.tsx               # High-energy login page with instant demo creator profiles
│   ├── globals.css                # Global stylesheet, custom font definitions & obsidian utility classes
│   ├── icon.svg                   # Dynamic app icon
│   ├── layout.tsx                 # Root HTML shell, fonts (Inter, JetBrains Mono) & metadata
│   └── page.tsx                   # Root landing page (redirects directly to /login)
├── components/
│   ├── dashboard/
│   │   └── LiveContentSimulator.tsx # Real-time interactive AI hook testing simulator
│   └── shared/                    # Reusable UI component architecture
│       ├── AnimeCounter.tsx       # Smooth number-tick counter powered by Anime.js
│       ├── AnimePulseBar.tsx      # Pulsing dynamic frequency indicator
│       ├── HeaderBar.tsx          # Top navigation bar with notifications and profile triggers
│       ├── NotificationPopover.tsx# Live notification center with interactive alerts
│       ├── OnboardingModal.tsx    # Interactive introductory tour for first-time visitors
│       ├── ProfilePopover.tsx     # Active creator profile details & persona switcher
│       ├── Sidebar.tsx            # Collapsible navigation drawer with real-time active indicators
│       └── VibeDockLogo.tsx       # Branded vector logo component with new VibeDocker mark
├── lib/
│   ├── contentEngine.ts           # Content strategy logic, script templates & mock pipelines
│   ├── creatorsData.ts            # Detailed mock data for pre-seeded creator personas
│   ├── useNotifications.ts        # Custom hook for notification feed management
│   ├── useUser.ts                 # Custom hook for creator authentication & active persona state
│   └── utils.ts                   # Utility helper for class merging (clsx + tailwind-merge)
├── public/
│   ├── avatars/                   # Pre-seeded creator avatar portrait photographs
│   ├── brand-logo.png             # Official VibeDocker brand logo asset
│   └── vibedocker-icon.svg        # Branded primary icon asset
├── .env.example                   # Template for environment variables (OpenRouter API Key)
├── .gitignore                     # Git ignore rules for node_modules, .next, and environment files
├── HOW_TO_RUN.md                  # Comprehensive step-by-step run & deployment guide
├── PACKAGES_AND_EXTENSIONS.md     # Full directory of all packages and recommended IDE extensions
├── eslint.config.mjs              # ESLint 9 configuration file
├── next.config.ts                 # Next.js 16 configuration
├── package.json                   # Project metadata, dependencies, and script definitions
├── postcss.config.mjs             # PostCSS plugin pipeline for Tailwind CSS v4
├── tailwind.config.ts             # Tailwind CSS configuration and theme extensions
└── tsconfig.json                  # TypeScript compiler options and alias paths (`@/*`)
```

---

## ⚡ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Configure environment variables (Optional - for AI script generation)
cp .env.example .env.local

# 3. Start development server
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

> For detailed troubleshooting, production build instructions, and login credentials, refer to **[HOW_TO_RUN.md](HOW_TO_RUN.md)**.

---

## 📜 Available NPM Scripts

| Script | Command | Purpose |
| :--- | :--- | :--- |
| **Development** | `npm run dev` | Runs the Next.js local development server on port 3000 |
| **Build** | `npm run build` | Compiles an optimized production build in `.next` |
| **Start** | `npm run start` | Boots up the production server locally |
| **Lint** | `npm run lint` | Runs ESLint 9 to ensure code style and catch issues |

---

## 🛡️ License & Credits

Built with precision for the next generation of digital creators. Private proprietary software.
