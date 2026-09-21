"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  Plus,
  Clock,
  CheckCircle2,
  Trash2,
  Edit2,
  X,
  Sparkles,
  Share2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ScheduledItem {
  id: string;
  day: number;
  time: string;
  title: string;
  platform: "YouTube" | "Instagram" | "TikTok" | "LinkedIn";
  status: "Ready" | "Draft" | "Queued";
}

const defaultSchedule: ScheduledItem[] = [
  { id: "1", day: 2, time: "18:00", title: "Morning routine for hyper-focus (5 brutal sets)", platform: "YouTube", status: "Ready" },
  { id: "2", day: 3, time: "12:30", title: "3 camera hacks for solo creators with zero budget", platform: "Instagram", status: "Queued" },
  { id: "3", day: 5, time: "17:45", title: "Full day of clean eating blueprint (180g protein)", platform: "TikTok", status: "Ready" },
  { id: "4", day: 6, time: "09:00", title: "5 mental models for digital scale in 2026", platform: "LinkedIn", status: "Draft" },
];

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const platformsList = ["YouTube", "Instagram", "TikTok", "LinkedIn"] as const;
const statusList = ["Ready", "Queued", "Draft"] as const;

export default function CalendarPage() {
  const [items, setItems] = useState<ScheduledItem[]>(defaultSchedule);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  // Modal State for Add / Edit
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ScheduledItem | null>(null);
  const [targetDay, setTargetDay] = useState<number>(1);
  const [formTitle, setFormTitle] = useState("");
  const [formTime, setFormTime] = useState("18:00");
  const [formPlatform, setFormPlatform] = useState<ScheduledItem["platform"]>("Instagram");
  const [formStatus, setFormStatus] = useState<ScheduledItem["status"]>("Ready");

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved =
        localStorage.getItem("vibedocker_calendar_schedule") ||
        localStorage.getItem("vibedock_calendar_schedule");
      if (saved) {
        try {
          setItems(JSON.parse(saved));
        } catch (e) {
          console.error("Failed to parse calendar items", e);
        }
      }
    }
  }, []);

  // Save to localStorage
  const saveItems = (newItems: ScheduledItem[]) => {
    setItems(newItems);
    if (typeof window !== "undefined") {
      localStorage.setItem("vibedocker_calendar_schedule", JSON.stringify(newItems));
      localStorage.setItem("vibedock_calendar_schedule", JSON.stringify(newItems));
    }
  };

  const handleOpenAdd = (dayNumber: number) => {
    setEditingItem(null);
    setTargetDay(dayNumber);
    setFormTitle("");
    setFormTime("18:00");
    setFormPlatform("Instagram");
    setFormStatus("Ready");
    setModalOpen(true);
  };

  const handleOpenEdit = (item: ScheduledItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingItem(item);
    setTargetDay(item.day);
    setFormTitle(item.title);
    setFormTime(item.time);
    setFormPlatform(item.platform);
    setFormStatus(item.status);
    setModalOpen(true);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = items.filter((it) => it.id !== id);
    saveItems(updated);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    if (editingItem) {
      // Edit existing
      const updated = items.map((it) =>
        it.id === editingItem.id
          ? {
              ...it,
              day: targetDay,
              title: formTitle.trim(),
              time: formTime,
              platform: formPlatform,
              status: formStatus,
            }
          : it
      );
      saveItems(updated);
    } else {
      // Create new
      const newItem: ScheduledItem = {
        id: Date.now().toString(),
        day: targetDay,
        title: formTitle.trim(),
        time: formTime,
        platform: formPlatform,
        status: formStatus,
      };
      saveItems([...items, newItem]);
    }

    setModalOpen(false);
  };

  const filtered = activeFilter === "All" ? items : items.filter((i) => i.platform === activeFilter);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1500px] mx-auto space-y-6">
      {/* Calendar Header with Live Controls */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 pb-5 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600/30 to-cyan-500/30 border border-white/10 flex items-center justify-center text-cyan-300">
              <CalendarDays className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-white tracking-tight">FlowMatrix</h1>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  Release Architecture
                </span>
              </div>
              <p className="text-xs text-white/50 mt-0.5">
                Multi-channel broadcast queue, algorithmic drop timing & audience pacing.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats & Global Add Action */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Platform filter pills */}
          <div className="flex items-center gap-1 bg-[#090b12] border border-white/[0.08] p-1 rounded-xl">
            {["All", "YouTube", "Instagram", "TikTok", "LinkedIn"].map((p) => {
              const count = p === "All" ? items.length : items.filter((it) => it.platform === p).length;
              return (
                <button
                  key={p}
                  onClick={() => setActiveFilter(p)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer flex items-center gap-1.5",
                    activeFilter === p
                      ? "bg-white/[0.14] text-white shadow-sm"
                      : "text-white/40 hover:text-white/80"
                  )}
                >
                  <span>{p}</span>
                  <span className={cn(
                    "text-[10px] px-1 rounded",
                    activeFilter === p ? "bg-white/20 text-white" : "text-white/30"
                  )}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => handleOpenAdd(4)} // defaults to today (Thu = 4)
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-medium text-xs font-mono transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_18px_rgba(99,102,241,0.35)]"
          >
            <Plus className="w-4 h-4" />
            <span>New Drop</span>
          </button>
        </div>
      </div>

      {/* Broadcast Summary Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Scheduled Drops", value: `${items.length} Posts`, desc: "This week's queue", color: "text-cyan-400" },
          { label: "Ready to Fire", value: `${items.filter((i) => i.status === "Ready").length} Ready`, desc: "Rendered & validated", color: "text-emerald-400" },
          { label: "Queued Pipeline", value: `${items.filter((i) => i.status === "Queued").length} In Queue`, desc: "Autopost armed", color: "text-indigo-400" },
          { label: "Active Drafts", value: `${items.filter((i) => i.status === "Draft").length} Drafts`, desc: "Needs hook polish", color: "text-amber-400" },
        ].map((metric) => (
          <div key={metric.label} className="obsidian-card p-3.5 flex flex-col justify-between">
            <span className="text-[11px] font-mono text-white/50 uppercase">{metric.label}</span>
            <div className={cn("text-xl font-mono font-bold my-1", metric.color)}>{metric.value}</div>
            <span className="text-[11px] text-white/40">{metric.desc}</span>
          </div>
        ))}
      </div>

      {/* 7-Day Timeline Matrix Grid with improved aspect ratio & styling */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {daysOfWeek.map((dayName, dayIndex) => {
          const dayNumber = dayIndex + 1;
          const dayItems = filtered.filter((i) => i.day === dayNumber);
          const isToday = dayIndex === 3; // Thu

          return (
            <div
              key={dayName}
              className={cn(
                "obsidian-card p-3 rounded-2xl flex flex-col justify-between transition-all group/day border",
                isToday 
                  ? "border-indigo-500/50 bg-gradient-to-b from-indigo-950/20 to-black/60 shadow-[0_0_30px_rgba(99,102,241,0.18)]" 
                  : "border-white/[0.07] bg-[#080910] hover:border-white/[0.16]"
              )}
            >
              <div>
                {/* Column Day Header */}
                <div className="flex items-center justify-between pb-2.5 border-b border-white/[0.08] mb-2.5">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">{dayName}</span>
                    <span className="text-[10px] font-mono text-white/40">
                      {dayIndex + 14}th
                    </span>
                  </div>

                  {isToday ? (
                    <span className="text-[9px] font-mono font-bold text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-1.5 py-0.2 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.3)]">
                      Today
                    </span>
                  ) : (
                    <span className="text-[9px] font-mono text-white/30">{dayItems.length}</span>
                  )}
                </div>

                {/* Day Items List */}
                <div className="space-y-2">
                  {dayItems.length === 0 ? (
                    <button
                      onClick={() => handleOpenAdd(dayNumber)}
                      className="w-full min-h-[90px] py-4 px-2 rounded-xl border border-dashed border-white/[0.06] hover:border-cyan-500/40 hover:bg-cyan-500/[0.03] transition-all flex flex-col items-center justify-center gap-1 group/empty cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5 text-white/20 group-hover/empty:text-cyan-400 transition-colors" />
                      <span className="text-[11px] font-mono text-white/30 group-hover/empty:text-cyan-300">
                        + Slot
                      </span>
                    </button>
                  ) : (
                    dayItems.map((item) => {
                      const platformStyles = 
                        item.platform === "YouTube" ? "border-rose-500/30 bg-rose-950/20 text-rose-200 hover:border-rose-500/60 shadow-[0_2px_12px_rgba(244,63,94,0.08)]" :
                        item.platform === "Instagram" ? "border-fuchsia-500/30 bg-fuchsia-950/20 text-fuchsia-200 hover:border-fuchsia-500/60 shadow-[0_2px_12px_rgba(217,70,239,0.08)]" :
                        item.platform === "TikTok" ? "border-cyan-500/30 bg-cyan-950/20 text-cyan-200 hover:border-cyan-500/60 shadow-[0_2px_12px_rgba(6,182,212,0.08)]" :
                        "border-blue-500/30 bg-blue-950/20 text-blue-200 hover:border-blue-500/60 shadow-[0_2px_12px_rgba(59,130,246,0.08)]";

                      const badgeColor = 
                        item.platform === "YouTube" ? "bg-rose-500/20 text-rose-300 border-rose-500/30" :
                        item.platform === "Instagram" ? "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30" :
                        item.platform === "TikTok" ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/30" :
                        "bg-blue-500/20 text-blue-300 border-blue-500/30";

                      return (
                        <div
                          key={item.id}
                          onClick={(e) => handleOpenEdit(item, e)}
                          className={cn(
                            "p-2.5 rounded-xl border text-left transition-all hover:scale-[1.01] cursor-pointer relative group",
                            platformStyles
                          )}
                        >
                          {/* Quick Delete & Edit controls on hover */}
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5 bg-black/85 backdrop-blur-md rounded-md p-0.5 border border-white/15 z-10">
                            <button
                              onClick={(e) => handleOpenEdit(item, e)}
                              title="Edit post"
                              className="p-1 hover:text-cyan-300 text-white/60 transition-colors"
                            >
                              <Edit2 className="w-2.5 h-2.5" />
                            </button>
                            <button
                              onClick={(e) => handleDelete(item.id, e)}
                              title="Delete post"
                              className="p-1 hover:text-rose-400 text-white/60 transition-colors"
                            >
                              <Trash2 className="w-2.5 h-2.5" />
                            </button>
                          </div>

                          {/* Platform & Time */}
                          <div className="flex items-center justify-between gap-1 mb-1.5">
                            <span className={cn("text-[9px] font-mono px-1.5 py-0.2 rounded border font-semibold", badgeColor)}>
                              {item.platform}
                            </span>
                            <div className="flex items-center gap-1 text-[11px] font-mono text-white/50">
                              <Clock className="w-2.5 h-2.5" />
                              <span>{item.time}</span>
                            </div>
                          </div>

                          {/* Title with balanced line clamp */}
                          <div className="text-xs font-medium text-white/90 leading-snug line-clamp-3">
                            {item.title}
                          </div>

                          {/* Status and Edit Indicator */}
                          <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-white/[0.06]">
                            <span className={cn(
                              "text-[9px] font-mono uppercase font-semibold flex items-center gap-1",
                              item.status === "Ready" ? "text-emerald-400" :
                              item.status === "Queued" ? "text-cyan-400" : "text-amber-400"
                            )}>
                              <span className={cn(
                                "w-1.5 h-1.5 rounded-full",
                                item.status === "Ready" ? "bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)]" :
                                item.status === "Queued" ? "bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.8)]" : "bg-amber-400 shadow-[0_0_6px_rgba(245,158,11,0.8)]"
                              )} />
                              {item.status}
                            </span>

                            <span className="text-[9px] font-mono text-white/30 group-hover:text-white/70 transition-colors">
                              Edit →
                            </span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Add Slot Trigger */}
              <button
                onClick={() => handleOpenAdd(dayNumber)}
                className="w-full mt-2.5 py-1.5 rounded-xl border border-dashed border-white/[0.08] hover:border-cyan-400/50 text-[11px] font-mono text-white/40 hover:text-cyan-300 hover:bg-cyan-500/[0.04] flex items-center justify-center gap-1 transition-all cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>Add Slot</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Interactive Modal for Add / Edit Slot */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-[#0b0d14] border border-white/[0.14] shadow-2xl rounded-2xl p-6 w-full max-w-md space-y-5 text-left"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                    <CalendarDays className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">
                      {editingItem ? "Edit Scheduled Drop" : "Schedule New Content Drop"}
                    </h3>
                    <p className="text-xs text-white/40 font-mono">
                      Target: {daysOfWeek[targetDay - 1]} Slot
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-1 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.06] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveModal} className="space-y-4">
                {/* Title */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-white/60 block">
                    Drop Title or Script Hook
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. 3 secret lighting tricks for high retention..."
                    className="w-full bg-white/[0.03] border border-white/[0.1] focus:border-cyan-400/60 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none transition-colors"
                  />
                </div>

                {/* Day selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-white/60 block">Publish Day</label>
                  <div className="grid grid-cols-7 gap-1">
                    {daysOfWeek.map((dName, dIdx) => (
                      <button
                        key={dName}
                        type="button"
                        onClick={() => setTargetDay(dIdx + 1)}
                        className={cn(
                          "py-1.5 text-xs font-mono rounded-lg border transition-all cursor-pointer",
                          targetDay === dIdx + 1
                            ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-300 font-bold"
                            : "border-white/[0.06] text-white/40 hover:text-white"
                        )}
                      >
                        {dName}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time & Platform */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-white/60 block">Drop Time</label>
                    <input
                      type="text"
                      value={formTime}
                      onChange={(e) => setFormTime(e.target.value)}
                      placeholder="18:00"
                      className="w-full bg-white/[0.03] border border-white/[0.1] focus:border-cyan-400/60 rounded-xl px-3.5 py-2 text-xs font-mono text-white focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-white/60 block">Platform</label>
                    <select
                      value={formPlatform}
                      onChange={(e) => setFormPlatform(e.target.value as any)}
                      className="w-full bg-[#0d0f18] border border-white/[0.1] focus:border-cyan-400/60 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none"
                    >
                      {platformsList.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Status */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-white/60 block">Status State</label>
                  <div className="grid grid-cols-3 gap-2">
                    {statusList.map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setFormStatus(st)}
                        className={cn(
                          "py-2 text-xs font-mono rounded-xl border transition-all cursor-pointer capitalize",
                          formStatus === st
                            ? st === "Ready" ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300 font-bold" :
                              st === "Queued" ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-300 font-bold" :
                              "bg-amber-500/20 border-amber-500/40 text-amber-300 font-bold"
                            : "border-white/[0.06] text-white/40 hover:text-white"
                        )}
                      >
                        ● {st}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-white/[0.08]">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-mono text-white/50 hover:text-white transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-medium text-xs font-mono transition-all cursor-pointer shadow-[0_0_15px_rgba(99,102,241,0.35)]"
                  >
                    {editingItem ? "Update Drop" : "Schedule Drop"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
