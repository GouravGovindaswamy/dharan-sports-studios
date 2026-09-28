import { motion } from "framer-motion";
import { navLinks } from "../../data/content";
import { useScrollSpy } from "../../hooks/useScrollSpy";

export function SectionDotNav() {
  const sectionIds = navLinks.map((link) => link.href.replace("#", ""));
  const activeId = useScrollSpy(sectionIds);

  return (
    <nav
      aria-label="Section progress"
      className="fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-end gap-3 xl:flex"
    >
      {navLinks.map((link) => {
        const id = link.href.replace("#", "");
        const isActive = activeId === id;
        return (
          <a
            key={id}
            href={link.href}
            aria-label={link.label}
            aria-current={isActive ? "true" : undefined}
            className="group relative flex items-center justify-end focus-visible:outline-none"
          >
            <span
              className={`font-label pointer-events-none absolute right-6 whitespace-nowrap rounded-md px-2.5 py-1 text-[10px] uppercase tracking-wide opacity-0 shadow-crisp-dark transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 ${
                isActive ? "bg-ember-500 text-white" : "surface text-primary"
              }`}
            >
              {link.label}
            </span>
            <motion.span
              layout
              className={`block rounded-full transition-colors ${
                isActive ? "bg-ember-500" : "bg-navy-900/20 dark:bg-white/20"
              }`}
              animate={{ height: isActive ? 22 : 8, width: 8 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          </a>
        );
      })}
    </nav>
  );
}
