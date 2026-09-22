import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Clock } from "lucide-react";
import { auxiliaryCohorts, coachingPrograms, type CoachingProgram } from "../data/content";
import { SectionHeading } from "./ui/SectionHeading";
import { Badge } from "./ui/Badge";
import { ArcheryIcon, CricketIcon, KarateIcon, SilambamIcon } from "./ui/SportIcons";
import { Watermark } from "./ui/Watermark";

const filters = ["All", "Cricket", "Silambam", "Karate", "Archery"] as const;
type Filter = (typeof filters)[number];

const sportIcon: Record<CoachingProgram["id"], typeof CricketIcon> = {
  cricket: CricketIcon,
  silambam: SilambamIcon,
  karate: KarateIcon,
  archery: ArcheryIcon,
};

const featuredSpan: Record<CoachingProgram["id"], string> = {
  cricket: "md:col-span-3",
  silambam: "",
  karate: "",
  archery: "",
};

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
      <Watermark text="MATRIX" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="04"
          eyebrow="Coaching Matrix"
          title="Multi-Sport Skill Nurturing"
          description="Structured weekly batches across four disciplines, each led by dedicated coaching staff."
        />

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

        <motion.div layout className="mt-8 grid auto-rows-[minmax(0,auto)] gap-6 md:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visiblePrograms.map((program) => {
              const Icon = sportIcon[program.id];
              const isFeatured = program.id === "cricket" && filter === "All";
              return (
                <motion.article
                  key={program.id}
                  layout
                  initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
                  animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={`surface group flex flex-col rounded-2xl p-6 transition-colors hover:border-ember-500/40 sm:p-7 ${
                    isFeatured ? featuredSpan[program.id] : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-2xl font-semibold text-primary sm:text-3xl">
                      {program.sport.replace(" Skill Nurturing", "")}
                    </h3>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ember-500/10 text-ember-500">
                      <Icon className="h-6 w-6" />
                    </span>
                  </div>

                  <div className="mt-5 space-y-2">
                    {program.schedule.map((slot) => (
                      <div key={slot.label} className="surface-pressed flex items-center justify-between gap-3 rounded-lg px-4 py-2.5">
                        <span className="text-sm text-muted">{slot.label}</span>
                        <span className="flex items-center gap-1.5 font-mono text-xs text-ember-600 dark:text-ember-300">
                          <Clock className="h-3.5 w-3.5" />
                          {slot.time}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className="mt-5 text-sm leading-relaxed text-muted">{program.focus}</p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {program.focusAreas.map((area) => (
                      <span
                        key={area}
                        className="font-label rounded-full border border-navy-900/10 px-2.5 py-0.5 text-[10px] uppercase tracking-wide text-muted dark:border-white/10"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        <div className="surface mt-14 rounded-2xl p-6 sm:p-8">
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
