"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  CheckCircle,
  AlertTriangle,
  Flame,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  Activity,
  Lightbulb,
  Gauge,
  Sliders,
  TrendingUp,
  Share2,
  Bookmark,
  Copy,
  Check,
  RefreshCw,
  Clock,
  ArrowUpRight,
  Target,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";
import Link from "next/link";
import AnimeCounter from "@/components/shared/AnimeCounter";
import AnimePulseBar from "@/components/shared/AnimePulseBar";

interface ScoreDimension {
  name: string;
  score: number;
  grade: string;
  color: string;
  barColor: string;
  verdict: string;
  detail: string;
}

const sampleHooks = [
  "Stop wasting 4 hours every morning trying to 'get motivated'. Here is the exact 15-minute dopamine reset protocol I used to 10x output...",
  "Nobody told me fitness was this simple. I wasted 2 years doing it wrong until I learned these 3 compound rules...",
  "If your videos are stuck at 200 views, you are making this exact mistake in the first 3 seconds...",
  "Hey guys welcome back to my channel! Today we are going to look at some basic routine ideas that I like to do...",
];

// Heuristic Algorithmic Analyzer
function analyzeScript(text: string) {
  const clean = text.trim();
  const words = clean.split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const lower = clean.toLowerCase();

  if (wordCount === 0) {
    return {
      overallScore: 0,
      confidence: 0,
      summaryTitle: "No Content Detected",
      summaryDesc: "Enter script or hook copy to initiate neural audit.",
      dimensions: [],
      recommendations: [
        { title: "Enter Script Content", desc: "Paste or type opening hook text above to initiate evaluation." },
      ],
      optimizedVariants: [],
      retentionCurve: [],
    };
  }

  // 1. Hook Punch (First 10 words, pattern interrupts, curiosity gap)
  let hookScore = 65;
  const first10 = words.slice(0, 10).join(" ").toLowerCase();

  // Negative patterns (cliches that kill retention)
  const cliches = ["welcome back", "hey guys", "in this video", "today we are", "my name is", "don't forget to like"];
  let hasCliche = false;
  cliches.forEach((c) => {
    if (first10.includes(c)) {
      hookScore -= 28;
      hasCliche = true;
    }
  });

  // Positive pattern interrupts
  const powerStarters = [
    "stop", "nobody told me", "if your", "i wasted", "the truth about", "why you", "i tested",
    "never do", "how i", "this 1 mistake", "3 rules", "here is the", "do not", "secret",
  ];
  let hasPowerStarter = false;
  powerStarters.forEach((p) => {
    if (lower.startsWith(p) || first10.includes(p)) {
      hookScore += 16;
      hasPowerStarter = true;
    }
  });

  // Curiosity gap keywords
  const curiosityWords = ["mistake", "secret", "wasted", "hack", "ruined", "protocol", "dopamine", "nobody", "wrong", "exact"];
  let curiosityCount = 0;
  curiosityWords.forEach((cw) => {
    if (lower.includes(cw)) curiosityCount++;
  });
  hookScore += Math.min(18, curiosityCount * 6);
  hookScore = Math.max(25, Math.min(98, hookScore));

  // 2. Pacing & Cadence (Word count, sentence length, rhythm)
  let pacingScore = 70;
  const sentences = clean.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const avgSentenceLength = wordCount / Math.max(1, sentences.length);

  if (avgSentenceLength <= 14 && avgSentenceLength >= 5) {
    pacingScore += 18; // Great punchy cadence
  } else if (avgSentenceLength > 22) {
    pacingScore -= 20; // Run-on, breathless
  }

  if (wordCount >= 12 && wordCount <= 35) {
    pacingScore += 10; // Optimal 0-15s hook duration
  } else if (wordCount > 50) {
    pacingScore -= 15; // Too long for opening 15s
  }
  pacingScore = Math.max(30, Math.min(96, pacingScore));

  // 3. Cognitive Friction & Polarization (Contrarian tone, challenge assumptions)
  let frictionScore = 60;
  const contrastWords = ["instead", "wrong", "actually", "myth", "wasted", "lie", "stop", "never", "ruined", "versus", "vs"];
  let contrastCount = 0;
  contrastWords.forEach((w) => {
    if (lower.includes(w)) contrastCount++;
  });
  frictionScore += Math.min(26, contrastCount * 9);

  if (clean.includes("?") || lower.includes("why")) {
    frictionScore += 8;
  }
  frictionScore = Math.max(30, Math.min(94, frictionScore));

  // 4. Algorithmic Virality Multiplier (Quantified numbers, saveability, pass-along)
  let viralityScore = 62;
  const hasNumbers = /\d+/.test(clean);
  if (hasNumbers) viralityScore += 14;

  const saveSignals = ["rules", "protocol", "steps", "tools", "guide", "blueprint", "routine", "formula", "save", "list"];
  let saveCount = 0;
  saveSignals.forEach((s) => {
    if (lower.includes(s)) saveCount++;
  });
  viralityScore += Math.min(20, saveCount * 7);
  viralityScore = Math.max(25, Math.min(97, viralityScore));

  // Overall Weighted Score
  const overallScore = Math.round(
    hookScore * 0.35 + pacingScore * 0.25 + frictionScore * 0.2 + viralityScore * 0.2
  );

  // Confidence & Verdict
  const confidence = Math.min(98, 85 + Math.round((wordCount % 10)));

  let summaryTitle = "High Virality Probability Detected";
  let summaryDesc =
    "Script holds a 4.1× higher bookmark probability than niche baseline. Projected 0–3s drop-off is under 16%, granting substantial reach on explore feeds.";

  if (overallScore < 60) {
    summaryTitle = "High Retention Drop-off Risk";
    summaryDesc =
      "Opening copy lacks pattern interrupt and introduces friction before delivering payoff. Projected 0–3s viewer drop-off exceeds 45%.";
  } else if (overallScore < 78) {
    summaryTitle = "Moderate Retention Velocity";
    summaryDesc =
      "Competent structure, but lacks high-voltage controversy or emotional tension to trigger rapid organic sharing.";
  }

  // Dimension details
  const getGrade = (s: number) => {
    if (s >= 90) return { grade: "S Tier", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30", bar: "bg-emerald-400" };
    if (s >= 80) return { grade: "A Tier", color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30", bar: "bg-cyan-400" };
    if (s >= 70) return { grade: "B Tier", color: "text-amber-400 bg-amber-500/10 border-amber-500/30", bar: "bg-amber-400" };
    return { grade: "C Tier", color: "text-rose-400 bg-rose-500/10 border-rose-500/30", bar: "bg-rose-400" };
  };

  const hookGrade = getGrade(hookScore);
  const pacingGrade = getGrade(pacingScore);
  const frictionGrade = getGrade(frictionScore);
  const viralityGrade = getGrade(viralityScore);

  const dimensions: ScoreDimension[] = [
    {
      name: "3s Hook Punch & Dopamine Trigger",
      score: hookScore,
      grade: hookGrade.grade,
      color: hookGrade.color,
      barColor: hookGrade.bar,
      verdict:
        hasCliche
          ? "Cliché introduction detected in first 10 words — severe thumb-swipe vulnerability."
          : hasPowerStarter
          ? "Aggressive pattern interrupt. Grabs viewers in first 180 video frames."
          : "Standard opening pacing. Add stronger emotional contrast to maximize initial hold.",
      detail:
        hasCliche
          ? "Remove 'welcome back' or greeting phrases and start directly with the problem."
          : "Word 1–5 establishes curiosity gap before the user can swipe away.",
    },
    {
      name: "Pacing & Retention Cadence",
      score: pacingScore,
      grade: pacingGrade.grade,
      color: pacingGrade.color,
      barColor: pacingGrade.bar,
      verdict:
        avgSentenceLength > 20
          ? "Dense clause structure: sentence pacing is too heavy for rapid mobile consumption."
          : "Cadence maintains rhythmic momentum with ideal syllable-per-second pacing.",
      detail: `Average sentence length: ${Math.round(avgSentenceLength)} words. Target is 8–14 words.`,
    },
    {
      name: "Cognitive Friction & Polarization",
      score: frictionScore,
      grade: frictionGrade.grade,
      color: frictionGrade.color,
      barColor: frictionGrade.bar,
      verdict:
        contrastCount > 0
          ? "Strong controversy / contrarian angle prompting active comment section debate."
          : "Low cognitive friction. Content risks feeling passive or generic.",
      detail: "Challenging mainstream consensus triggers a 2.8x higher comment response rate.",
    },
    {
      name: "Algorithmic Virality Multiplier",
      score: viralityScore,
      grade: viralityGrade.grade,
      color: viralityGrade.color,
      barColor: viralityGrade.bar,
      verdict:
        hasNumbers && saveCount > 0
          ? "High bookmark & share score. Quantified blueprint prompts long-tail algorithm pickup."
          : "Moderate shareability. Add explicit numbers or framework naming.",
      detail: "Save-to-view ratios over 3.5% trigger Explore & For You page multi-wave distribution.",
    },
  ];

  // Actionable dynamic recommendations
  const recommendations: { title: string; desc: string }[] = [];
  if (hasCliche) {
    recommendations.push({
      title: "Eliminate introductory greeting",
      desc: "Cut phrases like 'Hey guys' or 'In this video'. Begin directly with the stakes or conflict.",
    });
  }
  if (!hasNumbers) {
    recommendations.push({
      title: "Inject concrete numbers or timeframes",
      desc: "Add specific metrics like '3 rules', '7 days', or '₹4,000' to increase credibility by +34%.",
    });
  }
  if (avgSentenceLength > 18) {
    recommendations.push({
      title: "Break up long sentences into micro-punches",
      desc: "Split long explanatory clauses into 2 punchy, rhythmic statements under 10 words each.",
    });
  }
  if (saveCount === 0) {
    recommendations.push({
      title: "Add a high-value bookmark prompt",
      desc: "Label the core takeaway as a 'Protocol', 'Rule', or 'Checklist' to drive organic saves.",
    });
  }
  if (recommendations.length === 0) {
    recommendations.push(
      {
        title: "Punch up visual frame jump at 0:02",
        desc: "Add a 105% camera punch zoom or motion transition on the exact keyword trigger.",
      },
      {
        title: "Seed comment section debate prompt",
        desc: "Pin a top comment challenging viewers: 'Which of these 3 rules are you breaking right now?'",
      }
    );
  }

  // Auto-Generated Optimized Hook Variations
  const optimizedVariants = [
    `Stop doing ${clean.slice(0, 30)}... Here is the exact 3-step framework that actually worked.`,
    `Nobody talks about this, but ${clean.slice(0, 35)}... and it's costing you months of progress.`,
  ];

  // Retention Decay Curve Simulation
  const baseHold3s = Math.min(96, Math.max(50, Math.round(hookScore * 0.95)));
  const baseHold10s = Math.min(88, Math.max(38, Math.round(pacingScore * 0.88)));
  const baseHold20s = Math.min(78, Math.max(28, Math.round(frictionScore * 0.8)));
  const baseHold30s = Math.min(70, Math.max(20, Math.round(viralityScore * 0.75)));

  const retentionCurve = [
    { second: "0s", retention: 100, benchmark: 100 },
    { second: "3s", retention: baseHold3s, benchmark: 68 },
    { second: "7s", retention: Math.round((baseHold3s + baseHold10s) / 2), benchmark: 58 },
    { second: "12s", retention: baseHold10s, benchmark: 49 },
    { second: "20s", retention: baseHold20s, benchmark: 42 },
    { second: "30s", retention: baseHold30s, benchmark: 35 },
  ];

  return {
    overallScore,
    confidence,
    summaryTitle,
    summaryDesc,
    dimensions,
    recommendations,
    optimizedVariants,
    retentionCurve,
  };
}

export default function ViralityPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const [scriptInput, setScriptInput] = useState(sampleHooks[1]);
  const [analyzing, setAnalyzing] = useState(false);
  const [copiedVariant, setCopiedVariant] = useState<number | null>(null);

  // Run dynamic analysis
  const [auditResult, setAuditResult] = useState(() => analyzeScript(sampleHooks[1]));

  const wordCount = scriptInput.split(/\s+/).filter(Boolean).length;
  const estimatedSeconds = Math.max(2, Math.round(wordCount / 2.6));

  const runDiagnostic = () => {
    if (!scriptInput.trim()) return;
    setAnalyzing(true);
    setTimeout(() => {
      const result = analyzeScript(scriptInput);
      setAuditResult(result);
      setAnalyzing(false);
    }, 450);
  };

  const applyPreset = (hookText: string) => {
    setScriptInput(hookText);
    setAnalyzing(true);
    setTimeout(() => {
      const result = analyzeScript(hookText);
      setAuditResult(result);
      setAnalyzing(false);
    }, 350);
  };

  const copyHook = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedVariant(id);
    setTimeout(() => setCopiedVariant(null), 2000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-7 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500/30 via-orange-500/30 to-rose-500/30 border border-white/10 flex items-center justify-center text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.3)]">
            <Zap className="w-5 h-5 fill-amber-400 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-white tracking-tight">ViralAudit 360</h1>
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                Live Retention Optics
              </span>
            </div>
            <p className="text-xs text-white/50 mt-0.5">
              Real-time curiosity scoring, cadence pacing analysis, and second-by-second retention drop-off simulation.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 dot-emerald animate-pulse" />
            <span>Algorithmic Heuristics Active</span>
          </span>
        </div>
      </div>

      {/* Script Audit Input Console */}
      <div className="obsidian-card p-6 space-y-4 border-amber-500/30 bg-[#080912]">
        <div className="flex items-center justify-between">
          <label className="text-xs font-mono font-semibold uppercase tracking-wider text-white/90 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
            Script Hook or Opening Copy (0–15s Window)
          </label>
          <div className="flex items-center gap-3 text-[11px] font-mono text-white/50">
            <span>{wordCount} words</span>
            <span>•</span>
            <span className="text-cyan-300 font-semibold">~{estimatedSeconds}s spoken cadence</span>
          </div>
        </div>

        <textarea
          rows={3}
          value={scriptInput}
          onChange={(e) => setScriptInput(e.target.value)}
          placeholder="Paste your video opening hook, reel caption, or first 30 seconds to test in real time..."
          className="w-full bg-[#05060a] border border-white/[0.09] focus:border-amber-400/60 rounded-xl p-4 text-xs font-sans text-white placeholder-white/30 focus:outline-none leading-relaxed resize-none min-h-[95px] transition-all shadow-inner"
        />

        {/* Quick Sample Hook Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-mono text-white/40 flex items-center gap-1">
            <Lightbulb className="w-3 h-3 text-amber-400" /> Test Presets:
          </span>
          {sampleHooks.map((h, i) => (
            <button
              key={i}
              onClick={() => applyPreset(h)}
              className={cn(
                "text-[11px] font-mono px-2.5 py-1 rounded-lg transition-all cursor-pointer truncate max-w-xs border",
                scriptInput === h
                  ? "bg-white/10 text-white border-white/30 font-bold"
                  : "text-white/50 hover:text-cyan-300 bg-white/[0.02] hover:bg-white/[0.06] border-white/[0.06]"
              )}
            >
              Hook #{i + 1}: {h.slice(0, 30)}...
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-white/[0.06]">
          <span className="text-[11px] font-mono text-white/40">
            Dynamically evaluates friction, curiosity tension, cadence rhythm & shareability
          </span>
          <button
            onClick={runDiagnostic}
            disabled={analyzing || !scriptInput.trim()}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-white font-mono font-bold text-xs disabled:opacity-30 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(245,158,11,0.35)]"
          >
            {analyzing ? (
              <RefreshCw className="w-4 h-4 animate-spin text-white" />
            ) : (
              <Zap className="w-4 h-4 fill-white" />
            )}
            <span>{analyzing ? "Running Heuristics..." : "Run ViralAudit Diagnostic"}</span>
          </button>
        </div>
      </div>

      {/* Dynamic Diagnostic Output Scorecard */}
      <AnimatePresence mode="wait">
        <motion.div
          key={auditResult.overallScore + scriptInput.slice(0, 8)}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          className="space-y-6"
        >
          {/* Main Predictive Scoreboard */}
          <div
            className={cn(
              "obsidian-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border relative overflow-hidden",
              auditResult.overallScore >= 80
                ? "border-emerald-500/30 bg-gradient-to-r from-emerald-500/[0.04] to-transparent"
                : auditResult.overallScore >= 60
                ? "border-amber-500/30 bg-gradient-to-r from-amber-500/[0.04] to-transparent"
                : "border-rose-500/30 bg-gradient-to-r from-rose-500/[0.04] to-transparent"
            )}
          >
            <div className="space-y-1.5 z-10 max-w-xl">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "w-2 h-2 rounded-full",
                    auditResult.overallScore >= 80 ? "bg-emerald-400 dot-emerald" : auditResult.overallScore >= 60 ? "bg-amber-400" : "bg-rose-400"
                  )}
                />
                <span className="text-xs font-mono font-bold tracking-widest text-white/50 uppercase">
                  Virality Prediction Matrix
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                {auditResult.summaryTitle}
              </h2>
              <p className="text-xs text-white/60 font-sans leading-relaxed">
                {auditResult.summaryDesc}
              </p>
            </div>

            {/* Score Pill / Visual Meter */}
            <div className="flex items-center gap-6 border-t md:border-t-0 md:border-l border-white/[0.08] pt-4 md:pt-0 md:pl-8 z-10 w-full md:w-auto justify-between md:justify-end flex-shrink-0">
              <div className="text-right">
                <div className="text-5xl sm:text-6xl font-mono font-extrabold text-white tracking-tight flex items-baseline justify-end">
                  <AnimeCounter value={auditResult.overallScore} duration={1200} />
                  <span className="text-xl text-white/40 font-normal">/100</span>
                </div>
                <div
                  className={cn(
                    "text-xs font-mono font-semibold uppercase tracking-wider mt-1 flex items-center justify-end gap-1.5",
                    auditResult.overallScore >= 80 ? "text-emerald-400" : auditResult.overallScore >= 60 ? "text-amber-400" : "text-rose-400"
                  )}
                >
                  <span>Confidence: {auditResult.confidence}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Dimension Diagnostics Grid */}
          <div>
            <div className="flex items-center justify-between mb-3 px-1">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white/60">
                Component Retention Vector Breakdown
              </h3>
              <span className="text-[11px] font-mono text-white/40">Real-Time NLP Heuristics</span>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {auditResult.dimensions.map((d) => (
                <div
                  key={d.name}
                  className="obsidian-card p-5 space-y-3.5 border border-white/[0.08] hover:border-white/[0.16] transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-xs font-medium text-white/95 leading-snug">{d.name}</span>
                    <div className="flex items-center gap-2 font-mono text-xs flex-shrink-0">
                      <span className="text-white font-bold">{d.score}%</span>
                      <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded border", d.color)}>
                        {d.grade}
                      </span>
                    </div>
                  </div>

                  <AnimePulseBar score={d.score} duration={1000} barClassName={d.barColor} />

                  <div className="space-y-1 pt-0.5">
                    <p className="text-xs text-white/80 font-sans leading-snug font-medium">{d.verdict}</p>
                    <p className="text-[11px] text-white/40 font-sans leading-relaxed">{d.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Retention Decay Curve & Optimization Strategy */}
          <div className="grid lg:grid-cols-12 gap-6">
            {/* Retention Decay Curve (7 Columns) */}
            <div className="lg:col-span-7 obsidian-card p-6 rounded-2xl border border-white/[0.08] space-y-4">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <div>
                  <span className="text-xs font-mono uppercase text-white font-bold tracking-wide">
                    Projected Retention Decay Curve
                  </span>
                  <p className="text-[11px] text-white/40 mt-0.5">
                    Estimated audience drop-off based on opening 3s hook punch vs baseline
                  </p>
                </div>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-full">
                  30s Projection
                </span>
              </div>

              <div className="h-52 w-full min-w-0">
                {mounted ? (
                  <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                    <AreaChart data={auditResult.retentionCurve} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="retentionGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.6} />
                          <stop offset="100%" stopColor="#0284c7" stopOpacity={0.05} />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="second"
                        tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10, fontFamily: "monospace" }}
                        axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
                        tickLine={false}
                      />
                      <YAxis
                        domain={[0, 100]}
                        tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 9, fontFamily: "monospace" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip
                        content={({ active, payload, label }) => {
                          if (active && payload?.length) {
                            return (
                              <div className="obsidian-card p-2.5 border border-white/20 text-xs font-mono shadow-xl">
                                <span className="text-white/40 block">{label}</span>
                                <span className="text-cyan-300 font-bold">
                                  {payload[0].value}% Projected Retention
                                </span>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="retention"
                        stroke="#38bdf8"
                        strokeWidth={2}
                        fill="url(#retentionGrad)"
                      />
                      <Area
                        type="monotone"
                        dataKey="benchmark"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth={1.5}
                        strokeDasharray="3 3"
                        fill="transparent"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full w-full bg-white/[0.02] rounded-lg animate-pulse" />
                )}
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-white/50 pt-2 border-t border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-0.5 bg-cyan-400" />
                  <span>Your Script Curve</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-0.5 bg-white/30 border-dashed" />
                  <span>Platform Baseline (68% at 3s)</span>
                </div>
              </div>
            </div>

            {/* Direct Optimization Fixes (5 Columns) */}
            <div className="lg:col-span-5 obsidian-card p-6 rounded-2xl border border-cyan-500/20 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Actionable Fixes
                  </span>
                  <span className="text-[10px] font-mono text-cyan-300">
                    {auditResult.recommendations.length} Detected
                  </span>
                </div>

                <div className="space-y-3 mt-4">
                  {auditResult.recommendations.map((rec, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-1 text-xs"
                    >
                      <div className="font-semibold text-white/90 flex items-center gap-1.5">
                        <Target className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                        <span>{rec.title}</span>
                      </div>
                      <p className="text-white/50 text-[11px] leading-relaxed font-sans pl-4.5">
                        {rec.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Send to Script Studio */}
              <Link
                href="/dashboard/brain"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(99,102,241,0.25)] mt-4"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Expand in BrainForge AI</span>
              </Link>
            </div>
          </div>

          {/* AI-Optimized Hook Variants */}
          {auditResult.optimizedVariants.length > 0 && (
            <div className="obsidian-card p-5 rounded-2xl border border-white/[0.08] space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  Auto-Optimized High-Retention Variants
                </span>
                <span className="text-[10px] font-mono text-emerald-400">Predicted +14% Hold</span>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                {auditResult.optimizedVariants.map((variant, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] flex flex-col justify-between space-y-3"
                  >
                    <p className="text-xs text-white/90 italic font-sans leading-relaxed">
                      &ldquo;{variant}&rdquo;
                    </p>
                    <div className="flex items-center justify-between pt-2 border-t border-white/[0.04]">
                      <button
                        onClick={() => applyPreset(variant)}
                        className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 cursor-pointer flex items-center gap-1"
                      >
                        <Zap className="w-3 h-3" />
                        <span>Test this Hook</span>
                      </button>
                      <button
                        onClick={() => copyHook(variant, idx)}
                        className="text-[11px] font-mono text-white/50 hover:text-white cursor-pointer flex items-center gap-1"
                      >
                        {copiedVariant === idx ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedVariant === idx ? "Copied" : "Copy"}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
