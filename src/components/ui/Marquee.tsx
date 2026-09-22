import type { ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

type MarqueeProps = {
  children: ReactNode;
  speed?: "slow" | "normal";
  reverse?: boolean;
  className?: string;
};

export function Marquee({ children, speed = "normal", reverse = false, className = "" }: MarqueeProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={`flex flex-wrap gap-8 ${className}`}>{children}</div>;
  }

  return (
    <div className={`group overflow-hidden ${className}`} style={{ maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)" }}>
      <div
        className={`flex w-max shrink-0 gap-8 ${speed === "slow" ? "animate-marquee-slow" : "animate-marquee"} ${
          reverse ? "[animation-direction:reverse]" : ""
        } group-hover:[animation-play-state:paused]`}
      >
        {children}
        <div aria-hidden className="flex shrink-0 gap-8">
          {children}
        </div>
      </div>
    </div>
  );
}
