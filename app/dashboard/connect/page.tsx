"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Search,
  Check,
  X,
  ArrowUpRight,
  Sparkles,
  Flame,
  MessageSquare,
  Copy,
  ExternalLink,
  RefreshCw,
  SlidersHorizontal,
  Zap,
  Globe,
  Radio,
  ChevronRight,
  Share2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useUser } from "@/lib/useUser";
import { CREATORS_BY_PERSONA, CreatorProfile } from "@/lib/creatorsData";
import AnimeCounter from "@/components/shared/AnimeCounter";
import AnimePulseBar from "@/components/shared/AnimePulseBar";

export default function ConnectPage() {
  const user = useUser();
  const [search, setSearch] = useState("");
  const [selectedNiche, setSelectedNiche] = useState("All");
  const [sortBy, setSortBy] = useState<"match" | "followers" | "engagement">("match");
  const [connected, setConnected] = useState<number[]>([]);
  const [dismissed, setDismissed] = useState<number[]>([]);
  const [selected, setSelected] = useState<CreatorProfile | null>(null);
  const [copiedPitch, setCopiedPitch] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const personaData = useMemo(() => {
    const platform = (user?.platform?.toLowerCase() || "instagram") as keyof typeof CREATORS_BY_PERSONA;
    return CREATORS_BY_PERSONA[platform] || CREATORS_BY_PERSONA.instagram;
  }, [user?.platform]);

  const creators = personaData.creators;
  const niches = personaData.niches;

  const filtered = useMemo(() => {
    return creators
      .filter((c) => {
        const matchSearch =
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.niche.toLowerCase().includes(search.toLowerCase()) ||
          c.handle.toLowerCase().includes(search.toLowerCase());
        const matchNiche = selectedNiche === "All" || c.niche.toLowerCase().includes(selectedNiche.toLowerCase());
        return matchSearch && matchNiche && !dismissed.includes(c.id);
      })
      .sort((a, b) => {
        if (sortBy === "match") return b.matchScore - a.matchScore;
        if (sortBy === "engagement") return parseFloat(b.engagement) - parseFloat(a.engagement);
        return 0;
      });
  }, [creators, search, selectedNiche, dismissed, sortBy]);

  const refreshNetwork = async () => {
    setRefreshing(true);
    await new Promise((r) => setTimeout(r, 750));
    setRefreshing(false);
  };

  const copyOutreach = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 font-sans">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-5"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600/30 via-indigo-500/30 to-purple-500/30 border border-white/10 flex items-center justify-center text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.25)]">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-white">Creator Uplink</h1>
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 flex items-center gap-1.5">
                <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
                Co-Creation Matrix Active
              </span>
            </div>
            <p className="text-xs text-white/50 mt-0.5">
              Cross-disciplinary collaborator matching powered by semantic audience overlap & creative synergy.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={refreshNetwork}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white/80 hover:text-white text-xs font-mono transition-all border border-white/[0.08] cursor-pointer"
          >
            <RefreshCw className={cn("w-3.5 h-3.5", refreshing && "animate-spin text-cyan-300")} />
            <span>{refreshing ? "Scanning Network..." : "Rescan Partners"}</span>
          </button>
        </div>
      </motion.div>

      {/* 4 KPI Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Matched Partners",
            value: filtered.length,
            suffix: " Creators",
            delta: "Active within your niche orbit",
            color: "text-cyan-400",
            bg: "from-cyan-500/15 to-transparent",
            border: "border-cyan-500/30",
          },
          {
            label: "Avg Synergy Score",
            value: 94.6,
            decimals: 1,
            suffix: "%",
            delta: "High demographic alignment",
            color: "text-emerald-400",
            bg: "from-emerald-500/15 to-transparent",
            border: "border-emerald-500/30",
          },
          {
            label: "Aggregate Network Reach",
            valueText: "3.4 Million",
            delta: "Cross-distribution upside",
            color: "text-violet-400",
            bg: "from-violet-500/15 to-transparent",
            border: "border-violet-500/30",
          },
          {
            label: "Uplink Requests",
            value: connected.length,
            suffix: " In Flight",
            delta: "Awaiting co-creation handshake",
            color: "text-amber-400",
            bg: "from-amber-500/15 to-transparent",
            border: "border-amber-500/30",
          },
        ].map((kpi, idx) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.04 }}
            className={cn("obsidian-card p-4.5 rounded-2xl relative overflow-hidden border", kpi.border)}
          >
            <div className={cn("absolute inset-0 bg-gradient-to-br pointer-events-none opacity-30", kpi.bg)} />
            <div className="relative z-10 flex flex-col justify-between h-full space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-white/50">{kpi.label}</span>
              <div>
                <div className={cn("text-2xl font-mono font-bold tracking-tight", kpi.color)}>
                  {kpi.valueText ? (
                    kpi.valueText
                  ) : (
                    <AnimeCounter
                      value={kpi.value!}
                      decimals={kpi.decimals || 0}
                      suffix={kpi.suffix || ""}
                    />
                  )}
                </div>
                <div className="text-[11px] font-sans text-white/50 mt-1">{kpi.delta}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* User Channel Dossier Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="obsidian-card p-4.5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-white/[0.08]"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-violet-600/30 to-pink-500/30 border border-white/10 flex items-center justify-center text-white font-mono font-bold text-sm overflow-hidden flex-shrink-0 shadow-lg">
            {user?.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              user?.avatar ?? "VD"
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white tracking-tight">{user?.name ?? "Aria Thorne"}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-300 border border-pink-500/20 uppercase font-bold">
                {user?.platform ?? "Instagram"}
              </span>
            </div>
            <div className="text-xs text-white/50 font-mono mt-0.5">
              Lane: <strong className="text-white/80">{user?.niche ?? "Fitness & Cyber-Aesthetics"}</strong> · Avg Eng: <strong className="text-emerald-400">{user?.engagement ?? "8.6%"}</strong>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white/70">Uplink Status: <strong>Open to Collabs</strong></span>
          </div>
        </div>
      </motion.div>

      {/* Search & Niche Filter Toolbar */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search creators, creative styles, handles, or collab vectors..."
              className="w-full bg-[#080910] border border-white/[0.08] focus:border-cyan-500/40 rounded-xl pl-10 pr-4 py-2.5 text-xs font-mono text-white placeholder-white/30 focus:outline-none transition-all shadow-inner"
            />
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-1.5 bg-[#080910] p-1.5 rounded-xl border border-white/[0.08] w-full sm:w-auto overflow-x-auto">
            <span className="text-[11px] font-mono text-white/40 px-2 flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3" /> Sort:
            </span>
            {(["match", "followers", "engagement"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSortBy(s)}
                className={cn(
                  "px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer capitalize",
                  sortBy === s ? "bg-white/10 text-white font-bold" : "text-white/40 hover:text-white"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Niche Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {niches.map((n) => (
            <button
              key={n}
              onClick={() => setSelectedNiche(n)}
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer border",
                selectedNiche === n
                  ? "bg-white text-black border-white shadow-md font-bold"
                  : "bg-white/[0.02] border-white/[0.06] text-white/50 hover:text-white hover:bg-white/[0.05]"
              )}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Creator Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((creator, i) => {
          const isUplinked = connected.includes(creator.id);

          return (
            <motion.div
              key={creator.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="obsidian-card p-5 rounded-2xl flex flex-col justify-between space-y-4 border border-white/[0.08] hover:border-white/[0.18] transition-all"
            >
              <div>
                {/* Creator Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.1] flex items-center justify-center text-white font-mono font-bold text-sm overflow-hidden flex-shrink-0 relative">
                      {creator.avatarUrl ? (
                        <img src={creator.avatarUrl} alt={creator.name} className="w-full h-full object-cover" />
                      ) : (
                        creator.avatar
                      )}
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-black" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="text-sm font-bold text-white tracking-tight truncate">{creator.name}</span>
                        {creator.verified && <Check className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />}
                      </div>
                      <div className="text-xs font-mono text-white/40 truncate">{creator.handle}</div>
                    </div>
                  </div>

                  {/* Synergy Match Pill */}
                  <div className="text-right flex-shrink-0">
                    <div className="flex items-center gap-1 text-xs font-mono font-bold px-2 py-0.5 rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                      <Sparkles className="w-3 h-3 text-emerald-400" />
                      <span>{creator.matchScore}%</span>
                    </div>
                    <span className="text-[9px] font-mono text-white/40 block mt-0.5 uppercase">Synergy</span>
                  </div>
                </div>

                {/* Niche Focus Pill */}
                <div className="text-xs font-mono text-cyan-300/90 mb-3 px-3 py-1.5 rounded-xl bg-cyan-500/[0.06] border border-cyan-500/15">
                  {creator.niche}
                </div>

                {/* Collab Vector Preview */}
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1 mb-3">
                  <span className="text-[10px] font-mono uppercase text-pink-300 font-semibold flex items-center gap-1">
                    <Zap className="w-3 h-3 text-pink-400" /> Proposed Co-Production Angle
                  </span>
                  <p className="text-xs text-white/80 font-sans leading-relaxed line-clamp-2">
                    {creator.collab}
                  </p>
                </div>

                {/* Stats Telemetry */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] text-center">
                    <div className="text-xs font-mono font-bold text-white">{creator.followers}</div>
                    <div className="text-[10px] font-mono text-white/40 uppercase">Community</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] text-center">
                    <div className="text-xs font-mono font-bold text-emerald-400">{creator.engagement}</div>
                    <div className="text-[10px] font-mono text-white/40 uppercase">Engagement</div>
                  </div>
                </div>

                {/* Platform Indicators & Mutual Contacts */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {creator.platforms.map((p) => (
                    <span
                      key={p}
                      className="text-[9px] font-mono uppercase px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-white/70"
                    >
                      {p}
                    </span>
                  ))}
                  {creator.mutual > 0 && (
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-white/[0.02] text-white/40 border border-white/[0.04]">
                      {creator.mutual} mutual connections
                    </span>
                  )}
                </div>
              </div>

              {/* Action Strip */}
              <div className="flex items-center gap-2 pt-2 border-t border-white/[0.06]">
                <button
                  onClick={() => setDismissed((d) => [...d, creator.id])}
                  title="Dismiss partner"
                  className="p-2 rounded-xl bg-white/[0.03] hover:bg-rose-500/10 hover:text-rose-400 text-white/30 transition-all border border-white/[0.06] cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setSelected(creator)}
                  className="flex-1 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-white/80 hover:text-white text-xs font-mono font-medium transition-all border border-white/[0.06] cursor-pointer"
                >
                  Dossier
                </button>

                <button
                  onClick={() =>
                    setConnected((c) =>
                      c.includes(creator.id) ? c.filter((id) => id !== creator.id) : [...c, creator.id]
                    )
                  }
                  className={cn(
                    "flex-1 py-2 rounded-xl text-xs font-mono font-bold transition-all border cursor-pointer",
                    isUplinked
                      ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                      : "bg-white text-black hover:bg-white/90 border-white shadow-sm"
                  )}
                >
                  {isUplinked ? "Handshake Sent" : "Uplink"}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Inspect Partner Dossier Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="obsidian-card p-6 max-w-lg w-full border border-white/[0.12] bg-[#090a10] rounded-3xl shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-white font-mono font-bold text-base overflow-hidden flex-shrink-0">
                  {selected.avatarUrl ? (
                    <img src={selected.avatarUrl} alt={selected.name} className="w-full h-full object-cover" />
                  ) : (
                    selected.avatar
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-white text-base">{selected.name}</h3>
                    {selected.verified && <Check className="w-4 h-4 text-cyan-400" />}
                  </div>
                  <div className="text-xs font-mono text-white/40">{selected.handle}</div>
                </div>
              </div>

              <button
                onClick={() => setSelected(null)}
                className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Synergy & Overlap Strip */}
            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-white/60">Semantic Demographic Overlap</span>
                <span className="text-emerald-400 font-bold">{selected.matchScore}% Match Index</span>
              </div>
              <AnimePulseBar score={selected.matchScore} barClassName="bg-emerald-400" />
            </div>

            {/* Spec Matrix */}
            <div className="space-y-2 text-xs font-mono">
              {[
                { label: "Niche Focus", value: selected.niche },
                { label: "Creative Style", value: selected.style },
                { label: "Collab Concept", value: selected.collab },
                { label: "Community Size", value: `${selected.followers} followers (${selected.engagement} avg eng)` },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] space-y-0.5"
                >
                  <span className="text-[10px] uppercase text-white/40 font-semibold">{item.label}</span>
                  <div className="text-xs text-white/90 font-sans leading-relaxed">{item.value}</div>
                </div>
              ))}
            </div>

            {/* Pre-Generated Personalized Pitch */}
            <div className="p-3.5 rounded-2xl bg-[#0e0f18] border border-cyan-500/20 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-cyan-300 font-bold flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-cyan-400" /> Generated Outreach Pitch
                </span>
                <button
                  onClick={() =>
                    copyOutreach(
                      `Hey ${selected.name}, love your work on ${selected.niche}. I'm co-producing a high-retention reel on "${selected.collab}" and our audiences have a ${selected.matchScore}% affinity match. Let's do a cross-post drop next week!`
                    )
                  }
                  className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                >
                  {copiedPitch ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedPitch ? "Copied" : "Copy Pitch"}</span>
                </button>
              </div>
              <p className="text-xs text-white/80 italic font-sans leading-relaxed">
                &ldquo;Hey {selected.name}, love your work on {selected.niche}. I'm co-producing a high-retention reel on &lsquo;{selected.collab}&rsquo; and our audiences have a {selected.matchScore}% affinity match. Let's do a cross-post drop next week!&rdquo;
              </p>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-2.5 pt-2">
              <Link
                href="/dashboard/brain"
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(99,102,241,0.3)]"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Co-Forge Script</span>
              </Link>

              <button
                onClick={() => {
                  setConnected((c) => (c.includes(selected.id) ? c : [...c, selected.id]));
                  setSelected(null);
                }}
                className={cn(
                  "flex-1 py-2.5 rounded-xl text-xs font-mono font-bold transition-all border cursor-pointer",
                  connected.includes(selected.id)
                    ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                    : "bg-white text-black hover:bg-white/90 border-white"
                )}
              >
                {connected.includes(selected.id) ? "Handshake Sent" : "Send Uplink Handshake"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
