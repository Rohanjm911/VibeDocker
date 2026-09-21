"use client";

import { useEffect, useState } from "react";

export type VibeUser = {
  name: string;
  handle: string;
  avatar: string;
  avatarUrl?: string;
  platform: string;
  followers: string;
  following: string;
  posts: string;
  engagement: string;
  avgLikes: string;
  avgComments: string;
  avgViews: string;
  niche: string;
  bio: string;
  verified: boolean;
};

export type ChakraUser = VibeUser;

export const PRESET_PROFILES: VibeUser[] = [
  {
    name: "Aarav Sharma",
    handle: "@aaravsharma.tech",
    avatar: "AS",
    avatarUrl: "/avatars/kai.jpg",
    platform: "youtube",
    followers: "420K",
    following: "280",
    posts: "186 videos",
    engagement: "8.4%",
    avgLikes: "32.6K",
    avgComments: "2,150",
    avgViews: "520K",
    niche: "AI Tech & Indian Creator Economy",
    bio: "Demystifying bleeding-edge AI models, cinema workflows & tech builds for modern India 🇮🇳",
    verified: true,
  },
  {
    name: "Aria Thorne",
    handle: "@ariathorne.vibes",
    avatar: "AT",
    avatarUrl: "/avatars/aria.jpg",
    platform: "instagram",
    followers: "148.5K",
    following: "842",
    posts: "419 reels",
    engagement: "8.6%",
    avgLikes: "12.4K",
    avgComments: "640",
    avgViews: "185K",
    niche: "Fitness & Cyber-Aesthetics",
    bio: "High-intensity athletic training & futuristic streetwear ⚡ Powered by VibeDocker",
    verified: true,
  },
  {
    name: "Priya Patel",
    handle: "@priyapatel.beats",
    avatar: "PP",
    avatarUrl: "/avatars/nova.jpg",
    platform: "tiktok",
    followers: "640K",
    following: "310",
    posts: "520 drops",
    engagement: "11.8%",
    avgLikes: "58.4K",
    avgComments: "3,420",
    avgViews: "850K",
    niche: "Desi Fusion Beats & Viral Trends",
    bio: "Indie classical meets future bass | Viral audio trends, stems & Bollywood flips ⚡",
    verified: true,
  },
  {
    name: "Marcus Vance",
    handle: "@marcus_scale",
    avatar: "MV",
    avatarUrl: "/avatars/marcus.jpg",
    platform: "linkedin",
    followers: "64.2K",
    following: "1,120",
    posts: "310 insights",
    engagement: "9.8%",
    avgLikes: "5,840",
    avgComments: "420",
    avgViews: "94K",
    niche: "Creator Economy & Growth",
    bio: "Helping modern operators build institutional-grade media engines | Keynote speaker",
    verified: true,
  },
];

export function setVibeUser(user: VibeUser) {
  if (typeof window !== "undefined") {
    localStorage.setItem("vibedocker_user", JSON.stringify(user));
    localStorage.setItem("vibedock_user", JSON.stringify(user));
    localStorage.setItem("chakra_user", JSON.stringify(user));
    window.dispatchEvent(new Event("storage"));
  }
}

export function useUser(): VibeUser | null {
  const [user, setUser] = useState<VibeUser | null>(PRESET_PROFILES[0]);

  useEffect(() => {
    const loadUser = () => {
      const stored = localStorage.getItem("vibedocker_user") || localStorage.getItem("vibedock_user") || localStorage.getItem("chakra_user");
      if (stored) {
        try { 
          setUser(JSON.parse(stored)); 
          return;
        } catch {}
      }
      setUser(PRESET_PROFILES[0]);
    };

    loadUser();

    const handleStorage = () => {
      loadUser();
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return user;
}
