import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Activity, Award, Brain, Check, Trophy, TrendingUp, Users } from "lucide-react";
import { masterPillars, valuePillars } from "../data/content";
import { AmbientOrbs } from "./ui/AmbientOrbs";

const icons = [Activity, Brain, Users, TrendingUp, Award];

export function ValuePillars() {
  const shouldReduceMotion = useReducedMotion();
  const [discovered, setDiscovered] = useState<Set<number>>(new Set());
  const allFound = discovered.size === valuePillars.length;

  function reveal(index: number) {
    setDiscovered((prev) => (prev.has(index) ? prev : new Set(prev).add(index)));
  }

  return (
    <section className="relative overflow-hidden border-y border-navy-900/10 bg-app py-16 dark:border-white/10 sm:py-20">
      <AmbientOrbs variant="compact" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center">
          {masterPillars.map((pillar, index) => (
            <span key={pillar} className="font-label flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-muted/60">
              {pillar}
              {index < masterPillars.length - 1 && <span className="h-1 w-1 rounded-full bg-ember-500/60" aria-hidden />}
            </span>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          <span className="font-label text-[11px] uppercase tracking-wide text-muted">
            Athlete Traits Discovered
          </span>
          <div className="h-1.5 w-28 overflow-hidden rounded-full bg-navy-900/10 dark:bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-ember-500 to-brass-500"
              animate={{ width: `${(discovered.size / valuePillars.length) * 100}%` }}
              transition={{ type: "spring", stiffness: 200, damping: 26 }}
            />
          </div>
          <span className="font-mono text-xs text-ember-600 dark:text-ember-300">
            {discovered.size}/{valuePillars.length}
          </span>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {valuePillars.map((pillar, index) => {
            const Icon = icons[index % icons.length];
            const isDiscovered = discovered.has(index);
            return (
              <motion.div
                key={pillar.title}
                tabIndex={0}
                role="button"
                aria-pressed={isDiscovered}
                aria-label={`${pillar.title}${isDiscovered ? " (discovered)" : ""}`}
                onMouseEnter={() => reveal(index)}
                onFocus={() => reveal(index)}
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
                whileHover={shouldReduceMotion ? undefined : { y: -6, scale: 1.02 }}
                className={`surface relative cursor-pointer rounded-2xl p-6 text-center transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500 hover:shadow-orange-glow ${
                  isDiscovered ? "border-ember-500/40" : ""
                }`}
              >
                <AnimatePresence>
                  {isDiscovered && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.4 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.4 }}
                      className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-sprout-500 text-white"
                    >
                      <Check className="h-3 w-3" />
                    </motion.span>
                  )}
                </AnimatePresence>
                <motion.span
                  whileHover={shouldReduceMotion ? undefined : { rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-ember-500/10 text-ember-500"
                >
                  <Icon className="h-6 w-6" />
                </motion.span>
                <h3 className="mt-4 font-display text-base font-semibold text-primary">{pillar.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted">{pillar.description}</p>
              </motion.div>
            );
          })}
        </div>

        <AnimatePresence>
          {allFound && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="mx-auto mt-6 flex w-fit items-center gap-2 rounded-full border border-brass-500/40 bg-brass-500/10 px-4 py-2"
            >
              <Trophy className="h-4 w-4 text-brass-500" />
              <span className="text-sm font-semibold text-brass-600 dark:text-brass-400">
                All traits discovered — that's the DSS way.
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
