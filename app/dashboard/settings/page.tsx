"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Settings, Check, Plus, Bell, Shield, User, LogOut, CheckCircle, Sliders } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser } from "@/lib/useUser";

const allPlatforms = [
  { id: "youtube", label: "YouTube", tag: "YT" },
  { id: "instagram", label: "Instagram", tag: "IG" },
  { id: "tiktok", label: "TikTok", tag: "TT" },
  { id: "linkedin", label: "LinkedIn", tag: "LI" },
];

export default function SettingsPage() {
  const user = useUser();
  const router = useRouter();
  const [notifications, setNotifications] = useState({ publish: true, insights: true, score: false });
  const [saved, setSaved] = useState(false);

  const connectedPlatforms = user ? [user.platform] : ["youtube"];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = () => {
    localStorage.removeItem("vibedocker_user");
    localStorage.removeItem("vibedock_user");
    localStorage.removeItem("chakra_user");
    router.push("/login");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 font-sans">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between border-b border-white/[0.06] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">Preferences & Identity</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">System Settings</h1>
          <p className="text-xs text-white/40 mt-1">Configure workspace credentials, API integrations, and alert telemetry</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-mono font-medium transition-all border border-rose-500/20"
        >
          <LogOut className="w-3.5 h-3.5" /> Sign Out
        </button>
      </motion.div>

      <div className="space-y-6">
        {/* Creator Dossier Card */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="obsidian-card p-6">
          <div className="flex items-center gap-2 mb-5">
            <User className="w-4 h-4 text-white/50" />
            <h2 className="text-sm font-semibold text-white tracking-wide">Creator Credentials</h2>
          </div>
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/[0.06]">
            <div className="w-14 h-14 rounded-xl bg-white/[0.06] border border-white/[0.12] flex items-center justify-center text-white font-mono font-bold text-lg overflow-hidden flex-shrink-0">
              {user?.avatarUrl ? (
                <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                user?.avatar ?? "C"
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-semibold text-white">{user?.name ?? "Rohan JM"}</span>
                {user?.verified && <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />}
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] text-white/70 border border-white/[0.08] uppercase">
                  {user?.platform ?? "YouTube"}
                </span>
              </div>
              <div className="text-xs font-mono text-white/40 mt-0.5">{user?.handle ?? "@rohanjm"}</div>
              <div className="text-xs text-white/30 mt-0.5">{user?.niche ?? "Tech & Creative Engineering"}</div>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-mono text-white/40 mb-1.5 block uppercase tracking-wider">Display Name</label>
              <input
                defaultValue={user?.name ?? "Rohan JM"}
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>
            <div>
              <label className="text-[11px] font-mono text-white/40 mb-1.5 block uppercase tracking-wider">Handle</label>
              <input
                defaultValue={user?.handle ?? "@rohanjm"}
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>
          </div>
        </motion.div>

        {/* Connected Platforms */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="obsidian-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-white/50" />
              <h2 className="text-sm font-semibold text-white tracking-wide">Platform Uplinks</h2>
            </div>
            <span className="text-[10px] font-mono text-white/40">OAuth 2.0 Direct</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {allPlatforms.map(platform => {
              const isConnected = connectedPlatforms.includes(platform.id);
              return (
                <div
                  key={platform.id}
                  className={cn(
                    "flex items-center justify-between p-3.5 rounded-lg border transition-all",
                    isConnected ? "bg-white/[0.03] border-white/[0.12]" : "bg-black/20 border-white/[0.04] opacity-60"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/[0.08] text-white/80">
                      {platform.tag}
                    </span>
                    <div>
                      <div className="text-xs font-medium text-white">{platform.label}</div>
                      <div className="text-[10px] font-mono text-white/30">
                        {isConnected ? (user?.handle ?? "@rohanjm") : "Unlinked"}
                      </div>
                    </div>
                  </div>
                  {isConnected ? (
                    <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                      <Check className="w-2.5 h-2.5" /> Active
                    </span>
                  ) : (
                    <button className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/[0.05] hover:bg-white/[0.1] text-white/70 text-[10px] font-mono transition-all border border-white/[0.08]">
                      <Plus className="w-2.5 h-2.5" /> Connect
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="obsidian-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-4 h-4 text-white/50" />
            <h2 className="text-sm font-semibold text-white tracking-wide">Telemetry Alerts</h2>
          </div>
          <div className="space-y-2.5">
            {[
              { key: "publish" as const, label: "Live Deployment Signal", desc: "Push notification when automated scheduling triggers live publishing" },
              { key: "insights" as const, label: "Neural Pattern Detection", desc: "Alert when AI identifies abnormal retention anomalies or competitor trends" },
              { key: "score" as const, label: "ViralAudit Threshold Warning", desc: "Flag drafts scoring below 75 before final render" },
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                <div>
                  <div className="text-xs font-medium text-white/90">{item.label}</div>
                  <div className="text-[11px] text-white/40 mt-0.5">{item.desc}</div>
                </div>
                <button
                  onClick={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                  className={cn(
                    "w-9 h-5 rounded-full transition-all relative flex-shrink-0 border",
                    notifications[item.key] ? "bg-white border-white" : "bg-white/[0.08] border-white/[0.12]"
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-0.5 w-3.5 h-3.5 rounded-full transition-all",
                      notifications[item.key] ? "left-4 bg-black" : "left-0.5 bg-white/60"
                    )}
                  />
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Save button */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
          <button
            onClick={handleSave}
            className={cn(
              "w-full py-2.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center justify-center gap-2 border",
              saved
                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                : "bg-white text-black hover:bg-white/90 border-white/20"
            )}
          >
            {saved ? <><Check className="w-3.5 h-3.5" /> Changes Persisted</> : "Save Configuration"}
          </button>
        </motion.div>
      </div>
    </div>
  );
}

