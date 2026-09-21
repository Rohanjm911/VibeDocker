"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Sparkles,
  CalendarDays,
  BarChart3,
  Zap,
  Settings,
  ChevronLeft,
  ChevronRight,
  Flame,
  Users,
  TrendingUp,
  Repeat2,
  PieChart,
  MessageSquare,
  BadgeDollarSign,
  LineChart,
  X,
} from "lucide-react";
import VibeDockLogo from "./VibeDockLogo";

const navSections = [
  {
    title: "Creation Studio",
    items: [
      { href: "/dashboard", icon: Flame, label: "Command Deck" },
      { href: "/dashboard/brain", icon: Sparkles, label: "BrainForge AI" },
      { href: "/dashboard/calendar", icon: CalendarDays, label: "FlowMatrix" },
      { href: "/dashboard/morph", icon: Repeat2, label: "Content Morph" },
    ],
  },
  {
    title: "Intelligence & Radar",
    items: [
      { href: "/dashboard/analytics", icon: BarChart3, label: "Lens Telemetry" },
      { href: "/dashboard/virality", icon: Zap, label: "ViralAudit 360" },
      { href: "/dashboard/trend", icon: TrendingUp, label: "Trend Radar" },
      { href: "/dashboard/audience", icon: PieChart, label: "Audience Telemetry" },
      { href: "/dashboard/voice", icon: MessageSquare, label: "Audience Voice" },
    ],
  },
  {
    title: "Network & Commercial",
    items: [
      { href: "/dashboard/connect", icon: Users, label: "Creator Uplink" },
      { href: "/dashboard/brand", icon: BadgeDollarSign, label: "Sponsor Readiness" },
      { href: "/dashboard/growth", icon: LineChart, label: "Compounding Engine" },
    ],
  },
];

export default function Sidebar({
  mobileOpen = false,
  onMobileClose,
}: {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {mobileOpen && (
        <div
          onClick={onMobileClose}
          className="fixed inset-0 bg-black/80 z-40 lg:hidden backdrop-blur-sm"
        />
      )}

      <aside
        className={cn(
          "flex flex-col h-screen border-r border-white/[0.07] bg-[#050508] transition-all duration-200 select-none z-50",
          "hidden lg:flex relative",
          collapsed ? "w-18" : "w-64",
          mobileOpen && "fixed inset-y-0 left-0 flex w-72 max-w-[85vw] shadow-2xl"
        )}
      >
        {/* Logo & Mobile Close */}
        <div className={cn("px-5 py-4 border-b border-white/[0.07] overflow-hidden flex items-center justify-between", collapsed && "justify-center px-0")}>
          <Link href="/dashboard" onClick={onMobileClose} className="block">
            <VibeDockLogo size={collapsed ? "sm" : "default"} withText={!collapsed} />
          </Link>
          <button
            onClick={onMobileClose}
            className="lg:hidden p-1 rounded-md text-white/50 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav List */}
        <nav className="flex-1 py-4 px-3 overflow-y-auto no-scrollbar space-y-5">
          {navSections.map((section, sIndex) => (
            <div key={sIndex} className="space-y-1.5">
              {!collapsed && (
                <div className="px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-white/40 font-medium">
                  {section.title}
                </div>
              )}
              {collapsed && sIndex > 0 && (
                <div className="my-2 border-t border-white/[0.06]" />
              )}
              <div className="space-y-1">
                {section.items.map(({ href, icon: Icon, label }, itemIdx) => {
                  const active = pathname === href;
                  
                  // Colorful accents per section
                  const sectionColor = 
                    sIndex === 0 
                      ? (active ? "text-violet-400" : "text-violet-400/70 group-hover:text-violet-300")
                      : sIndex === 1
                      ? (active ? "text-cyan-400" : "text-cyan-400/70 group-hover:text-cyan-300")
                      : (active ? "text-emerald-400" : "text-emerald-400/70 group-hover:text-emerald-300");

                  const activeGlow = 
                    sIndex === 0
                      ? "bg-violet-500/15 border-violet-500/30 text-white font-semibold shadow-[0_0_20px_rgba(139,92,246,0.15)]"
                      : sIndex === 1
                      ? "bg-cyan-500/15 border-cyan-500/30 text-white font-semibold shadow-[0_0_20px_rgba(6,182,212,0.15)]"
                      : "bg-emerald-500/15 border-emerald-500/30 text-white font-semibold shadow-[0_0_20px_rgba(16,185,129,0.15)]";

                  const indicatorColor = 
                    sIndex === 0 ? "bg-violet-400 shadow-[0_0_10px_rgba(168,85,247,0.9)]" :
                    sIndex === 1 ? "bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.9)]" :
                    "bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.9)]";

                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={onMobileClose}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-xl transition-all group relative text-sm font-medium border border-transparent",
                        active
                          ? activeGlow
                          : "text-white/60 hover:text-white hover:bg-white/[0.05]",
                        collapsed && "justify-center px-0 py-2.5"
                      )}
                    >
                      <Icon
                        className={cn(
                          "w-4.5 h-4.5 flex-shrink-0 transition-colors",
                          sectionColor
                        )}
                      />

                      {!collapsed && (
                        <span className="truncate tracking-tight">{label}</span>
                      )}

                      {active && !collapsed && (
                        <span className={cn("w-1.5 h-4 rounded-full ml-auto flex-shrink-0", indicatorColor)} />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom Settings Link */}
        <div className="p-3 border-t border-white/[0.07]">
          <Link
            href="/dashboard/settings"
            onClick={onMobileClose}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-xl text-white/50 hover:text-white hover:bg-white/[0.05] transition-colors text-sm font-medium",
              collapsed && "justify-center px-0 py-2.5"
            )}
          >
            <Settings className="w-4.5 h-4.5 flex-shrink-0" />
            {!collapsed && <span>Settings</span>}
          </Link>
        </div>

        {/* Collapse toggle (desktop only) */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#0a0b10] border border-white/[0.12] items-center justify-center text-white/40 hover:text-white transition-colors z-20 cursor-pointer"
        >
          {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>
      </aside>
    </>
  );
}
