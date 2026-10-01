"use client";

import Link from "next/link";
import { Search, Sparkles, Menu } from "lucide-react";
import NotificationPopover from "./NotificationPopover";
import ProfilePopover from "./ProfilePopover";

export default function HeaderBar({
  onMenuToggle,
}: {
  onMenuToggle?: () => void;
}) {
  return (
    <header className="h-13 border-b border-white/[0.06] bg-[#07080d]/75 backdrop-blur-2xl px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 select-none transition-colors">
      {/* Search Input with ⌘K */}
      <div className="flex items-center gap-2.5 sm:gap-3 flex-1 max-w-sm">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/[0.05]"
          aria-label="Open menu"
        >
          <Menu className="w-4 h-4" />
        </button>

        <div className="relative w-full">
          <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search commands, drafts, hooks..."
            className="w-full bg-white/[0.04] border border-white/[0.07] focus:border-white/20 rounded-xl pl-9 pr-4 py-1.5 text-xs text-white placeholder-white/30 focus:outline-none transition-all font-sans"
          />
          <span className="hidden sm:inline-block absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-white/30 px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]">
            ⌘K
          </span>
        </div>
      </div>

      {/* Right Studio Actions */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        <button
          onClick={() => {
            if (typeof window !== "undefined") {
              localStorage.removeItem("vibedocker_onboarding_completed");
              localStorage.removeItem("vibedock_onboarding_completed");
              window.dispatchEvent(new Event("vibedocker_open_onboarding"));
              window.dispatchEvent(new Event("vibedock_open_onboarding"));
            }
          }}
          title="Open System Walkthrough"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-white/80 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] text-xs font-mono transition-all border border-white/[0.08] hover:border-white/20 cursor-pointer shadow-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span>How to use</span>
        </button>

        <Link
          href="/dashboard/brain"
          className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/[0.06] text-xs font-medium transition-colors border border-transparent hover:border-white/[0.08]"
        >
          <Sparkles className="w-3.5 h-3.5 text-white" />
          <span>BrainForge AI</span>
        </Link>

        <NotificationPopover />
        <ProfilePopover />
      </div>
    </header>
  );
}
