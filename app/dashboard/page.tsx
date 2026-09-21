"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  CalendarDays,
  BarChart3,
  Zap,
  TrendingUp,
  Eye,
  Heart,
  MessageCircle,
  Users,
  CheckCircle,
  ArrowUpRight,
  ArrowRight,
  Activity,
  Layers,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useUser } from "@/lib/useUser";
import { cn } from "@/lib/utils";
import AnimeCounter from "@/components/shared/AnimeCounter";
import AnimePulseBar from "@/components/shared/AnimePulseBar";

const recentPosts = [
  { title: "High-voltage morning routine (5 brutal sets)", platform: "YouTube", score: 94, status: "Published", views: "38.2K", likes: "4.8K", hold: "+44.8%", retention: "89% 3s Hold" },
  { title: "What I eat in a day — 180g protein blueprint", platform: "Instagram", score: 91, status: "Queued", views: "—", likes: "—", hold: "Queued", retention: "6:00 PM Release" },
  { title: "3 Month Raw Fitness Transformation Arc", platform: "TikTok", score: 76, status: "Draft", views: "—", likes: "—", hold: "Needs Hook", retention: "Re-edit Cut" },
  { title: "5 Creator Habits that 10x'd my output in 30 days", platform: "LinkedIn", score: 88, status: "Published", views: "24.6K", likes: "3.2K", hold: "+31.2%", retention: "78% 3s Hold" },
];

const quickActions = [
  { href: "/dashboard/brain", icon: Sparkles, label: "BrainForge AI", desc: "Neural Script & Hook Engine", badge: "AI GEN" },
  { href: "/dashboard/virality", icon: Zap, label: "ViralAudit 360", desc: "Retention Audit & Virality Prediction", badge: "0-100" },
  { href: "/dashboard/calendar", icon: CalendarDays, label: "FlowMatrix", desc: "Autonomous Multi-Platform Scheduler", badge: "QUEUE" },
  { href: "/dashboard/analytics", icon: BarChart3, label: "Lens Telemetry", desc: "Watch Time & Second-by-Second Drops", badge: "INTEL" },
];

const retentionTimeline = [
  { day: "Mon", score: 68, peak: "32K", hold: "38%", status: "Standard" },
  { day: "Tue", score: 94, peak: "88K", hold: "49%", status: "Peak" },
  { day: "Wed", score: 78, peak: "46K", hold: "41%", status: "Standard" },
  { day: "Thu", score: 98, peak: "112K", hold: "52%", status: "Viral" },
  { day: "Fri", score: 86, peak: "64K", hold: "44%", status: "Optimal" },
  { day: "Sat", score: 72, peak: "40K", hold: "39%", status: "Standard" },
  { day: "Sun", score: 82, peak: "58K", hold: "43%", status: "Optimal" },
];

export default function DashboardPage() {
  const user = useUser();
  const router = useRouter();
  const [selectedDay, setSelectedDay] = useState(retentionTimeline[3]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (
      typeof window !== "undefined" &&
      !localStorage.getItem("vibedocker_user") &&
      !localStorage.getItem("vibedock_user") &&
      !localStorage.getItem("chakra_user")
    ) {
      router.push("/login");
    }
  }, [router]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-6 h-6 border border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
      {/* 1. Executive Creator Dossier (Apple-style Stealth Banner) */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="obsidian-card p-5 sm:p-6 relative overflow-hidden"
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
          {/* Creator Profile Specs */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-[#0f1016] border border-white/[0.12] p-[1px] flex-shrink-0 overflow-hidden">
              <div className="w-full h-full rounded-[10px] flex items-center justify-center text-white font-medium text-lg overflow-hidden bg-black/40">
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  user.avatar
                )}
              </div>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-lg sm:text-xl font-semibold text-white tracking-tight truncate">
                  {user.name}
                </h1>
                {user.verified && (
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                )}
                <span className="text-[10px] font-mono text-white/50 px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.07] capitalize">
                  {user.platform}
                </span>
              </div>
              <div className="text-xs font-mono text-white/40 mb-1">{user.handle}</div>
              <p className="text-xs text-white/50 line-clamp-1 max-w-lg font-sans">{user.bio}</p>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="flex items-center gap-6 sm:gap-8 bg-white/[0.02] border border-white/[0.06] rounded-xl px-4 py-2.5">
            <div>
              <div className="text-[10px] font-mono uppercase text-white/40">Audience</div>
              <div className="text-base font-mono font-medium text-white/90 mt-0.5">{user.followers}</div>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase text-white/40">Retention</div>
              <div className="text-base font-mono font-medium text-emerald-400 mt-0.5">{user.engagement}</div>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase text-white/40">Catalog</div>
              <div className="text-base font-mono font-medium text-white/90 mt-0.5">{user.posts}</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 2. Precision KPI Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: "Avg Views / Drop", value: user.avgViews, icon: Eye, delta: "+28% vs 30d", color: "from-cyan-500/20 to-blue-600/5", border: "border-cyan-500/20", iconColor: "text-cyan-400" },
          { label: "Avg Likes / Drop", value: user.avgLikes, icon: Heart, delta: "+19% Organic", color: "from-rose-500/20 to-pink-600/5", border: "border-rose-500/20", iconColor: "text-rose-400" },
          { label: "Avg Comments", value: user.avgComments, icon: MessageCircle, delta: "88% Positive", color: "from-amber-500/20 to-orange-600/5", border: "border-amber-500/20", iconColor: "text-amber-400" },
          { label: "Vibe Score Retention", value: user.engagement, icon: TrendingUp, delta: "Top 4% Bracket", emerald: true, color: "from-emerald-500/20 to-teal-600/5", border: "border-emerald-500/20", iconColor: "text-emerald-400" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className={cn("obsidian-card p-4 flex flex-col justify-between relative overflow-hidden group hover:border-opacity-60", stat.border)}
          >
            <div className={cn("absolute inset-0 bg-gradient-to-br pointer-events-none opacity-40 group-hover:opacity-70 transition-opacity", stat.color)} />
            <div className="flex items-center justify-between mb-3 relative z-10">
              <span className="text-xs font-medium text-white/60">{stat.label}</span>
              <div className={cn("p-1.5 rounded-md bg-white/[0.04] border border-white/[0.08]", stat.iconColor)}>
                <stat.icon className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="relative z-10">
              <div className="text-2xl font-medium font-mono tracking-tight text-white mb-1.5">
                {stat.value}
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-mono">
                <span className={stat.emerald ? "text-emerald-400 font-medium" : "text-white/60"}>
                  {stat.delta}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 3. Retention Curve Spline & Creative Radar */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Retention Area Curve Spline */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 obsidian-card p-5 flex flex-col justify-between border-indigo-500/20"
        >
          <div>
            {/* Curve Header */}
            <div className="flex items-start justify-between pb-3.5 border-b border-white/[0.06]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 dot-emerald" />
                  <h3 className="text-xs font-semibold text-white/90 uppercase tracking-wider font-mono">
                    Retention Curve & Velocity
                  </h3>
                </div>
                <p className="text-[11px] text-white/40 mt-0.5">
                  Second-by-second audience hold across last 7 publishing cycles
                </p>
              </div>
              <div className="text-xs font-mono text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded shadow-sm">
                Avg 3s Hold: <span className="font-semibold text-emerald-400">+44.8%</span>
              </div>
            </div>

            {/* Micro Inspector Strip */}
            <div className="flex items-center justify-between py-3 text-xs text-white/50 font-mono">
              <div className="flex items-center gap-2">
                <span>Inspecting:</span>
                <span className="text-cyan-300 font-medium">{selectedDay.day} Release</span>
                <span className={cn(
                  "text-[10px] px-1.5 py-0.2 rounded border font-mono",
                  selectedDay.status === "Viral" ? "text-rose-400 bg-rose-500/10 border-rose-500/20" :
                  selectedDay.status === "Peak" ? "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" :
                  selectedDay.status === "Optimal" ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" :
                  "text-white/40 bg-white/[0.05] border-white/[0.08]"
                )}>
                  {selectedDay.status}
                </span>
              </div>
              <div className="flex items-center gap-4 text-[11px]">
                <span>Peak Views: <strong className="text-cyan-300 font-medium">{selectedDay.peak}</strong></span>
                <span>Hold: <strong className="text-emerald-400 font-medium">{selectedDay.hold}</strong></span>
              </div>
            </div>

            {/* Recharts Area Spline with Dual Color Gradient */}
            <div className="h-44 sm:h-48 w-full pt-1 pb-1 border-y border-white/[0.06] min-w-0">
              {mounted ? (
                <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <AreaChart
                  data={retentionTimeline}
                  margin={{ top: 12, right: 10, left: -25, bottom: 0 }}
                  onClick={(e: any) => {
                    if (e && e.activePayload && e.activePayload[0]) {
                      setSelectedDay(e.activePayload[0].payload);
                    }
                  }}
                >
                  <defs>
                    <linearGradient id="cyberAreaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.4} />
                      <stop offset="60%" stopColor="#06b6d4" stopOpacity={0.12} />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="cyberLineGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="50%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>

                  <XAxis
                    dataKey="day"
                    stroke="#262835"
                    tick={{ fill: "#6b7280", fontSize: 11, fontFamily: "ui-monospace" }}
                    tickLine={false}
                    axisLine={{ stroke: "#1f2230" }}
                    dy={6}
                  />
                  <YAxis
                    stroke="#262835"
                    tick={{ fill: "#6b7280", fontSize: 10, fontFamily: "ui-monospace" }}
                    tickLine={false}
                    axisLine={false}
                    domain={[40, 110]}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-[#0e0f16] border border-white/[0.1] px-3 py-2 rounded-lg shadow-xl text-xs font-mono">
                            <div className="text-white font-medium mb-1">
                              {data.day} Drop • {data.status}
                            </div>
                            <div className="text-[11px] text-white/50 space-y-0.5">
                              <div>Velocity: <span className="text-white">{data.score}%</span></div>
                              <div>Peak Views: <span className="text-white">{data.peak}</span></div>
                              <div>Hold: <span className="text-emerald-400">{data.hold}</span></div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="url(#cyberLineGrad)"
                    strokeWidth={2.5}
                    fill="url(#cyberAreaGrad)"
                    activeDot={{
                      r: 5,
                      fill: "#06b6d4",
                      stroke: "#ffffff",
                      strokeWidth: 2,
                    }}
                    dot={(props: any) => {
                      const { cx, cy, payload } = props;
                      const isSelected = selectedDay.day === payload.day;
                      return (
                        <circle
                          key={payload.day}
                          cx={cx}
                          cy={cy}
                          r={isSelected ? 5 : 3}
                          fill={isSelected ? "#06b6d4" : "#8b5cf6"}
                          stroke="#050508"
                          strokeWidth={2}
                        />
                      );
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
              ) : (
                <div className="h-full w-full bg-white/[0.02] rounded-lg animate-pulse" />
              )}
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 text-[11px] text-white/40">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 dot-emerald" />
              Peak attention window: <span className="text-emerald-300 font-medium">6:45 PM EST</span>
            </span>
            <Link href="/dashboard/analytics" className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1">
              Lens Telemetry <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </motion.div>

        {/* Creative Radar Diagnostics */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="obsidian-card p-5 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-white/40" />
                <h3 className="text-xs font-semibold text-white/90 uppercase tracking-wider font-mono">
                  Creative Radar
                </h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                Optimal
              </span>
            </div>

            <div className="space-y-2.5 pt-3">
              {[
                { title: "Question-format hooks", metric: "+340% Watch Time", score: 88, tag: "Curiosity Gap" },
                { title: "15s High-Energy Cut", metric: "+92% Completion", score: 95, tag: "Retention Rhythm" },
                { title: "Carousel Frame Stacking", metric: "+4.2x Bookmarks", score: 74, tag: "Save Multiplier" },
              ].map((item) => (
                <div key={item.title} className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05] space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-xs font-medium text-white/90">{item.title}</div>
                      <div className="text-[10px] text-white/40 font-mono mt-0.5">{item.tag}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-mono text-white/90 font-medium">{item.metric}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 pt-0.5">
                    <AnimePulseBar score={item.score} duration={1100} barClassName="bg-white/80" />
                    <span className="text-[10px] font-mono text-white/40">{item.score}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link
            href="/dashboard/virality"
            className="mt-4 w-full py-2.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.16] text-white text-xs font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <Zap className="w-3.5 h-3.5 text-white/60" />
            <span>Run ViralAudit Diagnostic</span>
          </Link>
        </motion.div>
      </div>

      {/* 4. Launchpad & Content Pipeline */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Studio Launchpad */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }} className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-semibold text-white/50 uppercase tracking-wider font-mono">
              Studio Launchpad
            </h2>
            <span className="text-[10px] font-mono text-white/40">4 Engines</span>
          </div>

          <div className="space-y-2">
            {quickActions.map((action, idx) => {
              const iconStyles = [
                "text-violet-400 bg-violet-500/10 border-violet-500/20 group-hover:border-violet-500/40",
                "text-amber-400 bg-amber-500/10 border-amber-500/20 group-hover:border-amber-500/40",
                "text-cyan-400 bg-cyan-500/10 border-cyan-500/20 group-hover:border-cyan-500/40",
                "text-emerald-400 bg-emerald-500/10 border-emerald-500/20 group-hover:border-emerald-500/40",
              ][idx % 4];

              const badgeStyles = [
                "text-violet-300 bg-violet-500/10 border-violet-500/20",
                "text-amber-300 bg-amber-500/10 border-amber-500/20",
                "text-cyan-300 bg-cyan-500/10 border-cyan-500/20",
                "text-emerald-300 bg-emerald-500/10 border-emerald-500/20",
              ][idx % 4];

              return (
                <Link
                  key={action.href}
                  href={action.href}
                  className="flex items-center gap-3 obsidian-card p-3 hover:bg-white/[0.04] transition-all group"
                >
                  <div className={cn("w-8 h-8 rounded-lg border flex items-center justify-center transition-colors", iconStyles)}>
                    <action.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-white/90 group-hover:text-white flex items-center justify-between">
                      <span>{action.label}</span>
                      <span className={cn("text-[9px] font-mono px-1.5 py-0.2 rounded border", badgeStyles)}>
                        {action.badge}
                      </span>
                    </div>
                    <div className="text-[11px] text-white/40 truncate mt-0.5">{action.desc}</div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-white/20 group-hover:text-cyan-400 transition-colors" />
                </Link>
              );
            })}
          </div>
        </motion.div>

        {/* Active Content Table */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }} className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-semibold text-white/50 uppercase tracking-wider font-mono">
              Active Pipeline
            </h2>
            <Link href="/dashboard/calendar" className="text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1">
              Open Calendar <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="obsidian-card overflow-hidden border-cyan-500/10">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/[0.06] bg-white/[0.01]">
                  <th className="text-[10px] font-mono text-white/40 uppercase tracking-wider px-4 py-2.5">Title</th>
                  <th className="text-[10px] font-mono text-white/40 uppercase tracking-wider px-3 py-2.5">Score</th>
                  <th className="text-[10px] font-mono text-white/40 uppercase tracking-wider px-3 py-2.5">Status</th>
                  <th className="text-[10px] font-mono text-white/40 uppercase tracking-wider px-3 py-2.5">Pacing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05] text-xs">
                {recentPosts.map((post, i) => {
                  const platformColor = 
                    post.platform === "YouTube" ? "text-rose-400 bg-rose-500/10 border-rose-500/20" :
                    post.platform === "Instagram" ? "text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20" :
                    post.platform === "TikTok" ? "text-cyan-400 bg-cyan-500/10 border-cyan-500/20" :
                    "text-blue-400 bg-blue-500/10 border-blue-500/20";

                  return (
                    <tr key={i} className="hover:bg-white/[0.03] transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-medium text-white/90 line-clamp-1">{post.title}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={cn("text-[9px] font-mono uppercase px-1.5 py-0.2 rounded border", platformColor)}>
                            {post.platform}
                          </span>
                          <span className="text-[10px] text-white/40 font-mono">{post.views} views</span>
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <span className={cn(
                          "font-mono text-xs font-semibold px-2 py-0.5 rounded",
                          post.score >= 90 ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20" :
                          post.score >= 80 ? "text-cyan-400 bg-cyan-500/10 border border-cyan-500/20" :
                          "text-amber-400 bg-amber-500/10 border border-amber-500/20"
                        )}>
                          {post.score}/100
                        </span>
                      </td>
                      <td className="px-3 py-3">
                        <span className={cn(
                          "text-[10px] font-mono uppercase px-2 py-0.5 rounded border",
                          post.status === "Published" ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" :
                          post.status === "Queued" ? "text-indigo-300 bg-indigo-500/10 border-indigo-500/20" :
                          "text-amber-400 bg-amber-500/10 border-amber-500/20"
                        )}>
                          {post.status}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-white/50 font-mono text-[11px]">
                        {post.retention}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
