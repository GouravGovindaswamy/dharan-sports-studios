import { motion } from "framer-motion";

/**
 * A small radiating starburst used to sell the "moment of impact" in the
 * choreographed chain-reaction vignettes (arrow hitting ball, ball hitting
 * stumps, arrow hitting target, etc).
 */
export function ImpactBurst({ x, y, delay, color }: { x: number; y: number; delay: number; color: string }) {
  const rays = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.3 }}
      animate={{ opacity: [0, 1, 0], scale: [0.3, 1.4, 1.9] }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      style={{ transformOrigin: `${x}px ${y}px` }}
    >
      {rays.map((angle) => (
        <line
          key={angle}
          x1={x}
          y1={y}
          x2={x + Math.cos((angle * Math.PI) / 180) * 24}
          y2={y + Math.sin((angle * Math.PI) / 180) * 24}
          stroke={color}
          strokeWidth={3.2}
          strokeLinecap="round"
        />
      ))}
    </motion.g>
  );
}
