"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/shared/Sidebar";
import HeaderBar from "@/components/shared/HeaderBar";
import OnboardingModal from "@/components/shared/OnboardingModal";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (
      !localStorage.getItem("vibedocker_user") &&
      !localStorage.getItem("vibedock_user") &&
      !localStorage.getItem("chakra_user")
    ) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="flex h-screen overflow-hidden bg-[#050508] bg-obsidian-grid">
      <OnboardingModal />
      <Sidebar
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />
      <div className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
        <HeaderBar onMenuToggle={() => setMobileMenuOpen(true)} />
        <main className="flex-1 overflow-y-auto no-scrollbar scroll-smooth">
          {children}
        </main>
      </div>
    </div>
  );
}
