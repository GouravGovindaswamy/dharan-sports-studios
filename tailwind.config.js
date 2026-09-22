/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#EEF1FA",
          100: "#DCE2F5",
          200: "#B7C2E8",
          300: "#8C9AD4",
          400: "#5C6BB0",
          500: "#3A468C",
          600: "#2A3570",
          700: "#202A5C",
          800: "#182150",
          900: "#101636",
          950: "#080A1A",
        },
        ember: {
          50: "#FDF1E7",
          100: "#FBE1C8",
          200: "#F5C08C",
          300: "#EEA05A",
          400: "#E68736",
          500: "#DD7A2E",
          600: "#C2661F",
          700: "#9C4F18",
          800: "#753B12",
          900: "#4E280C",
        },
        brass: {
          300: "#E4CB94",
          400: "#D4B570",
          500: "#C9A15A",
          600: "#A9813F",
        },
        paper: {
          50: "#FBF8F2",
          100: "#F5F0E6",
          200: "#EDE5D4",
        },
        sprout: {
          400: "#6BB578",
          500: "#4C9A5B",
          600: "#3B7C48",
        },
      },
      fontFamily: {
        display: ["'Fraunces'", "'Georgia'", "serif"],
        sans: ["'Space Grotesk'", "system-ui", "sans-serif"],
        body: ["'Inter'", "system-ui", "sans-serif"],
        mono: ["'IBM Plex Mono'", "ui-monospace", "monospace"],
      },
      boxShadow: {
        "orange-glow": "0 0 50px -12px rgba(221,122,46,0.5)",
        "navy-glow": "0 0 50px -14px rgba(42,53,112,0.5)",
        crisp: "0 1px 2px rgba(8,10,26,0.04), 0 8px 24px -12px rgba(8,10,26,0.12)",
        "crisp-dark": "0 1px 2px rgba(0,0,0,0.3), 0 12px 32px -12px rgba(0,0,0,0.55)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "pulse-fast": "pulse 1.6s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        marquee: "marquee 32s linear infinite",
        "marquee-slow": "marquee 60s linear infinite",
        "spin-slow": "spin-slow 14s linear infinite",
      },
    },
  },
  plugins: [],
};
