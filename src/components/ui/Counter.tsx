import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Trophy } from "lucide-react";

type CounterProps = {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
  showBadge?: boolean;
};

export function Counter({ value, suffix = "", duration = 1.4, className = "", showBadge = false }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    if (shouldReduceMotion) {
      setDisplay(value);
      setDone(true);
      return;
    }

    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setDone(true);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, value, duration, shouldReduceMotion]);

  return (
    <span className="inline-flex items-center gap-1.5">
      <span ref={ref} className={className}>
        {display}
        {suffix}
      </span>
      {showBadge && (
        <AnimatePresence>
          {done && (
            <motion.span
              initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.4, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 350, damping: 14 }}
              className="text-brass-500"
            >
              <Trophy className="h-4 w-4" />
            </motion.span>
          )}
        </AnimatePresence>
      )}
    </span>
  );
}
