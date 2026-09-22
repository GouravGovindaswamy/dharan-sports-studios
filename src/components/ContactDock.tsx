import { useId, useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Facebook, Instagram, Mail, MessageCircle, Phone, Youtube } from "lucide-react";
import { contact, registrationOptions } from "../data/content";
import { SectionHeading } from "./ui/SectionHeading";

const socialIcons = {
  YouTube: Youtube,
  Instagram: Instagram,
  Facebook: Facebook,
};

function whatsappHref(number: string, message: string) {
  const digits = number.replace(/[^\d]/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function ContactDock() {
  const shouldReduceMotion = useReducedMotion();
  const formId = useId();
  const [submitted, setSubmitted] = useState(false);

  const [fullName, setFullName] = useState("");
  const [ageGroup, setAgeGroup] = useState(registrationOptions.ageGroups[0]);
  const [sport, setSport] = useState(registrationOptions.sports[0]);
  const [campus, setCampus] = useState(registrationOptions.campuses[0]);
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const lines = [
      "Hi DSS, I would like to enquire about coaching trials.",
      `Name: ${fullName}`,
      `Age Group: ${ageGroup}`,
      `Preferred Sport: ${sport}`,
      `Preferred Campus: ${campus}`,
      message ? `Message: ${message}` : null,
    ].filter(Boolean);

    window.open(whatsappHref(contact.whatsapp.number, lines.join("\n")), "_blank", "noopener,noreferrer");
    setSubmitted(true);
  }

  const inputClasses =
    "neu-pressed mt-2 w-full rounded-lg px-4 py-2.5 text-primary placeholder:text-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500";

  return (
    <section id="contact" className="relative bg-app py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
              className="glass-card flex items-center gap-4 rounded-2xl border-sprout-500/30 p-5 transition-colors hover:border-sprout-500/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500"
            >
              <span className="neu-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sprout-500">
                <MessageCircle className="h-6 w-6" />
              </span>
              <span>
                <span className="block font-display text-lg font-bold text-primary">
                  WhatsApp Us
                </span>
                <span className="block font-mono text-sm text-sprout-500">{contact.whatsapp.number}</span>
              </span>
            </a>

            <a
              href={`tel:${contact.call.replace(/[^\d+]/g, "")}`}
              className="glass-card flex items-center gap-4 rounded-2xl p-5 transition-colors hover:border-navy-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500"
            >
              <span className="neu-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-navy-600 dark:text-navy-300">
                <Phone className="h-6 w-6" />
              </span>
              <span>
                <span className="block font-display text-lg font-bold text-primary">
                  Call Direct
                </span>
                <span className="block font-mono text-sm text-muted">{contact.call}</span>
              </span>
            </a>

            <a
              href={`mailto:${contact.email}`}
              className="glass-card flex items-center gap-4 rounded-2xl p-5 transition-colors hover:border-navy-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500"
            >
              <span className="neu-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-navy-600 dark:text-navy-300">
                <Mail className="h-6 w-6" />
              </span>
              <span>
                <span className="block font-display text-lg font-bold text-primary">
                  Email
                </span>
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
                    className="neu-icon flex h-11 w-11 items-center justify-center rounded-full text-muted transition-colors hover:text-ember-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500"
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
            className="glass-card rounded-2xl p-6 sm:p-8"
            noValidate
          >
            <h3 className="font-display text-2xl font-bold text-primary">
              Fast Registration
            </h3>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor={`${formId}-name`} className="block font-mono text-xs uppercase tracking-wide text-muted">
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
                <label htmlFor={`${formId}-age`} className="block font-mono text-xs uppercase tracking-wide text-muted">
                  Age Group
                </label>
                <select
                  id={`${formId}-age`}
                  value={ageGroup}
                  onChange={(e) => setAgeGroup(e.target.value)}
                  className={inputClasses}
                >
                  {registrationOptions.ageGroups.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor={`${formId}-sport`} className="block font-mono text-xs uppercase tracking-wide text-muted">
                  Preferred Sport
                </label>
                <select
                  id={`${formId}-sport`}
                  value={sport}
                  onChange={(e) => setSport(e.target.value)}
                  className={inputClasses}
                >
                  {registrationOptions.sports.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor={`${formId}-campus`} className="block font-mono text-xs uppercase tracking-wide text-muted">
                  Preferred Campus
                </label>
                <select
                  id={`${formId}-campus`}
                  value={campus}
                  onChange={(e) => setCampus(e.target.value)}
                  className={inputClasses}
                >
                  {registrationOptions.campuses.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor={`${formId}-message`} className="block font-mono text-xs uppercase tracking-wide text-muted">
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

            <button
              type="submit"
              className="mt-6 w-full rounded-lg bg-gradient-to-r from-ember-500 to-ember-600 px-6 py-3.5 font-display text-base font-bold text-white shadow-orange-glow transition-transform hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-navy-950"
            >
              Send via WhatsApp
            </button>

            <p role="status" aria-live="polite" className="mt-3 min-h-[1.25rem] text-sm text-sprout-500">
              {submitted ? "Opening WhatsApp with your details filled in…" : ""}
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
