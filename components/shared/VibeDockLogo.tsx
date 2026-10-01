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
    sm: { box: "w-7 h-7", img: 28, text: "text-xs", sub: "text-[9px]" },
    default: { box: "w-8 h-8", img: 32, text: "text-sm", sub: "text-[10px]" },
    lg: { box: "w-10 h-10", img: 40, text: "text-base", sub: "text-xs" },
    xl: { box: "w-12 h-12", img: 48, text: "text-lg", sub: "text-xs" },
  }[size];

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Brand Master Mark Badge */}
      <div
        className={`relative ${dimensions.box} rounded-xl bg-white/[0.04] border border-white/[0.12] p-[1px] flex-shrink-0 shadow-[0_2px_12px_-2px_rgba(255,255,255,0.12)] overflow-hidden group hover:border-white/30 transition-all`}
      >
        <div className="w-full h-full bg-[#08080c] rounded-[10px] flex items-center justify-center overflow-hidden">
          <img
            src="/brand-logo.png"
            alt="VibeDocker Brand Logo"
            className="w-full h-full object-contain p-0.5 mix-blend-screen scale-110"
          />
        </div>
      </div>

      {withText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span className={`font-bold tracking-tight text-white ${dimensions.text}`}>
              <span className="text-red-500 font-extrabold">V</span>IB<span className="text-blue-500 font-extrabold">E</span>
              <span className="text-white ml-0.5 font-normal">DOCK<span className="text-orange-500 font-bold">ER</span>.</span>
            </span>
            <span className="text-[9px] font-mono text-white/50 px-1 py-0.2 rounded bg-white/[0.06] border border-white/[0.08]">
              OS
            </span>
          </div>
          <span className="text-white/40 font-mono text-[8px] tracking-wider mt-1">
            Turning Ideas Into Visual Pieces
          </span>
        </div>
      )}
    </div>
  );
}

export const VibeDockLogo = VibeDockerLogo;
export default VibeDockerLogo;
