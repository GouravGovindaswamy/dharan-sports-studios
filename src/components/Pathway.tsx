import { motion, useReducedMotion } from "framer-motion";
import { pathway, pathwaySteps } from "../data/content";
import { SectionHeading } from "./ui/SectionHeading";
import { Badge } from "./ui/Badge";
import { Watermark } from "./ui/Watermark";

export function Pathway() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="pathways" className="relative overflow-hidden bg-app py-24 sm:py-32">
      <Watermark text="PATHWAY" align="left" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="03"
          eyebrow="Competitive Player Pathway"
          title="TNCA & District League Program"
          description="A structured competitive track for athletes ready to represent the district and state on the field."
        />

        <div className="relative mt-16 grid gap-8 lg:grid-cols-4">
          <div
            aria-hidden
            className="absolute inset-x-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-ember-500/40 to-transparent lg:block"
          />
          {pathwaySteps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
              className="relative"
            >
              <div className="font-display flex h-12 w-12 items-center justify-center rounded-full border-2 border-ember-500 bg-app text-lg font-semibold text-ember-500">
                {step.step}
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold text-primary">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          <div className="surface rounded-2xl p-6 sm:p-8">
            <h4 className="font-label text-xs uppercase tracking-wide text-ember-600 dark:text-ember-300">
              Division Opportunities
            </h4>
            <ul className="mt-4 space-y-3">
              {pathway.divisions.map((division) => (
                <li key={division.name} className="surface-pressed rounded-lg px-4 py-3">
                  <p className="font-mono text-xs uppercase tracking-wide text-ember-600 dark:text-ember-300">
                    {division.name}
                  </p>
                  <p className="mt-1 text-sm text-muted">{division.full}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="surface rounded-2xl p-6 sm:p-8">
            <h4 className="font-label text-xs uppercase tracking-wide text-ember-600 dark:text-ember-300">
              Selection Trials
            </h4>
            <div className="mt-4 flex flex-wrap gap-2">
              {pathway.trials.map((trial) => (
                <Badge key={trial} accent="ember">
                  {trial}
                </Badge>
              ))}
            </div>
          </div>

          <div className="surface rounded-2xl border-2 border-ember-500/30 p-6 sm:p-8">
            <h4 className="font-label text-xs uppercase tracking-wide text-ember-600 dark:text-ember-300">
              Athlete Welfare
            </h4>
            <p className="mt-4 text-sm leading-relaxed text-muted">{pathway.welfare}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
