import { motion, useReducedMotion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { leadership } from "../data/content";
import { SectionHeading } from "./ui/SectionHeading";

function initials(name: string) {
  if (name.toLowerCase().includes("founder")) return "CEO";
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function Leadership() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="leadership" className="relative bg-app py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="02"
          eyebrow="Leadership"
          title="Who Runs The Academy"
          description="A small, hands-on management team drawn from corporate leadership and elite sport backgrounds."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {leadership.map((member, index) => (
            <motion.article
              key={member.name}
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
              className="surface rounded-2xl p-6 sm:p-7"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-navy-600 to-navy-800 font-display text-lg font-semibold text-paper-50">
                {initials(member.name)}
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-primary">
                {member.name}
              </h3>
              <p className="font-label text-xs uppercase tracking-wide text-ember-600 dark:text-ember-300">
                {member.title}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{member.bio}</p>

              {member.credentials && (
                <ul className="mt-4 space-y-2 border-t border-navy-900/10 pt-4 dark:border-white/10">
                  {member.credentials.map((credential) => (
                    <li key={credential} className="flex items-start gap-2 text-xs text-muted">
                      <BadgeCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ember-500" />
                      {credential}
                    </li>
                  ))}
                </ul>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
