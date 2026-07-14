/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F1ECDD",
        "paper-dim": "#E9E2CD",
        ink: "#1E2A3A",
        "ink-soft": "#3C4A5E",
        gold: "#B08D2B",
        "gold-soft": "#D8BE6E",
        rule: "#C9BFA5",
        good: "#3F6E4E",
        alert: "#9C3B3B",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        seal: "0 0 0 3px #F1ECDD, 0 0 0 5px #B08D2B",
      },
    },
  },
  plugins: [],
};
