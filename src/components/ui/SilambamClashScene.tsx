import { motion } from "framer-motion";
import { useCycleOnView } from "../../hooks/useCycleOnView";
import { ImpactBurst } from "./ImpactBurst";

const CYCLE_MS = 6800;
const STICK_DURATION = 1.1;
const IMPACT_DELAY = STICK_DURATION;

const stickStart = { x: -30, y: 120 };
const stickTarget = { x: 300, y: 205 };
const cone = { baseY: 240, apexY: 180, cx: 310 };

/**
 * Fifth choreographed vignette: a twirling silambam stick sweeps in and
 * knocks over a target cone, which tips and settles. Same cycle/key-remount
 * pattern as the other scenes in this set.
 */
export function SilambamClashScene({ className = "" }: { className?: string }) {
  const { ref, cycle, shouldReduceMotion } = useCycleOnView(CYCLE_MS);

  return (
    <svg ref={ref} viewBox="0 0 420 300" className={className} aria-hidden="true" fill="none">
      <g key={cycle}>
        {/* Ground line */}
        <line x1="20" y1={cone.baseY} x2="400" y2={cone.baseY} stroke="currentColor" className="text-navy-900/10 dark:text-white/10" strokeWidth="1.5" />

        {/* Cone — tips over on impact */}
        <motion.polygon
          points={`${cone.cx - 20},${cone.baseY} ${cone.cx + 20},${cone.baseY} ${cone.cx},${cone.apexY}`}
          fill="currentColor"
          className="text-crimson-500"
          initial={{ x: 0, y: 0, rotate: 0 }}
          animate={
            shouldReduceMotion
              ? { x: 26, y: 10, rotate: 75 }
              : { x: [0, 0, 26], y: [0, 0, 10], rotate: [0, 0, 75] }
          }
          transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : IMPACT_DELAY, times: [0, 0.05, 1] }}
          style={{ transformOrigin: `${cone.cx}px ${cone.baseY}px` }}
        />

        {/* Stick — twirls in and sweeps the cone aside */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={
            shouldReduceMotion
              ? { x: stickTarget.x, y: stickTarget.y, rotate: -25, opacity: 1 }
              : {
                  x: [stickStart.x, stickTarget.x],
                  y: [stickStart.y, stickTarget.y],
                  rotate: [0, 640],
                  opacity: [0, 1, 1, 1],
                }
          }
          transition={{ duration: STICK_DURATION, times: [0, 0.15, 0.9, 1], ease: "easeIn" }}
          className="text-brass-500"
        >
          <line x1="-45" y1="0" x2="45" y2="0" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <circle cx="45" cy="0" r="3.5" fill="currentColor" />
          <circle cx="-45" cy="0" r="3.5" fill="currentColor" />
        </motion.g>

        <ImpactBurst x={stickTarget.x} y={stickTarget.y} delay={shouldReduceMotion ? 0 : IMPACT_DELAY} color="rgb(201 161 90)" />
      </g>
    </svg>
  );
}
