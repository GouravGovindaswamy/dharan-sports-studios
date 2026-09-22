import { brand, navLinks } from "../data/content";

export function Footer() {
  return (
    <footer className="glass-panel border-t-0 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex items-center gap-3">
          <span className="rounded-lg bg-white px-2 py-1 shadow-sm">
            <img src="/logo.png" alt="Dharan Sports Studios" className="h-8 w-auto" />
          </span>
          <p className="font-display text-sm font-bold text-muted">
            {brand.unit} · {brand.parent}
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-sm font-mono text-xs uppercase tracking-wide text-muted hover:text-ember-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <p className="font-mono text-xs text-muted/70">
          © {new Date().getFullYear()} {brand.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
