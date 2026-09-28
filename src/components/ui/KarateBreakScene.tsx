import { motion } from "framer-motion";
import { useCycleOnView } from "../../hooks/useCycleOnView";
import { ImpactBurst } from "./ImpactBurst";

const CYCLE_MS = 6000;
const ARROW_DURATION = 0.85;
const IMPACT_DELAY = ARROW_DURATION;

const boardY = { top: 182, bottom: 192 };
const boardX = { left: 130, mid: 210, right: 290 };
const groundY = 230;

/**
 * Fourth choreographed vignette: a downward strike drives into a breaking
 * board, which splits into two halves that pop apart on impact. Same
 * cycle/key-remount pattern as the other scenes in this set.
 */
export function KarateBreakScene({ className = "" }: { className?: string }) {
  const { ref, cycle, shouldReduceMotion } = useCycleOnView(CYCLE_MS);

  return (
    <svg ref={ref} viewBox="0 0 420 300" className={className} aria-hidden="true" fill="none">
      <g key={cycle}>
        {/* Ground line */}
        <line x1="20" y1={groundY} x2="400" y2={groundY} stroke="currentColor" className="text-navy-900/10 dark:text-white/10" strokeWidth="1.5" />

        {/* Support blocks */}
        <g fill="currentColor" className="text-navy-700 dark:text-navy-200">
          <rect x={boardX.left - 5} y={boardY.bottom} width="30" height={groundY - boardY.bottom} rx="2" />
          <rect x={boardX.right - 25} y={boardY.bottom} width="30" height={groundY - boardY.bottom} rx="2" />
        </g>

        {/* Board — splits in two on impact */}
        <motion.rect
          x={boardX.left}
          y={boardY.top}
          width={boardX.mid - boardX.left}
          height={boardY.bottom - boardY.top}
          rx="1.5"
          fill="currentColor"
          className="text-brass-500"
          initial={{ x: 0, y: 0, rotate: 0 }}
          animate={
            shouldReduceMotion
              ? { x: -16, y: 20, rotate: -22 }
              : { x: [0, 0, -16], y: [0, 0, 20], rotate: [0, 0, -22] }
          }
          transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : IMPACT_DELAY, times: [0, 0.05, 1] }}
          style={{ transformOrigin: `${boardX.left}px ${boardY.top}px` }}
        />
        <motion.rect
          x={boardX.mid}
          y={boardY.top}
          width={boardX.right - boardX.mid}
          height={boardY.bottom - boardY.top}
          rx="1.5"
          fill="currentColor"
          className="text-brass-500"
          initial={{ x: 0, y: 0, rotate: 0 }}
          animate={
            shouldReduceMotion
              ? { x: 16, y: 20, rotate: 22 }
              : { x: [0, 0, 16], y: [0, 0, 20], rotate: [0, 0, 22] }
          }
          transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : IMPACT_DELAY, times: [0, 0.05, 1] }}
          style={{ transformOrigin: `${boardX.right}px ${boardY.top}px` }}
        />

        {/* Strike — descends fast onto the board's center line */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={
            shouldReduceMotion
              ? { opacity: 0 }
              : { y: [80, boardY.top - 4], opacity: [0, 1, 1, 0] }
          }
          transition={{ duration: ARROW_DURATION, times: [0, 0.6, 0.85, 1], ease: "easeIn" }}
          style={{ x: boardX.mid }}
          className="text-crimson-500"
        >
          <line x1="0" y1="-42" x2="0" y2="0" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M0 0 L-6 -10 M0 0 L6 -10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </motion.g>

        <ImpactBurst x={boardX.mid} y={boardY.top} delay={shouldReduceMotion ? 0 : IMPACT_DELAY} color="rgb(198 46 46)" />
      </g>
    </svg>
  );
}
