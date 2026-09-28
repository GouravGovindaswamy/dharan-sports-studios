import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/**
 * Drives the choreographed background scenes: replays every `intervalMs` by
 * bumping `cycle` (used as a remount `key`), but only while the element is
 * actually on screen — so off-screen scenes don't keep animating and
 * re-rendering in the background.
 */
export function useCycleOnView(intervalMs: number) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { margin: "-100px" });
  const shouldReduceMotion = useReducedMotion();
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion || !isInView) return;
    const id = setInterval(() => setCycle((c) => c + 1), intervalMs);
    return () => clearInterval(id);
  }, [isInView, shouldReduceMotion, intervalMs]);

  return { ref, cycle, shouldReduceMotion };
}
