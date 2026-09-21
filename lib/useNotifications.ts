"use client";

import { useState, useEffect } from "react";

export type VibeNotification = {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "viral" | "collab" | "insight" | "alert" | "system";
  read: boolean;
  link?: string;
  linkText?: string;
  priority?: "high" | "normal" | "urgent";
};

const DEFAULT_NOTIFICATIONS: VibeNotification[] = [
  {
    id: "notif-1",
    title: "Viral Velocity Spike ⚡",
    message: "Your reel 'High-voltage morning routine' crossed 38.2K views! 3s retention is pacing +44.8% above niche baseline.",
    time: "4m ago",
    type: "viral",
    read: false,
    link: "/dashboard/virality",
    linkText: "View Viral Scorecard",
    priority: "urgent",
  },
  {
    id: "notif-2",
    title: "High-Signal Collab Match",
    message: "Elena Rostova (@elena.vfx) matched 98% on your creative radar for a 3D Title Sequence collaboration.",
    time: "24m ago",
    type: "collab",
    read: false,
    link: "/dashboard/connect",
    linkText: "Open Uplink Match",
    priority: "high",
  },
  {
    id: "notif-3",
    title: "BrainForge AI Ready",
    message: "3 new high-conversion curiosity-gap hooks generated for your upcoming 6:00 PM drop.",
    time: "1h ago",
    type: "insight",
    read: false,
    link: "/dashboard/brain",
    linkText: "Inspect Blueprint",
    priority: "normal",
  },
  {
    id: "notif-4",
    title: "Commercial Sponsor Inquiry",
    message: "HyperHydrate verified brand reviewed your media kit. Estimated placement tier: ₹20,000–₹35,000.",
    time: "4h ago",
    type: "alert",
    read: false,
    link: "/dashboard/brand",
    linkText: "Review Terms",
    priority: "high",
  },
  {
    id: "notif-5",
    title: "Autonomous FlowMatrix Alert",
    message: "Tomorrow's 18:00 YouTube drop is armed and queued for publication.",
    time: "1d ago",
    type: "system",
    read: true,
    link: "/dashboard/calendar",
    linkText: "Open Queue",
    priority: "normal",
  },
];

export function useNotifications() {
  const [notifications, setNotifications] = useState<VibeNotification[]>(() => {
    if (typeof window === "undefined") return DEFAULT_NOTIFICATIONS;
    const stored =
      localStorage.getItem("vibedocker_notifications_v2") ||
      localStorage.getItem("vibedock_notifications_v2");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {}
    }
    return DEFAULT_NOTIFICATIONS;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("vibedocker_notifications_v2", JSON.stringify(notifications));
      localStorage.setItem("vibedock_notifications_v2", JSON.stringify(notifications));
    }
  }, [notifications]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const resetDefaultNotifications = () => {
    setNotifications(DEFAULT_NOTIFICATIONS);
    if (typeof window !== "undefined") {
      localStorage.setItem("vibedocker_notifications_v2", JSON.stringify(DEFAULT_NOTIFICATIONS));
      localStorage.setItem("vibedock_notifications_v2", JSON.stringify(DEFAULT_NOTIFICATIONS));
    }
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    resetDefaultNotifications,
    clearAll,
  };
}
