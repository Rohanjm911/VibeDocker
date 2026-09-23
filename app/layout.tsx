import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VibeDocker • Executive Creator Architecture",
  description: "Hyper-minimalist creator operations platform. Neural script generation, real-time release queuing, second-by-second telemetry, and hook virality diagnostics.",
  icons: {
    icon: [
      { url: "/vibedocker-icon.svg?v=3", type: "image/svg+xml" },
      { url: "/icon.svg?v=3", type: "image/svg+xml" },
    ],
    shortcut: "/vibedocker-icon.svg?v=3",
    apple: "/vibedocker-icon.svg?v=3",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark bg-[#050508]">
      <head>
        <link rel="icon" href="/vibedocker-icon.svg?v=3" type="image/svg+xml" />
        <link rel="shortcut icon" href="/vibedocker-icon.svg?v=3" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/vibedocker-icon.svg?v=3" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#050508] text-[#f4f4f6] min-h-screen selection:bg-white/20 selection:text-white">
        {children}
      </body>
    </html>
  );
}
