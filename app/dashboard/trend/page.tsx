"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  Flame,
  Clock,
  ArrowUpRight,
  Hash,
  Play,
  RefreshCw,
  Zap,
  Sparkles,
  Layers,
  ChevronDown,
  Copy,
  Check,
  ExternalLink,
  Radio,
  Pause,
  Sliders,
  Activity,
  Bell,
  ArrowUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import AnimeCounter from "@/components/shared/AnimeCounter";
import AnimePulseBar from "@/components/shared/AnimePulseBar";

const platforms = ["All", "Instagram", "TikTok", "YouTube", "LinkedIn"];

const initialTrends = [
  {
    id: 1,
    topic: "75 Hard Challenge",
    category: "Fitness & Discipline",
    platforms: ["instagram", "tiktok"],
    velocity: 98,
    growthNum: 340,
    growth: "+340%",
    views: "2.4B",
    viewsNum: 2400,
    age: "2 days ago",
    format: "Before/After Transformation reel with daily accountability logs",
    hook: "I did 75 Hard for 75 days — here's what nobody tells you about the mental breakdown on day 22.",
    hashtags: ["#75Hard", "#75HardChallenge", "#FitnessDiscipline", "#Transformation"],
    hot: true,
    isNew: false,
    platformColors: ["bg-pink-500/15 text-pink-300 border-pink-500/30", "bg-cyan-500/15 text-cyan-300 border-cyan-500/30"],
  },
  {
    id: 2,
    topic: "Quiet Luxury Aesthetic",
    category: "Fashion & Lifestyle",
    platforms: ["instagram", "tiktok"],
    velocity: 94,
    growthNum: 210,
    growth: "+210%",
    views: "890M",
    viewsNum: 890,
    age: "4 days ago",
    format: "GRWM / Micro-capsule wardrobe breakdown with neutral color grading",
    hook: "Quiet luxury is replacing loud logo branding — here are the 3 fabrics that give away genuine quality.",
    hashtags: ["#QuietLuxury", "#OldMoneyAesthetic", "#CapsuleWardrobe", "#StyleInspo"],
    hot: true,
    isNew: false,
    platformColors: ["bg-pink-500/15 text-pink-300 border-pink-500/30", "bg-cyan-500/15 text-cyan-300 border-cyan-500/30"],
  },
  {
    id: 3,
    topic: "AI Tools for Solo Creators",
    category: "Tech & Productivity",
    platforms: ["youtube", "linkedin", "tiktok"],
    velocity: 91,
    growthNum: 180,
    growth: "+180%",
    views: "1.1B",
    viewsNum: 1100,
    age: "1 week ago",
    format: "Tutorial & Screen demo listicle with second-by-second split screen",
    hook: "5 free AI tools that replaced an entire $8,000/month content production agency.",
    hashtags: ["#AITools", "#ContentCreator", "#CreatorEconomy", "#Productivity"],
    hot: true,
    isNew: false,
    platformColors: ["bg-rose-500/15 text-rose-300 border-rose-500/30", "bg-blue-500/15 text-blue-300 border-blue-500/30", "bg-cyan-500/15 text-cyan-300 border-cyan-500/30"],
  },
  {
    id: 4,
    topic: "Gut Health & Biome Biohacking",
    category: "Health & Wellness",
    platforms: ["instagram", "tiktok"],
    velocity: 87,
    growthNum: 155,
    growth: "+155%",
    views: "670M",
    viewsNum: 670,
    age: "5 days ago",
    format: "Educational carousel & talking-head mythbuster with grocery haul",
    hook: "Your bloating isn't random. Here is the exact morning drink that ruined my gut for 6 months.",
    hashtags: ["#GutHealth", "#Biohacking", "#HealthProtocol", "#Bloating"],
    hot: false,
    isNew: false,
    platformColors: ["bg-pink-500/15 text-pink-300 border-pink-500/30", "bg-cyan-500/15 text-cyan-300 border-cyan-500/30"],
  },
  {
    id: 5,
    topic: "Day in My Life — Unfiltered Realistic",
    category: "Lifestyle & Vlog",
    platforms: ["youtube", "instagram"],
    velocity: 83,
    growthNum: 120,
    growth: "+120%",
    views: "450M",
    viewsNum: 450,
    age: "3 days ago",
    format: "Raw handheld cinematic vlog with ambient lo-fi audio track",
    hook: "A realistic day in my life as an indie creator — zero aesthetic filters, just work.",
    hashtags: ["#RealisticDayInLife", "#CreatorVlog", "#Unfiltered", "#SoloEntrepreneur"],
    hot: false,
    isNew: false,
    platformColors: ["bg-rose-500/15 text-rose-300 border-rose-500/30", "bg-pink-500/15 text-pink-300 border-pink-500/30"],
  },
  {
    id: 6,
    topic: "Creator Revenue & Salary Transparency",
    category: "Finance & Monetization",
    platforms: ["linkedin", "tiktok"],
    velocity: 79,
    growthNum: 98,
    growth: "+98%",
    views: "320M",
    viewsNum: 320,
    age: "1 week ago",
    format: "Screenshare bank telemetry & revenue stream breakdown",
    hook: "I made ₹4.2 Lakhs last month across 4 content channels. Here is the unedited balance sheet.",
    hashtags: ["#CreatorIncome", "#SalaryTransparency", "#PersonalFinance", "#MediaBusiness"],
    hot: false,
    isNew: false,
    platformColors: ["bg-blue-500/15 text-blue-300 border-blue-500/30", "bg-cyan-500/15 text-cyan-300 border-cyan-500/30"],
  },
  {
    id: 7,
    topic: "Sourdough & Artisanal Home Baking",
    category: "Food & Craft",
    platforms: ["instagram", "youtube"],
    velocity: 74,
    growthNum: 87,
    growth: "+87%",
    views: "280M",
    viewsNum: 280,
    age: "2 weeks ago",
    format: "ASMR process reel with crust audio punch & crumb structure shot",
    hook: "I baked sourdough every single morning for 30 days. Here is the 1 mistake you're making with starter.",
    hashtags: ["#SourdoughASMR", "#ArtisanBread", "#BakingProcess", "#BreadLover"],
    hot: false,
    isNew: false,
    platformColors: ["bg-pink-500/15 text-pink-300 border-pink-500/30", "bg-rose-500/15 text-rose-300 border-rose-500/30"],
  },
];

// Potential incoming real-time breakout trends
const breakoutPool = [
  {
    id: 101,
    topic: "Zone-2 Cardio & Mitochondrial Age",
    category: "Longevity & Biohacking",
    platforms: ["instagram", "youtube"],
    velocity: 96,
    growthNum: 395,
    growth: "+395%",
    views: "1.4B",
    viewsNum: 1400,
    age: "Just Now",
    format: "Heart-rate zone breakdown with split timer graph",
    hook: "Zone-2 training is outperforming HIIT for fat loss — here is why sprinting is ruining your cortisol.",
    hashtags: ["#Zone2Cardio", "#Mitochondria", "#LongevityProtocol", "#Biohack"],
    hot: true,
    isNew: true,
    platformColors: ["bg-emerald-500/15 text-emerald-300 border-emerald-500/30", "bg-rose-500/15 text-rose-300 border-rose-500/30"],
  },
  {
    id: 102,
    topic: "Analog Camcorder & Digicam Aesthetics",
    category: "Retro & Visual Culture",
    platforms: ["tiktok", "instagram"],
    velocity: 93,
    growthNum: 280,
    growth: "+280%",
    views: "920M",
    viewsNum: 920,
    age: "Just Now",
    format: "Vintage CCD sensor side-by-side comparison with modern 4K phone",
    hook: "Creators are throwing away $4,000 Sony cameras for ₹3,000 old CCD digicams. Here is why the texture hits different.",
    hashtags: ["#DigicamAesthetic", "#CCDCamera", "#VintageVibe", "#RetroTech"],
    hot: true,
    isNew: true,
    platformColors: ["bg-cyan-500/15 text-cyan-300 border-cyan-500/30", "bg-pink-500/15 text-pink-300 border-pink-500/30"],
  },
  {
    id: 103,
    topic: "Minimalist Ergonomic Cable Cleanout",
    category: "Workspace Tech",
    platforms: ["youtube", "tiktok", "instagram"],
    velocity: 90,
    growthNum: 220,
    growth: "+220%",
    views: "740M",
    viewsNum: 740,
    age: "Just Now",
    format: "Under-desk cable routing time-lapse with satisfying magnetic snap cuts",
    hook: "This ₹600 magnetic channel made 14 cables completely disappear under my desk.",
    hashtags: ["#DeskSetup", "#CableManagement", "#WorkspaceGoals", "#MinimalDesk"],
    hot: true,
    isNew: true,
    platformColors: ["bg-rose-500/15 text-rose-300 border-rose-500/30", "bg-cyan-500/15 text-cyan-300 border-cyan-500/30"],
  },
];

const liveSignals = [
  "⚡ [IG REELS] '75 Hard' +8.4K shares/min in Mumbai & Delhi metros",
  "📈 [TIKTOK] 'Quiet Luxury' audio track attached to 18,200 new shorts today",
  "🔥 [YOUTUBE] 'AI Solo Tools' CTR surged +28% following API release",
  "🚀 [LINKEDIN] 'Salary Transparency' repost velocity up 3.2x across Tech founders",
  "✨ [IG EXPLORE] 'Biome Biohacking' algorithm favorability index boosted +44%",
];

export default function TrendPage() {
  const [trendsList, setTrendsList] = useState(initialTrends);
  const [platform, setPlatform] = useState("All");
  const [refreshing, setRefreshing] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(1);
  const [copiedHook, setCopiedHook] = useState<number | null>(null);

  // Real-time engine states
  const [isLive, setIsLive] = useState(true);
  const [secondsAgo, setSecondsAgo] = useState(3);
  const [countdown, setCountdown] = useState(6);
  const [recentUpdatedIds, setRecentUpdatedIds] = useState<number[]>([]);
  const [liveBannerText, setLiveBannerText] = useState(liveSignals[0]);
  const [sweepCount, setSweepCount] = useState(1);

  // Live seconds-ago counter
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsAgo((s) => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Real-time algorithmic update trigger
  const triggerLiveUpdate = useCallback(() => {
    setSecondsAgo(0);
    setSweepCount((c) => c + 1);

    // Rotate live signal ticker
    const nextSignal = liveSignals[Math.floor(Math.random() * liveSignals.length)];
    setLiveBannerText(nextSignal);

    setTrendsList((prevTrends) => {
      const existingIds = new Set(prevTrends.map((t) => t.id));
      const updatedIds: number[] = [];

      // Pick 2-3 random trends to slightly adjust velocity & growth
      const updated = prevTrends.map((trend) => {
        // 50% chance of small organic fluctuation
        if (Math.random() > 0.4) {
          updatedIds.push(trend.id);
          const delta = Math.floor(Math.random() * 6) + 1; // +1 to +6%
          const newGrowthNum = trend.growthNum + delta;
          const newVelocity = Math.min(99, trend.velocity + (Math.random() > 0.7 ? 1 : 0));
          return {
            ...trend,
            velocity: newVelocity,
            growthNum: newGrowthNum,
            growth: `+${newGrowthNum}%`,
            age: "Live Pulse",
          };
        }
        return trend;
      });

      // Safely inject unintroduced breakout trends if any remain
      const availableBreakouts = breakoutPool.filter((b) => !existingIds.has(b.id));
      let finalTrends = updated;

      if (availableBreakouts.length > 0 && Math.random() > 0.5) {
        const nextBreakout = availableBreakouts[0];
        updatedIds.push(nextBreakout.id);
        // Guarantee strict key deduplication
        finalTrends = [nextBreakout, ...updated.filter((t) => t.id !== nextBreakout.id)];
      }

      // Re-sort by velocity so rankings dynamically shuffle
      const sorted = [...finalTrends].sort(
        (a, b) => b.velocity - a.velocity || b.growthNum - a.growthNum
      );

      setRecentUpdatedIds(updatedIds);
      setTimeout(() => setRecentUpdatedIds([]), 2500);

      return sorted;
    });
  }, []);

  // Real-time automatic sweep cycle
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          triggerLiveUpdate();
          return 6;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isLive, triggerLiveUpdate]);

  // Manual rescan action
  const manualRescan = async () => {
    setRefreshing(true);
    await new Promise((r) => setTimeout(r, 600));
    triggerLiveUpdate();
    setRefreshing(false);
  };

  const copyHook = (hook: string, id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(hook);
    setCopiedHook(id);
    setTimeout(() => setCopiedHook(null), 2000);
  };

  const filtered = trendsList.filter(
    (t) => platform === "All" || t.platforms.some((p) => p === platform.toLowerCase())
  );

  // Dynamic KPI calculation
  const totalVolume = useMemo(() => {
    const sum = trendsList.reduce((acc, t) => acc + t.viewsNum, 0);
    return `${(sum / 1000).toFixed(1)} Billion`;
  }, [trendsList]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-7 font-sans">
      {/* Live Algorithmic Ticker Bar */}
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between gap-3 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-transparent border border-emerald-500/20 text-xs font-mono"
      >
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping flex-shrink-0" />
          <span className="text-emerald-300 font-bold uppercase tracking-wider text-[11px] flex-shrink-0">
            Realtime Radar Stream:
          </span>
          <span className="text-white/80 truncate font-sans">{liveBannerText}</span>
        </div>

        <div className="flex items-center gap-3 text-white/50 flex-shrink-0">
          <span className="text-[11px]">Sweep #{sweepCount}</span>
          <button
            onClick={() => setIsLive(!isLive)}
            className={cn(
              "px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase transition-all cursor-pointer border flex items-center gap-1",
              isLive
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                : "bg-white/10 text-white/40 border-white/10"
            )}
          >
            {isLive ? (
              <>
                <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                <span>Streaming</span>
              </>
            ) : (
              <>
                <Pause className="w-3 h-3" />
                <span>Paused</span>
              </>
            )}
          </button>
        </div>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-5"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600/30 via-teal-500/30 to-cyan-400/30 border border-white/10 flex items-center justify-center text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-white">Trend Radar</h1>
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Real-Time Wave Velocity
              </span>
            </div>
            <p className="text-xs text-white/50 mt-0.5">
              Live algorithmic breakout topics, viral sound formats, and dynamic cultural hooks auto-updated in real time.
            </p>
          </div>
        </div>

        {/* Real-time sync controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs font-mono text-white/50">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>
              Next sweep in: <strong className="text-white font-bold">{isLive ? `${countdown}s` : "Paused"}</strong>
            </span>
          </div>

          <button
            onClick={manualRescan}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white/80 hover:text-white text-xs font-mono transition-all border border-white/[0.08] cursor-pointer"
          >
            <RefreshCw className={cn("w-3.5 h-3.5", refreshing && "animate-spin text-cyan-300")} />
            <span>{refreshing ? "Scanning Algorithms..." : "Rescan Waves"}</span>
          </button>
        </div>
      </motion.div>

      {/* 4 KPI Summary Cards with dynamic auto-counters */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {[
          {
            label: "Active Trending Waves",
            value: `${trendsList.length} Vectors`,
            delta: "Across 4 Channels",
            color: "text-cyan-400",
          },
          {
            label: "Aggregate Wave Volume",
            value: totalVolume,
            delta: "Live View Footprint",
            color: "text-emerald-400",
          },
          {
            label: "Peak Velocity Sector",
            value: `${trendsList[0]?.category.split(" ")[0]} (+${trendsList[0]?.growthNum}%)`,
            delta: "High Conversion Window",
            color: "text-rose-400",
          },
          {
            label: "Optimal Video Format",
            value: "Sub-45s Reels",
            delta: "Explore Feed Favorability",
            color: "text-amber-400",
          },
        ].map((kpi) => (
          <div key={kpi.label} className="obsidian-card p-4 flex flex-col justify-between">
            <span className="text-xs font-mono uppercase text-white/40">{kpi.label}</span>
            <div className={cn("text-xl font-mono font-bold my-1 tracking-tight", kpi.color)}>
              {kpi.value}
            </div>
            <span className="text-[11px] font-sans text-white/50">{kpi.delta}</span>
          </div>
        ))}
      </div>

      {/* Platform Filter Strip */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#080910] p-2 rounded-2xl border border-white/[0.08]">
        <div className="flex items-center gap-1.5 flex-wrap">
          {platforms.map((p) => (
            <button
              key={p}
              onClick={() => setPlatform(p)}
              className={cn(
                "px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer border",
                platform === p
                  ? "bg-white text-black border-white shadow-md font-bold"
                  : "bg-transparent border-transparent text-white/50 hover:text-white hover:bg-white/[0.04]"
              )}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-white/40 px-2">
          <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>
            Telemetry synced {secondsAgo === 0 ? "just now" : `${secondsAgo}s ago`}
          </span>
        </div>
      </div>

      {/* Real-time Trend Wave List */}
      <div className="space-y-3">
        <AnimatePresence>
          {filtered.map((trend, i) => {
            const isExpanded = expanded === trend.id;
            const isRecentlyUpdated = recentUpdatedIds.includes(trend.id);

            return (
              <motion.div
                key={trend.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  borderColor: isRecentlyUpdated
                    ? "rgba(16, 185, 129, 0.6)"
                    : isExpanded
                    ? "rgba(99, 102, 241, 0.4)"
                    : "rgba(255, 255, 255, 0.08)",
                }}
                transition={{ duration: 0.35 }}
                className={cn(
                  "obsidian-card overflow-hidden border transition-all relative",
                  isExpanded && "shadow-[0_0_30px_rgba(99,102,241,0.12)]",
                  isRecentlyUpdated && "shadow-[0_0_20px_rgba(16,185,129,0.2)] bg-emerald-500/[0.02]"
                )}
              >
                {/* Main Card Strip Button */}
                <div
                  onClick={() => setExpanded(isExpanded ? null : trend.id)}
                  className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-start sm:items-center gap-4 min-w-0">
                    {/* Rank Index */}
                    <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center font-mono font-bold text-xs text-white/60 flex-shrink-0">
                      #{i + 1}
                    </div>

                    {/* Dynamic Velocity indicator bar */}
                    <div className="w-1.5 h-10 rounded-full bg-white/[0.08] flex-shrink-0 overflow-hidden flex flex-col justify-end">
                      <motion.div
                        animate={{ height: `${trend.velocity}%` }}
                        transition={{ duration: 0.8 }}
                        className={cn(
                          "w-full rounded-full transition-all",
                          trend.velocity >= 92 ? "bg-rose-400" : trend.velocity >= 80 ? "bg-emerald-400" : "bg-cyan-400"
                        )}
                      />
                    </div>

                    {/* Title & Metadata */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2.5 mb-1 flex-wrap">
                        <h3 className="text-sm sm:text-base font-bold text-white tracking-tight truncate">
                          {trend.topic}
                        </h3>

                        {trend.isNew && (
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 uppercase animate-pulse">
                            ★ Breaking Just Now
                          </span>
                        )}

                        {trend.hot && !trend.isNew && (
                          <span className="flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30 uppercase">
                            <Flame className="w-3 h-3 fill-rose-400" /> Viral Breakout
                          </span>
                        )}

                        <span className="text-xs font-mono text-white/40">
                          {trend.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        {trend.platforms.map((p) => (
                          <span
                            key={p}
                            className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-white/70"
                          >
                            {p}
                          </span>
                        ))}
                        <span className="text-xs text-white/30">•</span>
                        <span className="text-xs font-mono text-white/40 flex items-center gap-1">
                          {trend.age === "Live Pulse" && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                          {trend.age}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Metrics & Expand Trigger */}
                  <div className="flex items-center justify-between md:justify-end gap-6 pt-3 md:pt-0 border-t md:border-t-0 border-white/[0.06] font-mono">
                    <div className="text-left md:text-right">
                      <div className="text-sm font-bold text-white tracking-tight">{trend.views}</div>
                      <div className="text-[10px] text-white/40 uppercase">Wave Reach</div>
                    </div>

                    <div className="text-left md:text-right">
                      <div className="text-sm font-bold text-emerald-400 flex items-center md:justify-end gap-0.5">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                        <span>{trend.growth}</span>
                        {isRecentlyUpdated && (
                          <motion.span
                            initial={{ opacity: 0, y: 3 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="text-[10px] text-emerald-300 font-bold ml-1"
                          >
                            ↑
                          </motion.span>
                        )}
                      </div>
                      <div className="text-[10px] text-emerald-400/60 uppercase">Live Velocity</div>
                    </div>

                    <div className="w-8 h-8 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-white/40 group-hover:text-white transition-colors">
                      <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", isExpanded && "rotate-180 text-cyan-300")} />
                    </div>
                  </div>
                </div>

                {/* Expanded Diagnostic Intelligence Drawer */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-white/[0.08] p-5 space-y-4 bg-[#06070d]/95"
                    >
                      <div className="grid md:grid-cols-2 gap-4">
                        {/* Format Spec */}
                        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
                          <div className="text-xs font-mono uppercase text-cyan-300 font-semibold flex items-center gap-1.5">
                            <Play className="w-3 h-3 fill-cyan-300" /> Platform-Native Format
                          </div>
                          <p className="text-xs text-white/90 font-sans leading-relaxed">{trend.format}</p>
                        </div>

                        {/* Hook Blueprint with Instant Copy */}
                        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5 relative group/hook">
                          <div className="flex items-center justify-between">
                            <div className="text-xs font-mono uppercase text-pink-300 font-semibold flex items-center gap-1.5">
                              <Zap className="w-3 h-3 fill-pink-300" /> Production Attention Hook
                            </div>
                            <button
                              onClick={(e) => copyHook(trend.hook, trend.id, e)}
                              className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                            >
                              {copiedHook === trend.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                              <span>{copiedHook === trend.id ? "Copied!" : "Copy Hook"}</span>
                            </button>
                          </div>
                          <p className="text-xs text-white/95 italic font-sans leading-relaxed">
                            &ldquo;{trend.hook}&rdquo;
                          </p>
                        </div>
                      </div>

                      {/* Algorithmic Hashtag Cloud & Studio Launch Button */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[11px] font-mono text-white/40 flex items-center gap-1">
                            <Hash className="w-3 h-3" /> Tags:
                          </span>
                          {trend.hashtags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs font-mono px-2.5 py-1 rounded-lg bg-white/[0.04] text-white/80 border border-white/[0.08]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <Link
                          href="/dashboard/brain"
                          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(99,102,241,0.35)] flex-shrink-0"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Forge in BrainForge AI</span>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
