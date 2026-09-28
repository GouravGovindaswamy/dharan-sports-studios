import { motion, useReducedMotion } from "framer-motion";
import { Activity, Radio, Rows3 } from "lucide-react";
import { facilityRentals, services, streamingTiers } from "../data/content";
import { SectionHeading } from "./ui/SectionHeading";
import { AmbientOrbs } from "./ui/AmbientOrbs";
import { Watermark } from "./ui/Watermark";
import { FloatingSportsIcons } from "./ui/FloatingSportsIcons";

const icons = [Activity, Radio, Rows3];

export function Services() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="services" className="relative overflow-hidden bg-app py-24 sm:py-32">
      <AmbientOrbs variant="compact" />
      <FloatingSportsIcons variant="compact" />
      <Watermark text="SERVICES" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Services & Infrastructure"
          title="Sports Technology & Ground Services"
          description="Beyond coaching — the infrastructure and technical services that power local competition."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {services.map((service, index) => {
            const Icon = icons[index % icons.length];
            return (
              <motion.div
                key={service.title}
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
                whileHover={shouldReduceMotion ? undefined : { y: -6 }}
                className="surface rounded-2xl p-6 transition-colors hover:border-navy-500/40 sm:p-7"
              >
                <motion.span
                  whileHover={shouldReduceMotion ? undefined : { rotate: 12, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 12 }}
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-500/10 text-navy-600 dark:text-navy-300"
                >
                  <Icon className="h-5 w-5" />
                </motion.span>
                <h3 className="mt-5 font-display text-xl font-semibold text-primary">{service.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{service.description}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="surface rounded-2xl p-6 sm:p-8">
            <h4 className="font-label text-xs uppercase tracking-wide text-ember-600 dark:text-ember-300">
              Facility Rentals
            </h4>
            <div className="mt-4 space-y-3">
              {facilityRentals.map((item) => (
                <div key={item.title} className="surface-pressed rounded-lg px-4 py-3">
                  <p className="font-display text-sm font-semibold text-primary">{item.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="surface rounded-2xl p-6 sm:p-8">
            <h4 className="font-label text-xs uppercase tracking-wide text-ember-600 dark:text-ember-300">
              Live Streaming Tiers
            </h4>
            <div className="mt-4 space-y-3">
              {streamingTiers.map((item) => (
                <div key={item.tier} className="surface-pressed rounded-lg px-4 py-3">
                  <p className="font-display text-sm font-semibold text-primary">{item.tier}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
