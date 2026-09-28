import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      <span className="font-label inline-block rounded-full border border-ember-500/30 bg-ember-500/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-ember-600 dark:text-ember-300">
        {eyebrow}
      </span>
      <h2 className="mt-4 font-display font-semibold text-4xl sm:text-5xl md:text-6xl leading-[1.05] text-primary">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-muted">
          {description}
        </p>
      ) : null}
    </motion.div>
  );
}
