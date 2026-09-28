import { useId, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Facebook, Instagram, Mail, MessageCircle, Phone, Trophy, Youtube } from "lucide-react";
import { contact, registrationOptions } from "../data/content";
import { SectionHeading } from "./ui/SectionHeading";
import { AmbientOrbs } from "./ui/AmbientOrbs";
import { FloatingSportsIcons } from "./ui/FloatingSportsIcons";
import { SportsBurst } from "./ui/SportsBurst";
import { buildRegistrationMessage, whatsappHref } from "../lib/whatsapp";

const socialIcons = {
  YouTube: Youtube,
  Instagram: Instagram,
  Facebook: Facebook,
};

export function ContactDock() {
  const shouldReduceMotion = useReducedMotion();
  const formId = useId();
  const [submitted, setSubmitted] = useState(false);
  const [burstTrigger, setBurstTrigger] = useState(0);

  const [fullName, setFullName] = useState("");
  const [ageGroup, setAgeGroup] = useState(registrationOptions.ageGroups[0]);
  const [sport, setSport] = useState(registrationOptions.sports[0]);
  const [campus, setCampus] = useState(registrationOptions.campuses[0]);
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = buildRegistrationMessage({ fullName, ageGroup, sport, campus, message });
    window.open(whatsappHref(contact.whatsapp.number, text), "_blank", "noopener,noreferrer");
    setSubmitted(true);
    setBurstTrigger((n) => n + 1);
  }

  const inputClasses =
    "surface-pressed mt-2 w-full rounded-lg px-4 py-2.5 text-primary placeholder:text-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500";

  return (
    <section id="contact" className="relative overflow-hidden bg-app py-24 sm:py-32">
      <AmbientOrbs />
      <FloatingSportsIcons variant="default" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Application Dock"
          title="Start Your Trial"
          description="Reach out directly or send a fast registration — our team responds within one business day."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="space-y-4"
          >
            <a
              href={whatsappHref(contact.whatsapp.number, contact.whatsapp.message)}
              target="_blank"
              rel="noopener noreferrer"
              className="surface flex items-center gap-4 rounded-2xl border-sprout-500/30 p-5 transition-colors hover:border-sprout-500/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sprout-500/10 text-sprout-500">
                <MessageCircle className="h-6 w-6" />
              </span>
              <span>
                <span className="block font-display text-lg font-semibold text-primary">WhatsApp Us</span>
                <span className="block font-mono text-sm text-sprout-500">{contact.whatsapp.number}</span>
              </span>
            </a>

            <a
              href={`tel:${contact.call.replace(/[^\d+]/g, "")}`}
              className="surface flex items-center gap-4 rounded-2xl p-5 transition-colors hover:border-navy-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy-500/10 text-navy-600 dark:text-navy-300">
                <Phone className="h-6 w-6" />
              </span>
              <span>
                <span className="block font-display text-lg font-semibold text-primary">Call Direct</span>
                <span className="block font-mono text-sm text-muted">{contact.call}</span>
              </span>
            </a>

            <a
              href={`mailto:${contact.email}`}
              className="surface flex items-center gap-4 rounded-2xl p-5 transition-colors hover:border-navy-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy-500/10 text-navy-600 dark:text-navy-300">
                <Mail className="h-6 w-6" />
              </span>
              <span>
                <span className="block font-display text-lg font-semibold text-primary">Email</span>
                <span className="block font-mono text-sm text-muted">{contact.email}</span>
              </span>
            </a>

            <div className="flex gap-3 pt-2">
              {contact.social.map((s) => {
                const Icon = socialIcons[s.label as keyof typeof socialIcons];
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.label}: ${s.handle}`}
                    className="surface flex h-11 w-11 items-center justify-center rounded-full text-muted transition-colors hover:text-ember-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </motion.div>

          <motion.form
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            onSubmit={handleSubmit}
            className="surface rounded-2xl p-6 sm:p-8"
            noValidate
          >
            <h3 className="font-display text-2xl font-semibold text-primary">Fast Registration</h3>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor={`${formId}-name`} className="font-label block text-xs uppercase tracking-wide text-muted">
                  Full Name
                </label>
                <input
                  id={`${formId}-name`}
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={inputClasses}
                  placeholder="Athlete's full name"
                />
              </div>

              <div>
                <label htmlFor={`${formId}-age`} className="font-label block text-xs uppercase tracking-wide text-muted">
                  Age Group
                </label>
                <select id={`${formId}-age`} value={ageGroup} onChange={(e) => setAgeGroup(e.target.value)} className={inputClasses}>
                  {registrationOptions.ageGroups.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor={`${formId}-sport`} className="font-label block text-xs uppercase tracking-wide text-muted">
                  Preferred Sport
                </label>
                <select id={`${formId}-sport`} value={sport} onChange={(e) => setSport(e.target.value)} className={inputClasses}>
                  {registrationOptions.sports.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor={`${formId}-campus`} className="font-label block text-xs uppercase tracking-wide text-muted">
                  Preferred Campus
                </label>
                <select id={`${formId}-campus`} value={campus} onChange={(e) => setCampus(e.target.value)} className={inputClasses}>
                  {registrationOptions.campuses.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor={`${formId}-message`} className="font-label block text-xs uppercase tracking-wide text-muted">
                  Message (optional)
                </label>
                <textarea
                  id={`${formId}-message`}
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`${inputClasses} resize-none`}
                  placeholder="Anything else we should know?"
                />
              </div>
            </div>

            <div className="relative mt-6">
              <button
                type="submit"
                className="font-label w-full rounded-lg bg-gradient-to-r from-ember-500 to-ember-600 px-6 py-3.5 text-base font-semibold text-white shadow-orange-glow transition-transform hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-navy-950"
              >
                Send via WhatsApp
              </button>
              <SportsBurst trigger={burstTrigger} />
            </div>

            <div role="status" aria-live="polite" className="mt-3 min-h-[2.5rem]">
              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.95 }}
                    transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 20 }}
                    className="flex items-center gap-2.5 rounded-xl border border-sprout-500/30 bg-sprout-500/10 px-4 py-2.5"
                  >
                    <motion.span
                      initial={shouldReduceMotion ? undefined : { rotate: -20, scale: 0.5 }}
                      animate={{ rotate: 0, scale: 1 }}
                      transition={{ delay: 0.15, type: "spring", stiffness: 350, damping: 12 }}
                      className="text-brass-500"
                    >
                      <Trophy className="h-5 w-5" />
                    </motion.span>
                    <span className="text-sm font-semibold text-sprout-600 dark:text-sprout-400">
                      Trial Request Sent — we'll be in touch within one business day!
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
