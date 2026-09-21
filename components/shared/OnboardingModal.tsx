"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Flame,
  CalendarDays,
  Repeat2,
  BarChart3,
  Zap,
  TrendingUp,
  X,
  ArrowRight,
  CheckCircle2,
  Layers,
  Compass,
} from "lucide-react";
import { cn } from "@/lib/utils";

const onboardSteps = [
  {
    category: "Welcome to VibeDocker OS",
    title: "Your Autonomous Creator Operating System",
    desc: "VibeDocker combines algorithmic intelligence, multi-platform scheduling, and neural script writing into a unified stealth command deck.",
    icon: Sparkles,
    color: "from-violet-600 via-indigo-600 to-cyan-500",
    badge: "System Architecture",
    highlights: [
      "Zero-latency command telemetry",
      "Audience drop-off pacing intelligence",
      "One-click multi-format morphing",
    ],
  },
  {
    category: "Creation Studio",
    title: "BrainForge AI & Content Morph",
    desc: "Generate high-retention 0–3s dopamine hooks, production cut roadmaps, and instantly transform 1 raw seed idea into platform-native Instagram Reels, YouTube Shorts, LinkedIn Posts, and X Threads.",
    icon: Flame,
    color: "from-pink-500 via-purple-600 to-indigo-600",
    badge: "Generative Engines",
    highlights: [
      "BrainForge AI: Retention hook formulas & teleprompter scripts",
      "Content Morph: 1 idea -> 6 native platform outputs",
      "FlowMatrix: Autonomous drop calendar & time-slot queue",
    ],
  },
  {
    category: "Intelligence & Radar",
    title: "Lens Telemetry & ViralAudit 360",
    desc: "Audit script hooks before filming to predict watch-time completion and detect drop-off friction points with second-by-second hold curves.",
    icon: Zap,
    color: "from-cyan-500 via-teal-500 to-emerald-500",
    badge: "Retention Diagnostics",
    highlights: [
      "ViralAudit 360: Algorithmic hook score & dopamine pacing",
      "Lens Telemetry: Second-by-second audience decay graph",
      "Trend Radar: Real-time cultural velocity tracking",
    ],
  },
  {
    category: "Network & Commercial",
    title: "Sponsor Readiness & Creator Uplink",
    desc: "Calculate your CPM leverage, brand deal valuation tiers, and network with vetted top-tier creator operators.",
    icon: TrendingUp,
    color: "from-amber-500 via-orange-500 to-rose-500",
    badge: "Monetization Engine",
    highlights: [
      "Brand Readiness Score: CPM audit and media kit automation",
      "Compounding Engine: 30-day projection modeling",
      "Creator Uplink: High-signal peer network",
    ],
  },
];

export default function OnboardingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasSeen =
        localStorage.getItem("vibedocker_onboarding_completed") ||
        localStorage.getItem("vibedock_onboarding_completed");
      if (!hasSeen) {
        // Small delay for smooth entry
        const timer = setTimeout(() => setIsOpen(true), 600);
        return () => clearTimeout(timer);
      }
    }

    const handleReopen = () => {
      setCurrentStep(0);
      setIsOpen(true);
    };

    window.addEventListener("vibedocker_open_onboarding", handleReopen);
    window.addEventListener("vibedock_open_onboarding", handleReopen);
    return () => {
      window.removeEventListener("vibedocker_open_onboarding", handleReopen);
      window.removeEventListener("vibedock_open_onboarding", handleReopen);
    };
  }, []);

  const handleDismiss = () => {
    setIsOpen(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("vibedocker_onboarding_completed", "true");
      localStorage.setItem("vibedock_onboarding_completed", "true");
    }
  };

  const handleNext = () => {
    if (currentStep < onboardSteps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleDismiss();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  if (!isOpen) return null;

  const step = onboardSteps[currentStep];
  const StepIcon = step.icon;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="bg-[#090b12] border border-white/[0.14] shadow-[0_0_50px_rgba(0,0,0,0.8)] rounded-2xl w-full max-w-xl overflow-hidden relative"
        >
          {/* Top Gradient Accent Bar */}
          <div className={cn("h-1.5 w-full bg-gradient-to-r", step.color)} />

          {/* Header Controls */}
          <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                {step.category}
              </span>
              <span className="text-white/20">•</span>
              <span className="text-[10px] font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-full">
                {step.badge}
              </span>
            </div>

            <button
              onClick={handleDismiss}
              className="text-white/40 hover:text-white p-1 rounded-lg hover:bg-white/[0.06] transition-colors cursor-pointer"
              aria-label="Skip Tour"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content Area */}
          <div className="p-6 space-y-5 text-left">
            <div className="flex items-start gap-4">
              <div
                className={cn(
                  "w-12 h-12 rounded-xl bg-gradient-to-tr p-[1px] flex-shrink-0 shadow-lg",
                  step.color
                )}
              >
                <div className="w-full h-full bg-[#0a0c16] rounded-[11px] flex items-center justify-center text-white">
                  <StepIcon className="w-6 h-6" />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white tracking-tight leading-snug">
                  {step.title}
                </h3>
                <p className="text-xs text-white/60 font-sans leading-relaxed mt-1">
                  {step.desc}
                </p>
              </div>
            </div>

            {/* Highlights List */}
            <div className="bg-[#05060b] border border-white/[0.06] rounded-xl p-3.5 space-y-2">
              <span className="text-[10px] font-mono uppercase text-white/40 font-semibold block">
                Key Components:
              </span>
              <div className="space-y-1.5">
                {step.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-white/80 font-sans">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step Indicators */}
            <div className="flex items-center justify-center gap-1.5 pt-1">
              {onboardSteps.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentStep(idx)}
                  className={cn(
                    "h-1.5 rounded-full transition-all cursor-pointer",
                    currentStep === idx
                      ? "w-7 bg-white"
                      : "w-2 bg-white/20 hover:bg-white/40"
                  )}
                />
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between px-6 py-4 bg-white/[0.02] border-t border-white/[0.07]">
            <button
              onClick={handleDismiss}
              className="text-xs font-mono text-white/40 hover:text-white transition-colors cursor-pointer"
            >
              Skip Walkthrough
            </button>

            <div className="flex items-center gap-2">
              {currentStep > 0 && (
                <button
                  onClick={handlePrev}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-mono text-white/60 hover:text-white border border-white/[0.08] hover:bg-white/[0.04] transition-colors cursor-pointer"
                >
                  Back
                </button>
              )}

              <button
                onClick={handleNext}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-medium text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(99,102,241,0.35)]"
              >
                <span>{currentStep === onboardSteps.length - 1 ? "Launch Command Deck" : "Next Module"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
