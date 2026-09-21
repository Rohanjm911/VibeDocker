"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Send,
  Copy,
  Check,
  Key,
  ShieldCheck,
  Flame,
  Zap,
  Clock,
  Music2,
  Camera,
  Hash,
  Share2,
  FileText,
  Sliders,
  Play,
  Lightbulb,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { buildKit, type Kit } from "@/lib/contentEngine";

const platforms = [
  { id: "Instagram", label: "Instagram Reels", color: "from-pink-500/20 to-purple-600/10 text-pink-400 border-pink-500/30" },
  { id: "YouTube", label: "YouTube Shorts", color: "from-rose-500/20 to-red-600/10 text-rose-400 border-rose-500/30" },
  { id: "TikTok", label: "TikTok Algorithm", color: "from-cyan-500/20 to-teal-600/10 text-cyan-400 border-cyan-500/30" },
  { id: "LinkedIn", label: "LinkedIn Post", color: "from-blue-500/20 to-indigo-600/10 text-blue-400 border-blue-500/30" },
];

const hookTypes = [
  { id: "Curiosity Gap", desc: "Leaves audience needing conclusion", emoji: "👁️" },
  { id: "Bold Claim", desc: "High conviction pattern interrupt", emoji: "⚡" },
  { id: "Question", desc: "Forces viewer mental response", emoji: "❓" },
  { id: "Story / Arc", desc: "First-person narrative immersion", emoji: "📖" },
  { id: "Controversy", desc: "Polarizing perspective shift", emoji: "🔥" },
  { id: "Number / List", desc: "Cognitive ease and structure", emoji: "📊" },
];

const topicIdeas = [
  "5 brutal habits that 10x creative productivity",
  "Why 99% of people fail their morning routine",
  "The 15-minute dopamine reset protocol",
  "3 camera hacks for solo creators with no budget",
];

export default function BrainPage() {
  const [topic, setTopic] = useState("Why 99% of creators fail in the first 90 days");
  const [platform, setPlatform] = useState("Instagram");
  const [hookType, setHookType] = useState("Curiosity Gap");
  const [loading, setLoading] = useState(false);
  const [kit, setKit] = useState<Kit | null>(() => buildKit("Why 99% of creators fail in the first 90 days", "Instagram", 1));
  const [copied, setCopied] = useState<string | null>(null);

  const [openRouterKey, setOpenRouterKey] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("openrouter_api_key") || "";
    }
    return "";
  });
  const [showKeyConfig, setShowKeyConfig] = useState(false);

  const [aiScript, setAiScript] = useState<string | null>(null);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const saveApiKey = (key: string) => {
    setOpenRouterKey(key);
    if (typeof window !== "undefined") {
      localStorage.setItem("openrouter_api_key", key);
    }
  };

  const handleGenerateKit = async (overrideTopic?: string) => {
    const query = overrideTopic ?? topic;
    if (!query.trim()) return;
    setLoading(true);
    setAiError(null);

    const generatedKit = buildKit(query, platform, Math.floor(Math.random() * 10) + 1);
    setKit(generatedKit);

    if (openRouterKey.trim()) {
      setIsGeneratingAi(true);
      try {
        const res = await fetch("/api/generate-script", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            topic: query,
            platform,
            hookType,
            apiKey: openRouterKey.trim(),
          }),
        });

        const data = await res.json();
        if (res.ok && data.script) {
          setAiScript(data.script);
        } else {
          setAiError(data.error || "Generation error.");
        }
      } catch (err: any) {
        setAiError(err.message || "Network error.");
      } finally {
        setIsGeneratingAi(false);
      }
    }

    setLoading(false);
  };

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-7">
      {/* Header with Title & API Key status */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600/30 via-indigo-600/30 to-cyan-400/30 border border-white/10 flex items-center justify-center text-cyan-300 shadow-[0_0_15px_rgba(99,102,241,0.25)]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-white tracking-tight">BrainForge AI</h1>
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20">
                Neural Script Engine
              </span>
            </div>
            <p className="text-xs text-white/50 mt-0.5">
              Production blueprints, high-velocity retention hooks, and full cinematic teleprompter scripts.
            </p>
          </div>
        </div>

        {/* Key Integration button */}
        <button
          onClick={() => setShowKeyConfig(!showKeyConfig)}
          className={cn(
            "flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-mono transition-all cursor-pointer",
            openRouterKey
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)]"
              : "bg-white/[0.03] border-white/[0.08] text-white/50 hover:text-white hover:bg-white/[0.06]"
          )}
        >
          <Key className="w-3.5 h-3.5" />
          <span>{openRouterKey ? "OpenRouter Active" : "Connect OpenRouter (Optional)"}</span>
        </button>
      </div>

      {/* Key Drawer */}
      <AnimatePresence>
        {showKeyConfig && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="obsidian-card p-4 space-y-2 border-emerald-500/30 bg-emerald-950/10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white/90 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Custom LLM Scripting (OpenRouter)
                </span>
                <span className="text-[10px] font-mono text-white/40">Stored locally in your browser</span>
              </div>
              <p className="text-[11px] text-white/50 font-sans">
                Enter your key to unlock live streaming AI scripts. Leave blank to use our deterministic rule-based production blueprint engine!
              </p>
              <input
                type="password"
                placeholder="sk-or-v1-..."
                value={openRouterKey}
                onChange={(e) => saveApiKey(e.target.value)}
                className="w-full bg-[#07080e] border border-white/[0.1] rounded-xl px-3.5 py-2 text-xs font-mono text-white placeholder-white/20 focus:outline-none focus:border-cyan-400/60"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Studio Input Matrix */}
      <div className="obsidian-card p-6 space-y-5 border-violet-500/20">
        {/* Main Concept Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono font-semibold uppercase tracking-wider text-white/80 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              Content Premise or Hook Angle
            </label>
            <span className="text-[11px] font-mono text-white/40">Press Enter to forge</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGenerateKit()}
              placeholder="e.g. Why 99% of people fail their first cut, 3 morning habit shifts..."
              className="flex-1 bg-[#090b12] border border-white/[0.1] focus:border-cyan-400/60 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none transition-colors font-sans"
            />
            <button
              onClick={() => handleGenerateKit()}
              disabled={loading || !topic.trim()}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-medium text-xs font-mono disabled:opacity-30 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(99,102,241,0.35)] flex-shrink-0"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              <span>Forge Blueprint</span>
            </button>
          </div>

          {/* Quick Idea Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[11px] font-mono text-white/40 flex items-center gap-1">
              <Lightbulb className="w-3 h-3 text-amber-400" /> Quick Seed:
            </span>
            {topicIdeas.map((idea) => (
              <button
                key={idea}
                onClick={() => {
                  setTopic(idea);
                  handleGenerateKit(idea);
                }}
                className="text-[11px] font-mono text-white/60 hover:text-cyan-300 bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] hover:border-cyan-500/30 px-2.5 py-1 rounded-lg transition-all cursor-pointer"
              >
                {idea}
              </button>
            ))}
          </div>
        </div>

        {/* Platform & Hook Archetype Selector */}
        <div className="grid lg:grid-cols-12 gap-5 pt-4 border-t border-white/[0.06]">
          {/* Distribution Targets */}
          <div className="lg:col-span-5 space-y-2">
            <label className="text-[11px] font-mono uppercase text-white/50 font-medium block">
              Distribution Engine
            </label>
            <div className="grid grid-cols-2 gap-2">
              {platforms.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPlatform(p.id)}
                  className={cn(
                    "p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between",
                    platform === p.id
                      ? cn("border", p.color, "bg-gradient-to-br font-semibold")
                      : "bg-white/[0.02] border-white/[0.06] text-white/40 hover:text-white/80 hover:bg-white/[0.04]"
                  )}
                >
                  <span className="text-xs font-mono">{p.label}</span>
                  {platform === p.id && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                </button>
              ))}
            </div>
          </div>

          {/* Hook Archetype Selector */}
          <div className="lg:col-span-7 space-y-2">
            <label className="text-[11px] font-mono uppercase text-white/50 font-medium block">
              Hook Archetype
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {hookTypes.map((h) => (
                <button
                  key={h.id}
                  onClick={() => setHookType(h.id)}
                  className={cn(
                    "p-2.5 rounded-xl border text-left transition-all cursor-pointer",
                    hookType === h.id
                      ? "bg-violet-500/15 border-violet-500/30 text-white font-semibold shadow-[0_0_15px_rgba(139,92,246,0.15)]"
                      : "bg-white/[0.02] border-white/[0.06] text-white/40 hover:text-white/80 hover:bg-white/[0.04]"
                  )}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs">{h.emoji}</span>
                    <span className="text-xs font-mono truncate">{h.id}</span>
                  </div>
                  <div className="text-[9px] text-white/40 font-sans truncate mt-0.5">{h.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Generated Kit Studio Breakdown */}
      {kit && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* AI LLM Teleprompter Script (if generated) */}
          {aiScript && (
            <div className="obsidian-card p-6 border-indigo-500/30">
              <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.08] mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 dot-emerald" />
                  <span className="text-xs font-mono uppercase font-bold text-white tracking-wider">
                    AI Studio Teleprompter Script
                  </span>
                </div>
                <button
                  onClick={() => copyText(aiScript, "ai-script")}
                  className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 cursor-pointer bg-white/[0.04] px-3 py-1.5 rounded-lg border border-white/[0.08]"
                >
                  {copied === "ai-script" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied === "ai-script" ? "Copied!" : "Copy Script"}</span>
                </button>
              </div>
              <pre className="text-xs font-mono text-white/90 leading-relaxed whitespace-pre-wrap bg-[#080910] p-4 rounded-xl border border-white/[0.06]">
                {aiScript}
              </pre>
            </div>
          )}

          {/* 3 High-Retention Opening Hook Variants */}
          <div>
            <div className="flex items-center justify-between mb-3 px-1">
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-white/70">
                High-Retention Opening Hooks (0–3s Attention Lock)
              </h2>
              <span className="text-[11px] font-mono text-emerald-400">Predicted 85%+ 3s Hold</span>
            </div>

            <div className="grid md:grid-cols-3 gap-3.5">
              {[
                { label: "Primary Dopamine Trigger", text: kit.hook, score: 96, color: "border-pink-500/30 text-pink-300" },
                { label: "Contrarian Curiosity Angle", text: kit.thumbnails[0] ?? kit.hook, score: 92, color: "border-violet-500/30 text-violet-300" },
                { label: "Data & Proof Anchor", text: kit.thumbnails[1] ?? `Why 90% of people misunderstand ${kit.topic}`, score: 89, color: "border-cyan-500/30 text-cyan-300" },
              ].map((h, i) => (
                <div key={i} className={cn("obsidian-card p-4 flex flex-col justify-between space-y-3 border", h.color)}>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase text-white/50">{h.label}</span>
                      <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-1.5 py-0.2 rounded">
                        {h.score}/100
                      </span>
                    </div>
                    <p className="text-xs font-medium text-white/95 leading-relaxed font-sans">&ldquo;{h.text}&rdquo;</p>
                  </div>
                  <button
                    onClick={() => copyText(h.text, `hook-${i}`)}
                    className="text-[11px] font-mono text-white/50 hover:text-white flex items-center gap-1.5 pt-2 border-t border-white/[0.06] transition-colors cursor-pointer"
                  >
                    {copied === `hook-${i}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copied === `hook-${i}` ? "Copied" : "Copy Hook"}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Step-by-Step Production Cut Sequence & Director Notes */}
          <div className="grid lg:grid-cols-12 gap-6">
            {/* Step-by-Step Blueprint Sequence (7 cols) */}
            <div className="lg:col-span-7 obsidian-card p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                    Production Cut Architecture
                  </span>
                  <p className="text-[11px] text-white/40 font-sans mt-0.5">Second-by-second shooting roadmap</p>
                </div>
                <span className="text-[10px] font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-full">
                  {kit.contentIdea.length} Cuts
                </span>
              </div>

              <div className="divide-y divide-white/[0.06]">
                {kit.contentIdea.map((step, i) => (
                  <div key={i} className="py-3 flex items-start gap-3.5">
                    <span className="w-6 h-6 rounded-lg bg-gradient-to-tr from-violet-600/30 to-cyan-500/30 border border-white/10 text-[11px] font-mono font-bold text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-white/90 leading-snug">{step}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Director Performance Blueprint & Audio Pacing (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Director Specs */}
              <div className="obsidian-card p-5 space-y-3.5 border-cyan-500/20">
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-cyan-400" /> Director Specs
                  </span>
                  <span className="text-[10px] font-mono text-white/40">Studio Cadence</span>
                </div>

                <div className="space-y-2.5 text-xs font-sans">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-white/40 block">Energy Delivery:</span>
                    <p className="text-white/90 text-xs font-medium mt-0.5">{kit.perf.energy}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-white/40 block">Pacing Cadence:</span>
                    <p className="text-white/90 text-xs font-medium mt-0.5">{kit.perf.pacing}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-white/40 block">Camera Framing:</span>
                    <p className="text-white/90 text-xs font-medium mt-0.5">{kit.perf.camera}</p>
                  </div>
                </div>
              </div>

              {/* Ready-to-use Caption & Hashtags */}
              <div className="obsidian-card p-5 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                    <Hash className="w-3.5 h-3.5 text-pink-400" /> Platform Caption & Tags
                  </span>
                  <button
                    onClick={() => copyText(`${kit.caption_long}\n\n${kit.hashtags.join(" ")}`, "caption")}
                    className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                  >
                    {copied === "caption" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copied === "caption" ? "Copied" : "Copy Caption"}</span>
                  </button>
                </div>

                <p className="text-xs text-white/80 font-sans leading-relaxed whitespace-pre-wrap bg-[#080910] p-3 rounded-xl border border-white/[0.05]">
                  {kit.caption_long}
                </p>

                <div className="flex flex-wrap gap-1 pt-1">
                  {kit.hashtags.slice(0, 8).map((tag) => (
                    <span key={tag} className="text-[10px] font-mono text-white/40 bg-white/[0.03] px-2 py-0.5 rounded border border-white/[0.06]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
