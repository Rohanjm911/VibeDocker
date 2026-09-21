"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Target, Calendar, Flame, Award, CheckCircle, Clock, Sparkles } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { cn } from "@/lib/utils";

const followerGrowth = [
  { month: "Dec", followers: 28000 },
  { month: "Jan", followers: 31000 },
  { month: "Feb", followers: 34500 },
  { month: "Mar", followers: 38000 },
  { month: "Apr", followers: 43000 },
  { month: "May", followers: 48200 },
];

const milestones = [
  { label: "First 1K cohort", date: "Aug 2023", done: true },
  { label: "Viral breakout (100K+ reach)", date: "Oct 2023", done: true },
  { label: "10K community base", date: "Dec 2023", done: true },
  { label: "First Tier-1 brand partner", date: "Feb 2024", done: true },
  { label: "50K subscriber crossover", date: "Jun 2024 (projected)", done: false },
  { label: "100K scale landmark", date: "Dec 2024 (projected)", done: false },
];

const weeklyGoals = [
  { goal: "Deploy 5 production uploads this week", done: true, progress: 5, target: 5 },
  { goal: "Engage with 20 community inquiries", done: false, progress: 14, target: 20 },
  { goal: "Test 1 alternate hook framing archetype", done: true, progress: 1, target: 1 },
  { goal: "Review 7-day retention spline telemetry", done: false, progress: 0, target: 1 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="obsidian-card px-3 py-1.5 border border-white/20 text-xs font-mono">
        <p className="text-white/40 mb-0.5">{label}</p>
        <p className="text-white font-medium">
          {typeof payload[0].value === "number" && payload[0].value > 1000
            ? `${(payload[0].value / 1000).toFixed(1)}K`
            : payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

export default function GrowthPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const streak = 14;

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 font-sans">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between border-b border-white/[0.06] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">Compounding Telemetry</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Compounding Engine</h1>
          <p className="text-xs text-white/40 mt-1">Automated compounding engine tracking consistency velocity and momentum projections</p>
        </div>
        <div className="text-right">
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded">
            {streak} Day Streak Active
          </span>
        </div>
      </motion.div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Monthly Trajectory", value: "+5,200", sub: "+12.1% acceleration" },
          { label: "Active Momentum", value: "14 Days", sub: "Clean publishing streak" },
          { label: "Weekly Volume", value: "4.8 Posts", sub: "Above 4.0 target" },
          { label: "Next Milestone", value: "50K", sub: "1.8K subscribers away" },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="obsidian-card p-4 space-y-2"
          >
            <span className="text-[10px] font-mono uppercase tracking-wider text-white/40">{s.label}</span>
            <div className="text-2xl font-mono font-bold text-white tracking-tight">{s.value}</div>
            <div className="text-[11px] font-mono text-white/30">{s.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts & Targets Split */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Growth Area Chart */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="obsidian-card p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
            <span className="text-xs font-mono uppercase text-white/90">Audience Scale Horizon</span>
            <span className="text-[10px] font-mono text-white/40">6-Month History</span>
          </div>
          <div className="h-44 w-full min-w-0">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <AreaChart data={followerGrowth} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity={0.12} />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10, fontFamily: "monospace" }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="followers" stroke="#ffffff" strokeWidth={1.5} fill="url(#growthGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full w-full bg-white/[0.02] rounded-lg animate-pulse" />
            )}
          </div>
          <div className="text-[11px] font-mono text-white/40 text-center">
            Pacing towards 50,000 subscriber benchmark in approx 18 days.
          </div>
        </motion.div>

        {/* Weekly Goals Sprint */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="obsidian-card p-5 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
            <span className="text-xs font-mono uppercase text-white/90">Sprint Targets</span>
            <span className="text-[10px] font-mono text-white/40">Week 38</span>
          </div>
          <div className="space-y-3">
            {weeklyGoals.map((g, i) => (
              <div key={i} className="p-3 rounded bg-white/[0.02] border border-white/[0.04] space-y-1.5 font-mono">
                <div className="flex items-center justify-between text-xs">
                  <span className={cn("text-white/90", g.done && "text-white")}>{g.goal}</span>
                  <span className="text-[11px] text-white/40">
                    {g.progress}/{g.target}
                  </span>
                </div>
                <div className="h-1 rounded-full bg-white/[0.04] overflow-hidden">
                  <div
                    className={cn("h-full rounded-full transition-all", g.done ? "bg-emerald-400" : "bg-white/60")}
                    style={{ width: `${Math.min(100, (g.progress / g.target) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Milestones Road */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="obsidian-card p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
          <span className="text-xs font-mono uppercase text-white/90">Evolutionary Milestones</span>
          <span className="text-[10px] font-mono text-white/40">Historical Timeline</span>
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          {milestones.map((m, i) => (
            <div
              key={i}
              className={cn(
                "p-3.5 rounded-lg border font-mono space-y-1 transition-all",
                m.done ? "bg-white/[0.02] border-white/[0.08]" : "bg-transparent border-white/[0.03] opacity-40"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-white/40">{m.date}</span>
                {m.done && <span className="text-[10px] text-emerald-400">Achieved</span>}
              </div>
              <div className="text-xs font-medium text-white">{m.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Synthesis Insight */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="obsidian-card p-4 border-l-2 border-l-white">
        <div className="flex items-start gap-3">
          <Sparkles className="w-3.5 h-3.5 text-white/70 mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-white/90 mb-0.5">Momentum Trajectory</div>
            <p className="text-xs text-white/60 leading-relaxed font-mono">
              At current compounding rate (+1,200/wk), the 50K milestone will be reached within 14–18 days. Maintain current publishing frequency of 4.8 posts/week to avoid algorithmic decay.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
