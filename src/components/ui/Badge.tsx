import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  accent?: "ember" | "navy" | "sprout" | "neutral";
  className?: string;
};

const accentClasses: Record<NonNullable<BadgeProps["accent"]>, string> = {
  ember: "border-ember-500/30 bg-ember-500/10 text-ember-600 dark:text-ember-300",
  navy: "border-navy-500/30 bg-navy-500/10 text-navy-700 dark:text-navy-200",
  sprout: "border-sprout-500/30 bg-sprout-500/10 text-sprout-600 dark:text-sprout-400",
  neutral: "border-navy-900/10 dark:border-white/15 bg-navy-900/5 dark:bg-white/5 text-primary/70",
};

export function Badge({ children, accent = "neutral", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs uppercase tracking-wide ${accentClasses[accent]} ${className}`}
    >
      {children}
    </span>
  );
}
