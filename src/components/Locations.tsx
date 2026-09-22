import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, MapPin } from "lucide-react";
import { campuses } from "../data/content";
import { SectionHeading } from "./ui/SectionHeading";

export function Locations() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="locations" className="relative bg-app py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="05"
          eyebrow="Locations"
          title="Two Campuses, South Chennai"
          description="Purpose-built grounds for daily coaching, weekend matches, and seasonal camps."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {campuses.map((campus, index) => (
            <motion.article
              key={campus.id}
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
              className="surface group rounded-2xl p-6 transition-colors hover:border-ember-500/40 sm:p-8"
            >
              <span className="font-label surface-pressed inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs uppercase tracking-wide text-ember-600 dark:text-ember-300">
                <MapPin className="h-3.5 w-3.5" />
                {campus.tag}
              </span>

              <h3 className="mt-5 font-display text-2xl font-semibold leading-tight text-primary sm:text-3xl">
                {campus.name}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-muted">{campus.address}</p>

              <ul className="mt-6 space-y-2.5">
                {campus.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-center gap-2.5 text-sm text-muted">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-sprout-500" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
