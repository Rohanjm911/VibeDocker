"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Instagram,
  Youtube,
  Linkedin,
  ArrowRight,
  Shield,
  Zap,
  Sparkles,
  Flame,
  Radio,
  Lock,
  Mail,
  KeyRound,
  CheckCircle2,
  TrendingUp,
  Activity,
  Cpu,
  Eye,
  EyeOff,
  Terminal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import VibeDockerLogo from "@/components/shared/VibeDockLogo";

const demoCreators = [
  {
    id: "youtube",
    label: "Aarav Sharma",
    handle: "@aarav.tech",
    icon: Youtube,
    platform: "YouTube",
    badge: "Cinema & AI",
    tagColor: "border-orange-500/30 text-orange-400 bg-orange-500/10",
    avatarUrl: "/avatars/kai.jpg",
    user: {
      name: "Aarav Sharma",
      handle: "@aaravsharma.tech",
      avatar: "AS",
      avatarUrl: "/avatars/kai.jpg",
      platform: "youtube",
      followers: "420K",
      following: "280",
      posts: "186 videos",
      engagement: "8.4%",
      avgLikes: "32.6K",
      avgComments: "2,150",
      avgViews: "520K",
      niche: "AI Tech & Indian Creator Economy",
      bio: "Demystifying bleeding-edge AI models, cinema workflows & tech builds for modern India 🇮🇳",
      verified: true,
    },
  },
  {
    id: "instagram",
    label: "Aria Thorne",
    handle: "@ariathorne.vibes",
    icon: Instagram,
    platform: "Instagram",
    badge: "Cyber Aesthetic",
    tagColor: "border-blue-500/30 text-blue-400 bg-blue-500/10",
    avatarUrl: "/avatars/aria.jpg",
    user: {
      name: "Aria Thorne",
      handle: "@ariathorne.vibes",
      avatar: "AT",
      avatarUrl: "/avatars/aria.jpg",
      platform: "instagram",
      followers: "148.5K",
      following: "842",
      posts: "419 reels",
      engagement: "8.6%",
      avgLikes: "12.4K",
      avgComments: "640",
      avgViews: "185K",
      niche: "Fitness & Cyber-Aesthetics",
      bio: "High-intensity athletic training & futuristic streetwear | Powered by VibeDocker",
      verified: true,
    },
  },
  {
    id: "tiktok",
    label: "Priya Patel",
    handle: "@priya.beats",
    icon: Flame,
    platform: "TikTok",
    badge: "Viral Audio",
    tagColor: "border-rose-500/30 text-rose-400 bg-rose-500/10",
    avatarUrl: "/avatars/nova.jpg",
    user: {
      name: "Priya Patel",
      handle: "@priyapatel.beats",
      avatar: "PP",
      avatarUrl: "/avatars/nova.jpg",
      platform: "tiktok",
      followers: "640K",
      following: "310",
      posts: "520 drops",
      engagement: "11.8%",
      avgLikes: "58.4K",
      avgComments: "3,420",
      avgViews: "850K",
      niche: "Desi Fusion Beats & Viral Trends",
      bio: "Indie classical meets future bass | Viral audio trends, stems & Bollywood flips ⚡",
      verified: true,
    },
  },
  {
    id: "linkedin",
    label: "Marcus Vance",
    handle: "@marcus_scale",
    icon: Linkedin,
    platform: "LinkedIn",
    badge: "B2B Scale",
    tagColor: "border-cyan-500/30 text-cyan-400 bg-cyan-500/10",
    avatarUrl: "/avatars/marcus.jpg",
    user: {
      name: "Marcus Vance",
      handle: "@marcus_scale",
      avatar: "MV",
      avatarUrl: "/avatars/marcus.jpg",
      platform: "linkedin",
      followers: "64.2K",
      following: "1,120",
      posts: "310 insights",
      engagement: "9.8%",
      avgLikes: "5,840",
      avgComments: "420",
      avgViews: "94K",
      niche: "Creator Economy & Growth",
      bio: "Helping modern operators build institutional-grade media engines | Keynote speaker",
      verified: true,
    },
  },
];

export default function LoginPage() {
  const router = useRouter();
  const [authMode, setAuthMode] = useState<"credentials" | "social">("credentials");
  const [email, setEmail] = useState("creator@vibedocker.ai");
  const [password, setPassword] = useState("vibeDockerPro2026!");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState<string | null>(null);

  // Dynamic live metric counters
  const [growthVelocity, setGrowthVelocity] = useState(42.8);
  const [activeAudience, setActiveAudience] = useState(1.274);
  const [neuralLatency, setNeuralLatency] = useState(0.32);
  const [pulseGlow, setPulseGlow] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // Fluctuate growth slightly between 41.2% and 44.9%
      setGrowthVelocity((prev) => {
        const delta = (Math.random() - 0.48) * 0.4;
        const next = Math.min(45.5, Math.max(40.5, prev + delta));
        return parseFloat(next.toFixed(1));
      });

      // Fluctuate audience in millions (e.g. 1.272M to 1.285M)
      setActiveAudience((prev) => {
        const delta = (Math.random() - 0.45) * 0.003;
        const next = Math.min(1.295, Math.max(1.265, prev + delta));
        return parseFloat(next.toFixed(3));
      });

      // Fluctuate neural inference latency between 0.24s and 0.38s
      setNeuralLatency(() => {
        const next = 0.24 + Math.random() * 0.12;
        return parseFloat(next.toFixed(2));
      });

      setPulseGlow((p) => !p);
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  const handleStandardLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading("credentials");
    // Default to Aarav Sharma demo creator account
    const defaultUser = demoCreators[0].user;
    localStorage.setItem("vibedocker_user", JSON.stringify(defaultUser));
    localStorage.setItem("vibedock_user", JSON.stringify(defaultUser));
    localStorage.setItem("chakra_user", JSON.stringify(defaultUser));
    await new Promise((r) => setTimeout(r, 650));
    router.push("/dashboard");
  };

  const handleChannelLogin = async (creator: typeof demoCreators[0]) => {
    setLoading(creator.id);
    localStorage.setItem("vibedocker_user", JSON.stringify(creator.user));
    localStorage.setItem("vibedock_user", JSON.stringify(creator.user));
    localStorage.setItem("chakra_user", JSON.stringify(creator.user));
    await new Promise((r) => setTimeout(r, 650));
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen w-full bg-[#08090c] bg-grid-pattern text-neutral-100 flex flex-col justify-between p-4 sm:p-6 lg:px-12 select-none relative overflow-x-hidden">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-rose-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Top Navbar */}
      <header className="w-full max-w-7xl mx-auto flex items-center justify-between py-2 border-b border-[#1b1f2b]">
        <VibeDockerLogo size="default" />
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#12141c] border border-[#232733] text-[11px] font-mono text-neutral-300">
          <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-dot" />
          <span className="hidden sm:inline">VIBEDOCKER OPERATIONAL SYSTEM</span>
          <span className="sm:hidden">VIBEDOCKER OS</span>
          <span className="text-neutral-600">|</span>
          <span className="text-red-400 font-semibold">V2.5 PRO</span>
        </div>
      </header>

      {/* Main Grid Container */}
      <main className="w-full max-w-7xl mx-auto my-auto py-8 lg:py-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        
        {/* ================= LEFT COLUMN: SLEEK BRAND SHOWCASE ================= */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-7">
          
          {/* Tag & Heading */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono font-medium">
              <Sparkles className="w-3.5 h-3.5 text-red-400 animate-spin" style={{ animationDuration: "8s" }} />
              <span>NEXT-GEN CREATOR INTELLIGENCE</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
              Scale your media empire with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-red-600">
                Precision AI & Real-time Telemetry
              </span>
            </h1>

            <p className="text-neutral-400 text-sm sm:text-base max-w-xl leading-relaxed">
              High-voltage studio architecture built for breakout creators. Automate script ideation, analyze multi-platform performance pulses, and command your audience in one unified cockpit.
            </p>
          </motion.div>

          {/* Real-time Metric Cards (3 Columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {/* Card 1 */}
            <div className="p-4 rounded-xl bg-[#11131a] border border-[#202534] hover:border-red-500/40 transition-all shadow-sm group">
              <div className="flex items-center justify-between text-neutral-400 mb-2">
                <span className="text-[11px] font-mono uppercase tracking-wider">Growth Velocity</span>
                <TrendingUp className="w-4 h-4 text-red-400" />
              </div>
              <div className="text-2xl font-bold font-mono text-white flex items-baseline gap-2">
                <motion.span
                  key={growthVelocity}
                  initial={{ opacity: 0.6, y: -2 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  +{growthVelocity}%
                </motion.span>
                <span className="text-[11px] font-sans text-emerald-400 font-normal">↑ peak</span>
              </div>
              <p className="text-[11px] text-neutral-500 mt-1">Cross-platform viral lift</p>
              <div className="w-full bg-[#191d28] h-1.5 rounded-full mt-3 overflow-hidden">
                <motion.div
                  initial={{ width: "25%" }}
                  animate={{ width: `${Math.min(95, Math.max(30, (growthVelocity / 50) * 100))}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full"
                />
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-4 rounded-xl bg-[#11131a] border border-[#202534] hover:border-red-500/40 transition-all shadow-sm group">
              <div className="flex items-center justify-between text-neutral-400 mb-2">
                <span className="text-[11px] font-mono uppercase tracking-wider">Active Audience</span>
                <Activity className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-2xl font-bold font-mono text-white flex items-baseline gap-2">
                <motion.span
                  key={activeAudience}
                  initial={{ opacity: 0.6, y: -2 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeAudience}M
                </motion.span>
                <span className="text-[11px] font-sans text-neutral-400 font-normal">creators</span>
              </div>
              <p className="text-[11px] text-neutral-500 mt-1">Direct algorithmic footprint</p>
              <div className="w-full bg-[#191d28] h-1.5 rounded-full mt-3 overflow-hidden">
                <motion.div
                  initial={{ width: "40%" }}
                  animate={{ width: `${Math.min(96, Math.max(40, ((activeAudience - 1.2) / 0.15) * 100))}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full"
                />
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-4 rounded-xl bg-[#11131a] border border-[#202534] hover:border-red-500/40 transition-all shadow-sm group">
              <div className="flex items-center justify-between text-neutral-400 mb-2">
                <span className="text-[11px] font-mono uppercase tracking-wider">Neural Engine</span>
                <Cpu className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-bold font-mono text-white flex items-baseline gap-2">
                <motion.span
                  key={neuralLatency}
                  initial={{ opacity: 0.6, y: -2 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {neuralLatency}s
                </motion.span>
                <span className="text-[11px] font-sans text-emerald-400 font-normal">ultra-low</span>
              </div>
              <p className="text-[11px] text-neutral-500 mt-1">DeepSeek / OpenAI inference</p>
              <div className="w-full bg-[#191d28] h-1.5 rounded-full mt-3 overflow-hidden">
                <motion.div
                  initial={{ width: "60%" }}
                  animate={{ width: `${Math.min(98, Math.max(35, ((0.45 - neuralLatency) / 0.25) * 100))}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-300 rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Equalizer & Audio Waveform Feed */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#11131a] border border-[#202534] space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-neutral-200 uppercase tracking-wider">
                <Radio className="w-4 h-4 text-red-500 animate-pulse" />
                Real-time Platform Feed & Neural Hooks
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                Live Stream
              </div>
            </div>

            {/* Soundwave bars */}
            <div className="flex items-end gap-1.5 h-10 w-full px-2.5 py-1 bg-[#090a0f] rounded-lg border border-[#1b1f2b]">
              {[45, 80, 35, 95, 60, 85, 40, 100, 70, 50, 90, 35, 75, 60, 88, 55, 92, 45, 80, 65, 85, 40, 95, 70, 55, 80, 65, 90, 45, 75].map((h, i) => (
                <motion.div
                  key={i}
                  animate={{
                    height: [`${Math.max(18, h * 0.35)}%`, `${h}%`, `${Math.max(25, h * 0.65)}%`],
                  }}
                  transition={{
                    duration: 0.85 + (i % 5) * 0.15,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: (i % 6) * 0.08,
                  }}
                  className={cn(
                    "flex-1 rounded-t-sm",
                    i % 3 === 0 ? "bg-red-500" : i % 2 === 0 ? "bg-red-400/80" : "bg-neutral-600"
                  )}
                />
              ))}
            </div>

            {/* Activity entries */}
            <div className="space-y-1.5 font-mono text-xs text-neutral-400">
              <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-[#151822] border border-[#212636]">
                <div className="flex items-center gap-2 truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-neutral-300 text-[11px] truncate">AI Script Synthesizer v3.4 generated 14 hooks</span>
                </div>
                <span className="text-[10px] text-neutral-500 flex-shrink-0">just now</span>
              </div>
              <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-[#151822] border border-[#212636]">
                <div className="flex items-center gap-2 truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                  <span className="text-neutral-300 text-[11px] truncate">Viral pulse detected: +18.4% reach velocity on Reels</span>
                </div>
                <span className="text-[10px] text-neutral-500 flex-shrink-0">2m ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: AUTHENTIC LOGIN SCREEN ================= */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-[440px]"
          >
            {/* The Login Card Container */}
            <div className="bg-[#101218] rounded-2xl border border-[#232734] shadow-2xl relative overflow-hidden">
              {/* Crimson Accent Top Bar */}
              <div className="h-1 bg-gradient-to-r from-red-600 via-rose-500 to-red-500" />

              <div className="p-6 sm:p-7 space-y-6">
                {/* Header with Title & Subtitle */}
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-white tracking-tight">Sign in to VibeDocker</h2>
                    <p className="text-neutral-400 text-xs mt-1">Access your high-voltage studio cockpit</p>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    SECURE
                  </span>
                </div>

                {/* Switch Tabs: Account Login vs Demo Channels */}
                <div className="grid grid-cols-2 gap-1 p-1 bg-[#161822] rounded-xl border border-[#232838]">
                  <button
                    type="button"
                    onClick={() => setAuthMode("credentials")}
                    className={cn(
                      "py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5",
                      authMode === "credentials"
                        ? "bg-[#212636] text-white shadow-sm border border-[#2f364a]"
                        : "text-neutral-400 hover:text-white"
                    )}
                  >
                    <Lock className="w-3.5 h-3.5 text-red-400" />
                    Credentials
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuthMode("social")}
                    className={cn(
                      "py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5",
                      authMode === "social"
                        ? "bg-[#212636] text-white shadow-sm border border-[#2f364a]"
                        : "text-neutral-400 hover:text-white"
                    )}
                  >
                    <Radio className="w-3.5 h-3.5 text-red-400" />
                    Demo Channels
                  </button>
                </div>

                {/* TAB 1: FORM LOGIN (Authentic Login Screen) */}
                {authMode === "credentials" && (
                  <form onSubmit={handleStandardLogin} className="space-y-4">
                    {/* Email Input */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-neutral-300 flex items-center justify-between">
                        <span>Email address</span>
                        <span className="text-[10px] text-neutral-500 font-mono">Demo pre-filled</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                          <Mail className="w-4 h-4" />
                        </div>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="creator@vibedocker.ai"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#151722] border border-[#242938] text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all font-mono"
                          required
                        />
                      </div>
                    </div>

                    {/* Password Input */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-medium text-neutral-300">Password</label>
                        <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-xs text-red-400 hover:text-red-300 hover:underline">
                          Forgot password?
                        </a>
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                          <KeyRound className="w-4 h-4" />
                        </div>
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter your password"
                          className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#151722] border border-[#242938] text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all font-mono"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute inset-y-0 right-0 pr-3 pl-2 flex items-center text-neutral-400 hover:text-white cursor-pointer transition-colors focus:outline-none"
                          title={showPassword ? "Hide password" : "Show password"}
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4 text-red-400 hover:text-red-300" />
                          ) : (
                            <Eye className="w-4 h-4 text-neutral-400 hover:text-neutral-200" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Remember me & Security */}
                    <div className="flex items-center justify-between pt-1">
                      <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-neutral-400">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="w-3.5 h-3.5 rounded bg-[#161822] border-[#2d3447] text-red-600 focus:ring-0 accent-red-600"
                        />
                        <span>Remember studio session</span>
                      </label>
                      <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                        <Shield className="w-3 h-3" /> SSL 256-bit
                      </span>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading !== null}
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-semibold text-sm shadow-lg shadow-red-600/20 hover:shadow-red-600/35 transition-all flex items-center justify-center gap-2 group disabled:opacity-60"
                    >
                      {loading === "credentials" ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Authorizing Cockpit...</span>
                        </>
                      ) : (
                        <>
                          <span>Sign In to Studio</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>
                )}

                {/* TAB 2: ONE-CLICK DEMO CHANNELS */}
                {authMode === "social" && (
                  <div className="space-y-2.5">
                    <p className="text-neutral-400 text-xs">Choose an active creator identity to dock directly:</p>
                    {demoCreators.map((creator) => (
                      <button
                        key={creator.id}
                        onClick={() => handleChannelLogin(creator)}
                        disabled={loading !== null}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-xl bg-[#151722] hover:bg-[#1b1e2c] border border-[#222736] hover:border-red-500/50 transition-all text-left group"
                      >
                        <div className="relative w-9 h-9 rounded-lg overflow-hidden bg-[#1c202d] border border-[#2b3245] flex items-center justify-center flex-shrink-0">
                          {creator.avatarUrl ? (
                            <img src={creator.avatarUrl} alt={creator.label} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-xs font-bold">{creator.user.avatar}</span>
                          )}
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#11131a] border border-[#2c3346] flex items-center justify-center text-red-400">
                            <creator.icon className="w-2.5 h-2.5" />
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-neutral-200 group-hover:text-white truncate">
                              {creator.label}
                            </span>
                            <span className={cn("text-[9px] font-mono px-1.5 py-0.5 rounded border", creator.tagColor)}>
                              {creator.platform}
                            </span>
                          </div>
                          <span className="text-[11px] text-neutral-400 truncate block">
                            {creator.handle} · <span className="font-mono text-neutral-500">{creator.user.followers}</span>
                          </span>
                        </div>

                        {loading === creator.id ? (
                          <div className="w-4 h-4 border-2 border-neutral-600 border-t-red-500 rounded-full animate-spin flex-shrink-0" />
                        ) : (
                          <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-red-400 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                )}

                {/* Quick Switch Helper Divider */}
                <div className="pt-2 border-t border-[#1c202c] flex items-center justify-between text-xs text-neutral-400">
                  <span>Don&apos;t have an account?</span>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode(authMode === "credentials" ? "social" : "credentials");
                    }}
                    className="text-red-400 font-medium hover:underline hover:text-red-300"
                  >
                    {authMode === "credentials" ? "Use Demo Channels →" : "Use Credentials →"}
                  </button>
                </div>

                {/* Footer Badges */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs text-neutral-400 pt-1">
                  <div className="flex flex-col items-center gap-1 py-1.5 px-1 rounded-lg bg-[#141620] border border-[#202534]">
                    <Shield className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[10px] font-mono">Isolated Data</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 py-1.5 px-1 rounded-lg bg-[#141620] border border-[#202534]">
                    <Zap className="w-3.5 h-3.5 text-red-400" />
                    <span className="text-[10px] font-mono">Instant Auth</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 py-1.5 px-1 rounded-lg bg-[#141620] border border-[#202534]">
                    <Sparkles className="w-3.5 h-3.5 text-neutral-300" />
                    <span className="text-[10px] font-mono">OpenRouter AI</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto pt-3 border-t border-[#1b1f2b] text-center">
        <p className="text-[11px] text-neutral-500 font-mono">
          VibeDocker OS &copy; {new Date().getFullYear()} — High-Voltage Creator Architecture
        </p>
      </footer>
    </div>
  );
}
