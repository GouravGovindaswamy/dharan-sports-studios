import { motion, useReducedMotion } from "framer-motion";

type Orb = {
  className: string;
  color: string;
  size: number;
  path: { x: number[]; y: number[] };
  duration: number;
};

const presets: Record<string, Orb[]> = {
  default: [
    {
      className: "-left-24 top-0",
      color: "rgb(221 122 46 / 0.16)",
      size: 420,
      path: { x: [0, 40, -20, 0], y: [0, 30, 60, 0] },
      duration: 22,
    },
    {
      className: "-right-32 bottom-0",
      color: "rgb(42 53 112 / 0.22)",
      size: 480,
      path: { x: [0, -50, 20, 0], y: [0, -40, -10, 0] },
      duration: 26,
    },
  ],
  compact: [
    {
      className: "left-1/4 top-0",
      color: "rgb(221 122 46 / 0.14)",
      size: 320,
      path: { x: [0, 30, -30, 0], y: [0, 20, 40, 0] },
      duration: 20,
    },
    {
      className: "right-0 bottom-0",
      color: "rgb(42 53 112 / 0.2)",
      size: 360,
      path: { x: [0, -30, 10, 0], y: [0, -30, 0, 0] },
      duration: 24,
    },
  ],
};

export function AmbientOrbs({ variant = "default" }: { variant?: keyof typeof presets }) {
  const shouldReduceMotion = useReducedMotion();
  const orbs = presets[variant];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full blur-3xl ${orb.className}`}
          style={{ width: orb.size, height: orb.size, background: orb.color }}
          animate={shouldReduceMotion ? undefined : { x: orb.path.x, y: orb.path.y }}
          transition={
            shouldReduceMotion
              ? undefined
              : { duration: orb.duration, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }
          }
        />
      ))}
    </div>
  );
}
