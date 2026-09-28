import { brand, contact, navLinks } from "../data/content";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="glass-chrome border-t border-navy-900/10 py-14 dark:border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {brand.supportingTagline} Nurturing multi-sport athletes across Cricket, Football, Silambam,
              Karate, and Archery under the {brand.parent}.
            </p>
          </div>

          <div>
            <h4 className="font-label text-xs uppercase tracking-wide text-ember-600 dark:text-ember-300">
              Navigate
            </h4>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="rounded-sm text-sm text-muted hover:text-ember-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-label text-xs uppercase tracking-wide text-ember-600 dark:text-ember-300">
              Contact
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              <li>{contact.call}</li>
              <li>{contact.whatsapp.number}</li>
              <li className="break-all">{contact.email}</li>
            </ul>
          </div>

          <div>
            <h4 className="font-label text-xs uppercase tracking-wide text-ember-600 dark:text-ember-300">
              Follow
            </h4>
            <ul className="mt-4 space-y-2.5">
              {contact.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-sm text-sm text-muted hover:text-ember-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-navy-900/10 pt-6 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-muted/70">
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
          <p className="font-mono text-xs text-muted/70">{brand.unit} · Est. {brand.founded}</p>
        </div>
      </div>
    </footer>
  );
}
