import { motion } from "framer-motion";
import { useCycleOnView } from "../../hooks/useCycleOnView";
import { ImpactBurst } from "./ImpactBurst";

const CYCLE_MS = 6000;
const ARROW_DURATION = 1.4;

const target = { x: 360, y: 120 };
const start = { x: 30, y: 270 };
const angleDeg = (Math.atan2(target.y - start.y, target.x - start.x) * 180) / Math.PI;

const rings = [
  { r: 52, tone: "text-navy-500/30" },
  { r: 38, tone: "text-ember-500/40" },
  { r: 24, tone: "text-navy-500/50" },
  { r: 10, tone: "text-ember-500" },
];

/**
 * Companion vignette to ChainReactionScene: an arrow flies in and sticks
 * dead-center in an archery target, which pulses on impact, then holds
 * before the whole thing resets and replays.
 */
export function TargetStrikeScene({ className = "" }: { className?: string }) {
  const { ref, cycle, shouldReduceMotion } = useCycleOnView(CYCLE_MS);

  return (
    <svg ref={ref} viewBox="0 0 420 320" className={className} aria-hidden="true" fill="none">
      <g key={cycle}>
        {/* Target stand */}
        <line x1={target.x} y1={target.y + 62} x2={target.x} y2={target.y + 110} stroke="currentColor" className="text-navy-900/15 dark:text-white/15" strokeWidth="3" />

        {rings.map((ring, index) => (
          <motion.circle
            key={ring.r}
            cx={target.x}
            cy={target.y}
            r={ring.r}
            stroke="currentColor"
            strokeWidth={index === rings.length - 1 ? 0 : 2}
            fill={index === rings.length - 1 ? "currentColor" : "none"}
            className={ring.tone}
            initial={{ scale: 1 }}
            animate={shouldReduceMotion ? { scale: 1 } : { scale: [1, 1, 1.12, 1] }}
            transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : ARROW_DURATION, times: [0, 0.85, 0.93, 1] }}
            style={{ transformOrigin: `${target.x}px ${target.y}px` }}
          />
        ))}

        <motion.g
          initial={{ opacity: 0 }}
          animate={
            shouldReduceMotion
              ? { x: target.x - start.x - 4, y: target.y - start.y, opacity: 1 }
              : { x: [0, target.x - start.x - 4], y: [0, target.y - start.y], opacity: [0, 1] }
          }
          transition={{ duration: ARROW_DURATION, ease: "easeIn" }}
          style={{ x: start.x, y: start.y, rotate: angleDeg }}
          className="text-ember-500"
        >
          <line x1="0" y1="0" x2="58" y2="0" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          {/* arrowhead at the tip */}
          <path d="M58 0 L48 -6 M58 0 L48 6" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
          {/* fletching at the tail */}
          <path d="M0 0 L-8 -5 M0 0 L-8 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
        </motion.g>

        <ImpactBurst x={target.x} y={target.y} delay={shouldReduceMotion ? 0 : ARROW_DURATION} color="rgb(221 122 46)" />
      </g>
    </svg>
  );
}
