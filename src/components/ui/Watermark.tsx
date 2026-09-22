type WatermarkProps = {
  text: string;
  align?: "left" | "right";
};

export function Watermark({ text, align = "right" }: WatermarkProps) {
  return (
    <span
      aria-hidden="true"
      className={`font-display pointer-events-none absolute top-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[10rem] font-bold leading-none tracking-tighter text-navy-900/[0.035] dark:text-white/[0.04] sm:text-[14rem] lg:text-[18rem] ${
        align === "right" ? "right-0 translate-x-1/4" : "left-0 -translate-x-1/4"
      }`}
    >
      {text}
    </span>
  );
}
