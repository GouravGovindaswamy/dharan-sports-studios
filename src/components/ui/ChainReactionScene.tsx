import { motion } from "framer-motion";
import { useCycleOnView } from "../../hooks/useCycleOnView";
import { ImpactBurst } from "./ImpactBurst";

const CYCLE_MS = 7000;

// Choreography constants — every stage's timing is derived from these so the
// arrow's arrival, the ball's launch, and the bails' scatter always land in
// sync regardless of tweaks.
const ARROW_DURATION = 1.3;
const BALL_DELAY = ARROW_DURATION;
const BALL_DURATION = 1.5;
const IMPACT_DELAY = BALL_DELAY + BALL_DURATION;

/**
 * A small choreographed vignette, not ambient drift: an arrow flies in and
 * taps a cricket ball into motion, the ball arcs across and knocks the
 * bails off the stumps, everything settles, then the whole sequence resets
 * and replays. Built by remounting the SVG (via `key`) each cycle so every
 * element can use simple one-shot keyframes instead of one shared timeline.
 */
export function ChainReactionScene({ className = "" }: { className?: string }) {
  const { ref, cycle, shouldReduceMotion } = useCycleOnView(CYCLE_MS);

  const ballStart = { x: 150, y: 190 };
  const ballPeak = { x: 270, y: 108 };
  const ballEnd = { x: 388, y: 210 };
  const stumpBaseY = 250;
  const stumpTopY = 172;
  const stumpXs = [374, 389, 404];

  return (
    <svg ref={ref} viewBox="0 0 520 320" className={className} aria-hidden="true" fill="none">
      <g key={cycle}>
        {/* Ground line */}
        <line x1="20" y1={stumpBaseY} x2="500" y2={stumpBaseY} stroke="currentColor" className="text-navy-900/10 dark:text-white/10" strokeWidth="1.5" />

        {/* Stumps (subtle tilt on impact) */}
        <motion.g
          initial={{ rotate: 0 }}
          animate={shouldReduceMotion ? { rotate: -6 } : { rotate: [0, 0, -6] }}
          transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : IMPACT_DELAY, times: [0, 0.9, 1] }}
          style={{ transformOrigin: `${stumpXs[1]}px ${stumpBaseY}px` }}
          className="text-navy-700 dark:text-navy-200"
        >
          {stumpXs.map((x) => (
            <line key={x} x1={x} y1={stumpBaseY} x2={x} y2={stumpTopY} stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" />
          ))}
        </motion.g>

        {/* Bails — pop off the moment the ball arrives */}
        <motion.line
          x1={stumpXs[0]} y1={stumpTopY - 2} x2={stumpXs[1]} y2={stumpTopY - 2}
          stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" className="text-brass-500"
          initial={{ x: 0, y: 0, rotate: 0 }}
          animate={
            shouldReduceMotion
              ? { x: -14, y: -34, rotate: -55 }
              : { x: [0, 0, -14], y: [0, 0, -34], rotate: [0, 0, -55] }
          }
          transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : IMPACT_DELAY, times: [0, 0.05, 1] }}
        />
        <motion.line
          x1={stumpXs[1]} y1={stumpTopY - 2} x2={stumpXs[2]} y2={stumpTopY - 2}
          stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" className="text-brass-500"
          initial={{ x: 0, y: 0, rotate: 0 }}
          animate={
            shouldReduceMotion
              ? { x: 16, y: -28, rotate: 60 }
              : { x: [0, 0, 16], y: [0, 0, -28], rotate: [0, 0, 60] }
          }
          transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : IMPACT_DELAY, times: [0, 0.05, 1] }}
        />

        {/* Arrow — flies in and points the ball into motion */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={shouldReduceMotion ? { opacity: 0 } : { x: [-40, ballStart.x - 6], y: [10, ballStart.y - 6], opacity: [0, 1, 1, 0] }}
          transition={{ duration: ARROW_DURATION, times: [0, 0.55, 0.85, 1], ease: "easeIn" }}
          style={{ rotate: 42 }}
          className="text-ember-500"
        >
          <line x1="0" y1="0" x2="54" y2="0" stroke="currentColor" strokeWidth="3.6" strokeLinecap="round" />
          <path d="M54 0 L42 -7 M54 0 L42 7" stroke="currentColor" strokeWidth="3.6" strokeLinecap="round" />
        </motion.g>

        <ImpactBurst x={ballStart.x} y={ballStart.y} delay={shouldReduceMotion ? 0 : ARROW_DURATION} color="rgb(221 122 46)" />

        {/* Ball — launched by the arrow, arcs into the stumps */}
        <motion.circle
          r="17"
          className="text-navy-800 dark:text-navy-100"
          fill="currentColor"
          initial={{ cx: ballStart.x, cy: ballStart.y }}
          animate={
            shouldReduceMotion
              ? { cx: ballEnd.x, cy: ballEnd.y }
              : { cx: [ballStart.x, ballPeak.x, ballEnd.x], cy: [ballStart.y, ballPeak.y, ballEnd.y] }
          }
          transition={{ duration: BALL_DURATION, delay: shouldReduceMotion ? 0 : BALL_DELAY, ease: "easeInOut" }}
        />
        <motion.circle
          r="17"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.6"
          strokeWidth="1.4"
          className="text-paper-50 dark:text-navy-900"
          initial={{ cx: ballStart.x, cy: ballStart.y, rotate: 0 }}
          animate={
            shouldReduceMotion
              ? { cx: ballEnd.x, cy: ballEnd.y, rotate: 380 }
              : { cx: [ballStart.x, ballPeak.x, ballEnd.x], cy: [ballStart.y, ballPeak.y, ballEnd.y], rotate: [0, 260, 520] }
          }
          transition={{ duration: BALL_DURATION, delay: shouldReduceMotion ? 0 : BALL_DELAY, ease: "easeInOut" }}
        />

        <ImpactBurst x={ballEnd.x} y={ballEnd.y - 30} delay={shouldReduceMotion ? 0 : IMPACT_DELAY} color="rgb(42 53 112)" />
      </g>
    </svg>
  );
}
