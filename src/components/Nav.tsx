import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { brand, navLinks } from "../data/content";
import { ThemeToggle } from "./ui/ThemeToggle";
import { Logo } from "./Logo";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "glass-chrome" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6 lg:px-8">
        <a
          href="#top"
          className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500"
        >
          <Logo className="hidden sm:flex" />
          <Logo variant="mark" className="h-9 w-9 sm:hidden" />
        </a>

        <nav className="hidden items-center gap-5 xl:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-label rounded-sm text-xs uppercase tracking-wide text-muted transition-colors hover:text-ember-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <div className="surface hidden items-center gap-2 rounded-full px-3 py-1.5 xl:flex" role="status">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-fast rounded-full bg-ember-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-ember-500" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wide text-ember-600 dark:text-ember-300">
              {brand.statusBadge}
            </span>
          </div>
          <ThemeToggle />
          <a
            href="#contact"
            className="font-label rounded-md bg-gradient-to-r from-ember-500 to-ember-600 px-4 py-2 text-sm font-semibold text-white shadow-orange-glow transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-navy-950"
          >
            Book Free Trial
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="surface rounded-md p-2 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div className="border-t border-ember-500/15 bg-ember-500/5 px-4 py-1.5 xl:hidden">
        <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wide text-ember-600 dark:text-ember-300">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-pulse-fast rounded-full bg-ember-500 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ember-500" />
          </span>
          {brand.statusBadge}
        </p>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="glass-chrome overflow-hidden xl:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-label rounded-md px-3 py-2.5 text-sm uppercase tracking-wide text-muted hover:bg-navy-900/5 hover:text-ember-500 dark:hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="font-label mt-2 rounded-md bg-gradient-to-r from-ember-500 to-ember-600 px-4 py-3 text-center text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-navy-950"
              >
                Book Free Trial
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
