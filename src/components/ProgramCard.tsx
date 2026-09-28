import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Clock, RotateCw, Undo2 } from "lucide-react";
import type { CoachingProgram, SportAccent } from "../data/content";
import { ArcheryIcon, CricketIcon, FootballIcon, KarateIcon, SilambamIcon } from "./ui/SportIcons";
import { FlipCard } from "./ui/FlipCard";

const sportIcon: Record<CoachingProgram["id"], typeof CricketIcon> = {
  cricket: CricketIcon,
  football: FootballIcon,
  silambam: SilambamIcon,
  karate: KarateIcon,
  archery: ArcheryIcon,
};

const accentGradient: Record<SportAccent, string> = {
  navy: "from-navy-600 to-navy-800",
  ember: "from-ember-500 to-ember-600",
  brass: "from-brass-500 to-brass-600",
  crimson: "from-crimson-500 to-crimson-600",
  sprout: "from-sprout-500 to-sprout-600",
};

const accentText: Record<SportAccent, string> = {
  navy: "text-navy-600 dark:text-navy-300",
  ember: "text-ember-600 dark:text-ember-300",
  brass: "text-brass-600 dark:text-brass-400",
  crimson: "text-crimson-500 dark:text-crimson-400",
  sprout: "text-sprout-600 dark:text-sprout-400",
};

const accentBadgeBg: Record<SportAccent, string> = {
  navy: "bg-navy-500/10",
  ember: "bg-ember-500/10",
  brass: "bg-brass-500/10",
  crimson: "bg-crimson-500/10",
  sprout: "bg-sprout-500/10",
};

type ProgramCardProps = {
  program: CoachingProgram;
  isFeatured: boolean;
  fullWidth: boolean;
};

export function ProgramCard({ program, isFeatured, fullWidth }: ProgramCardProps) {
  const [flipped, setFlipped] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const Icon = sportIcon[program.id];
  const grad = accentGradient[program.accent];
  const sportName = program.sport.replace(" Skill Nurturing", "");
  const previewCount = isFeatured ? 5 : 4;

  const front = (
    <div className="surface group h-full transition-transform duration-300 hover:-translate-y-1">
      <div className={`h-2 w-full bg-gradient-to-r ${grad}`} />
      <Icon
        className={`pointer-events-none absolute -right-6 -top-4 h-32 w-32 rotate-12 opacity-[0.05] ${accentText[program.accent]}`}
      />

      <div className={`relative flex h-full flex-col p-6 sm:p-7 ${isFeatured ? "sm:p-8" : ""}`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <span
              className={`font-label inline-block rounded-full px-3 py-1 text-[10px] uppercase tracking-wide ${accentBadgeBg[program.accent]} ${accentText[program.accent]}`}
            >
              {program.badge}
            </span>
            <h3 className={`mt-3 font-display font-semibold text-primary ${isFeatured ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"}`}>
              {sportName}
            </h3>
            <p className="font-label mt-1 text-xs uppercase tracking-wide text-muted">{program.tagline}</p>
          </div>
          <motion.span
            whileHover={shouldReduceMotion ? undefined : { rotate: 14, scale: 1.08 }}
            transition={{ type: "spring", stiffness: 300, damping: 12 }}
            className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg ${grad}`}
          >
            <Icon className="h-8 w-8" />
          </motion.span>
        </div>

        <div className={`mt-5 grid gap-1.5 ${isFeatured && program.schedule.length > 1 ? "sm:grid-cols-2" : ""}`}>
          {program.schedule.map((slot) => (
            <div key={slot.label} className="surface-pressed flex items-center justify-between gap-3 rounded-lg px-3 py-2">
              <span className="text-xs text-muted">{slot.label}</span>
              <span className={`flex items-center gap-1.5 font-mono text-xs ${accentText[program.accent]}`}>
                <Clock className="h-3 w-3" />
                {slot.time}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-4 text-sm leading-relaxed text-muted">{program.focus}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {program.focusAreas.slice(0, previewCount).map((area) => (
            <span
              key={area}
              className="font-label rounded-full border border-navy-900/10 px-2.5 py-0.5 text-[10px] uppercase tracking-wide text-muted dark:border-white/10"
            >
              {area}
            </span>
          ))}
          {program.focusAreas.length > previewCount && (
            <span className="font-label rounded-full px-2.5 py-0.5 text-[10px] uppercase tracking-wide text-muted/60">
              +{program.focusAreas.length - previewCount} more
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => setFlipped(true)}
          aria-expanded={flipped}
          aria-label={`Show full player card for ${sportName}`}
          className={`font-label mt-auto flex items-center justify-center gap-2 self-start rounded-full px-4 py-2 text-[11px] uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500 ${accentBadgeBg[program.accent]} ${accentText[program.accent]} hover:brightness-95`}
        >
          <RotateCw className="h-3.5 w-3.5" />
          Full Player Card
        </button>
      </div>
    </div>
  );

  const back = (
    <div className="surface h-full">
      <div className={`h-2 w-full bg-gradient-to-r ${grad}`} />
      <div className="flex h-full flex-col p-6 sm:p-7">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-display text-xl font-semibold text-primary sm:text-2xl">{sportName} &middot; Full Card</h3>
          <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white ${grad}`}>
            <Icon className="h-5 w-5" />
          </span>
        </div>

        <p className="font-label mt-1 text-xs uppercase tracking-wide text-muted">{program.venue}</p>

        <ul className="mt-4 flex-1 space-y-2 overflow-y-auto">
          {program.focusAreas.map((area) => (
            <li key={area} className="flex items-start gap-2 text-sm text-muted">
              <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${accentText[program.accent]}`} />
              {area}
            </li>
          ))}
        </ul>

        <div className="mt-4 space-y-1.5">
          {program.schedule.map((slot) => (
            <div key={slot.label} className="surface-pressed flex items-center justify-between gap-3 rounded-lg px-3 py-2">
              <span className="text-xs text-muted">{slot.label}</span>
              <span className={`flex items-center gap-1.5 font-mono text-xs ${accentText[program.accent]}`}>
                <Clock className="h-3 w-3" />
                {slot.time}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-3 text-xs text-muted/70">{program.frequency}</p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setFlipped(false)}
            aria-expanded={flipped}
            aria-label={`Show summary card for ${sportName}`}
            className="font-label flex items-center gap-2 rounded-full border border-navy-900/10 px-4 py-2 text-[11px] uppercase tracking-wide text-muted transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500 dark:border-white/10"
          >
            <Undo2 className="h-3.5 w-3.5" />
            Back
          </button>
          <a
            href="#contact"
            className="font-label rounded-full bg-gradient-to-r from-ember-500 to-ember-600 px-4 py-2 text-[11px] uppercase tracking-wide text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500"
          >
            Book This Batch
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <motion.article
      layout
      initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
      exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={fullWidth ? "md:col-span-2" : ""}
    >
      <FlipCard
        flipped={flipped}
        front={front}
        back={back}
        minHeightClassName={`min-h-[440px] ${isFeatured ? "sm:min-h-[400px]" : ""}`}
      />
    </motion.article>
  );
}
