"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Bell,
  Check,
  Trash2,
  Zap,
  Sparkles,
  Users,
  DollarSign,
  ExternalLink,
  X,
  RotateCcw,
  CheckCircle2,
  CalendarDays,
  ShieldAlert,
} from "lucide-react";
import { useNotifications, VibeNotification } from "@/lib/useNotifications";
import { cn } from "@/lib/utils";

const typeStyles: Record<
  VibeNotification["type"],
  { icon: React.ElementType; color: string; bg: string; border: string; glow: string }
> = {
  viral: {
    icon: Zap,
    color: "text-amber-400",
    bg: "bg-amber-500/15",
    border: "border-amber-500/30",
    glow: "shadow-[0_0_10px_rgba(245,158,11,0.2)]",
  },
  collab: {
    icon: Users,
    color: "text-pink-400",
    bg: "bg-pink-500/15",
    border: "border-pink-500/30",
    glow: "shadow-[0_0_10px_rgba(236,72,153,0.2)]",
  },
  insight: {
    icon: Sparkles,
    color: "text-violet-400",
    bg: "bg-violet-500/15",
    border: "border-violet-500/30",
    glow: "shadow-[0_0_10px_rgba(139,92,246,0.2)]",
  },
  alert: {
    icon: DollarSign,
    color: "text-emerald-400",
    bg: "bg-emerald-500/15",
    border: "border-emerald-500/30",
    glow: "shadow-[0_0_10px_rgba(16,185,129,0.2)]",
  },
  system: {
    icon: CalendarDays,
    color: "text-cyan-400",
    bg: "bg-cyan-500/15",
    border: "border-cyan-500/30",
    glow: "shadow-[0_0_10px_rgba(6,182,212,0.2)]",
  },
};

export default function NotificationPopover() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<"all" | "unread">("all");
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    resetDefaultNotifications,
    clearAll,
  } = useNotifications();
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const displayedNotifications =
    activeFilter === "unread" ? notifications.filter((n) => !n.read) : notifications;

  return (
    <div className="relative" ref={popoverRef}>
      {/* Bell Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open notifications"
        className={cn(
          "w-9 h-9 rounded-xl border flex items-center justify-center transition-all relative cursor-pointer",
          isOpen
            ? "bg-violet-500/20 border-violet-500/40 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]"
            : "bg-white/[0.04] border-white/[0.08] text-white/70 hover:text-white hover:border-white/20 hover:bg-white/[0.08]"
        )}
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-[10px] font-mono font-bold text-white flex items-center justify-center border-2 border-[#050508] shadow-[0_0_8px_rgba(244,63,94,0.6)]">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Popover Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-84 sm:w-96 bg-[#0a0c14] rounded-2xl border border-white/[0.12] shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-50 overflow-hidden text-left animate-in fade-in zoom-in-95 duration-150 backdrop-blur-xl">
          {/* Header */}
          <div className="p-4 border-b border-white/[0.08] bg-white/[0.02] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                Radar Alerts
              </span>
              {unreadCount > 0 && (
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
                  {unreadCount} New
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-[11px] font-mono font-medium text-cyan-400 hover:text-cyan-300 px-2 py-1 rounded-md hover:bg-white/[0.06] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Check className="w-3 h-3" />
                  <span>Mark Read</span>
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={clearAll}
                  className="text-white/30 hover:text-rose-400 p-1.5 rounded-md hover:bg-white/[0.06] transition-colors cursor-pointer"
                  title="Clear all alerts"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Subheader Filters */}
          <div className="px-4 py-2 bg-white/[0.01] border-b border-white/[0.06] flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveFilter("all")}
                className={cn(
                  "px-2 py-0.5 rounded transition-colors cursor-pointer",
                  activeFilter === "all" ? "bg-white/[0.1] text-white font-bold" : "text-white/40 hover:text-white"
                )}
              >
                All ({notifications.length})
              </button>
              <button
                onClick={() => setActiveFilter("unread")}
                className={cn(
                  "px-2 py-0.5 rounded transition-colors cursor-pointer",
                  activeFilter === "unread" ? "bg-white/[0.1] text-white font-bold" : "text-white/40 hover:text-white"
                )}
              >
                Unread ({unreadCount})
              </button>
            </div>

            {notifications.length === 0 && (
              <button
                onClick={resetDefaultNotifications}
                className="text-[10px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-2.5 h-2.5" />
                <span>Reset Demo Feeds</span>
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-[380px] overflow-y-auto divide-y divide-white/[0.05] no-scrollbar">
            {displayedNotifications.length === 0 ? (
              <div className="p-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mx-auto text-white/30">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white/80">All Caught Up!</p>
                  <p className="text-[11px] text-white/40 font-sans mt-0.5">
                    No pending alerts on your creator frequency.
                  </p>
                </div>
                <button
                  onClick={resetDefaultNotifications}
                  className="px-3.5 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-[11px] font-mono text-cyan-300 inline-flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Restore Demo Signals</span>
                </button>
              </div>
            ) : (
              displayedNotifications.map((n) => {
                const config = typeStyles[n.type] || typeStyles.system;
                const Icon = config.icon;

                return (
                  <div
                    key={n.id}
                    onClick={() => markAsRead(n.id)}
                    className={cn(
                      "p-4 flex items-start gap-3.5 transition-all cursor-pointer group hover:bg-white/[0.04] relative",
                      !n.read ? "bg-white/[0.02]" : "opacity-60"
                    )}
                  >
                    {/* Unread indicator dot */}
                    {!n.read && (
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-400 absolute left-1.5 top-5 shadow-[0_0_6px_rgba(244,63,94,0.8)]" />
                    )}

                    {/* Icon Badge */}
                    <div
                      className={cn(
                        "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 border mt-0.5",
                        config.bg,
                        config.border,
                        config.glow
                      )}
                    >
                      <Icon className={cn("w-4 h-4", config.color)} />
                    </div>

                    {/* Body */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span
                          className={cn(
                            "text-xs font-semibold tracking-tight truncate",
                            !n.read ? "text-white font-bold" : "text-white/80"
                          )}
                        >
                          {n.title}
                        </span>
                        <span className="text-[10px] text-white/40 font-mono flex-shrink-0">
                          {n.time}
                        </span>
                      </div>

                      <p className="text-xs text-white/60 font-sans leading-relaxed line-clamp-2">
                        {n.message}
                      </p>

                      {n.link && (
                        <div className="mt-2 flex items-center gap-2">
                          <Link
                            href={n.link}
                            onClick={() => setIsOpen(false)}
                            className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-cyan-400 hover:text-cyan-300 hover:underline"
                          >
                            <span>{n.linkText ?? "View Details"}</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </Link>
                        </div>
                      )}
                    </div>

                    {/* Delete hover button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(n.id);
                      }}
                      className="text-white/20 hover:text-rose-400 p-1 rounded opacity-0 group-hover:opacity-100 transition-all flex-shrink-0 cursor-pointer"
                      title="Dismiss notification"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-white/[0.08] bg-[#07090f] flex items-center justify-between text-[11px] font-mono px-4">
            <span className="text-white/40">Radar Status: Online</span>
            <Link
              href="/dashboard/settings"
              onClick={() => setIsOpen(false)}
              className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
            >
              Notification Rules →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
