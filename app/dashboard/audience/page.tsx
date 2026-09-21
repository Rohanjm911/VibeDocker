"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Clock,
  ArrowUpRight,
  MapPin,
  Sparkles,
  RefreshCw,
  Target,
  Compass,
  Zap,
  TrendingUp,
  Globe,
  Flame,
  Layers,
  ChevronRight,
  Award,
} from "lucide-react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";
import { cn } from "@/lib/utils";
import Link from "next/link";
import AnimeCounter from "@/components/shared/AnimeCounter";
import AnimePulseBar from "@/components/shared/AnimePulseBar";

// Platform filter options
const platforms = ["All Channels", "Instagram", "YouTube", "TikTok", "LinkedIn"];
const timeframes = ["7 Days", "30 Days", "90 Days"];
const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Hourly activity matrix by day
const dailyActivityData: Record<string, { hour: string; score: number; label: string }[]> = {
  Mon: [
    { hour: "06:00", score: 28, label: "Morning Commute" },
    { hour: "09:00", score: 52, label: "Workday Check-in" },
    { hour: "12:00", score: 68, label: "Lunch Breakout" },
    { hour: "15:00", score: 58, label: "Afternoon Slump" },
    { hour: "18:00", score: 92, label: "Prime Evening Crest" },
    { hour: "21:00", score: 84, label: "Bedtime Scroll" },
    { hour: "00:00", score: 36, label: "Late Night" },
  ],
  Tue: [
    { hour: "06:00", score: 32, label: "Morning Commute" },
    { hour: "09:00", score: 58, label: "Workday Check-in" },
    { hour: "12:00", score: 74, label: "Lunch Breakout" },
    { hour: "15:00", score: 64, label: "Afternoon Slump" },
    { hour: "18:00", score: 98, label: "Golden Window" },
    { hour: "21:00", score: 90, label: "Peak Retention" },
    { hour: "00:00", score: 42, label: "Late Night" },
  ],
  Wed: [
    { hour: "06:00", score: 30, label: "Morning Commute" },
    { hour: "09:00", score: 60, label: "Workday Check-in" },
    { hour: "12:00", score: 76, label: "Lunch Breakout" },
    { hour: "15:00", score: 62, label: "Afternoon Slump" },
    { hour: "18:00", score: 96, label: "Golden Window" },
    { hour: "21:00", score: 88, label: "Peak Retention" },
    { hour: "00:00", score: 40, label: "Late Night" },
  ],
  Thu: [
    { hour: "06:00", score: 34, label: "Morning Commute" },
    { hour: "09:00", score: 62, label: "Workday Check-in" },
    { hour: "12:00", score: 78, label: "Lunch Breakout" },
    { hour: "15:00", score: 65, label: "Afternoon Slump" },
    { hour: "18:00", score: 95, label: "Prime Window" },
    { hour: "21:00", score: 92, label: "Peak Retention" },
    { hour: "00:00", score: 45, label: "Late Night" },
  ],
  Fri: [
    { hour: "06:00", score: 26, label: "Morning Commute" },
    { hour: "09:00", score: 50, label: "Workday Check-in" },
    { hour: "12:00", score: 70, label: "Lunch Breakout" },
    { hour: "15:00", score: 72, label: "Pre-Weekend Buzz" },
    { hour: "18:00", score: 88, label: "Evening Leisure" },
    { hour: "21:00", score: 80, label: "Social Outing" },
    { hour: "00:00", score: 55, label: "Weekend Nightowl" },
  ],
  Sat: [
    { hour: "06:00", score: 18, label: "Sleeping In" },
    { hour: "09:00", score: 44, label: "Morning Coffee" },
    { hour: "12:00", score: 82, label: "Midday Binge" },
    { hour: "15:00", score: 79, label: "Casual Scroll" },
    { hour: "18:00", score: 75, label: "Evening Transition" },
    { hour: "21:00", score: 82, label: "Night Recreation" },
    { hour: "00:00", score: 62, label: "Weekend Nightowl" },
  ],
  Sun: [
    { hour: "06:00", score: 16, label: "Sleeping In" },
    { hour: "09:00", score: 48, label: "Lazy Morning" },
    { hour: "12:00", score: 80, label: "Sunday Scroll" },
    { hour: "15:00", score: 84, label: "Content Binge" },
    { hour: "18:00", score: 94, label: "Pre-Monday Catchup" },
    { hour: "21:00", score: 91, label: "Sunday Reset" },
    { hour: "00:00", score: 38, label: "Sleep Prep" },
  ],
};

const interestData = [
  { subject: "Fitness & Form", score: 88, baseline: 50 },
  { subject: "Quiet Luxury", score: 82, baseline: 45 },
  { subject: "Solo Tech & AI", score: 76, baseline: 52 },
  { subject: "Creator Income", score: 69, baseline: 40 },
  { subject: "Artisanal Craft", score: 58, baseline: 38 },
  { subject: "Cinematic Vlog", score: 64, baseline: 48 },
];

const ageData = [
  { group: "13–17", pct: 6, count: "2.9K", color: "from-blue-500 to-indigo-600" },
  { group: "18–24", pct: 36, count: "17.4K", color: "from-indigo-500 to-violet-500", highlight: true },
  { group: "25–34", pct: 32, count: "15.4K", color: "from-violet-500 to-pink-500", highlight: true },
  { group: "35–44", pct: 15, count: "7.2K", color: "from-pink-500 to-rose-500" },
  { group: "45–54", pct: 8, count: "3.8K", color: "from-rose-500 to-amber-500" },
  { group: "55+", pct: 3, count: "1.5K", color: "from-amber-500 to-emerald-500" },
];

const topLocations = [
  { city: "Mumbai Met Area", pct: 22, growth: "+18%", share: "High Buying Power" },
  { city: "Delhi NCR", pct: 18, growth: "+14%", share: "Broad Cultural Velocity" },
  { city: "Bengaluru Tech Hub", pct: 16, growth: "+26%", share: "High SaaS / B2B Intent" },
  { city: "Hyderabad & Telangana", pct: 11, growth: "+12%", share: "Rapid Engagement" },
  { city: "Tier-2 Metro Belts", pct: 19, growth: "+9%", share: "Mass Consumer Volume" },
  { city: "International (US/UK/UAE)", pct: 14, growth: "+31%", share: "High Premium CPM" },
];

// Audience Personas
const personas = [
  {
    id: "biohacker",
    title: "The Biohacker Optimizer",
    share: "42% of Cohort",
    badge: "Dominant Archetype",
    badgeColor: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    demographics: "Ages 21–32 • 62% Male / 38% Female",
    mindset: "Obsessed with high-leverage protocols, physical stamina, quantified health, and morning efficiency.",
    trigger: "Contrarian frameworks, unvarnished before/after data, and 'I tested X for 30 days' experiments.",
    preferredFormat: "45s Fast-cut breakdown with text overlays & split screens.",
    monetizationScore: 94,
  },
  {
    id: "minimalist",
    title: "The Aesthetic Minimalist",
    share: "34% of Cohort",
    badge: "High Engagement",
    badgeColor: "bg-pink-500/15 text-pink-300 border-pink-500/30",
    demographics: "Ages 19–29 • 54% Female / 46% Male",
    mindset: "Driven by clean curation, intentional habits, silent luxury aesthetic, and timeless design over hype.",
    trigger: "Cinematic 4K grading, ambient lo-fi audio tracks, seamless match-cuts, and calming spoken cadence.",
    preferredFormat: "30s GRWM / routine reel with textured ASMR audio.",
    monetizationScore: 82,
  },
  {
    id: "builder",
    title: "The Solo Indie Builder",
    share: "24% of Cohort",
    badge: "High Purchase Intent",
    badgeColor: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
    demographics: "Ages 24–38 • 70% Male / 30% Female",
    mindset: "Building independent distribution, automating creator business stacks, and seeking financial sovereignty.",
    trigger: "Exact revenue disclosures, raw Notion workflow tours, and tech stack cost breakdowns.",
    preferredFormat: "Carousel teardowns & deep-dive screen recordings.",
    monetizationScore: 89,
  },
];

const CustomBarTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    const data = payload[0].payload;
    return (
      <div className="obsidian-card p-3 border border-white/20 text-xs font-mono shadow-2xl backdrop-blur-xl">
        <div className="flex items-center justify-between gap-3 mb-1">
          <span className="text-white/60">{data.hour} IST</span>
          <span className="text-emerald-400 font-bold">{data.score}% Activity Index</span>
        </div>
        <div className="text-white/90 text-[11px] font-sans">{data.label}</div>
        <div className="mt-1.5 pt-1.5 border-t border-white/[0.08] text-[10px] text-cyan-300">
          Optimal format: {data.score >= 90 ? "High-Impact Hook Reel" : "Carousel / Story Poll"}
        </div>
      </div>
    );
  }
  return null;
};

export default function AudiencePage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const [selectedPlatform, setSelectedPlatform] = useState("All Channels");
  const [selectedTimeframe, setSelectedTimeframe] = useState("30 Days");
  const [activeDay, setActiveDay] = useState("Tue");
  const [refreshing, setRefreshing] = useState(false);
  const [activePersona, setActivePersona] = useState("biohacker");

  const refreshTelemetry = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setRefreshing(false);
  };

  const currentDayData = dailyActivityData[activeDay] || dailyActivityData["Tue"];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 font-sans">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-5"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600/30 via-teal-500/30 to-indigo-500/30 border border-white/10 flex items-center justify-center text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.25)]">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-white">Audience Telemetry</h1>
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                99.6% Live Cohort Health
              </span>
            </div>
            <p className="text-xs text-white/50 mt-0.5">
              Psychological personas, temporal engagement crests, demographic cohorts, and conversion catalysts.
            </p>
          </div>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="flex items-center bg-[#080910] p-1 rounded-xl border border-white/[0.08]">
            {timeframes.map((tf) => (
              <button
                key={tf}
                onClick={() => setSelectedTimeframe(tf)}
                className={cn(
                  "px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer",
                  selectedTimeframe === tf
                    ? "bg-white/10 text-white font-semibold shadow-sm"
                    : "text-white/40 hover:text-white/80"
                )}
              >
                {tf}
              </button>
            ))}
          </div>

          <button
            onClick={refreshTelemetry}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white/80 hover:text-white text-xs font-mono transition-all border border-white/[0.08] cursor-pointer"
          >
            <RefreshCw className={cn("w-3.5 h-3.5", refreshing && "animate-spin text-cyan-300")} />
            <span>{refreshing ? "Re-syncing..." : "Sync Signals"}</span>
          </button>
        </div>
      </motion.div>

      {/* Platform Filter Strip */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#080910] p-2 rounded-2xl border border-white/[0.08]">
        <div className="flex items-center gap-1.5 flex-wrap">
          {platforms.map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPlatform(p)}
              className={cn(
                "px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer border",
                selectedPlatform === p
                  ? "bg-white text-black border-white shadow-md font-bold"
                  : "bg-transparent border-transparent text-white/50 hover:text-white hover:bg-white/[0.04]"
              )}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-white/40 px-2">
          <Globe className="w-3.5 h-3.5 text-cyan-400" />
          <span>Unified cross-channel cohort tracking</span>
        </div>
      </div>

      {/* 4 KPI Summary Cards with AnimeCounter */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Aggregate Cohort",
            value: 48.2,
            prefix: "",
            suffix: "K",
            decimals: 1,
            delta: "+18.4% monthly velocity",
            icon: Users,
            color: "text-cyan-400",
            bg: "from-cyan-500/15 via-cyan-500/5 to-transparent",
            border: "border-cyan-500/30",
          },
          {
            label: "Interaction Index",
            value: 7.4,
            prefix: "",
            suffix: "%",
            decimals: 1,
            delta: "Top 5% creator tier (+1.2% pacing)",
            icon: Sparkles,
            color: "text-emerald-400",
            bg: "from-emerald-500/15 via-emerald-500/5 to-transparent",
            border: "border-emerald-500/30",
          },
          {
            label: "Prime Scroll Window",
            valueText: "18:00–21:00",
            delta: "Next Golden Window: Today 6:45 PM",
            icon: Clock,
            color: "text-rose-400",
            bg: "from-rose-500/15 via-rose-500/5 to-transparent",
            border: "border-rose-500/30",
          },
          {
            label: "Dominant Archetype",
            valueText: "18–34 Cohort",
            delta: "65.4% share • High purchasing power",
            icon: Target,
            color: "text-violet-400",
            bg: "from-violet-500/15 via-violet-500/5 to-transparent",
            border: "border-violet-500/30",
          },
        ].map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
              className={cn(
                "obsidian-card p-4.5 rounded-2xl relative overflow-hidden border transition-all hover:scale-[1.01]",
                kpi.border
              )}
            >
              <div className={cn("absolute inset-0 bg-gradient-to-br pointer-events-none opacity-40", kpi.bg)} />
              <div className="relative z-10 flex flex-col justify-between h-full space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-white/50">{kpi.label}</span>
                  <div className={cn("w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center", kpi.color)}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div>
                  <div className={cn("text-2xl sm:text-3xl font-mono font-bold tracking-tight", kpi.color)}>
                    {kpi.valueText ? (
                      kpi.valueText
                    ) : (
                      <AnimeCounter
                        value={kpi.value!}
                        decimals={kpi.decimals}
                        prefix={kpi.prefix}
                        suffix={kpi.suffix}
                      />
                    )}
                  </div>
                  <div className="text-[11px] font-sans text-white/50 mt-1 flex items-center gap-1">
                    <span>{kpi.delta}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Temporal Activity Window & Semantic Interest Radar */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Temporal Activity Window (7 Columns) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-7 obsidian-card p-6 space-y-5 rounded-2xl border border-white/[0.08]"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase text-white font-bold tracking-wide">
                  Temporal Activity Window
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Peak: 18:00 – 21:00 IST
                </span>
              </div>
              <p className="text-[11px] text-white/40 mt-0.5">
                Hourly algorithmic scroll density & audience receptive capacity
              </p>
            </div>

            {/* Day of Week Switcher */}
            <div className="flex items-center gap-1 bg-[#06070d] p-1 rounded-xl border border-white/[0.06] overflow-x-auto">
              {daysOfWeek.map((day) => (
                <button
                  key={day}
                  onClick={() => setActiveDay(day)}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all cursor-pointer",
                    activeDay === day
                      ? "bg-emerald-500 text-black font-bold shadow-md"
                      : "text-white/40 hover:text-white/80"
                  )}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Bar Chart Container */}
          <div className="h-56 w-full min-w-0">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <BarChart data={currentDayData} margin={{ top: 15, right: 10, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="peakEmeraldGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#34d399" stopOpacity={1} />
                      <stop offset="100%" stopColor="#059669" stopOpacity={0.7} />
                    </linearGradient>
                    <linearGradient id="highCyanGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.9} />
                      <stop offset="100%" stopColor="#0284c7" stopOpacity={0.5} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="hour"
                    tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10, fontFamily: "monospace" }}
                    axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 9, fontFamily: "monospace" }}
                    axisLine={false}
                    tickLine={false}
                    domain={[0, 100]}
                  />
                  <Tooltip content={<CustomBarTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                  <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                    {currentDayData.map((entry, index) => {
                      const isPeak = entry.score >= 90;
                      const isHigh = entry.score >= 70;
                      return (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            isPeak
                              ? "url(#peakEmeraldGradient)"
                              : isHigh
                              ? "url(#highCyanGradient)"
                              : "rgba(255, 255, 255, 0.12)"
                          }
                        />
                      );
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full w-full bg-white/[0.02] rounded-lg animate-pulse" />
            )}
          </div>

          {/* Temporal Summary Strip */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs font-mono">
            <div className="flex items-center gap-2 text-white/70">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>
                {activeDay} Peak Crest: <strong>18:00 IST</strong> (+48% higher retention probability)
              </span>
            </div>
            <span className="text-white/40 text-[11px]">Recommended Video Duration: 38–45s</span>
          </div>
        </motion.div>

        {/* Semantic Interest Radar (5 Columns) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="lg:col-span-5 obsidian-card p-6 space-y-5 rounded-2xl border border-white/[0.08] flex flex-col justify-between"
        >
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
            <div>
              <span className="text-xs font-mono uppercase text-white font-bold tracking-wide">
                Semantic Interest Radar
              </span>
              <p className="text-[11px] text-white/40 mt-0.5">Top psychological content affinities</p>
            </div>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-full">
              6 Core Vectors
            </span>
          </div>

          {/* Radar Chart */}
          <div className="h-56 w-full min-w-0 flex items-center justify-center">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <RadarChart data={interestData} margin={{ top: 10, right: 25, left: 25, bottom: 10 }}>
                  <PolarGrid stroke="rgba(255,255,255,0.08)" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 10, fontFamily: "monospace" }}
                  />
                  <Radar
                    name="Cohort Affinity"
                    dataKey="score"
                    stroke="#818cf8"
                    strokeWidth={2}
                    fill="#818cf8"
                    fillOpacity={0.25}
                  />
                  <Radar
                    name="Creator Baseline"
                    dataKey="baseline"
                    stroke="rgba(255,255,255,0.25)"
                    strokeDasharray="3 3"
                    fill="transparent"
                  />
                </RadarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full w-full bg-white/[0.02] rounded-lg animate-pulse" />
            )}
          </div>

          {/* Affinity Pills Cloud */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/[0.06]">
            {interestData.slice(0, 4).map((item) => (
              <div
                key={item.subject}
                className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs font-mono"
              >
                <span className="text-white/70 truncate">{item.subject}</span>
                <span className="text-cyan-400 font-bold ml-1">{item.score}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Audience Psychological Personas Dossiers */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="obsidian-card p-6 rounded-2xl border border-white/[0.08] space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-white">
                Psychological Cohort Archetypes
              </h2>
              <p className="text-xs text-white/50">
                Segmented behavioural personas driving 90% of your watch-time and commercial revenue
              </p>
            </div>
          </div>

          {/* Persona Switcher Tabs */}
          <div className="flex items-center gap-1.5 bg-[#06070d] p-1 rounded-xl border border-white/[0.06]">
            {personas.map((p) => (
              <button
                key={p.id}
                onClick={() => setActivePersona(p.id)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer",
                  activePersona === p.id
                    ? "bg-white text-black font-bold shadow-md"
                    : "text-white/40 hover:text-white/80"
                )}
              >
                {p.title.split(" ")[1]} ({p.share.split("%")[0]}%)
              </button>
            ))}
          </div>
        </div>

        {/* Active Persona Details */}
        <AnimatePresence mode="wait">
          {personas
            .filter((p) => p.id === activePersona)
            .map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="grid md:grid-cols-3 gap-5"
              >
                {/* Persona Profile Card */}
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className={cn("text-[10px] font-mono px-2 py-0.5 rounded-full border uppercase font-bold", p.badgeColor)}>
                        {p.badge}
                      </span>
                      <span className="text-xs font-mono text-white/50">{p.share}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white tracking-tight">{p.title}</h3>
                    <div className="text-xs font-mono text-white/40 mt-1">{p.demographics}</div>
                  </div>

                  <div className="pt-3 border-t border-white/[0.06] space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-white/50">Commercial Receptivity</span>
                      <span className="text-emerald-400 font-bold">{p.monetizationScore}/100</span>
                    </div>
                    <AnimePulseBar score={p.monetizationScore} barClassName="bg-emerald-400" />
                  </div>
                </div>

                {/* Behavioral Drivers */}
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3">
                  <div className="text-xs font-mono uppercase text-cyan-300 font-semibold flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-cyan-400" /> Psychological Mindset
                  </div>
                  <p className="text-xs text-white/80 font-sans leading-relaxed">{p.mindset}</p>

                  <div className="pt-2 border-t border-white/[0.06]">
                    <div className="text-[11px] font-mono uppercase text-pink-300 font-semibold flex items-center gap-1.5 mb-1">
                      <Flame className="w-3 h-3 text-pink-400" /> Attention Trigger
                    </div>
                    <p className="text-xs text-white/70 italic font-sans leading-relaxed">&ldquo;{p.trigger}&rdquo;</p>
                  </div>
                </div>

                {/* Production Alignment & Action */}
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="text-xs font-mono uppercase text-amber-300 font-semibold flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-amber-400" /> Optimal Delivery Format
                    </div>
                    <p className="text-xs text-white/80 font-sans leading-relaxed">{p.preferredFormat}</p>
                  </div>

                  <Link
                    href="/dashboard/brain"
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(99,102,241,0.25)]"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Generate Tailored Hook</span>
                  </Link>
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
      </motion.div>

      {/* Demographics Split (Age & Geographic Clusters) */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Age Demographics & Gender Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="obsidian-card p-6 space-y-5 rounded-2xl border border-white/[0.08]"
        >
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
            <div>
              <span className="text-xs font-mono uppercase text-white font-bold tracking-wide">
                Age Bracket Telemetry
              </span>
              <p className="text-[11px] text-white/40 mt-0.5">High concentration in 18–34 age corridor</p>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              65% Peak Cluster
            </span>
          </div>

          {/* Age Bars */}
          <div className="space-y-3">
            {ageData.map((a) => (
              <div key={a.group} className="space-y-1">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className={cn("text-white/60", a.highlight && "text-white font-bold")}>
                    {a.group} {a.highlight && <span className="text-cyan-400 text-[10px] ml-1">★ Dominant</span>}
                  </span>
                  <span className="text-white/80 font-medium">
                    {a.pct}% <span className="text-white/30 text-[10px]">({a.count})</span>
                  </span>
                </div>
                <div className="h-2 rounded-full bg-white/[0.04] overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-700 bg-gradient-to-r",
                      a.color
                    )}
                    style={{ width: `${a.pct * 2.5}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Gender Split Strip */}
          <div className="pt-3 border-t border-white/[0.06] space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-white/50">Gender Identity Distribution</span>
              <span className="text-white/80">58% Male • 39% Female • 3% Non-Binary</span>
            </div>
            <div className="h-2 rounded-full bg-white/[0.04] overflow-hidden flex">
              <div className="h-full bg-cyan-400" style={{ width: "58%" }} />
              <div className="h-full bg-pink-400" style={{ width: "39%" }} />
              <div className="h-full bg-amber-400" style={{ width: "3%" }} />
            </div>
          </div>
        </motion.div>

        {/* Geographic Clusters & Timezones */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="obsidian-card p-6 space-y-5 rounded-2xl border border-white/[0.08]"
        >
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
            <div>
              <span className="text-xs font-mono uppercase text-white font-bold tracking-wide">
                Geographic Metro Clusters
              </span>
              <p className="text-[11px] text-white/40 mt-0.5">Metropolitan audience clusters & purchasing capacity</p>
            </div>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-full">
              Global Dispersion
            </span>
          </div>

          {/* Metro List */}
          <div className="space-y-3">
            {topLocations.map((loc) => (
              <div key={loc.city} className="space-y-1">
                <div className="flex items-center justify-between font-mono text-xs">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-white/30" />
                    <span className="text-white/80">{loc.city}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 text-[10px]">{loc.growth}</span>
                    <span className="text-white font-bold">{loc.pct}%</span>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-white/[0.04] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400"
                    style={{ width: `${loc.pct * 3.5}%` }}
                  />
                </div>
                <div className="text-[10px] font-mono text-white/40">{loc.share}</div>
              </div>
            ))}
          </div>

          {/* Timezone Strip */}
          <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
            <span className="text-white/50 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-cyan-400" /> Dominant Timezone:
            </span>
            <span className="text-white/90">
              IST (UTC+5:30) 78% • EST (UTC-5) 14% • GMT 8%
            </span>
          </div>
        </motion.div>
      </div>

      {/* AI Synthesis Strategic Directives */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="obsidian-card p-5 rounded-2xl border-l-4 border-l-cyan-400 border border-white/[0.08] space-y-3 bg-[#080912]"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-mono uppercase tracking-wider text-white font-bold">
              AI Algorithmic Directive for Next Release
            </h3>
          </div>
          <span className="text-[10px] font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-full">
            High Confidence (+92%)
          </span>
        </div>

        <p className="text-xs text-white/80 leading-relaxed font-mono">
          Your 18–34 dominant cohort is currently hitting peak velocity on <strong>Tuesday & Thursday evenings between 18:30 and 21:15 IST</strong>. 
          The highest-leverage conversion archetype is <strong>The Biohacker Optimizer (42%)</strong>. Produce a sub-45 second video with a contrarian hook and 30-day proof metric to capture +38% higher initial retention.
        </p>

        <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
          <span className="text-[11px] font-mono text-white/40">
            Automated cohort analysis updated 2 minutes ago
          </span>
          <Link
            href="/dashboard/brain"
            className="text-xs font-mono font-bold text-cyan-300 hover:text-cyan-200 flex items-center gap-1"
          >
            <span>Launch BrainForge Script Studio</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
