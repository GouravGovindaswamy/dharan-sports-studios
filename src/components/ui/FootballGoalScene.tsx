import { motion } from "framer-motion";
import { useCycleOnView } from "../../hooks/useCycleOnView";
import { ImpactBurst } from "./ImpactBurst";

const CYCLE_MS = 6500;

const ARROW_DURATION = 1;
const BALL_DELAY = ARROW_DURATION;
const BALL_DURATION = 1.2;
const IMPACT_DELAY = BALL_DELAY + BALL_DURATION;

const ballStart = { x: 70, y: 237 };
const ballPeak = { x: 230, y: 168 };
const ballEnd = { x: 428, y: 190 };
const goal = { left: 372, right: 468, top: 112, bottom: 250, midX: 420, midY: 181 };

const netVerticals = [396, 420, 444];
const netHorizontals = [140, 168, 196, 224];

/**
 * Third choreographed vignette: a kick "strikes" the ball, it arcs across
 * and lands in the goal net, which ripples on impact. Uses the same
 * cycle/key-remount pattern as ChainReactionScene and TargetStrikeScene.
 */
export function FootballGoalScene({ className = "" }: { className?: string }) {
  const { ref, cycle, shouldReduceMotion } = useCycleOnView(CYCLE_MS);

  return (
    <svg ref={ref} viewBox="0 0 520 300" className={className} aria-hidden="true" fill="none">
      <g key={cycle}>
        {/* Ground line */}
        <line x1="20" y1={goal.bottom} x2="500" y2={goal.bottom} stroke="currentColor" className="text-navy-900/10 dark:text-white/10" strokeWidth="1.5" />

        {/* Goal frame */}
        <g stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-navy-700 dark:text-navy-200">
          <line x1={goal.left} y1={goal.bottom} x2={goal.left} y2={goal.top} />
          <line x1={goal.right} y1={goal.bottom} x2={goal.right} y2={goal.top} />
          <line x1={goal.left} y1={goal.top} x2={goal.right} y2={goal.top} />
        </g>

        {/* Net — ripples on impact */}
        <motion.g
          stroke="currentColor"
          strokeWidth="1"
          className="text-navy-900/15 dark:text-white/20"
          initial={{ scaleX: 1, scaleY: 1 }}
          animate={shouldReduceMotion ? { scaleX: 1, scaleY: 1 } : { scaleX: [1, 1, 0.9, 1.04, 1], scaleY: [1, 1, 1.06, 0.97, 1] }}
          transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : IMPACT_DELAY, times: [0, 0.85, 0.9, 0.95, 1] }}
          style={{ transformOrigin: `${goal.midX}px ${goal.midY}px` }}
        >
          {netVerticals.map((x) => (
            <line key={x} x1={x} y1={goal.top} x2={x} y2={goal.bottom} />
          ))}
          {netHorizontals.map((y) => (
            <line key={y} x1={goal.left} y1={y} x2={goal.right} y2={y} />
          ))}
        </motion.g>

        {/* Kick — swings in and strikes the ball */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={
            shouldReduceMotion
              ? { opacity: 0 }
              : { x: [-30, ballStart.x - 42], y: [46, ballStart.y - 4], opacity: [0, 1, 1, 0] }
          }
          transition={{ duration: ARROW_DURATION, times: [0, 0.55, 0.85, 1], ease: "easeIn" }}
          style={{ rotate: -22 }}
          className="text-ember-500"
        >
          <line x1="0" y1="0" x2="42" y2="0" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M42 0 L32 -6 M42 0 L32 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </motion.g>

        <ImpactBurst x={ballStart.x} y={ballStart.y} delay={shouldReduceMotion ? 0 : ARROW_DURATION} color="rgb(221 122 46)" />

        {/* Ball — launched toward the goal */}
        <motion.circle
          r="13"
          className="text-paper-50 dark:text-navy-100"
          fill="currentColor"
          initial={{ cx: ballStart.x, cy: ballStart.y }}
          animate={
            shouldReduceMotion
              ? { cx: ballEnd.x, cy: ballEnd.y }
              : { cx: [ballStart.x, ballPeak.x, ballEnd.x], cy: [ballStart.y, ballPeak.y, ballEnd.y] }
          }
          transition={{ duration: BALL_DURATION, delay: shouldReduceMotion ? 0 : BALL_DELAY, ease: "easeInOut" }}
        />
        <motion.g
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          className="text-navy-800 dark:text-navy-900"
          initial={{ x: ballStart.x, y: ballStart.y, rotate: 0 }}
          animate={
            shouldReduceMotion
              ? { x: ballEnd.x, y: ballEnd.y, rotate: 300 }
              : { x: [ballStart.x, ballPeak.x, ballEnd.x], y: [ballStart.y, ballPeak.y, ballEnd.y], rotate: [0, 210, 420] }
          }
          transition={{ duration: BALL_DURATION, delay: shouldReduceMotion ? 0 : BALL_DELAY, ease: "easeInOut" }}
        >
          <path d="M-5 -4 L0 -8 L5 -4 M-5 4 L0 8 L5 4 M-7 0 L7 0" />
        </motion.g>

        <ImpactBurst x={ballEnd.x} y={ballEnd.y} delay={shouldReduceMotion ? 0 : IMPACT_DELAY} color="rgb(221 122 46)" />
      </g>
    </svg>
  );
}
