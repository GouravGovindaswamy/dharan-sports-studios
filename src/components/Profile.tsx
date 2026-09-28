import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Compass, HandCoins, HeartHandshake, Shield, ShieldCheck, Sparkles, Target } from "lucide-react";
import { profile } from "../data/content";
import { SectionHeading } from "./ui/SectionHeading";
import { AmbientOrbs } from "./ui/AmbientOrbs";
import { FloatingSportsIcons } from "./ui/FloatingSportsIcons";

const tabs = [
  { id: "vision", label: "Vision", icon: Compass },
  { id: "mission", label: "Mission", icon: Target },
  { id: "values", label: "Core Values", icon: ShieldCheck },
] as const;

type TabId = (typeof tabs)[number]["id"];

const valueIcons = [Target, HeartHandshake, Shield, HandCoins, Sparkles, ShieldCheck];

export function Profile() {
  const [active, setActive] = useState<TabId>("vision");
  const shouldReduceMotion = useReducedMotion();
  const tablistId = useId();

  return (
    <section id="profile" className="relative overflow-hidden bg-app py-24 sm:py-32">
      <AmbientOrbs />
      <FloatingSportsIcons variant="default" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Profile & Mission"
          title="The Academy Behind The Athletes"
          description={profile.organizationalBacking}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[280px_1fr]">
          <div
            role="tablist"
            aria-label="Academy profile sections"
            id={tablistId}
            className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible"
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = active === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  aria-controls={`panel-${tab.id}`}
                  id={`tab-${tab.id}`}
                  onClick={() => setActive(tab.id)}
                  className="font-label surface relative flex shrink-0 items-center gap-3 rounded-xl px-4 py-3.5 text-left text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500 lg:w-full"
                >
                  {isActive && (
                    <motion.span
                      layoutId="profile-tab-highlight"
                      className="absolute inset-0 rounded-xl border-2 border-ember-500/50 bg-ember-500/5"
                      transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 350, damping: 32 }}
                    />
                  )}
                  <Icon className={`relative z-10 h-5 w-5 ${isActive ? "text-ember-500" : "text-muted"}`} />
                  <span className={`relative z-10 ${isActive ? "text-ember-600 dark:text-ember-300" : "text-muted"}`}>
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="surface rounded-2xl p-6 sm:p-10">
            <AnimatePresence mode="wait">
              {active === "vision" && (
                <motion.div
                  key="vision"
                  role="tabpanel"
                  id="panel-vision"
                  aria-labelledby="tab-vision"
                  initial={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
                  animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <h3 className="font-display text-3xl font-semibold text-primary sm:text-4xl">
                    Our Vision
                  </h3>
                  <p className="mt-4 max-w-2xl font-display text-xl italic leading-relaxed text-muted sm:text-2xl">
                    "{profile.vision}"
                  </p>
                </motion.div>
              )}

              {active === "mission" && (
                <motion.div
                  key="mission"
                  role="tabpanel"
                  id="panel-mission"
                  aria-labelledby="tab-mission"
                  initial={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
                  animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <h3 className="font-display text-3xl font-semibold text-primary sm:text-4xl">
                    Our Mission
                  </h3>
                  <p className="mt-4 max-w-2xl font-display text-xl italic leading-relaxed text-muted sm:text-2xl">
                    "{profile.mission}"
                  </p>
                </motion.div>
              )}

              {active === "values" && (
                <motion.div
                  key="values"
                  role="tabpanel"
                  id="panel-values"
                  aria-labelledby="tab-values"
                  initial={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
                  animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <h3 className="font-display text-3xl font-semibold text-primary sm:text-4xl">
                    Core Values
                  </h3>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {profile.coreValues.map((value, index) => {
                      const Icon = valueIcons[index % valueIcons.length];
                      return (
                        <div key={value.title} className="surface-pressed rounded-xl p-5">
                          <Icon className="h-5 w-5 text-ember-500" />
                          <h4 className="mt-3 font-display text-lg font-semibold text-primary">
                            {value.title}
                          </h4>
                          <p className="mt-2 text-sm leading-relaxed text-muted">
                            {value.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
