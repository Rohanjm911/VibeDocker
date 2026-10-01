"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Copy, 
  Check, 
  Zap, 
  Send, 
  Sliders, 
  RefreshCw, 
  Play, 
  TrendingUp, 
  Share2, 
  Layers,
  ChevronRight,
  BarChart2
} from "lucide-react";
import { cn } from "@/lib/utils";
import AnimePulseBar from "@/components/shared/AnimePulseBar";

interface HookResult {
  hook: string;
  type: string;
  predictedRetention: number;
  viralityScore: number;
  estimatedViews: string;
  recommendation: string;
}

const PRESET_TOPICS = [
  "AI tools for creators",
  "10x morning routine",
  "How I hit 100k followers",
  "Fix your sleep schedule",
  "Why your content is flopping"
];

const HOOK_MODES = [
  { id: "curiosity", label: "Curiosity Gap", badge: "High 3s Hold" },
  { id: "bold", label: "Contrarian / Bold", badge: "Max Comments" },
  { id: "urgency", label: "Friction / Warning", badge: "High Shares" },
  { id: "story", label: "Hero Transformation", badge: "Watch Time" },
];

export default function LiveContentSimulator() {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState<"Instagram" | "YouTube" | "TikTok" | "LinkedIn" | "Twitch">("Twitch");
  const [hookMode, setHookMode] = useState("curiosity");
  const [isSimulating, setIsSimulating] = useState(false);
  const [results, setResults] = useState<HookResult[] | null>(null);
  const [activeTab, setActiveTab] = useState<"hooks" | "preview">("hooks");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [selectedHookIndex, setSelectedHookIndex] = useState<number>(0);

  const runSimulation = (customTopic?: string) => {
    const targetTopic = (customTopic || topic).trim() || "modern productivity hacks";
    setIsSimulating(true);

    setTimeout(() => {
      const generated: HookResult[] = [
        {
          hook: hookMode === "curiosity" 
            ? `Nobody talks about the dark side of ${targetTopic}. Until you realize this one harsh truth.`
            : hookMode === "bold"
            ? `Stop doing ${targetTopic} the normal way. 99% of creators are burning out for zero reach.`
            : hookMode === "urgency"
            ? `If you are still trying ${targetTopic} in 2026, you're already 6 months behind.`
            : `I spent 90 days obsessing over ${targetTopic}. Here is the exact playbook I wish I had on day 1.`,
          type: hookMode === "curiosity" ? "Curiosity Gap" : hookMode === "bold" ? "Contrarian" : hookMode === "urgency" ? "FOMO Spike" : "Story Arc",
          predictedRetention: 91,
          viralityScore: 94,
          estimatedViews: "45K - 120K",
          recommendation: "Pair with quick 0.8s jump-cut & high contrast text overlay in first frame."
        },
        {
          hook: `The 3-second mistake that destroys your results with ${targetTopic} (and the 1 fix).`,
          type: "Pattern Interrupt",
          predictedRetention: 86,
          viralityScore: 89,
          estimatedViews: "28K - 75K",
          recommendation: "Deliver the answer by second 7 to prevent drop-off."
        },
        {
          hook: `I tested 10 different ways to master ${targetTopic}. Only this blueprint actually moved the needle.`,
          type: "Social Proof",
          predictedRetention: 83,
          viralityScore: 85,
          estimatedViews: "20K - 55K",
          recommendation: "Display proof screenshots on the screen immediately."
        }
      ];

      setResults(generated);
      setSelectedHookIndex(0);
      setIsSimulating(false);
    }, 700);
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.14 }}
      className="obsidian-card p-5 sm:p-6 rounded-2xl border-white/[0.08] relative overflow-hidden"
    >
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/[0.08] gap-3 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-gradient-to-tr from-purple-500/20 to-cyan-500/20 border border-white/[0.12] text-white shadow-[0_0_15px_rgba(168,85,247,0.25)]">
              <Sparkles className="w-3.5 h-3.5 text-purple-300" />
            </span>
            <h2 className="text-sm sm:text-base font-semibold text-white tracking-tight flex items-center gap-2">
              Neural Hook Engine & Content Simulator
              <span className="text-[10px] font-mono text-purple-300 bg-purple-500/15 border border-purple-500/30 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-medium shadow-[0_0_10px_rgba(168,85,247,0.2)]">
                Real-time AI
              </span>
            </h2>
          </div>
          <p className="text-xs text-white/50 mt-1 font-sans">
            Simulate retention, hook resonance, and predict reach before hitting publish.
          </p>
        </div>

        {/* Platform selector */}
        <div className="flex items-center gap-1.5 p-1 bg-black/50 backdrop-blur-md border border-white/[0.09] rounded-xl self-start sm:self-auto shadow-inner">
          {(["YouTube", "Instagram", "TikTok", "LinkedIn", "Twitch"] as const).map((plat) => {
            const isSelected = platform === plat;
            return (
              <button
                key={plat}
                onClick={() => setPlatform(plat)}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-xs font-mono transition-all",
                  isSelected
                    ? plat === "Twitch"
                      ? "bg-purple-600 text-white font-semibold shadow-[0_0_12px_rgba(147,51,234,0.4)]"
                      : plat === "YouTube"
                      ? "bg-rose-600 text-white font-semibold shadow-[0_0_12px_rgba(225,29,72,0.4)]"
                      : plat === "TikTok"
                      ? "bg-cyan-500 text-black font-semibold shadow-[0_0_12px_rgba(6,182,212,0.4)]"
                      : plat === "Instagram"
                      ? "bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white font-semibold shadow-sm"
                      : "bg-white text-black font-semibold shadow-sm"
                    : "text-white/50 hover:text-white hover:bg-white/[0.05]"
                )}
              >
                {plat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Input & Control Section */}
      <div className="mt-4 grid lg:grid-cols-12 gap-4 relative z-10">
        <div className="lg:col-span-8 space-y-3">
          <div className="relative">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && runSimulation()}
              placeholder="Enter your concept, theme or script hook (e.g., '10x your output in 30 days')..."
              className="w-full bg-[#0a0a0a] border border-white/[0.09] rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all font-sans pr-24"
            />
            <button
              onClick={() => runSimulation()}
              disabled={isSimulating}
              className="absolute right-1.5 top-1.5 bottom-1.5 px-3.5 bg-white hover:bg-white/90 text-black font-semibold text-xs rounded-lg flex items-center gap-1.5 shadow-sm transition-all disabled:opacity-50"
            >
              {isSimulating ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <>
                  <Zap className="w-3.5 h-3.5 fill-black" />
                  <span>Simulate</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Preset Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-mono text-white/40 uppercase">Try:</span>
            {PRESET_TOPICS.map((preset) => (
              <button
                key={preset}
                onClick={() => {
                  setTopic(preset);
                  runSimulation(preset);
                }}
                className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.07] text-white/60 hover:text-white transition-all"
              >
                {preset}
              </button>
            ))}
          </div>

          {/* Angle Modes */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            {HOOK_MODES.map((mode) => {
              const isSelected = hookMode === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => setHookMode(mode.id)}
                  className={cn(
                    "p-2.5 rounded-xl border text-left transition-all relative overflow-hidden",
                    isSelected
                      ? "bg-gradient-to-b from-white/[0.12] to-white/[0.04] border-white/30 text-white shadow-[0_0_15px_rgba(255,255,255,0.08)]"
                      : "bg-black/30 border-white/[0.06] text-white/60 hover:border-white/20 hover:text-white/80"
                  )}
                >
                  {isSelected && (
                    <div className="absolute top-0 right-0 w-8 h-8 bg-purple-500/20 rounded-full blur-md pointer-events-none" />
                  )}
                  <div className="text-xs font-semibold">{mode.label}</div>
                  <div className={cn("text-[9px] font-mono mt-0.5", isSelected ? "text-purple-300 font-medium" : "text-white/40")}>{mode.badge}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mini Intelligence Card */}
        <div className="lg:col-span-4 bg-gradient-to-br from-white/[0.04] to-black/60 border border-white/[0.09] rounded-2xl p-4 flex flex-col justify-between shadow-lg relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-28 h-28 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="space-y-2 relative z-10">
            <div className="flex items-center justify-between text-[11px] font-mono text-white/50">
              <span className="flex items-center gap-1.5 font-medium text-white/80">
                <Sliders className="w-3.5 h-3.5 text-purple-400" />
                Algorithm Bias ({platform})
              </span>
              <span className="text-emerald-400 font-mono text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-medium">Live Feed</span>
            </div>
            <div className="text-xs text-white/70 leading-relaxed font-sans">
              Algorithms are currently prioritizing <strong className="text-white">first 2.2s visual disruption</strong> and high-stakes tension hooks.
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.07] grid grid-cols-2 gap-2 text-center relative z-10">
            <div className="p-2 rounded-xl bg-black/40 border border-white/[0.06]">
              <div className="text-[10px] font-mono uppercase text-white/40">Avg Hook Drop</div>
              <div className="text-sm font-mono font-semibold text-emerald-400 mt-0.5">-14% (Top tier)</div>
            </div>
            <div className="p-2 rounded-xl bg-black/40 border border-white/[0.06]">
              <div className="text-[10px] font-mono uppercase text-white/40">Ideal Length</div>
              <div className="text-sm font-mono font-semibold text-purple-300 mt-0.5">8 - 14 words</div>
            </div>
          </div>
        </div>
      </div>

      {/* Results / Simulation Area */}
      <AnimatePresence mode="wait">
        {results && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 pt-5 border-t border-white/[0.08] relative z-10"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-mono font-semibold uppercase tracking-wider text-white/70 flex items-center gap-2">
                <span>Simulated High-Performance Hooks</span>
                <span className="text-white bg-white/[0.08] border border-white/[0.12] px-2 py-0.5 rounded-full text-[10px]">
                  Optimal Match
                </span>
              </div>
              <span className="text-[11px] font-mono text-white/40">Click any hook to inspect telemetry</span>
            </div>

            <div className="grid lg:grid-cols-3 gap-3">
              {results.map((item, idx) => {
                const isSelected = selectedHookIndex === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedHookIndex(idx)}
                    className={cn(
                      "p-4 rounded-xl border transition-all cursor-pointer relative group flex flex-col justify-between",
                      isSelected
                        ? "bg-white/[0.08] border-white/30 shadow-lg shadow-black/80"
                        : "bg-white/[0.02] border-white/[0.06] hover:border-white/20 hover:bg-white/[0.04]"
                    )}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border text-white/80 bg-white/[0.04] border-white/[0.08]">
                          {item.type}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopy(item.hook, idx);
                          }}
                          className="p-1 rounded hover:bg-white/[0.1] text-white/50 hover:text-white transition-colors"
                          title="Copy to clipboard"
                        >
                          {copiedIndex === idx ? (
                            <Check className="w-3.5 h-3.5 text-white" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>

                      <p className="text-xs sm:text-sm text-white font-medium leading-snug line-clamp-3 mb-3">
                        &ldquo;{item.hook}&rdquo;
                      </p>
                    </div>

                    <div className="pt-2 border-t border-white/[0.06] space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className="text-white/50">3s Retention Hold:</span>
                        <span className="text-white font-semibold">{item.predictedRetention}%</span>
                      </div>
                      <AnimePulseBar score={item.predictedRetention} barClassName="bg-white/90" />

                      <div className="flex items-center justify-between text-[10px] font-mono text-white/40 pt-1">
                        <span>Est. Viral Reach:</span>
                        <span className="text-white/80 font-medium">{item.estimatedViews}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Hook Inspector Drawer */}
            {results[selectedHookIndex] && (
              <div className="mt-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-white/[0.08] border border-white/[0.1] text-white flex items-center justify-center font-bold font-mono text-xs">
                    AI
                  </div>
                  <div>
                    <div className="text-white font-medium">Director Recommendation:</div>
                    <div className="text-white/60 font-sans mt-0.5">{results[selectedHookIndex].recommendation}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={() => handleCopy(results[selectedHookIndex].hook, selectedHookIndex)}
                    className="px-3 py-1.5 rounded-lg bg-white hover:bg-white/90 text-black font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                  >
                    {copiedIndex === selectedHookIndex ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedIndex === selectedHookIndex ? "Copied" : "Copy Hook"}</span>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
