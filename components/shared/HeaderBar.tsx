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
    <header className="h-12 border-b border-white/[0.07] bg-[#050508]/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 select-none">
      {/* Search Input with ⌘K */}
      <div className="flex items-center gap-2.5 sm:gap-3 flex-1 max-w-sm">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-1.5 rounded-md text-white/50 hover:text-white"
          aria-label="Open menu"
        >
          <Menu className="w-4 h-4" />
        </button>

        <div className="relative w-full">
          <Search className="w-3.5 h-3.5 text-white/30 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search commands, drafts, hooks..."
            className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-white/30 rounded-lg pl-8 pr-4 py-1 text-xs text-white placeholder-white/30 focus:outline-none transition-colors font-sans"
          />
          <span className="hidden sm:inline-block absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-mono text-white/30">
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
          className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-white/50 hover:text-white hover:bg-white/[0.06] text-xs font-mono transition-colors border border-transparent hover:border-white/[0.08] cursor-pointer"
        >
          <span>Tour Guide</span>
        </button>

        <Link
          href="/dashboard/brain"
          className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-white/70 hover:text-white hover:bg-white/[0.06] text-xs font-medium transition-colors border border-transparent hover:border-white/[0.08]"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>BrainForge AI</span>
        </Link>

        <NotificationPopover />
        <ProfilePopover />
      </div>
    </header>
  );
}
