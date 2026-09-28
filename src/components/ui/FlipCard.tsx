import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type FlipCardProps = {
  flipped: boolean;
  front: ReactNode;
  back: ReactNode;
  minHeightClassName?: string;
  className?: string;
};

/**
 * Shared 3D flip-card shell used by the coaching program cards and the
 * leadership cards. Owns only the perspective/rotateY mechanics and
 * reduced-motion handling — front/back content and their own flip-trigger
 * buttons are supplied by the caller.
 */
export function FlipCard({ flipped, front, back, minHeightClassName = "min-h-[440px]", className = "" }: FlipCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`relative ${className}`} style={{ perspective: 1400 }}>
      <motion.div
        className={`relative ${minHeightClassName}`}
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.65, ease: [0.4, 0.2, 0.2, 1] }}
      >
        <div className="absolute inset-0 overflow-hidden rounded-2xl" style={{ backfaceVisibility: "hidden" }}>
          {front}
        </div>
        <div
          className="absolute inset-0 overflow-hidden rounded-2xl"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {back}
        </div>
      </motion.div>
    </div>
  );
}
