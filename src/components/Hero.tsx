import { useRef, useState, type MouseEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { brand, hero, stats, trustRibbon } from "../data/content";
import { Counter } from "./ui/Counter";
import { Marquee } from "./ui/Marquee";
import { ChainReactionScene } from "./ui/ChainReactionScene";
import { FloatingSportsIcons } from "./ui/FloatingSportsIcons";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 30 });

  function handleMouseMove(event: MouseEvent<HTMLElement>) {
    if (shouldReduceMotion || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setSpotlight({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  }

  return (
    <section
      id="top"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden bg-app bg-mesh pt-32 pb-16 sm:pt-40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60 transition-[background] duration-300"
        style={{
          background: `radial-gradient(480px circle at ${spotlight.x}% ${spotlight.y}%, rgb(221 122 46 / 0.14), transparent 70%)`,
        }}
      />

      <FloatingSportsIcons variant="hero" />

      <div className="relative mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 30 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <span className="surface font-label inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted">
            {brand.parent} <ChevronRight className="h-3.5 w-3.5" />
          </span>

          <p className="font-label mt-6 text-sm uppercase tracking-[0.35em] text-ember-500">
            {brand.tagline}
          </p>

          <h1 className="mt-3 font-display font-semibold leading-[0.98] text-[3.4rem] sm:text-7xl md:text-8xl lg:text-[5.5rem]">
            <span className="text-gradient-brand">{hero.headline.split(" ").slice(0, 2).join(" ")}</span>{" "}
            <span className="text-primary">{hero.headline.split(" ").slice(2).join(" ")}</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
            {hero.subtitle}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={hero.ctas.primary.href}
              className="font-label group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-ember-500 to-ember-600 px-6 py-3.5 text-base font-semibold text-white shadow-orange-glow transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-navy-950"
            >
              {hero.ctas.primary.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={hero.ctas.secondary.href}
              className="surface font-label inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold text-primary transition-colors hover:border-ember-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-navy-950"
            >
              {hero.ctas.secondary.label}
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.92 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
          className="relative mx-auto w-full max-w-xl lg:max-w-none"
        >
          <span className="surface font-label inline-flex rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-muted">
            Every Session, A Chain Reaction
          </span>
          <ChainReactionScene className="mt-4 h-auto w-full drop-shadow-[0_18px_40px_rgba(16,22,54,0.12)]" />
        </motion.div>

        <motion.dl
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 30 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.25 }}
          className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-navy-900/10 dark:border-white/10 lg:col-span-2 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="bg-raised px-5 py-7">
              <dt className="font-label text-[11px] uppercase tracking-wide text-ember-600 dark:text-ember-300">
                {stat.label}
              </dt>
              <dd className="mt-1 font-display text-3xl font-semibold text-primary sm:text-4xl">
                <Counter value={stat.value} suffix={stat.suffix} showBadge />
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>

      <div className="relative mt-14 border-y border-navy-900/10 bg-raised py-4 dark:border-white/10">
        <Marquee>
          {trustRibbon.map((item) => (
            <span key={item} className="font-label flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-muted/70">
              {item}
              <span className="h-1 w-1 rounded-full bg-ember-500" aria-hidden />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
