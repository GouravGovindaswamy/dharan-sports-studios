import { motion, useReducedMotion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/useTheme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={toggleTheme}
      className="surface-pressed relative flex h-8 w-14 shrink-0 items-center rounded-full p-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500"
    >
      <motion.span
        layout
        transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 32 }}
        className="surface flex h-6 w-6 items-center justify-center rounded-full text-ember-500"
        style={{ marginLeft: isDark ? "calc(100% - 1.5rem)" : "0" }}
      >
        {isDark ? <Moon className="h-3 w-3" /> : <Sun className="h-3 w-3" />}
      </motion.span>
    </button>
  );
}
