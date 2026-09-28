import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, MapPin } from "lucide-react";
import { campuses } from "../data/content";
import { SectionHeading } from "./ui/SectionHeading";
import { Watermark } from "./ui/Watermark";
import { AmbientOrbs } from "./ui/AmbientOrbs";
import { FloatingSportsIcons } from "./ui/FloatingSportsIcons";
import { KarateBreakScene } from "./ui/KarateBreakScene";

export function Locations() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="locations" className="relative overflow-hidden bg-app py-24 sm:py-32">
      <AmbientOrbs variant="compact" />
      <FloatingSportsIcons variant="compact" />
      <Watermark text="CAMPUS" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <SectionHeading
            eyebrow="Locations"
            title="Two Campuses, South Chennai"
            description="Purpose-built grounds for daily coaching, weekend matches, and seasonal camps."
          />
          <KarateBreakScene className="hidden h-auto w-full max-w-sm shrink-0 lg:block" />
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {campuses.map((campus, index) => (
            <motion.article
              key={campus.id}
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
              whileHover={shouldReduceMotion ? undefined : { y: -6 }}
              className="surface group relative overflow-hidden rounded-2xl p-6 transition-colors hover:border-ember-500/40 sm:p-8"
            >
              <MapPin className="pointer-events-none absolute -right-4 -top-4 h-28 w-28 text-ember-500/[0.06] dark:text-ember-300/[0.07]" />
              <span className="font-label surface-pressed relative inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs uppercase tracking-wide text-ember-600 dark:text-ember-300">
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

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(campus.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-label surface-pressed relative mt-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-wide text-primary transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500"
              >
                <MapPin className="h-3.5 w-3.5 text-ember-500" />
                Get Directions
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
