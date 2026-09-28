import { Quote } from "lucide-react";
import { testimonials } from "../data/content";
import { SectionHeading } from "./ui/SectionHeading";
import { Marquee } from "./ui/Marquee";
import { Watermark } from "./ui/Watermark";
import { AmbientOrbs } from "./ui/AmbientOrbs";

export function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-app py-24 sm:py-32">
      <AmbientOrbs variant="compact" />
      <Watermark text="PROOF" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Social Proof" title="Voices From The Academy" align="center" />
      </div>

      <div className="relative mt-12">
        <Marquee speed="slow">
          {testimonials.map((testimonial) => (
            <figure key={testimonial.name} className="surface flex h-full w-[340px] shrink-0 flex-col rounded-2xl p-7 sm:w-[420px]">
              <Quote className="h-8 w-8 text-ember-500/40" />
              <blockquote className="mt-4 flex-1 font-display text-xl italic leading-relaxed text-primary/90">
                "{testimonial.quote}"
              </blockquote>
              <figcaption className="mt-5 border-t border-navy-900/10 pt-4 dark:border-white/10">
                <p className="font-display text-lg font-semibold text-primary">{testimonial.name}</p>
                <p className="font-label text-xs uppercase tracking-wide text-ember-600 dark:text-ember-300">
                  {testimonial.role}
                </p>
              </figcaption>
            </figure>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
