"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  Eye,
  Heart,
  MessageCircle,
  Clock,
  ArrowUpRight,
  Sparkles,
  Zap,
  Filter,
  CheckCircle2,
  AlertTriangle,
  PlayCircle,
  Layers,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";
import { cn } from "@/lib/utils";

const rangeData: Record<string, { views: { day: string; views: number; benchmark: number }[]; dropoff: { second: string; hold: number; drop: number }[] }> = {
  "7 Days": {
    views: [
      { day: "Mon", views: 4200, benchmark: 3100 },
      { day: "Tue", views: 6800, benchmark: 3900 },
      { day: "Wed", views: 5400, benchmark: 4200 },
      { day: "Thu", views: 9200, benchmark: 4800 },
      { day: "Fri", views: 7600, benchmark: 4600 },
      { day: "Sat", views: 8900, benchmark: 5100 },
      { day: "Sun", views: 10400, benchmark: 5400 },
    ],
    dropoff: [
      { second: "0s", hold: 100, drop: 0 },
      { second: "3s", hold: 88, drop: 12 },
      { second: "10s", hold: 81, drop: 7 },
      { second: "20s", hold: 74, drop: 7 },
      { second: "30s", hold: 69, drop: 5 },
      { second: "45s", hold: 64, drop: 5 },
      { second: "60s", hold: 60, drop: 4 },
    ],
  },
  "30 Days": {
    views: [
      { day: "Day 1", views: 3200, benchmark: 2800 },
      { day: "Day 4", views: 4800, benchmark: 3200 },
      { day: "Day 8", views: 3900, benchmark: 3400 },
      { day: "Day 12", views: 6200, benchmark: 3800 },
      { day: "Day 16", views: 5100, benchmark: 4000 },
      { day: "Day 20", views: 8400, benchmark: 4400 },
      { day: "Day 24", views: 7200, benchmark: 4600 },
      { day: "Day 28", views: 10800, benchmark: 5000 },
    ],
    dropoff: [
      { second: "0s", hold: 100, drop: 0 },
      { second: "3s", hold: 84, drop: 16 },
      { second: "10s", hold: 76, drop: 8 },
      { second: "20s", hold: 68, drop: 8 },
      { second: "30s", hold: 62, drop: 6 },
      { second: "45s", hold: 58, drop: 4 },
      { second: "60s", hold: 54, drop: 4 },
    ],
  },
  "90 Days": {
    views: [
      { day: "Week 1", views: 18000, benchmark: 14000 },
      { day: "Week 3", views: 24500, benchmark: 16000 },
      { day: "Week 6", views: 38000, benchmark: 20000 },
      { day: "Week 9", views: 46200, benchmark: 24000 },
      { day: "Week 12", views: 59400, benchmark: 28000 },
    ],
    dropoff: [
      { second: "0s", hold: 100, drop: 0 },
      { second: "3s", hold: 81, drop: 19 },
      { second: "10s", hold: 72, drop: 9 },
      { second: "20s", hold: 65, drop: 7 },
      { second: "30s", hold: 59, drop: 6 },
      { second: "45s", hold: 54, drop: 5 },
      { second: "60s", hold: 49, drop: 5 },
    ],
  },
};

const telemetryKPIs = [
  { label: "Total Cross-Platform Impressions", value: "324.8K", delta: "+38.4% vs prev", color: "text-cyan-400", bg: "from-cyan-500/20 to-blue-600/5", border: "border-cyan-500/20" },
  { label: "3-Second Hook Retention", value: "84.2%", delta: "+6.8% algorithm edge", color: "text-emerald-400", bg: "from-emerald-500/20 to-teal-600/5", border: "border-emerald-500/20" },
  { label: "Avg Watch Completion Rate", value: "54.0%", delta: "Top 3% creator bracket", color: "text-pink-400", bg: "from-pink-500/20 to-purple-600/5", border: "border-pink-500/30" },
  { label: "Save & Share Multiplier", value: "4.8x", delta: "High organic pass-along", color: "text-amber-400", bg: "from-amber-500/20 to-orange-600/5", border: "border-amber-500/20" },
];

const dropBenchmarks = [
  {
    phase: "Hook Zone (0–3s)",
    metric: "84% Hold",
    status: "Optimal",
    statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    note: "Pattern interrupt effectively prevents thumb scroll-away in first 180 frames.",
  },
  {
    phase: "Core Value Body (3–30s)",
    metric: "62% Hold",
    status: "Steady",
    statusColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    note: "Pacing cadence holds audience attention with visual cuts every 2.4 seconds.",
  },
  {
    phase: "Climax & CTA (30–60s)",
    metric: "54% Finish",
    status: "Viral Edge",
    statusColor: "text-pink-400 bg-pink-500/10 border-pink-500/20",
    note: "Above median 60s completion benchmark (niche average is 31%).",
  },
];

export default function AnalyticsPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const [range, setRange] = useState<"7 Days" | "30 Days" | "90 Days">("30 Days");
  const [activeTab, setActiveTab] = useState<"trajectory" | "retention">("trajectory");

  const currentData = rangeData[range];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-7">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500/30 via-teal-500/30 to-indigo-500/30 border border-white/10 flex items-center justify-center text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.25)]">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-white tracking-tight">Lens Telemetry</h1>
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                Audience Optics
              </span>
            </div>
            <p className="text-xs text-white/50 mt-0.5">
              High-precision second-by-second hold curves, retention friction points, and multi-cycle growth.
            </p>
          </div>
        </div>

        {/* Range Selector */}
        <div className="flex items-center gap-1.5 bg-[#090b12] border border-white/[0.08] p-1.5 rounded-xl">
          {(["7 Days", "30 Days", "90 Days"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={cn(
                "px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer",
                range === r
                  ? "bg-white/[0.14] text-white shadow-sm font-semibold"
                  : "text-white/40 hover:text-white/80"
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Precision Telemetry KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {telemetryKPIs.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className={cn("obsidian-card p-4 flex flex-col justify-between relative overflow-hidden group border", kpi.border)}
          >
            <div className={cn("absolute inset-0 bg-gradient-to-br pointer-events-none opacity-40 group-hover:opacity-70 transition-opacity", kpi.bg)} />
            <div className="relative z-10 space-y-1">
              <span className="text-xs font-mono uppercase text-white/50 font-medium block truncate">
                {kpi.label}
              </span>
              <div className={cn("text-2xl font-mono font-bold tracking-tight", kpi.color)}>
                {kpi.value}
              </div>
            </div>
            <div className="relative z-10 pt-2 mt-2 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-[11px] font-mono text-white/60">{kpi.delta}</span>
              <ArrowUpRight className={cn("w-3.5 h-3.5", kpi.color)} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Dual Diagnostic Charts */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Left Column: Views Velocity Area Chart (7 cols) */}
        <div className="lg:col-span-7 obsidian-card p-6 space-y-5 border-cyan-500/20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/[0.08]">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 dot-cyan" />
                <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-white">
                  Cross-Platform Views Velocity
                </h3>
              </div>
              <p className="text-xs text-white/40 mt-0.5 font-sans">
                Active trajectory compared against baseline channel benchmark
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <div className="flex items-center gap-1.5 text-cyan-300">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>Actual</span>
              </div>
              <div className="flex items-center gap-1.5 text-white/40">
                <span className="w-2 h-2 rounded-full bg-white/30" />
                <span>Baseline</span>
              </div>
            </div>
          </div>

          <div className="h-64 sm:h-72 w-full pt-2 min-w-0">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <AreaChart data={currentData.views} margin={{ top: 12, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="cyberAreaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.4} />
                      <stop offset="60%" stopColor="#3b82f6" stopOpacity={0.1} />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="cyberStrokeGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="50%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#ffffff" strokeOpacity={0.04} strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" stroke="#262835" tick={{ fill: "#9ca3af", fontSize: 11, fontFamily: "ui-monospace" }} tickLine={false} axisLine={{ stroke: "#1f2230" }} dy={8} />
                  <YAxis stroke="#262835" tick={{ fill: "#9ca3af", fontSize: 11, fontFamily: "ui-monospace" }} tickLine={false} axisLine={false} domain={["auto", "auto"]} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const d = payload[0].payload;
                        return (
                          <div className="bg-[#0b0d14] border border-white/[0.12] p-3 rounded-xl shadow-2xl text-xs font-mono space-y-1">
                            <div className="text-white font-bold pb-1 border-b border-white/[0.08]">{d.day} Snapshot</div>
                            <div className="text-cyan-300">Actual: <strong>{d.views.toLocaleString()} views</strong></div>
                            <div className="text-white/40">Baseline: <strong>{d.benchmark.toLocaleString()} views</strong></div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area type="monotone" dataKey="views" stroke="url(#cyberStrokeGrad)" strokeWidth={3} fill="url(#cyberAreaGrad)" activeDot={{ r: 6, fill: "#06b6d4", stroke: "#fff", strokeWidth: 2 }} />
                  <Line type="monotone" dataKey="benchmark" stroke="rgba(255,255,255,0.2)" strokeDasharray="4 4" strokeWidth={1.5} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full w-full bg-white/[0.02] rounded-lg animate-pulse" />
            )}
          </div>
        </div>

        {/* Right Column: Second-by-Second Retention Curve (5 cols) */}
        <div className="lg:col-span-5 obsidian-card p-6 space-y-5 border-pink-500/20">
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-pink-400 shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
                <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-white">
                  Retention Decay Curve
                </h3>
              </div>
              <p className="text-xs text-white/40 mt-0.5 font-sans">
                Drop-off rate from 0s hook to 60s conclusion
              </p>
            </div>
            <span className="text-[10px] font-mono text-pink-300 bg-pink-500/10 border border-pink-500/20 px-2 py-0.5 rounded-full">
              60s Cut
            </span>
          </div>

          <div className="h-64 sm:h-72 w-full pt-2 min-w-0">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <LineChart data={currentData.dropoff} margin={{ top: 12, right: 10, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="retentionGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#ec4899" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#ffffff" strokeOpacity={0.04} strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="second" stroke="#262835" tick={{ fill: "#9ca3af", fontSize: 11, fontFamily: "ui-monospace" }} tickLine={false} axisLine={{ stroke: "#1f2230" }} dy={8} />
                  <YAxis stroke="#262835" tick={{ fill: "#9ca3af", fontSize: 11, fontFamily: "ui-monospace" }} tickLine={false} axisLine={false} domain={[35, 105]} tickFormatter={(v) => `${v}%`} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const d = payload[0].payload;
                        return (
                          <div className="bg-[#0b0d14] border border-white/[0.12] p-3 rounded-xl shadow-2xl text-xs font-mono space-y-1">
                            <div className="text-white font-bold pb-1 border-b border-white/[0.08]">Timestamp {d.second}</div>
                            <div className="text-pink-400">Hold: <strong>{d.hold}%</strong></div>
                            <div className="text-white/40">Immediate Drop: <strong>-{d.drop}%</strong></div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line type="monotone" dataKey="hold" stroke="url(#retentionGrad)" strokeWidth={3} dot={{ r: 4, fill: "#ec4899", stroke: "#050508", strokeWidth: 2 }} activeDot={{ r: 6, fill: "#f43f5e", stroke: "#fff", strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full w-full bg-white/[0.02] rounded-lg animate-pulse" />
            )}
          </div>
        </div>
      </div>

      {/* Micro Diagnostic Insights Grid */}
      <div className="space-y-3">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white/60 px-1">
          Algorithmic Drop-off Diagnostics
        </h3>
        <div className="grid md:grid-cols-3 gap-3.5">
          {dropBenchmarks.map((b) => (
            <div key={b.phase} className="obsidian-card p-4 space-y-2 border border-white/[0.08]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-white">{b.phase}</span>
                <span className={cn("text-[10px] font-mono px-2 py-0.5 rounded border font-semibold", b.statusColor)}>
                  {b.metric} • {b.status}
                </span>
              </div>
              <p className="text-xs text-white/60 font-sans leading-relaxed">
                {b.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
