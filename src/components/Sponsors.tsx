import { motion, useReducedMotion } from "framer-motion";
import { partners, sponsorSpotlight } from "../data/content";
import { SectionHeading } from "./ui/SectionHeading";
import { Marquee } from "./ui/Marquee";

export function Sponsors() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative bg-app py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading index="07" eyebrow="Partners & Sponsors" title="Backed By Long-Term Partners" />

        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="surface mt-10 grid gap-8 rounded-2xl p-6 sm:p-10 lg:grid-cols-[1fr_1.4fr]"
        >
          <div>
            <span className="font-label rounded-full border border-navy-900/10 px-3 py-1 text-xs uppercase tracking-wide text-muted dark:border-white/10">
              Since {sponsorSpotlight.since}
            </span>
            <h3 className="mt-4 font-display text-3xl font-semibold text-primary">{sponsorSpotlight.name}</h3>
          </div>
          <div>
            <p className="text-sm leading-relaxed text-muted">{sponsorSpotlight.description}</p>
            <p className="mt-4 font-display text-lg italic leading-relaxed text-primary/90">
              "{sponsorSpotlight.quote}"
            </p>
          </div>
        </motion.div>

        <div className="mt-10 border-t border-navy-900/10 pt-8 dark:border-white/10">
          <Marquee reverse speed="slow">
            {partners.map((partner) => (
              <span key={partner} className="font-display px-6 text-2xl font-semibold text-primary/30 transition-colors hover:text-primary/70">
                {partner}
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
