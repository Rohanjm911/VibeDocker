"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  BadgeDollarSign,
  CheckCircle,
  Sparkles,
  Calculator,
  Copy,
  Check,
  DollarSign,
  X,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import AnimeCounter from "@/components/shared/AnimeCounter";

const brandScore = 72;

const auditVectors = [
  {
    label: "Engagement Quality",
    score: 84,
    desc: "Real, active audience — sub-3% bot footprint",
    color: "from-emerald-500 to-teal-400",
    textColor: "text-emerald-400",
  },
  {
    label: "Content Consistency",
    score: 78,
    desc: "Posting 4–5x/week cadence sustained over 90D",
    color: "from-cyan-500 to-blue-400",
    textColor: "text-cyan-400",
  },
  {
    label: "Niche Authority",
    score: 71,
    desc: "High category relevance in Tech, Fitness & Lifestyle",
    color: "from-indigo-500 to-violet-400",
    textColor: "text-indigo-400",
  },
  {
    label: "Audience Trust Score",
    score: 88,
    desc: "Top 4% bookmark & DM recommendation velocity",
    color: "from-violet-500 to-pink-400",
    textColor: "text-pink-400",
  },
  {
    label: "Follower Growth Rate",
    score: 62,
    desc: "Organic compounding pacing (+18.4% monthly)",
    color: "from-amber-500 to-yellow-400",
    textColor: "text-amber-400",
  },
  {
    label: "Brand Safety & Clean Record",
    score: 95,
    desc: "Zero controversial or algorithmic strike flags detected",
    color: "from-emerald-500 to-green-400",
    textColor: "text-emerald-400",
  },
];

const brandOpportunities = [
  {
    id: 1,
    brand: "Cloud Compute Labs",
    category: "Developer & AI Infrastructure",
    fit: 94,
    budget: "₹45,000 – ₹80,000",
    deliverables: "1x 45s Dedicated Reel + 2x Story Polls",
    timeline: "Q4 Launch Sprint (Next 14 Days)",
    brief: "Showcase how solo indie creators build micro-apps in under 2 minutes using Cloud Compute APIs.",
    fitColor: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    avatar: "CC",
  },
  {
    id: 2,
    brand: "Hardware Gear Co.",
    category: "Creator Studio & Ergonomics",
    fit: 89,
    budget: "₹35,000 – ₹55,000",
    deliverables: "1x Studio Desk Tour Integration + Link in Bio",
    timeline: "Product Gifting + Paid Integration",
    brief: "High-contrast desk aesthetic integration featuring wireless mechanical keyboard & monitor arm.",
    fitColor: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
    avatar: "HG",
  },
  {
    id: 3,
    brand: "AI Model Suite",
    category: "Productivity Software",
    fit: 82,
    budget: "₹25,000 – ₹45,000",
    deliverables: "60s Screen recording walkthrough reel",
    timeline: "Immediate Booking",
    brief: "Demonstrate batch voiceover transformation from raw voice memo to crisp studio quality.",
    fitColor: "bg-violet-500/15 text-violet-300 border-violet-500/30",
    avatar: "AI",
  },
  {
    id: 4,
    brand: "Ergonomics Lab",
    category: "Workspace & Posture",
    fit: 74,
    budget: "₹20,000 – ₹35,000",
    deliverables: "1x Problem/Solution reel integration",
    timeline: "Flexible (30 Days)",
    brief: "Relatable hook on neck fatigue after 8-hour editing sessions, transitioning into ergonomic solution.",
    fitColor: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    avatar: "EL",
  },
];

const improvements = [
  {
    title: "Cross 50K Audience Milestone",
    desc: "Currently at 48.2K base. Crossing 50K unlocks agency enterprise budgets (+40% average deal size).",
    metric: "48.2K / 50.0K (96%)",
  },
  {
    title: "Enforce Standard 30-Day Paid Whitelisting Multiplier",
    desc: "Never grant perpetual ad usage for free. Always add 1.3x to 1.6x line item for paid ads usage.",
    metric: "+₹12,000–₹20,000 upside",
  },
  {
    title: "Embed Live Creator Media Kit Link in Bio",
    desc: "Brand managers review live rate cards 3x faster when media kits have verified telemetry links.",
    metric: "Instant Handshake Uplink",
  },
];

export default function BrandPage() {
  // Deal Rate Calculator State
  const [formatType, setFormatType] = useState<"dedicated" | "integrated" | "multi" | "stories">("dedicated");
  const [usageRights, setUsageRights] = useState<"organic" | "whitelisting" | "perpetual">("whitelisting");
  const [exclusivity, setExclusivity] = useState<"none" | "exclusive30">("none");
  const [selectedBrand, setSelectedBrand] = useState<(typeof brandOpportunities)[0] | null>(null);
  const [copiedPitch, setCopiedPitch] = useState(false);
  const [copiedKitLink, setCopiedKitLink] = useState(false);

  // Dynamic Rate Calculation
  const calculatedDeal = useMemo(() => {
    const base = 35000; // Base 45s integration rate for 48K base at 7.4% engagement

    const formatMultipliers = {
      dedicated: 1.0,
      integrated: 0.65,
      multi: 1.45,
      stories: 0.35,
    };

    const usageMultipliers = {
      organic: 1.0,
      whitelisting: 1.35,
      perpetual: 1.7,
    };

    const exclusivityMultipliers = {
      none: 1.0,
      exclusive30: 1.25,
    };

    const multiplier =
      formatMultipliers[formatType] * usageMultipliers[usageRights] * exclusivityMultipliers[exclusivity];

    const recommended = Math.round((base * multiplier) / 500) * 500;
    const floor = Math.round((recommended * 0.82) / 500) * 500;
    const ceiling = Math.round((recommended * 1.25) / 500) * 500;

    return { recommended, floor, ceiling };
  }, [formatType, usageRights, exclusivity]);

  const copyMediaKit = () => {
    navigator.clipboard.writeText("https://vibedocker.studio/kit/aria-thorne");
    setCopiedKitLink(true);
    setTimeout(() => setCopiedKitLink(false), 2000);
  };

  const copyBrandPitch = (text: string) => {
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
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600/30 via-emerald-500/30 to-cyan-500/30 border border-white/10 flex items-center justify-center text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.25)]">
            <BadgeDollarSign className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-white">Sponsor Readiness</h1>
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 flex items-center gap-1.5">
                <CheckCircle className="w-3 h-3 text-emerald-400" />
                Tier-2 Agency Verified
              </span>
            </div>
            <p className="text-xs text-white/50 mt-0.5">
              Algorithmic brand valuation, interactive rate calculator, and live sponsor deal pipeline.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={copyMediaKit}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white/80 hover:text-white text-xs font-mono transition-all border border-white/[0.08] cursor-pointer"
          >
            {copiedKitLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedKitLink ? "Link Copied!" : "Copy Media Kit Link"}</span>
          </button>
        </div>
      </motion.div>

      {/* 4 KPI Commercial Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Readiness Rating",
            value: 72,
            max: 100,
            suffix: "/100",
            delta: "Tier-2 High Commercial Demand",
            color: "text-emerald-400",
            bg: "from-emerald-500/15 to-transparent",
            border: "border-emerald-500/30",
          },
          {
            label: "Active Inbound Pipeline",
            valueText: "₹1.85 Lakhs",
            delta: "Across 4 vetted brands",
            color: "text-cyan-400",
            bg: "from-cyan-500/15 to-transparent",
            border: "border-cyan-500/30",
          },
          {
            label: "Recommended Base Rate",
            valueText: "₹35,000",
            delta: "Per 45s dedicated integration",
            color: "text-amber-400",
            bg: "from-amber-500/15 to-transparent",
            border: "border-amber-500/30",
          },
          {
            label: "Brand Safety Index",
            value: 99.4,
            decimals: 1,
            suffix: "%",
            delta: "Enterprise compliance ready",
            color: "text-violet-400",
            bg: "from-violet-500/15 to-transparent",
            border: "border-violet-500/30",
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

      {/* Top Section: Audit Vectors & Commercial Valuation */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Readiness Core Gauge (4 Columns) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-4 obsidian-card p-6 rounded-2xl border border-emerald-500/30 flex flex-col justify-between space-y-5 bg-gradient-to-b from-emerald-500/[0.06] to-transparent"
        >
          <div>
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-4">
              <span className="text-xs font-mono uppercase text-white/60 tracking-wider">Readiness Matrix</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                Tier-2 Commercial
              </span>
            </div>

            <div className="text-center py-2 space-y-2">
              <div className="text-6xl font-mono font-bold text-white tracking-tight flex items-center justify-center gap-1">
                <AnimeCounter value={brandScore} duration={1200} />
                <span className="text-2xl text-white/40 font-normal">/100</span>
              </div>
              <div className="inline-block text-xs font-mono font-bold text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 rounded-full">
                ★ Strong Commercial Fit
              </div>
            </div>

            <p className="text-xs font-mono text-white/60 text-center leading-relaxed mt-4">
              Current cohort profile is valued at <strong>₹35,000 – ₹55,000</strong> per dedicated integration based on 7.4% engagement and low bot footprint.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1 text-center">
            <span className="text-[11px] font-mono text-white/40 block">Estimated Annual Creator Value</span>
            <span className="text-base font-mono font-bold text-emerald-400">₹6.4 Lakhs – ₹9.8 Lakhs</span>
          </div>
        </motion.div>

        {/* 6 Audit Vectors (8 Columns) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="lg:col-span-8 obsidian-card p-6 rounded-2xl border border-white/[0.08] space-y-5"
        >
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <div>
              <span className="text-xs font-mono uppercase text-white font-bold tracking-wide">
                Commercial Audit Vectors
              </span>
              <p className="text-[11px] text-white/40 mt-0.5">Automated brand safety and conversion health indicators</p>
            </div>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-full">
              6 Verified Signals
            </span>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {auditVectors.map((v) => (
              <div
                key={v.label}
                className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-2 hover:border-white/[0.12] transition-all"
              >
                <div className="flex items-center justify-between font-mono">
                  <span className="text-xs text-white/90 font-medium">{v.label}</span>
                  <span className={cn("text-xs font-bold", v.textColor)}>{v.score}/100</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                  <div
                    className={cn("h-full rounded-full transition-all duration-700 bg-gradient-to-r", v.color)}
                    style={{ width: `${v.score}%` }}
                  />
                </div>
                <p className="text-[11px] font-sans text-white/40 truncate">{v.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Interactive Deal Rate Calculator */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="obsidian-card p-6 rounded-2xl border border-white/[0.08] space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-white">
                Interactive Brand Quote Calculator
              </h2>
              <p className="text-xs text-white/50">
                Generate market-clearing rate recommendations based on deliverables, whitelisting rights, and exclusivity
              </p>
            </div>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
            Real-Time Valuation
          </span>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 items-start">
          {/* Controls Column (7 Columns) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Format Selector */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-white/50 block">
                Deliverable Format
              </label>
              <div className="grid grid-cols-2 gap-2">
                {([
                  { id: "dedicated", label: "Dedicated Reel (60s)", desc: "100% Brand Focus" },
                  { id: "integrated", label: "Integrated Spot (30s)", desc: "Part of Regular Topic" },
                  { id: "multi", label: "Cross-Platform Drop", desc: "Reel + YouTube Short" },
                  { id: "stories", label: "Story Trio (3 Frames)", desc: "Direct Link Stickers" },
                ] as const).map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFormatType(f.id)}
                    className={cn(
                      "p-3 rounded-xl text-left border transition-all cursor-pointer font-mono",
                      formatType === f.id
                        ? "bg-white text-black border-white shadow-md font-bold"
                        : "bg-white/[0.02] border-white/[0.06] text-white/70 hover:bg-white/[0.05]"
                    )}
                  >
                    <div className="text-xs">{f.label}</div>
                    <div className={cn("text-[10px] mt-0.5", formatType === f.id ? "text-black/60" : "text-white/40")}>
                      {f.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Usage Rights Selector */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-white/50 block">
                Paid Usage & Whitelisting Rights
              </label>
              <div className="grid grid-cols-3 gap-2">
                {([
                  { id: "organic", label: "Organic Only", sub: "No Paid Ads" },
                  { id: "whitelisting", label: "30D Whitelisting", sub: "+35% Premium" },
                  { id: "perpetual", label: "90D Ad Rights", sub: "+70% Premium" },
                ] as const).map((u) => (
                  <button
                    key={u.id}
                    onClick={() => setUsageRights(u.id)}
                    className={cn(
                      "p-2.5 rounded-xl text-left border transition-all cursor-pointer font-mono",
                      usageRights === u.id
                        ? "bg-white text-black border-white shadow-md font-bold"
                        : "bg-white/[0.02] border-white/[0.06] text-white/70 hover:bg-white/[0.05]"
                    )}
                  >
                    <div className="text-xs">{u.label}</div>
                    <div className={cn("text-[10px] mt-0.5", usageRights === u.id ? "text-black/60" : "text-emerald-400")}>
                      {u.sub}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Exclusivity Selector */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-white/50 block">
                Competitor Exclusivity Clause
              </label>
              <div className="grid grid-cols-2 gap-2">
                {([
                  { id: "none", label: "No Exclusivity", sub: "Can promote adjacent tools" },
                  { id: "exclusive30", label: "30-Day Category Lock", sub: "+25% Exclusivity Fee" },
                ] as const).map((e) => (
                  <button
                    key={e.id}
                    onClick={() => setExclusivity(e.id)}
                    className={cn(
                      "p-2.5 rounded-xl text-left border transition-all cursor-pointer font-mono",
                      exclusivity === e.id
                        ? "bg-white text-black border-white shadow-md font-bold"
                        : "bg-white/[0.02] border-white/[0.06] text-white/70 hover:bg-white/[0.05]"
                    )}
                  >
                    <div className="text-xs">{e.label}</div>
                    <div className={cn("text-[10px] mt-0.5", exclusivity === e.id ? "text-black/60" : "text-white/40")}>
                      {e.sub}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quotation Preview Card (5 Columns) */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-[#090a12] border border-cyan-500/30 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <span className="text-xs font-mono uppercase text-cyan-300 font-bold flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-cyan-400" /> Recommended Quote
              </span>
              <span className="text-[10px] font-mono text-white/40">Market Benchmark</span>
            </div>

            <div className="space-y-1 text-center py-2">
              <div className="text-4xl sm:text-5xl font-mono font-bold text-white tracking-tight">
                ₹{calculatedDeal.recommended.toLocaleString("en-IN")}
              </div>
              <p className="text-xs font-mono text-emerald-400">
                Optimal contract quote for this package
              </p>
            </div>

            {/* Negotiation Corridor */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/[0.06] font-mono text-xs">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <span className="text-[10px] text-white/40 block mb-0.5 uppercase">Walk-Away Floor</span>
                <span className="text-white font-bold">₹{calculatedDeal.floor.toLocaleString("en-IN")}</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <span className="text-[10px] text-white/40 block mb-0.5 uppercase">Aggressive Ceiling</span>
                <span className="text-cyan-400 font-bold">₹{calculatedDeal.ceiling.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <button
              onClick={() =>
                copyBrandPitch(
                  `Standard Package Quote: ₹${calculatedDeal.recommended.toLocaleString("en-IN")}\nFormat: ${formatType}\nUsage: ${usageRights}\nExclusivity: ${exclusivity}\n\nIncludes 1 script approval round, native product utility demonstration, and 30-day performance telemetry analytics.`
                )
              }
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              {copiedPitch ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedPitch ? "Quote Copied to Clipboard!" : "Copy Rate Card Quote"}</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Matched Brand Deal Pipeline */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="obsidian-card p-6 rounded-2xl border border-white/[0.08] space-y-4"
      >
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
          <div>
            <span className="text-xs font-mono uppercase text-white font-bold tracking-wide">
              Matched Sponsor Pipeline
            </span>
            <p className="text-[11px] text-white/40 mt-0.5">
              Active brands looking for creator partnerships in your exact content category
            </p>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
            {brandOpportunities.length} Active Matches
          </span>
        </div>

        <div className="divide-y divide-white/[0.06]">
          {brandOpportunities.map((opp) => (
            <div
              key={opp.id}
              className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono hover:bg-white/[0.01] transition-colors rounded-xl px-2"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white font-mono font-bold text-xs flex-shrink-0">
                  {opp.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-white tracking-tight">{opp.brand}</span>
                    <span className={cn("text-[10px] font-mono px-2 py-0.5 rounded-full border font-bold", opp.fitColor)}>
                      {opp.fit}% Fit
                    </span>
                  </div>
                  <div className="text-xs text-white/40 mt-0.5">
                    {opp.category} · Estimated: <strong className="text-white/80">{opp.budget}</strong>
                  </div>
                  <div className="text-[11px] text-cyan-300/80 font-sans mt-0.5">{opp.deliverables}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end md:self-center flex-shrink-0">
                <button
                  onClick={() => setSelectedBrand(opp)}
                  className="px-3.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-mono transition-all border border-white/[0.08] cursor-pointer"
                >
                  Inspect Brief
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Strategic Directives for Rate Expansion */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="obsidian-card p-5 rounded-2xl border border-white/[0.08] space-y-4"
      >
        <div className="flex items-center gap-2 pb-2 border-b border-white/[0.08]">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-mono uppercase text-white font-bold tracking-wide">
            Action Items to Unlock Tier-1 Enterprise Rates (₹75K+)
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {improvements.map((action, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-2 font-mono"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/40">Step 0{i + 1}</span>
                <span className="text-emerald-400 font-bold">{action.metric}</span>
              </div>
              <h4 className="text-xs font-bold text-white tracking-tight">{action.title}</h4>
              <p className="text-[11px] text-white/60 font-sans leading-relaxed">{action.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Brand Brief Modal */}
      {selectedBrand && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedBrand(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="obsidian-card p-6 max-w-lg w-full border border-white/[0.12] bg-[#090a10] rounded-3xl shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-white font-mono font-bold text-base flex-shrink-0">
                  {selectedBrand.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white text-base">{selectedBrand.brand}</h3>
                    <span className={cn("text-[10px] font-mono px-2 py-0.5 rounded-full border font-bold", selectedBrand.fitColor)}>
                      {selectedBrand.fit}% Algorithmic Fit
                    </span>
                  </div>
                  <div className="text-xs font-mono text-white/40">{selectedBrand.category}</div>
                </div>
              </div>

              <button
                onClick={() => setSelectedBrand(null)}
                className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Campaign Objective & Deliverables */}
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-1">
                <span className="text-[10px] uppercase text-white/40 font-semibold">Campaign Brief & Narrative</span>
                <p className="text-xs text-white/90 font-sans leading-relaxed">{selectedBrand.brief}</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <span className="text-[10px] text-white/40 uppercase block">Required Deliverables</span>
                  <span className="text-white font-sans text-xs mt-0.5 block">{selectedBrand.deliverables}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <span className="text-[10px] text-white/40 uppercase block">Target Timeline</span>
                  <span className="text-emerald-400 font-sans text-xs mt-0.5 block">{selectedBrand.timeline}</span>
                </div>
              </div>
            </div>

            {/* Auto-Generated Brand Pitch Response */}
            <div className="p-3.5 rounded-2xl bg-[#0e0f18] border border-cyan-500/20 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-cyan-300 font-bold flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-cyan-400" /> Pre-Drafted Agency Outreach
                </span>
                <button
                  onClick={() =>
                    copyBrandPitch(
                      `Hi ${selectedBrand.brand} Team,\n\nThanks for reaching out. My 48.2K creator cohort aligns directly with your demographic (65% in 18–34 tech/fitness bracket with 7.4% average engagement).\n\nFor the ${selectedBrand.deliverables} campaign, our standard package is ${selectedBrand.budget}. We can have the initial script draft and hook storyboard ready within 4 business days.\n\nLooking forward to collaborating!`
                    )
                  }
                  className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                >
                  {copiedPitch ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedPitch ? "Copied" : "Copy Outreach Pitch"}</span>
                </button>
              </div>
              <p className="text-xs text-white/80 italic font-sans leading-relaxed">
                &ldquo;Hi {selectedBrand.brand} Team, thanks for reaching out. My 48.2K creator cohort aligns directly with your demographic. For the {selectedBrand.deliverables} campaign, our standard package is {selectedBrand.budget}...&rdquo;
              </p>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-2.5 pt-2">
              <Link
                href="/dashboard/brain"
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Script Integration</span>
              </Link>

              <button
                onClick={() => setSelectedBrand(null)}
                className="flex-1 py-2.5 rounded-xl bg-white text-black hover:bg-white/90 text-xs font-mono font-bold transition-all cursor-pointer"
              >
                Accept Brief & Hold
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
