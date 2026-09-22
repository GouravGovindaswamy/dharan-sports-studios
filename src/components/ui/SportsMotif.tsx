import { motion, useReducedMotion } from "framer-motion";

const draw = (delay: number) => ({
  initial: { pathLength: 0, opacity: 0 },
  whileInView: { pathLength: 1, opacity: 1 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 1.5, ease: "easeInOut" as const, delay },
});

export function SportsMotif({ className = "" }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <svg viewBox="0 0 480 480" className={className} aria-hidden="true" fill="none">
      <g style={{ transformOrigin: "240px 240px" }} className={shouldReduceMotion ? "" : "animate-spin-slow"}>
        <circle cx="240" cy="240" r="196" stroke="currentColor" className="text-ember-500/25" strokeWidth="1.5" strokeDasharray="2 10" strokeLinecap="round" />
      </g>
      <circle cx="240" cy="240" r="150" stroke="currentColor" className="text-navy-500/20" strokeWidth="1" />

      {/* Cricket delivery arc */}
      <motion.path
        {...(shouldReduceMotion ? {} : draw(0.1))}
        d="M70 360 C 140 200, 230 130, 300 175 S 380 260, 350 230"
        stroke="currentColor"
        className="text-navy-600 dark:text-navy-300"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="350" cy="230" r="6" fill="currentColor" className="text-navy-600 dark:text-navy-300" />

      {/* Archery draw line */}
      <motion.path
        {...(shouldReduceMotion ? {} : draw(0.5))}
        d="M100 390 L 388 110"
        stroke="currentColor"
        className="text-ember-500"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M96 360 L 104 380 M 84 372 L 116 398" stroke="currentColor" className="text-ember-500/70" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M388 110 L 366 118 M 388 110 L 380 132" stroke="currentColor" className="text-ember-500" strokeWidth="2" strokeLinecap="round" />

      {/* Silambam spin */}
      <motion.path
        {...(shouldReduceMotion ? {} : draw(0.9))}
        d="M330 90 Q 372 108 362 148 Q 354 178 322 172"
        stroke="currentColor"
        className="text-ember-400/80"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      {/* Karate stance mark */}
      <motion.g
        initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <path
          d="M150 330 L 190 290 M 150 330 L 190 350 M 150 330 L 150 380"
          stroke="currentColor"
          className="text-navy-700 dark:text-navy-200"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="150" cy="315" r="9" stroke="currentColor" className="text-navy-700 dark:text-navy-200" strokeWidth="2.5" />
      </motion.g>

      <circle cx="300" cy="175" r="4" fill="currentColor" className="text-ember-500" />
      <circle cx="190" cy="290" r="3.5" fill="currentColor" className="text-ember-500" />
    </svg>
  );
}
