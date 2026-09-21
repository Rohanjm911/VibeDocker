"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs";

interface AnimeCounterProps {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export default function AnimeCounter({
  value,
  duration = 1200,
  decimals = 0,
  prefix = "",
  suffix = "",
  className = "",
}: AnimeCounterProps) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const objRef = useRef({ val: 0 });

  useEffect(() => {
    if (!spanRef.current) return;

    const anim = animate(objRef.current, {
      val: value,
      round: decimals > 0 ? Math.pow(10, decimals) : 1,
      ease: "outExpo",
      duration: duration,
      onUpdate: () => {
        if (spanRef.current) {
          const formatted = decimals > 0
            ? objRef.current.val.toFixed(decimals)
            : Math.round(objRef.current.val).toLocaleString();
          spanRef.current.innerText = `${prefix}${formatted}${suffix}`;
        }
      },
    });

    return () => {
      anim.pause();
    };
  }, [value, duration, decimals, prefix, suffix]);

  return <span ref={spanRef} className={className}>{prefix}0{suffix}</span>;
}
