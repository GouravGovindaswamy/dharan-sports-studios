import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowObject,
  CricketBallObject,
  FootballObject,
  KarateBeltObject,
  SilambamStickObject,
} from "./FloatingObjects";

type Placement = {
  Icon: typeof ArrowObject;
  top: string;
  left: string;
  size: number;
  duration: number;
  delay: number;
  rotate: number;
  drift: number;
  driftX: number;
  tone: string;
};

const layouts: Record<string, Placement[]> = {
  hero: [
    { Icon: CricketBallObject, top: "10%", left: "4%", size: 62, duration: 9, delay: 0, rotate: -8, drift: 26, driftX: 12, tone: "text-navy-500" },
    { Icon: ArrowObject, top: "74%", left: "7%", size: 54, duration: 10, delay: 0.5, rotate: 12, drift: 22, driftX: -14, tone: "text-ember-500" },
    { Icon: KarateBeltObject, top: "42%", left: "3%", size: 48, duration: 11, delay: 0.9, rotate: 8, drift: 18, driftX: 10, tone: "text-brass-500" },
    { Icon: SilambamStickObject, top: "58%", left: "13%", size: 42, duration: 8, delay: 1.3, rotate: -14, drift: 20, driftX: -8, tone: "text-sprout-500" },
    { Icon: FootballObject, top: "15%", left: "88%", size: 68, duration: 10, delay: 0.3, rotate: 6, drift: 28, driftX: -12, tone: "text-crimson-500" },
    { Icon: KarateBeltObject, top: "78%", left: "84%", size: 58, duration: 12, delay: 0.8, rotate: -6, drift: 20, driftX: 14, tone: "text-brass-500" },
    { Icon: SilambamStickObject, top: "46%", left: "93%", size: 52, duration: 11, delay: 1.1, rotate: 20, drift: 24, driftX: 16, tone: "text-sprout-500" },
    { Icon: CricketBallObject, top: "90%", left: "58%", size: 46, duration: 9, delay: 0.6, rotate: 10, drift: 18, driftX: -10, tone: "text-navy-500" },
    { Icon: ArrowObject, top: "6%", left: "58%", size: 40, duration: 8, delay: 1.5, rotate: -10, drift: 16, driftX: 8, tone: "text-ember-500" },
    { Icon: FootballObject, top: "30%", left: "97%", size: 60, duration: 13, delay: 0.2, rotate: 4, drift: 22, driftX: -14, tone: "text-crimson-500" },
  ],
  default: [
    { Icon: FootballObject, top: "6%", left: "4%", size: 56, duration: 10, delay: 0, rotate: -10, drift: 22, driftX: 10, tone: "text-ember-500" },
    { Icon: ArrowObject, top: "85%", left: "92%", size: 52, duration: 9, delay: 0.4, rotate: 16, drift: 20, driftX: -12, tone: "text-navy-500" },
    { Icon: CricketBallObject, top: "92%", left: "5%", size: 48, duration: 11, delay: 0.9, rotate: 0, drift: 18, driftX: 10, tone: "text-crimson-500" },
    { Icon: KarateBeltObject, top: "10%", left: "93%", size: 50, duration: 12, delay: 0.2, rotate: -14, drift: 18, driftX: -8, tone: "text-brass-500" },
    { Icon: SilambamStickObject, top: "50%", left: "96%", size: 44, duration: 10, delay: 0.7, rotate: 12, drift: 20, driftX: 12, tone: "text-sprout-500" },
    { Icon: CricketBallObject, top: "55%", left: "2%", size: 42, duration: 11, delay: 1.1, rotate: -8, drift: 16, driftX: -8, tone: "text-navy-500" },
    { Icon: ArrowObject, top: "30%", left: "90%", size: 38, duration: 9, delay: 1.4, rotate: 18, drift: 14, driftX: -10, tone: "text-ember-500" },
  ],
  compact: [
    { Icon: SilambamStickObject, top: "8%", left: "92%", size: 48, duration: 11, delay: 0, rotate: 14, drift: 20, driftX: -10, tone: "text-sprout-500" },
    { Icon: KarateBeltObject, top: "86%", left: "4%", size: 46, duration: 9, delay: 0.4, rotate: -12, drift: 18, driftX: 10, tone: "text-brass-500" },
    { Icon: CricketBallObject, top: "46%", left: "95%", size: 42, duration: 10, delay: 0.7, rotate: 8, drift: 16, driftX: -8, tone: "text-navy-500" },
    { Icon: FootballObject, top: "6%", left: "4%", size: 44, duration: 12, delay: 0.2, rotate: -6, drift: 18, driftX: 10, tone: "text-ember-500" },
    { Icon: ArrowObject, top: "92%", left: "88%", size: 40, duration: 8, delay: 1, rotate: 20, drift: 14, driftX: -12, tone: "text-crimson-500" },
    { Icon: KarateBeltObject, top: "55%", left: "2%", size: 38, duration: 11, delay: 0.5, rotate: -10, drift: 16, driftX: 8, tone: "text-brass-500" },
  ],
};

export function FloatingSportsIcons({ variant = "default" }: { variant?: keyof typeof layouts }) {
  const shouldReduceMotion = useReducedMotion();
  const items = layouts[variant];

  if (shouldReduceMotion) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {items.map((item, index) => {
        const { Icon } = item;
        return (
          <motion.div
            key={index}
            className={`absolute opacity-[0.3] dark:opacity-[0.4] ${item.tone}`}
            style={{ top: item.top, left: item.left, width: item.size, height: item.size }}
            animate={{
              y: [0, -item.drift, 0],
              x: [0, item.driftX, 0],
              rotate: [item.rotate, item.rotate + 14, item.rotate],
            }}
            transition={{
              duration: item.duration,
              delay: item.delay,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          >
            <Icon className="h-full w-full drop-shadow-sm" />
          </motion.div>
        );
      })}
    </div>
  );
}
