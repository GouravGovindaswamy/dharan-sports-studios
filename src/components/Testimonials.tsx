import { motion, useReducedMotion } from "framer-motion";
import { Quote } from "lucide-react";
import { testimonials } from "../data/content";
import { SectionHeading } from "./ui/SectionHeading";

export function Testimonials() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative bg-app py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Social Proof"
          title="Voices From The Academy"
          align="center"
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.figure
              key={testimonial.name}
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
              className="glass-card flex h-full flex-col rounded-2xl p-6 sm:p-7"
            >
              <Quote className="h-7 w-7 text-ember-500/50" />
              <blockquote className="mt-4 flex-1 text-base leading-relaxed text-primary/80">
                "{testimonial.quote}"
              </blockquote>
              <figcaption className="mt-5 border-t border-navy-900/10 pt-4 dark:border-white/10">
                <p className="font-display text-lg font-bold text-primary">
                  {testimonial.name}
                </p>
                <p className="font-mono text-xs uppercase tracking-wide text-ember-600 dark:text-ember-300">
                  {testimonial.role}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
