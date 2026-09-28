import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { auxiliaryCohorts, coachingPrograms, commonProgramFeatures } from "../data/content";
import { SectionHeading } from "./ui/SectionHeading";
import { Badge } from "./ui/Badge";
import { Watermark } from "./ui/Watermark";
import { AmbientOrbs } from "./ui/AmbientOrbs";
import { FootballGoalScene } from "./ui/FootballGoalScene";
import { ProgramCard } from "./ProgramCard";

const filters = ["All", "Cricket", "Football", "Silambam", "Karate", "Archery"] as const;
type Filter = (typeof filters)[number];

export function CoachingMatrix() {
  const [filter, setFilter] = useState<Filter>("All");
  const shouldReduceMotion = useReducedMotion();

  const visiblePrograms = useMemo(() => {
    if (filter === "All") return coachingPrograms;
    return coachingPrograms.filter((program) =>
      program.sport.toLowerCase().startsWith(filter.toLowerCase())
    );
  }, [filter]);

  return (
    <section id="coaching" className="relative overflow-hidden bg-app py-24 sm:py-32">
      <AmbientOrbs variant="compact" />
      <Watermark text="MATRIX" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <SectionHeading
            eyebrow="Coaching Matrix"
            title="Multi-Sport Skill Nurturing"
            description="Structured weekly batches across five disciplines, each led by dedicated coaching staff. Tap a card to flip it and see the full player card."
          />
          <FootballGoalScene className="hidden h-auto w-full max-w-sm shrink-0 lg:block" />
        </div>

        <div role="tablist" aria-label="Filter coaching programs by sport" className="mt-10 flex flex-wrap gap-2">
          {filters.map((f) => {
            const isActive = filter === f;
            return (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setFilter(f)}
                className={`font-label relative rounded-full px-5 py-2.5 text-xs uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500 ${
                  isActive ? "" : "surface"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="coaching-filter-highlight"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-ember-500 to-ember-600"
                    transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
                <span className={`relative z-10 ${isActive ? "text-white" : "text-muted"}`}>{f}</span>
              </button>
            );
          })}
        </div>

        <motion.div layout className="mt-8 grid auto-rows-[minmax(0,auto)] gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visiblePrograms.map((program) => {
              const isFeatured = program.id === "cricket" && filter === "All";
              const fullWidth = isFeatured || visiblePrograms.length === 1;
              return (
                <ProgramCard key={program.id} program={program} isFeatured={isFeatured} fullWidth={fullWidth} />
              );
            })}
          </AnimatePresence>
        </motion.div>

        <div className="surface mt-8 rounded-2xl p-6 sm:p-8">
          <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {commonProgramFeatures.map((feature) => (
              <div key={feature.title}>
                <p className="font-display text-sm font-semibold text-primary">{feature.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="surface mt-6 rounded-2xl p-6 sm:p-8">
          <h3 className="font-display text-xl font-semibold text-primary">Auxiliary Cohorts</h3>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {auxiliaryCohorts.map((cohort) => (
              <Badge key={cohort} accent="ember">
                {cohort}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
