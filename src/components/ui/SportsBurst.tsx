import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, type ComponentType } from "react";
import { floatingObjectIcons } from "./floatingObjectIcons";

type Particle = {
  id: number;
  Icon: ComponentType<{ className?: string }>;
  x: number;
  y: number;
};

export function SportsBurst({ trigger }: { trigger: number }) {
  const shouldReduceMotion = useReducedMotion();
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (trigger === 0 || shouldReduceMotion) return;
    const count = 8;
    const next = Array.from({ length: count }).map((_, i) => {
      const angle = (360 / count) * i + (Math.random() * 24 - 12);
      const distance = 56 + Math.random() * 40;
      const rad = (angle * Math.PI) / 180;
      return {
        id: Date.now() + i,
        Icon: floatingObjectIcons[i % floatingObjectIcons.length],
        x: Math.cos(rad) * distance,
        y: Math.sin(rad) * distance,
      };
    });
    setParticles(next);
    const timeout = setTimeout(() => setParticles([]), 850);
    return () => clearTimeout(timeout);
  }, [trigger, shouldReduceMotion]);

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute h-5 w-5 text-white"
            initial={{ x: 0, y: 0, opacity: 1, scale: 0.5 }}
            animate={{ x: p.x, y: p.y, opacity: 0, scale: 1.1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
          >
            <p.Icon className="h-full w-full" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
