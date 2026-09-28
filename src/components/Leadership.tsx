import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BadgeCheck, RotateCw, ShieldCheck, Undo2 } from "lucide-react";
import { leadership, type LeadershipMember } from "../data/content";
import { SectionHeading } from "./ui/SectionHeading";
import { Watermark } from "./ui/Watermark";
import { AmbientOrbs } from "./ui/AmbientOrbs";
import { FloatingSportsIcons } from "./ui/FloatingSportsIcons";
import { FlipCard } from "./ui/FlipCard";
import { SilambamClashScene } from "./ui/SilambamClashScene";

function initials(name: string) {
  if (name.toLowerCase().includes("founder")) return "CEO";
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function LeadershipCard({ member, delay }: { member: LeadershipMember; delay: number }) {
  const [flipped, setFlipped] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const front = (
    <article className="surface flex h-full flex-col p-6 sm:p-7">
      <motion.div
        whileHover={shouldReduceMotion ? undefined : { scale: 1.1, rotate: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 12 }}
        className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-navy-600 to-navy-800 font-display text-lg font-semibold text-paper-50"
      >
        {initials(member.name)}
      </motion.div>
      <h3 className="mt-5 font-display text-xl font-semibold text-primary">{member.name}</h3>
      <p className="font-label text-xs uppercase tracking-wide text-ember-600 dark:text-ember-300">
        {member.title}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted">{member.bio}</p>

      <button
        type="button"
        onClick={() => setFlipped(true)}
        aria-expanded={flipped}
        aria-label={`Show credentials for ${member.name}`}
        className="font-label mt-auto flex w-fit items-center gap-2 self-start rounded-full bg-ember-500/10 px-4 py-2 text-[11px] uppercase tracking-wide text-ember-600 transition-colors hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500 dark:text-ember-300"
      >
        <RotateCw className="h-3.5 w-3.5" />
        View Credentials
      </button>
    </article>
  );

  const back = (
    <article className="surface flex h-full flex-col p-6 sm:p-7">
      <div className="flex items-center gap-2">
        <ShieldCheck className="h-5 w-5 text-sprout-500" />
        <span className="font-label text-[11px] uppercase tracking-wide text-sprout-600 dark:text-sprout-400">
          OXFS Verified Staff
        </span>
      </div>
      <h3 className="mt-3 font-display text-lg font-semibold text-primary">{member.name}</h3>

      {member.credentials ? (
        <ul className="mt-4 flex-1 space-y-2">
          {member.credentials.map((credential) => (
            <li key={credential} className="flex items-start gap-2 text-xs text-muted">
              <BadgeCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ember-500" />
              {credential}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{member.bio}</p>
      )}

      <button
        type="button"
        onClick={() => setFlipped(false)}
        aria-expanded={flipped}
        aria-label={`Show summary for ${member.name}`}
        className="font-label mt-4 flex w-fit items-center gap-2 self-start rounded-full border border-navy-900/10 px-4 py-2 text-[11px] uppercase tracking-wide text-muted transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500 dark:border-white/10"
      >
        <Undo2 className="h-3.5 w-3.5" />
        Back
      </button>
    </article>
  );

  return (
    <motion.div
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      <FlipCard flipped={flipped} front={front} back={back} minHeightClassName="min-h-[300px]" />
    </motion.div>
  );
}

export function Leadership() {
  return (
    <section id="leadership" className="relative overflow-hidden bg-app py-24 sm:py-32">
      <AmbientOrbs variant="compact" />
      <FloatingSportsIcons variant="compact" />
      <Watermark text="TEAM" align="left" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <SectionHeading
            eyebrow="Leadership"
            title="Who Runs The Academy"
            description="A small, hands-on management team drawn from corporate leadership and elite sport backgrounds. Flip a card to view credentials."
          />
          <SilambamClashScene className="hidden h-auto w-full max-w-sm shrink-0 lg:block" />
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {leadership.map((member, index) => (
            <LeadershipCard key={member.name} member={member} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
