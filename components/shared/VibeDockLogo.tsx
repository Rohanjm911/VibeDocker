export function VibeDockerLogo({
  size = "default",
  withText = true,
  className = "",
}: {
  size?: "sm" | "default" | "lg" | "xl";
  withText?: boolean;
  className?: string;
}) {
  const dimensions = {
    sm: { box: "w-7 h-7", svg: 15, text: "text-xs", sub: "text-[9px]" },
    default: { box: "w-8 h-8", svg: 17, text: "text-sm", sub: "text-[10px]" },
    lg: { box: "w-10 h-10", svg: 22, text: "text-base", sub: "text-xs" },
    xl: { box: "w-12 h-12", svg: 26, text: "text-lg", sub: "text-xs" },
  }[size];

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Precision Geometric Vector Mark with Gradient Glow */}
      <div
        className={`relative ${dimensions.box} rounded-lg bg-gradient-to-tr from-violet-600 via-indigo-500 to-cyan-400 p-[1px] flex-shrink-0 shadow-[0_0_15px_rgba(99,102,241,0.35)]`}
      >
        <div className="w-full h-full bg-[#090a12] rounded-[7px] flex items-center justify-center">
          <svg
            width={dimensions.svg}
            height={dimensions.svg}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
              className="fill-cyan-300 drop-shadow-[0_0_6px_rgba(6,182,212,0.8)]"
            />
          </svg>
        </div>
      </div>

      {withText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span className={`font-semibold tracking-tight text-white ${dimensions.text}`}>
              Vibe<span className="text-white/60 font-normal">Docker</span>
            </span>
            <span className="text-[9px] font-mono text-white/50 px-1 py-0.2 rounded bg-white/[0.06] border border-white/[0.08]">
              OS
            </span>
          </div>
          <span className="text-white/40 font-mono text-[9px] tracking-wider uppercase mt-1">
            Studio Engine
          </span>
        </div>
      )}
    </div>
  );
}

export const VibeDockLogo = VibeDockerLogo;
export default VibeDockerLogo;
