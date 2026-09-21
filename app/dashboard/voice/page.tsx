"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Flame,
  Check,
  Copy,
  Filter,
  RefreshCw,
  Send,
  Zap,
  HelpCircle,
  ThumbsUp,
  AlertCircle,
  ShieldCheck,
  Radio,
  Layers,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import AnimeCounter from "@/components/shared/AnimeCounter";
import AnimePulseBar from "@/components/shared/AnimePulseBar";

// Raw comment signals
const comments = [
  {
    id: 1,
    user: "Aarav Mehta",
    handle: "@aarav_lifts",
    platform: "Instagram Reel",
    platformColor: "text-pink-400 bg-pink-500/10 border-pink-500/20",
    text: "Can you do a full beginner workout tutorial with zero equipment? I live in a shared flat and have been struggling to start for months!",
    sentiment: "positive",
    intent: "Content Request",
    urgency: "High Demand",
    post: "Morning Energy Habits Reel",
    time: "2h ago",
  },
  {
    id: 2,
    user: "Sneha Kapoor",
    handle: "@sneha_curates",
    platform: "YouTube",
    platformColor: "text-rose-400 bg-rose-500/10 border-rose-500/20",
    text: "Please make a step-by-step video about meal prep for beginners. Every other video uses rare expensive groceries that go bad in 3 days.",
    sentiment: "positive",
    intent: "Content Request",
    urgency: "High Demand",
    post: "High Protein Kitchen Tour",
    time: "4h ago",
  },
  {
    id: 3,
    user: "Devansh Nair",
    handle: "@dev_nair_tech",
    platform: "TikTok",
    platformColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    text: "What camera lens and lighting setup do you use? The cinematic roll has zero grain even in moody lighting.",
    sentiment: "positive",
    intent: "Gear Inquiry",
    urgency: "Moderate",
    post: "Indie Creator Studio Setup",
    time: "6h ago",
  },
  {
    id: 4,
    user: "Vikram Malhotra",
    handle: "@vikram_m",
    platform: "Instagram DM",
    platformColor: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    text: "I tried the 75-Hard routine you discussed, but work meetings killed day 14. How do you adjust when corporate work derails the schedule?",
    sentiment: "neutral",
    intent: "Pain Point / Barrier",
    urgency: "High Engagement",
    post: "75 Hard Mental Resilience",
    time: "9h ago",
  },
  {
    id: 5,
    user: "Rhea Sen",
    handle: "@rhea_aesthetic",
    platform: "Instagram Reel",
    platformColor: "text-pink-400 bg-pink-500/10 border-pink-500/20",
    text: "I love the clean aesthetic, but honestly most luxury pieces are out of budget. Can you show quiet luxury thrifted or affordable alternatives?",
    sentiment: "neutral",
    intent: "Price Objection",
    urgency: "Viral Angle",
    post: "Quiet Luxury Wardrobe Capsule",
    time: "12h ago",
  },
  {
    id: 6,
    user: "Kunal Verma",
    handle: "@kunal_builds",
    platform: "LinkedIn",
    platformColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    text: "The ₹4.2 Lakh revenue breakdown was eye-opening. What was your actual net profit after paying editor and software subscriptions?",
    sentiment: "positive",
    intent: "Deep Inquisitive",
    urgency: "High B2B Intent",
    post: "Creator Income Transparency",
    time: "1d ago",
  },
  {
    id: 7,
    user: "Ananya Joshi",
    handle: "@ananya_j",
    platform: "YouTube",
    platformColor: "text-rose-400 bg-rose-500/10 border-rose-500/20",
    text: "The audio pacing in the middle 20 seconds was too fast to read the screen tables. Can you slow it down in the next breakdown?",
    sentiment: "negative",
    intent: "Pacing Critique",
    urgency: "Production Feedback",
    post: "Solo Creator AI Tools",
    time: "1d ago",
  },
  {
    id: 8,
    user: "Rohan Das",
    handle: "@rohan_fitness",
    platform: "TikTok",
    platformColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    text: "Where is the Spotify playlist you used for background music? Need it for morning gym sessions immediately!",
    sentiment: "positive",
    intent: "Community Asset Request",
    urgency: "Easy Win",
    post: "Morning Energy Habits Reel",
    time: "2d ago",
  },
];

// NLP-Synthesized Content Ideas
const contentIdeas = [
  {
    id: 1,
    title: "Zero-Equipment Home Workout Protocol",
    category: "Fitness & Form",
    source: "24 comments & 9 DMs requested this in past 48h",
    confidence: 96,
    urgency: "Viral Demand",
    urgencyColor: "bg-rose-500/15 text-rose-300 border-rose-500/30",
    communityQuote: "I have zero dumbbells, shared flat floor space, and 20 mins before my commute.",
    blueprintHook: "If you only have floor space and 18 minutes, do NOT do generic burpees. Here is the 4-movement circuit that builds real muscle without touching a weight.",
    targetAudience: "Busy urban commuters & apartment dwellers",
    expectedRetention: "88% at 15s mark",
  },
  {
    id: 2,
    title: "Budget Meal Prep for Solo Beginners (Under ₹1,500/Week)",
    category: "Health & Nutrition",
    source: "18 comments requested low-cost batch cooking",
    confidence: 91,
    urgency: "High Conversion",
    urgencyColor: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    communityQuote: "Most recipes use ₹800 avocado oil and spoil by Wednesday night.",
    blueprintHook: "Stop buying 14 different ingredients for meal prep. Here are the 3 staple groceries that gave me 120g daily protein for under ₹200 a day.",
    targetAudience: "College students & young corporate professionals",
    expectedRetention: "84% at 15s mark",
  },
  {
    id: 3,
    title: "Quiet Luxury on a Real Budget: 3 Fabric Tests",
    category: "Style & Curation",
    source: "14 comments asked for affordable thrift alternatives",
    confidence: 86,
    urgency: "Cultural Wave",
    urgencyColor: "bg-pink-500/15 text-pink-300 border-pink-500/30",
    communityQuote: "Can you show how to dress quiet luxury without spending ₹25,000 on a cashmere knit?",
    blueprintHook: "You don't need a ₹20,000 sweater to look well-dressed. Look at these 3 fabric tags under ₹1,200 that look identical to Italian cashmere.",
    targetAudience: "Aesthetic minimalists & conscious shoppers",
    expectedRetention: "82% at 15s mark",
  },
  {
    id: 4,
    title: "Behind the Lens: $0 Smartphone Lighting Hacks",
    category: "Creator Tech",
    source: "11 comments asking for studio camera & lighting setup",
    confidence: 79,
    urgency: "High Trust",
    urgencyColor: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
    communityQuote: "What camera and keylight makes your skin tone look so sharp?",
    blueprintHook: "My entire camera setup looks like a $5,000 cinema rig, but I shot this whole video on a 2-year-old iPhone with a ₹400 desk lamp.",
    targetAudience: "Aspiring content creators & solo founders",
    expectedRetention: "79% at 15s mark",
  },
  {
    id: 5,
    title: "Unedited Creator P&L: True Net Profit After Expenses",
    category: "Finance & Media",
    source: "8 comments asked about taxes, software, and editor costs",
    confidence: 74,
    urgency: "High B2B Value",
    urgencyColor: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    communityQuote: "How much of that ₹4.2 Lakh revenue did you actually keep after expenses?",
    blueprintHook: "Everyone posts gross revenue screenshots. Here is the unvarnished bank balance sheet showing what happens after editor fees, GST, and SaaS subscriptions.",
    targetAudience: "Solopreneurs & agency owners",
    expectedRetention: "76% at 15s mark",
  },
];

// Latent Objections
const objections = [
  {
    objection: "Overwhelmed by complexity and high start-up friction",
    frequency: "38% of negative/neutral comments",
    insight: "Viewers fear getting started because tutorials assume existing fitness gear or expensive tools.",
    recommendedCure: "Produce 'Day 1 Frictionless Starter Protocol' with zero prerequisite investment.",
    targetHook: "'If you are completely overwhelmed, do not buy gym gear. Just do this one 2-minute habit today.'",
  },
  {
    objection: "Budget skepticism ('Easy for you to say with high budget')",
    frequency: "29% of comments on lifestyle reels",
    insight: "Perceived elitism creates friction between the creator and mainstream audience.",
    recommendedCure: "Publish explicit price tags, budget breakdowns, and thrift/affordable alternatives.",
    targetHook: "'Quiet luxury doesn't mean expensive. Here is how I styled 5 outfits for under ₹1,500 total.'",
  },
  {
    objection: "Pacing too dense for technical topics",
    frequency: "18% of long-form feedback",
    insight: "Viewers struggle to absorb split-second screen recordings of AI tools and financial balance sheets.",
    recommendedCure: "Insert 2.5-second freeze-frames on important tables and provide downloadable Notion summary.",
    targetHook: "'Pause right here to screenshot this table before we continue to step 2.'",
  },
];

const sentimentBreakdown = [
  { label: "Positive & Supportive", pct: 72, count: 1065, color: "bg-emerald-400", text: "text-emerald-400" },
  { label: "Inquisitive & Neutral", pct: 18, count: 266, color: "bg-cyan-400", text: "text-cyan-400" },
  { label: "Critique & Objections", pct: 10, count: 149, color: "bg-rose-400", text: "text-rose-400" },
];

export default function VoicePage() {
  const [activeTab, setActiveTab] = useState<"ideas" | "stream" | "objections">("ideas");
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [streamFilter, setStreamFilter] = useState("All");

  const triggerScan = async () => {
    setRefreshing(true);
    await new Promise((r) => setTimeout(r, 750));
    setRefreshing(false);
  };

  const copyBlueprint = (hook: string, id: number) => {
    navigator.clipboard.writeText(hook);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredIdeas = contentIdeas.filter(
    (item) => categoryFilter === "All" || item.category.toLowerCase().includes(categoryFilter.toLowerCase())
  );

  const filteredComments = comments.filter((c) => {
    if (streamFilter === "All") return true;
    if (streamFilter === "Positive") return c.sentiment === "positive";
    if (streamFilter === "Questions") return c.intent.toLowerCase().includes("inquiry") || c.intent.toLowerCase().includes("request");
    if (streamFilter === "Critique") return c.sentiment === "negative" || c.intent.toLowerCase().includes("barrier") || c.intent.toLowerCase().includes("objection");
    return true;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 font-sans">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-5"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-600/30 via-purple-500/30 to-cyan-500/30 border border-white/10 flex items-center justify-center text-pink-300 shadow-[0_0_20px_rgba(236,72,153,0.25)]">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-white">Audience Voice</h1>
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-pink-500/10 text-pink-300 border border-pink-500/20 flex items-center gap-1.5">
                <Radio className="w-3 h-3 text-pink-400 animate-pulse" />
                Community NLP Mining Active
              </span>
            </div>
            <p className="text-xs text-white/50 mt-0.5">
              Extract high-intent questions, latent audience objections, and viral prompts mined directly from comments and DMs.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={triggerScan}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white/80 hover:text-white text-xs font-mono transition-all border border-white/[0.08] cursor-pointer"
          >
            <RefreshCw className={cn("w-3.5 h-3.5", refreshing && "animate-spin text-pink-400")} />
            <span>{refreshing ? "Mining Inboxes..." : "Mine New Signals"}</span>
          </button>
        </div>
      </motion.div>

      {/* 4 KPI Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Signals Mined",
            value: 1480,
            suffix: "",
            delta: "+24.8% inbound growth",
            color: "text-cyan-400",
            bg: "from-cyan-500/15 to-transparent",
            border: "border-cyan-500/30",
          },
          {
            label: "Actionable Prompts",
            value: 42,
            suffix: " Concepts",
            delta: "High demand algorithm fit",
            color: "text-emerald-400",
            bg: "from-emerald-500/15 to-transparent",
            border: "border-emerald-500/30",
          },
          {
            label: "Net Community Sentiment",
            value: 84,
            prefix: "+",
            suffix: " NPS",
            delta: "72% positive praise ratio",
            color: "text-pink-400",
            bg: "from-pink-500/15 to-transparent",
            border: "border-pink-500/30",
          },
          {
            label: "Top Inbound Vector",
            valueText: "Beginner Protocols",
            delta: "148 comments & DMs",
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
                      prefix={kpi.prefix || ""}
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

      {/* Sentiment Distribution Center */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="obsidian-card p-6 space-y-5 rounded-2xl border border-white/[0.08]"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase text-white font-bold tracking-wide">
                Sentiment Distribution & Community Resonance (30D)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                72% Positive Health
              </span>
            </div>
            <p className="text-[11px] text-white/40 mt-0.5">
              Natural Language sentiment extraction across 1,480 incoming comments, stitch responses, and direct messages
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+6.4% Net Positive vs Last Sprint</span>
          </div>
        </div>

        {/* 3 Sentiment Metric Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
          {sentimentBreakdown.map((s) => (
            <div
              key={s.label}
              className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between"
            >
              <div>
                <span className="text-[11px] text-white/40 uppercase tracking-wider block mb-1">{s.label}</span>
                <div className={cn("text-2xl font-bold tracking-tight", s.text)}>{s.pct}%</div>
              </div>
              <div className="text-right">
                <span className="text-xs text-white/70 font-bold">{s.count}</span>
                <span className="text-[10px] text-white/30 block">Signals</span>
              </div>
            </div>
          ))}
        </div>

        {/* Multi-Color Segmented Bar */}
        <div className="space-y-1.5 pt-1">
          <div className="h-2.5 rounded-full overflow-hidden flex gap-1 bg-white/[0.04] p-0.5">
            {sentimentBreakdown.map((s) => (
              <motion.div
                key={s.label}
                initial={{ width: 0 }}
                animate={{ width: `${s.pct}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={cn("h-full rounded-full", s.color)}
              />
            ))}
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono text-white/40 px-1">
            <span>High Brand Affinity & Loyalty</span>
            <span>Technical Queries</span>
            <span>Actionable Objections</span>
          </div>
        </div>
      </motion.div>

      {/* Main Tabs Strip */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#080910] p-2 rounded-2xl border border-white/[0.08]">
        <div className="flex items-center gap-1.5 flex-wrap">
          {[
            { id: "ideas", label: "Extracted Content Blueprints", count: filteredIdeas.length },
            { id: "stream", label: "Live Signal Stream", count: filteredComments.length },
            { id: "objections", label: "Latent Objections & FAQ Matrix", count: objections.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer border flex items-center gap-2",
                activeTab === tab.id
                  ? "bg-white text-black border-white shadow-md font-bold"
                  : "bg-transparent border-transparent text-white/50 hover:text-white hover:bg-white/[0.04]"
              )}
            >
              <span>{tab.label}</span>
              <span className={cn("text-[10px] px-1.5 py-0.2 rounded-full", activeTab === tab.id ? "bg-black/15 text-black" : "bg-white/10 text-white/60")}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {activeTab === "ideas" && (
          <div className="flex items-center gap-1 bg-[#06070d] p-1 rounded-xl border border-white/[0.06]">
            {["All", "Fitness", "Nutrition", "Style", "Tech", "Finance"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all cursor-pointer",
                  categoryFilter === cat ? "bg-white/10 text-white font-bold" : "text-white/40 hover:text-white"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {activeTab === "stream" && (
          <div className="flex items-center gap-1 bg-[#06070d] p-1 rounded-xl border border-white/[0.06]">
            {["All", "Positive", "Questions", "Critique"].map((f) => (
              <button
                key={f}
                onClick={() => setStreamFilter(f)}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all cursor-pointer",
                  streamFilter === f ? "bg-white/10 text-white font-bold" : "text-white/40 hover:text-white"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Tab 1: Extracted Content Blueprints */}
      {activeTab === "ideas" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          {filteredIdeas.map((idea, i) => (
            <motion.div
              key={idea.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="obsidian-card p-5 rounded-2xl border border-white/[0.08] hover:border-white/[0.16] transition-all space-y-4"
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center font-mono font-bold text-xs text-white/60">
                    #{i + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                        {idea.title}
                      </h3>
                      <span className={cn("text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border font-bold", idea.urgencyColor)}>
                        {idea.urgency}
                      </span>
                      <span className="text-xs font-mono text-white/40">
                        {idea.category}
                      </span>
                    </div>
                    <div className="text-xs font-mono text-white/50 mt-0.5">
                      {idea.source}
                    </div>
                  </div>
                </div>

                {/* Signal Confidence Meter */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="text-right">
                    <div className="text-xs font-mono font-bold text-emerald-400">{idea.confidence}% Signal Match</div>
                    <div className="text-[10px] font-mono text-white/40">{idea.expectedRetention}</div>
                  </div>
                  <div className="w-16">
                    <AnimePulseBar score={idea.confidence} barClassName="bg-emerald-400" />
                  </div>
                </div>
              </div>

              {/* Verbatim Community Quote vs Blueprint Hook */}
              <div className="grid md:grid-cols-2 gap-4">
                {/* Community Quote */}
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                  <span className="text-[11px] font-mono uppercase text-white/50 flex items-center gap-1.5">
                    <MessageSquare className="w-3 h-3 text-cyan-400" /> Verbatim Community Pain Point
                  </span>
                  <p className="text-xs text-white/80 italic font-sans leading-relaxed">
                    &ldquo;{idea.communityQuote}&rdquo;
                  </p>
                </div>

                {/* Synthesized Hook Blueprint */}
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1 relative group">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase text-pink-300 font-semibold flex items-center gap-1.5">
                      <Zap className="w-3 h-3 text-pink-400" /> Production Attention Hook
                    </span>
                    <button
                      onClick={() => copyBlueprint(idea.blueprintHook, idea.id)}
                      className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                    >
                      {copiedId === idea.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedId === idea.id ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                  <p className="text-xs text-white/95 font-sans leading-relaxed">
                    &ldquo;{idea.blueprintHook}&rdquo;
                  </p>
                </div>
              </div>

              {/* Action Strip */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-white/[0.06]">
                <span className="text-[11px] font-mono text-white/40">
                  Target Demographic: <strong className="text-white/70">{idea.targetAudience}</strong>
                </span>

                <Link
                  href="/dashboard/brain"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(99,102,241,0.25)] flex-shrink-0"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Forge in BrainForge AI</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Tab 2: Live Signal Stream */}
      {activeTab === "stream" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          {filteredComments.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="obsidian-card p-4.5 rounded-2xl border border-white/[0.08] hover:border-white/[0.14] transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3.5 min-w-0">
                {/* User Avatar Initial */}
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/10 flex items-center justify-center font-mono font-bold text-xs text-white/80 flex-shrink-0">
                  {c.user[0]}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-xs font-bold text-white tracking-tight">{c.user}</span>
                    <span className="text-[11px] font-mono text-white/40">{c.handle}</span>
                    <span className={cn("text-[10px] font-mono px-2 py-0.5 rounded-full border", c.platformColor)}>
                      {c.platform}
                    </span>
                    <span className="text-[10px] font-mono text-white/30">• {c.time}</span>
                  </div>

                  <p className="text-xs text-white/90 font-sans leading-relaxed mb-2">
                    &ldquo;{c.text}&rdquo;
                  </p>

                  <div className="flex items-center gap-2 text-[10px] font-mono text-white/40 flex-wrap">
                    <span>Source: <strong className="text-white/60">{c.post}</strong></span>
                    <span>•</span>
                    <span className="uppercase text-cyan-300 font-semibold">{c.intent}</span>
                    <span>•</span>
                    <span className="text-pink-300">{c.urgency}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end md:self-center flex-shrink-0">
                <Link
                  href="/dashboard/brain"
                  className="px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white/80 hover:text-white text-xs font-mono transition-all border border-white/[0.08] flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Answer in Script</span>
                  <ArrowRight className="w-3 h-3 text-cyan-400" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Tab 3: Latent Objections & FAQ Matrix */}
      {activeTab === "objections" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            {objections.map((obj, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="obsidian-card p-5 rounded-2xl border border-white/[0.08] flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30 font-bold uppercase">
                      Recurring Friction #{i + 1}
                    </span>
                    <span className="text-[11px] font-mono text-white/40">{obj.frequency}</span>
                  </div>

                  <h4 className="text-sm font-bold text-white tracking-tight">
                    {obj.objection}
                  </h4>

                  <p className="text-xs text-white/70 font-sans leading-relaxed">
                    {obj.insight}
                  </p>

                  <div className="pt-2 border-t border-white/[0.06] space-y-1">
                    <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Content Remedy Strategy
                    </span>
                    <p className="text-xs text-white/90 font-sans">{obj.recommendedCure}</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                  <span className="text-[10px] font-mono uppercase text-pink-300 font-semibold flex items-center gap-1">
                    <Zap className="w-3 h-3" /> Recommended Disarming Hook
                  </span>
                  <p className="text-xs text-white/80 italic font-sans leading-relaxed">
                    {obj.targetHook}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Synthesis Strategic Card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="obsidian-card p-5 rounded-2xl border-l-4 border-l-pink-400 border border-white/[0.08] space-y-3 bg-[#0a0710]"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-pink-400" />
            <h3 className="text-xs font-mono uppercase tracking-wider text-white font-bold">
              NLP Direct Suggestion for Next Video
            </h3>
          </div>
          <span className="text-[10px] font-mono text-pink-300 bg-pink-500/10 border border-pink-500/20 px-2 py-0.5 rounded-full">
            Immediate Production Opportunity
          </span>
        </div>

        <p className="text-xs text-white/80 leading-relaxed font-mono">
          Over 38% of inbound queries center on <strong>&ldquo;Zero-Equipment Beginner Workouts&rdquo;</strong>. Address the latent objection of corporate commute fatigue to achieve instant audience trust and drive massive save/share ratios.
        </p>

        <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
          <span className="text-[11px] font-mono text-white/40">
            Semantic intelligence extracted across Instagram, YouTube, TikTok & LinkedIn
          </span>
          <Link
            href="/dashboard/brain"
            className="text-xs font-mono font-bold text-pink-300 hover:text-pink-200 flex items-center gap-1"
          >
            <span>Draft Full Script in BrainForge AI</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
