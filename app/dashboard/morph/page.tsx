"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Repeat2,
  Copy,
  Check,
  RefreshCw,
  FileText,
  Mic,
  BookOpen,
  Instagram,
  Youtube,
  Linkedin,
  Twitter,
  Sparkles,
  ArrowRight,
  Sliders,
  Send,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";

const samplePresets = [
  "5 morning habits that increased my creative output by 300% without burnout",
  "Why 99% of solo creators quit in their first 90 days and the retention flywheel",
  "The exact camera & audio setup I use to film viral reels with zero crew",
];

const outputFormats = [
  {
    id: "reel",
    label: "Instagram Reel",
    icon: Instagram,
    tag: "IG",
    color: "from-pink-500/20 to-purple-600/10 text-pink-400 border-pink-500/30",
    badgeColor: "bg-pink-500/15 text-pink-300 border-pink-500/30",
  },
  {
    id: "short",
    label: "YouTube Short",
    icon: Youtube,
    tag: "YT",
    color: "from-rose-500/20 to-red-600/10 text-rose-400 border-rose-500/30",
    badgeColor: "bg-rose-500/15 text-rose-300 border-rose-500/30",
  },
  {
    id: "linkedin",
    label: "LinkedIn Authority",
    icon: Linkedin,
    tag: "LI",
    color: "from-blue-500/20 to-indigo-600/10 text-blue-400 border-blue-500/30",
    badgeColor: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  },
  {
    id: "thread",
    label: "X / Twitter Thread",
    icon: Twitter,
    tag: "X",
    color: "from-cyan-500/20 to-teal-600/10 text-cyan-400 border-cyan-500/30",
    badgeColor: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
  },
  {
    id: "blog",
    label: "Deep Dive Essay",
    icon: BookOpen,
    tag: "BLG",
    color: "from-emerald-500/20 to-teal-600/10 text-emerald-400 border-emerald-500/30",
    badgeColor: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  },
  {
    id: "podcast",
    label: "Podcast Segment",
    icon: Mic,
    tag: "POD",
    color: "from-amber-500/20 to-orange-600/10 text-amber-400 border-amber-500/30",
    badgeColor: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  },
];

function morphContent(original: string, format: string): string {
  const t = original.trim().slice(0, 100);
  const words = t.split(" ").filter(Boolean);
  const hookPhrase = words.slice(0, 7).join(" ");

  const morphs: Record<string, string> = {
    reel: `🎬 INSTAGRAM REEL SCRIPT

[HOOK • 0:00 - 0:03]
"Stop scrolling if you care about your creative output. ${hookPhrase}..."
Visual: Direct eye-contact cut, 105% scale zoom-in punch.

[TENSION / CORE SHIFT • 0:03 - 0:25]
1. The Hidden Trap: Most creators obsess over aesthetics instead of retention pacing.
2. The Pivot: Shift your cadence to sub-2.5s cuts with B-roll text overlays.
3. The Payoff: Compounding watch time leads directly to explore feed distribution.

[CALL TO ACTION • 0:25 - 0:30]
"Drop a 'FLY' below and I'll send the raw prompt breakdown to your DMs."`,

    short: `📱 YOUTUBE SHORT DIRECTIVE

[0–3s ATTENTION LOCK]
"${hookPhrase} — here is the exact protocol no one talks about."
Text on Screen: HIGH RETENTION FORMULA

[3–45s PACING SEQUENCE]
• 0:04: Show the before/after proof dashboard (Proof Metric).
• 0:15: Break down Rule #1: Ruthlessly eliminate throat-clearing intros.
• 0:30: Demonstrate the rapid 15s transformation sequence.

[45–55s RE-LOOP OUTRO]
"Subscribe and tap the link in the pinned comment for the full template."`,

    linkedin: `💼 HIGH-IMPACT THOUGHT LEADERSHIP

${t}.

Most operators look at this completely backwards.

Here is the 3-step flywheel I implemented after analyzing 1.2M impressions:

1️⃣ Aggressive Iteration Velocity:
Speed of feedback loops always beats perfectionism in early phases.

2️⃣ Distribution Density:
Never create content for 1 silo. 1 concept must yield 4 native expressions.

3️⃣ Compounding Retention Loops:
Attention is rented; community retention is owned equity.

What's your primary bottleneck right now? Drop your thoughts below.`,

    thread: `🧵 5-PART VALUE SYNTHESIS

1/5 ${t}.

A complete breakdown of what actually moved the needle (and what was a waste of time): 🧵👇

2/5 The Costly Misconception:
Doing more volume without analyzing second-by-second drop-off graphs is just shouting in an empty room.

3/5 The 80/20 Solution:
Focus 60% of your energy solely on the first 3 seconds and opening headline.

4/5 The System:
Batch ideate -> test hooks -> morph into 4 formats -> automate queue.

5/5 Bookmark this thread for your next production cycle. Repost if this provided clarity.`,

    blog: `📝 LONGFORM EXECUTIVE BLUEPRINT

Title: The Architecture of ${words.slice(0, 6).join(" ")}

I. Abstract & The Paradigm Shift
In an algorithmic environment that penalizes generic formatting, standing out requires mathematical intention. When evaluating "${t}", the core takeaway is unmistakable: precision is your only moat.

II. The Three Pillars
• Pillar A: Audience Intent Profiling
• Pillar B: Cognitive Friction & Pattern Interrupts
• Pillar C: The 90-Day Compounding Curve

III. Practical Implementation Roadmap
Implement the blueprint in 3 distinct 10-day sprints. Measure output velocity weekly.`,

    podcast: `🎙️ AUDIO BROADCAST RHYTHM

[INTRO BILLBOARD • 00:00 - 01:15]
"Welcome back to the Studio Engine. Today we're breaking down ${hookPhrase} and why almost everyone has it backwards."

[SECTION 1: THE CATALYST • 01:15 - 06:30]
Unpack the initial breakdown. Discuss the friction point and listener feedback.

[SECTION 2: STEP-BY-STEP DECONSTRUCTION • 06:30 - 15:00]
Detailed walk-through with specific case study numbers and creator takeaways.

[SECTION 3: LISTENER Q&A & SPRINT CHALLENGE • 15:00 - 20:00]
Wrap with 1 concrete action listeners can complete today.`,
  };

  return morphs[format] ?? "Select a target format to preview.";
}

export default function MorphPage() {
  const [original, setOriginal] = useState(
    "Why 99% of creators fail in the first 90 days: they spend 8 hours editing but only 30 seconds thinking about the first 3-second hook."
  );
  const [selected, setSelected] = useState<string[]>(["reel", "short", "linkedin", "thread"]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState<string | null>(null);

  const toggle = (id: string) => {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  };

  const selectAll = () => setSelected(outputFormats.map((f) => f.id));
  const deselectAll = () => setSelected([]);

  const handleMorph = async () => {
    if (!original.trim() || selected.length === 0) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    const out: Record<string, string> = {};
    selected.forEach((f) => {
      out[f] = morphContent(original, f);
    });
    setResults(out);
    setLoading(false);
  };

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-5"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600/30 to-pink-500/30 border border-white/10 flex items-center justify-center text-violet-300">
            <Repeat2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-white">Content Morph</h1>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20">
                Omni-Channel Engine
              </span>
            </div>
            <p className="text-xs text-white/40 mt-0.5">
              Transform 1 raw seed concept into platform-native scripts, threads, and newsletters.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-white/50 bg-white/[0.04] border border-white/[0.08] px-3 py-1.5 rounded-lg">
            {selected.length} of {outputFormats.length} Targets Selected
          </span>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Left Column: Input & Distribution Setup (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Seed Input Card */}
          <div className="obsidian-card p-5 space-y-3 border-violet-500/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                <label className="text-xs font-mono uppercase font-semibold tracking-wider text-white/80">
                  Seed Concept
                </label>
              </div>
              <span className="text-[11px] font-mono text-white/40">
                {original.split(" ").filter(Boolean).length} words • {original.length} chars
              </span>
            </div>

            <textarea
              value={original}
              onChange={(e) => setOriginal(e.target.value)}
              placeholder="Paste raw script, bullet points, voice note transcription, or thesis..."
              className="w-full bg-white/[0.02] border border-white/[0.08] focus:border-violet-500/50 rounded-xl p-3.5 text-xs text-white placeholder-white/20 resize-none focus:outline-none transition-colors font-sans leading-relaxed min-h-[140px]"
              rows={5}
            />

            {/* Quick Inspiration Pills */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-mono uppercase text-white/40 block">Try Seed Preset:</span>
              <div className="flex flex-col gap-1.5">
                {samplePresets.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => setOriginal(preset)}
                    className="text-left text-[11px] font-mono text-white/50 hover:text-cyan-300 bg-white/[0.02] hover:bg-white/[0.05] p-2 rounded-lg border border-white/[0.05] transition-colors truncate cursor-pointer"
                  >
                    💡 {preset}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Distribution Targets Selector */}
          <div className="obsidian-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono uppercase font-semibold tracking-wider text-white/80">
                Distribution Targets
              </label>
              <div className="flex items-center gap-2 text-[10px] font-mono">
                <button
                  onClick={selectAll}
                  className="text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  All
                </button>
                <span className="text-white/20">•</span>
                <button
                  onClick={deselectAll}
                  className="text-white/40 hover:text-white transition-colors cursor-pointer"
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {outputFormats.map((f) => {
                const isSelected = selected.includes(f.id);
                return (
                  <button
                    key={f.id}
                    onClick={() => toggle(f.id)}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden",
                      isSelected
                        ? cn("border", f.color, "bg-gradient-to-br")
                        : "bg-white/[0.02] border-white/[0.06] text-white/40 hover:text-white/80 hover:bg-white/[0.04]"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <f.icon className="w-4 h-4 flex-shrink-0" />
                      <div>
                        <div className="text-xs font-semibold leading-tight">{f.label}</div>
                        <div className="text-[9px] font-mono opacity-60 uppercase">{f.tag} Native</div>
                      </div>
                    </div>
                    {isSelected && (
                      <span className={cn("w-2 h-2 rounded-full", f.badgeColor)} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleMorph}
            disabled={!original.trim() || selected.length === 0 || loading}
            className={cn(
              "w-full py-3 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg",
              original.trim() && selected.length > 0 && !loading
                ? "bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white shadow-[0_0_20px_rgba(99,102,241,0.35)]"
                : "bg-white/[0.04] text-white/20 border border-white/[0.05] cursor-not-allowed"
            )}
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Morphing {selected.length} Platform Variants...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Morph into {selected.length} Formats</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: Multi-Format Live Output Stream (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <AnimatePresence>
            {Object.keys(results).length > 0 && !loading && (
              <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 dot-emerald" />
                    <span className="text-xs font-mono uppercase text-white/70 font-semibold">
                      Generated Channel Variants ({Object.keys(results).length})
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      const allText = Object.entries(results)
                        .map(([k, v]) => `=== ${k.toUpperCase()} ===\n${v}\n\n`)
                        .join("");
                      copy(allText, "all");
                    }}
                    className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Copy className="w-3 h-3" />
                    <span>{copied === "all" ? "Copied All!" : "Copy All Variants"}</span>
                  </button>
                </div>

                {outputFormats
                  .filter((f) => results[f.id])
                  .map((f, i) => (
                    <motion.div
                      key={f.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="obsidian-card p-5 space-y-3.5 border border-white/[0.09] hover:border-white/[0.18] transition-colors"
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-white/[0.07]">
                        <div className="flex items-center gap-2.5">
                          <div className={cn("p-1.5 rounded-lg border", f.badgeColor)}>
                            <f.icon className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-sm font-semibold text-white tracking-tight">{f.label}</span>
                            <span className="text-[10px] font-mono text-white/40 block">Platform-Optimized</span>
                          </div>
                        </div>

                        <button
                          onClick={() => copy(results[f.id], f.id)}
                          className="text-xs font-mono text-white/60 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] px-3 py-1.5 rounded-lg border border-white/[0.08] flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          {copied === f.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400 font-semibold">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Variant</span>
                            </>
                          )}
                        </button>
                      </div>

                      <pre className="text-xs font-mono text-white/90 leading-relaxed whitespace-pre-wrap bg-[#080910] p-4 rounded-xl border border-white/[0.06] selection:bg-violet-500/30">
                        {results[f.id]}
                      </pre>
                    </motion.div>
                  ))}
              </div>
            )}
          </AnimatePresence>

          {/* Empty / Initial State */}
          {Object.keys(results).length === 0 && !loading && (
            <div className="obsidian-card p-12 text-center flex flex-col items-center justify-center min-h-[440px] border-dashed border-white/[0.1]">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-violet-600/20 to-cyan-500/20 border border-white/10 flex items-center justify-center mb-4 text-cyan-300 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                <Repeat2 className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">Repurposed variants will stream here</h3>
              <p className="text-xs text-white/40 max-w-sm font-sans mb-6">
                Paste your seed idea or choose a preset on the left, select target channels, and hit Morph.
              </p>
              <button
                onClick={handleMorph}
                className="px-5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.12] text-xs font-mono text-white flex items-center gap-2 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                <span>Test with Default Seed Concept</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
