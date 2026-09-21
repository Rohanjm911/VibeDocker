"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Settings, 
  LogOut, 
  CheckCircle, 
  BarChart3, 
  ChevronDown,
  RefreshCw,
  Sparkles
} from "lucide-react";
import { useUser, PRESET_PROFILES, setVibeUser, VibeUser } from "@/lib/useUser";
import { cn } from "@/lib/utils";

export default function ProfilePopover() {
  const user = useUser();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [showSwitchMenu, setShowSwitchMenu] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowSwitchMenu(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSelectProfile = (p: VibeUser) => {
    setVibeUser(p);
    setShowSwitchMenu(false);
    setIsOpen(false);
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("vibedocker_user");
      localStorage.removeItem("vibedock_user");
      localStorage.removeItem("chakra_user");
      window.dispatchEvent(new Event("storage"));
    }
    setIsOpen(false);
    router.push("/login");
  };

  if (!user) return null;

  return (
    <div className="relative" ref={containerRef}>
      {/* Profile Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle user profile menu"
        className={cn(
          "flex items-center gap-2 pl-2 border-l border-white/[0.08] text-left group transition-colors py-1 px-1.5 rounded-md cursor-pointer",
          isOpen ? "bg-white/[0.06]" : "hover:bg-white/[0.04]"
        )}
      >
        <div className={cn(
          "w-7 h-7 rounded-md bg-[#101118] border border-white/[0.12] p-[1px] flex-shrink-0 overflow-hidden transition-all",
          isOpen ? "border-white/40" : "group-hover:border-white/30"
        )}>
          <div className="w-full h-full rounded-[5px] flex items-center justify-center text-white/90 font-medium text-xs overflow-hidden">
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              user.avatar
            )}
          </div>
        </div>
        <div className="hidden lg:flex flex-col text-left">
          <span className="text-xs font-medium text-white/90 group-hover:text-white transition-colors flex items-center gap-1">
            {user.name}
            <ChevronDown className={cn("w-3 h-3 text-white/40 transition-transform duration-200", isOpen && "rotate-180 text-white")} />
          </span>
          <span className="text-[10px] text-white/40 font-mono">
            {user.handle}
          </span>
        </div>
      </button>

      {/* Floating Popup Window - Hyper Minimal Obsidian */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-[#0a0b10] rounded-xl border border-white/[0.1] shadow-2xl z-50 overflow-hidden text-white/90">
          {/* Header Card */}
          <div className="p-3.5 border-b border-white/[0.07] bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#12131c] border border-white/[0.12] p-[1px] flex-shrink-0 overflow-hidden">
                <div className="w-full h-full rounded-[6px] flex items-center justify-center text-white font-medium text-sm overflow-hidden">
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    user.avatar
                  )}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-xs text-white truncate">{user.name}</span>
                  {user.verified && <CheckCircle className="w-3 h-3 text-emerald-400 flex-shrink-0" />}
                </div>
                <div className="text-[11px] text-white/40 font-mono truncate">{user.handle}</div>
                <div className="text-[10px] text-white/50 capitalize mt-0.5 font-mono">
                  {user.platform} • Active
                </div>
              </div>
            </div>

            {/* Quick Telemetry Grid */}
            <div className="grid grid-cols-3 gap-1.5 mt-3 pt-3 border-t border-white/[0.07] text-center">
              <div className="p-1.5 rounded bg-black/40 border border-white/[0.05]">
                <div className="text-[9px] text-white/40 uppercase font-mono">Audience</div>
                <div className="text-xs font-semibold text-white/90 mt-0.5">{user.followers}</div>
              </div>
              <div className="p-1.5 rounded bg-black/40 border border-white/[0.05]">
                <div className="text-[9px] text-white/40 uppercase font-mono">Retention</div>
                <div className="text-xs font-semibold text-emerald-400 mt-0.5">{user.engagement}</div>
              </div>
              <div className="p-1.5 rounded bg-black/40 border border-white/[0.05]">
                <div className="text-[9px] text-white/40 uppercase font-mono">Avg Views</div>
                <div className="text-xs font-semibold text-white/90 mt-0.5">{user.avgViews}</div>
              </div>
            </div>
          </div>

          {/* Quick Profile Switcher Submenu */}
          {showSwitchMenu ? (
            <div className="p-2 border-b border-white/[0.07] bg-black/30">
              <div className="flex items-center justify-between px-2 py-1 text-[10px] uppercase font-mono text-white/40">
                <span>Select Creator Persona</span>
                <button
                  onClick={() => setShowSwitchMenu(false)}
                  className="text-white/60 hover:text-white text-[10px] font-mono"
                >
                  Close
                </button>
              </div>
              <div className="space-y-0.5 mt-1 max-h-44 overflow-y-auto no-scrollbar">
                {PRESET_PROFILES.map((p) => {
                  const isCurrent = p.handle === user.handle;
                  return (
                    <button
                      key={p.handle}
                      onClick={() => handleSelectProfile(p)}
                      className={cn(
                        "w-full flex items-center justify-between p-1.5 rounded-md text-left text-xs transition-colors cursor-pointer",
                        isCurrent
                          ? "bg-white/[0.08] text-white font-medium"
                          : "hover:bg-white/[0.04] text-white/50 hover:text-white/80"
                      )}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-5 h-5 rounded bg-[#161822] flex items-center justify-center font-bold text-[9px] overflow-hidden flex-shrink-0">
                          {p.avatarUrl ? (
                            <img src={p.avatarUrl} alt={p.name} className="w-full h-full object-cover" />
                          ) : (
                            p.avatar
                          )}
                        </div>
                        <span className="truncate text-[11px]">{p.name}</span>
                      </div>
                      {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          {/* Action Menu Items */}
          <div className="p-1.5 space-y-0.5">
            <button
              onClick={() => setShowSwitchMenu(!showSwitchMenu)}
              className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs text-white/60 hover:text-white hover:bg-white/[0.04] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 text-white/40" />
                <span>Switch Persona</span>
              </div>
              <span className="text-[10px] text-white/40 font-mono">
                {PRESET_PROFILES.length} Profiles
              </span>
            </button>

            <Link
              href="/dashboard/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs text-white/60 hover:text-white hover:bg-white/[0.04] transition-colors"
            >
              <Settings className="w-3.5 h-3.5 text-white/40" />
              <span>Settings & Keys</span>
            </Link>

            <Link
              href="/dashboard/analytics"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs text-white/60 hover:text-white hover:bg-white/[0.04] transition-colors"
            >
              <BarChart3 className="w-3.5 h-3.5 text-white/40" />
              <span>Lens Telemetry</span>
            </Link>
          </div>

          {/* Footer / Sign Out */}
          <div className="p-1.5 border-t border-white/[0.07]">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
