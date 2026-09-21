"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs";

interface AnimePulseBarProps {
  score: number; // 0 to 100
  duration?: number;
  className?: string;
  barClassName?: string;
}

export default function AnimePulseBar({
  score,
  duration = 1000,
  className = "",
  barClassName = "",
}: AnimePulseBarProps) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!barRef.current) return;

    const anim = animate(barRef.current, {
      width: [`0%`, `${Math.min(100, Math.max(0, score))}%`],
      ease: "outExpo",
      duration: duration,
    });

    return () => {
      anim.pause();
    };
  }, [score, duration]);

  return (
    <div className={`h-1.5 w-full bg-white/[0.04] rounded-full overflow-hidden ${className}`}>
      <div
        ref={barRef}
        className={`h-full rounded-full bg-white ${barClassName}`}
        style={{ width: "0%" }}
      />
    </div>
  );
}
