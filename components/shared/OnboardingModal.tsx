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
  ArrowLeft,
  CheckCircle2,
  Compass,
  Layers,
  Sliders,
  DollarSign,
  Radio,
  FileText
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface OnboardFeatureStep {
  featureId: string;
  category: string;
  badge: string;
  title: string;
  desc: string;
  icon: any;
  howToUse: string[];
  routePath: string;
}

const onboardSteps: OnboardFeatureStep[] = [
  {
    featureId: "welcome",
    category: "System Architecture",
    badge: "01 / 07",
    title: "Command Deck • Executive Architecture",
    desc: "Your centralized cockpit for real-time creator intelligence, attention retention curves, and live audience telemetry.",
    icon: Flame,
    howToUse: [
      "Creator Dossier: Inspect your profile reach, bio, and platform verification status at the top.",
      "Live KPI Metric Cards: Monitor Avg Views, Likes, Comments & Vibe Retention in real-time.",
      "7-Day Attention Curve Spline: Click any day dot on the graph to inspect second-by-second hold rates."
    ],
    routePath: "/dashboard"
  },
  {
    featureId: "simulator",
    category: "Neural Hook Engine",
    badge: "02 / 07",
    title: "Live Content Simulator & AI Hook Generation",
    desc: "Simulate audience retention and predict virality before filming your next video.",
    icon: Sparkles,
    howToUse: [
      "Input Your Topic: Type any concept, keyword or video title into the prompt box.",
      "Select Psychological Angle: Choose between Curiosity Gap, Contrarian, Warning, or Story Arc.",
      "Platform-Biased Telemetry: Toggle YouTube, Instagram, TikTok, or LinkedIn to adapt algorithm weighting.",
      "Inspect & Copy: Review predicted 3s retention hold score and click 'Copy Hook'."
    ],
    routePath: "/dashboard"
  },
  {
    featureId: "brain",
    category: "Generative Engine",
    badge: "03 / 07",
    title: "BrainForge AI • Neural Script Engine",
    desc: "Synthesize full production-ready scripts from raw seed ideas in seconds.",
    icon: FileText,
    howToUse: [
      "Seed Prompt: Enter your video angle, core lesson, or story premise.",
      "Tone & Voice Customization: Calibrate humor, urgency, technical depth, and pacing rhythm.",
      "Teleprompter Delivery: Read your generated hook, body, and CTA formatted for vertical video."
    ],
    routePath: "/dashboard/brain"
  },
  {
    featureId: "calendar",
    category: "Scheduling Matrix",
    badge: "04 / 07",
    title: "FlowMatrix • Autonomous Multi-Platform Calendar",
    desc: "Orchestrate automated content drop queues across all major channels.",
    icon: CalendarDays,
    howToUse: [
      "Unified Timeline: Drag & drop your content into optimal high-traffic publishing slots.",
      "Status Pipeline: Track posts through Draft, Staged, Queued, and Published states.",
      "Peak Attention Matching: FlowMatrix auto-highlights highest retention windows (e.g. 6:45 PM EST)."
    ],
    routePath: "/dashboard/calendar"
  },
  {
    featureId: "morph",
    category: "Format Transmutation",
    badge: "05 / 07",
    title: "Content Morph • 1 Seed to 6 Formats",
    desc: "Transform 1 long-form script or idea into platform-native formats instantly.",
    icon: Repeat2,
    howToUse: [
      "Paste Source Content: Add a YouTube script, transcript, or newsletter draft.",
      "Select Target Outputs: Generate Instagram Carousel frames, TikTok short cuts, LinkedIn carousel posts & X threads simultaneously.",
      "One-Click Staging: Send morphed variations directly into your FlowMatrix calendar."
    ],
    routePath: "/dashboard/morph"
  },
  {
    featureId: "virality",
    category: "Deep Telemetry",
    badge: "06 / 07",
    title: "ViralAudit 360 & Lens Telemetry",
    desc: "Second-by-second audience hold analysis, drop-off friction points, and watch-time prediction.",
    icon: Zap,
    howToUse: [
      "Drop-off Friction Detection: Identify the exact seconds where viewer attention drops below 50%.",
      "Virality Score (0-100): Algorithmic composite score based on hook strength, pacing, and retention.",
      "Actionable Recommendations: Get director-level fixes to optimize 3s hold and ending re-watch loops."
    ],
    routePath: "/dashboard/virality"
  },
  {
    featureId: "commercial",
    category: "Commercial Engine",
    badge: "07 / 07",
    title: "Sponsor Readiness & Creator Uplink",
    desc: "Calculate brand deal sponsorship valuations and connect with vetted top-tier creator operators.",
    icon: DollarSign,
    howToUse: [
      "CPM Valuation Tiers: View your suggested dynamic brand deal pricing based on verified audience demographics.",
      "Media Kit Auto-Sync: Generate institutional-ready sponsor decks with live telemetry links.",
      "Creator Uplink: Discover and cross-pollinate with high-signal creator collaborators."
    ],
    routePath: "/dashboard/brand"
  }
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
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="bg-[#0b0c10] border border-white/[0.12] shadow-[0_24px_60px_rgba(0,0,0,0.9),0_1px_1px_rgba(255,255,255,0.1)_inset] rounded-3xl w-full max-w-2xl overflow-hidden relative select-none"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 pt-5 pb-3.5 border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/50">
                {step.category}
              </span>
              <span className="text-white/20">•</span>
              <span className="text-[10px] font-mono text-white/80 bg-white/[0.06] border border-white/[0.1] px-2.5 py-0.5 rounded-full">
                {step.badge}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-white/40 hidden sm:inline">
                Interactive Walkthrough
              </span>
              <button
                onClick={handleDismiss}
                className="text-white/40 hover:text-white p-1 rounded-xl hover:bg-white/[0.06] transition-colors cursor-pointer"
                aria-label="Close Tour"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="p-6 sm:p-7 space-y-5 text-left">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/[0.12] p-1 flex-shrink-0 flex items-center justify-center text-white shadow-sm">
                <StepIcon className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-white tracking-tight leading-snug">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/60 font-sans leading-relaxed mt-1">
                  {step.desc}
                </p>
              </div>
            </div>

            {/* How to Use Checklist */}
            <div className="bg-[#050608] border border-white/[0.07] rounded-2xl p-4 sm:p-5 space-y-2.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 font-semibold block">
                How to use this feature:
              </span>
              <div className="space-y-2">
                {step.howToUse.map((instruction, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/85 font-sans leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                    <span>{instruction}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Stepper Dots */}
            <div className="flex items-center justify-center gap-1.5 pt-1">
              {onboardSteps.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentStep(idx)}
                  className={cn(
                    "h-1.5 rounded-full transition-all cursor-pointer",
                    currentStep === idx
                      ? "w-8 bg-white"
                      : "w-2 bg-white/20 hover:bg-white/40"
                  )}
                  aria-label={`Jump to step ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Footer Controls */}
          <div className="flex items-center justify-between px-6 py-4 bg-white/[0.02] border-t border-white/[0.08]">
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
                  className="px-4 py-2 rounded-xl text-xs font-mono text-white/70 hover:text-white border border-white/[0.1] hover:bg-white/[0.06] transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
              )}

              <button
                onClick={handleNext}
                className="px-5 py-2 rounded-xl bg-white hover:bg-white/90 text-black font-semibold text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span>{currentStep === onboardSteps.length - 1 ? "Launch Cockpit" : "Next Module"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
