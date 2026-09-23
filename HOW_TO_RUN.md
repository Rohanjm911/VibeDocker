# 🚀 How to Run VibeDocker

A comprehensive step-by-step guide to installing, configuring, running, and building the **VibeDocker** Executive Creator Architecture platform on your local machine or in production.

---

## 📋 System Requirements & Prerequisites

Before starting, ensure your development environment satisfies the following requirements:

| Tool | Minimum Version | Recommended Version | Verify Command |
| :--- | :--- | :--- | :--- |
| **Node.js** | `v18.18.0` | `v20.x` or `v22.x` (LTS) | `node -v` |
| **npm** | `v9.x` | `v10.x`+ (included with Node) | `npm -v` |
| **Git** | `v2.x` | Latest | `git --version` |
| **Web Browser** | Modern Chromium / Firefox / Safari | Google Chrome / Brave / Edge | N/A |

> [!NOTE]
> Alternative package managers like **pnpm** (`pnpm install`), **yarn** (`yarn install`), or **bun** (`bun install`) can also be used, though `npm` is pre-configured and tested with the repository's `package-lock.json`.

---

## 🛠️ Step-by-Step Installation & Setup

### 1. Clone or Open the Repository

Open your terminal or command prompt (PowerShell, Bash, or Zsh) and navigate into the workspace directory:

```bash
cd "d:/projects and certificates/projects/web/VibeDocker"
```

*(If cloning fresh from GitHub:)*
```bash
git clone <repository-url>
cd VibeDocker
```

---

### 2. Install Project Dependencies

Install all core dependencies and developer tools recorded in `package.json`:

```bash
npm install
```

> [!TIP]
> If you encounter peer dependency conflicts across bleeding-edge versions (e.g., React 19 and certain UI libraries), run:
> ```bash
> npm install --legacy-peer-deps
> ```

---

### 3. Configure Environment Variables (Optional but Recommended)

VibeDocker comes equipped with an AI Script & Viral Hook Generation Studio powered by **OpenRouter AI** (`meta-llama/llama-3.3-70b-instruct:free`).

1. Copy the sample environment file to create your local environment file:
   ```bash
   # On Windows (PowerShell):
   Copy-Item .env.example .env.local

   # On macOS / Linux:
   cp .env.example .env.local
   ```

2. Open `.env.local` in your editor and add your OpenRouter API key:
   ```env
   # OpenRouter API Key for AI Studio Script Generation
   OPENROUTER_API_KEY=sk-or-v1-your-key-here
   ```

> [!NOTE]
> **API Key is Optional for General Exploration**: You can also enter or update your OpenRouter API key directly inside the VibeDocker web interface under **AI Studio** or **Settings**.

---

### 4. Start the Local Development Server

Run the Next.js development server:

```bash
npm run dev
```

Once initialized, you will see output similar to:

```
  ▲ Next.js 16.2.6
  - Local:        http://localhost:3000
  - Environments: .env.local

 ✓ Starting...
 ✓ Ready in 1.8s
```

---

### 5. Access the Application in Your Browser

1. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```
2. The root URL (`/`) will automatically route you to the **Login & Authentication Portal** (`/login`).

---

## 🔑 Authentication & Demo Access

VibeDocker includes pre-seeded creator profiles for immediate, zero-friction testing:

1. **One-Click Instant Login**:
   - On `/login`, click any pre-configured Creator Profile Card:
     - **Aarav Sharma** (`@aarav.tech`) &mdash; *Cinema & AI / YouTube Tech*
     - **Aria Thorne** (`@ariathorne.vibes`) &mdash; *Lifestyle & Fashion / Instagram*
     - **Elena Rostova** (`@elena.sound`) &mdash; *Audio & Music / TikTok*
     - **Marcus Vance** (`@marcus.builds`) &mdash; *SaaS & Coding / X & LinkedIn*
2. **Custom / Instant Bypass**:
   - You can also enter any email/handle or click **"Continue with Demo Account"** / **"Guest Mode"**.
   - VibeDocker persists the active creator session in `localStorage` under `vibedocker_user`.
3. **Onboarding Tour**:
   - When entering the dashboard for the first time, an interactive **Onboarding Modal** will guide you through the core navigation modules.

---

## 📦 Available Scripts Reference

All primary commands defined in [`package.json`](file:///d:/projects%20and%20certificates/projects/web/VibeDocker/package.json):

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Next.js development server with hot-reloading on `http://localhost:3000` |
| `npm run build` | Compiles and optimizes the application for production deployment |
| `npm run start` | Boots up the production server (run `npm run build` first) |
| `npm run lint` | Runs ESLint 9 to verify code styling and detect syntax issues |

---

## 🏗️ Production Build & Deployment

To verify that the application compiles without errors and test production performance:

```bash
# 1. Create the optimized production build
npm run build

# 2. Run the production server
npm run start
```

### Deploying to Vercel
The smoothest way to deploy VibeDocker is through [Vercel](https://vercel.com/):
1. Push your code to GitHub, GitLab, or Bitbucket.
2. Import the repository in your Vercel Dashboard.
3. Next.js is auto-detected. Add `OPENROUTER_API_KEY` under **Environment Variables**.
4. Click **Deploy**.

---

## 🩺 Troubleshooting & FAQ

### Issue 1: Port `3000` is Already in Use
**Solution**: Specify a custom port when starting the dev server:
```bash
npm run dev -- -p 3001
```

### Issue 2: AI Script Generation Fails with Status 400
**Solution**: 
- Ensure you provided a valid OpenRouter API key in `.env.local` (`OPENROUTER_API_KEY=...`) or in the UI inside the AI Studio / Settings modal.
- Verify your OpenRouter account has credits or allows the free tier model (`meta-llama/llama-3.3-70b-instruct:free`).

### Issue 3: Browser Shows Blank Screen or Redirect Loop
**Solution**:
- Clear your browser's local storage for `localhost:3000` (DevTools -> Application -> Local Storage -> Clear All).
- Re-navigate to `http://localhost:3000/login` to re-initialize your creator persona.

### Issue 4: Stale Build Artifacts or Cache Glitches
**Solution**: Clean the `.next` compilation cache:
```bash
# Windows (PowerShell)
Remove-Item -Recurse -Force .next

# macOS / Linux
rm -rf .next
```
Then run `npm run dev` again.
