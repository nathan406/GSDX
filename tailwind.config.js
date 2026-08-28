/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0E2A24",       // deep teal-navy, primary ground
        paper: "#F5F2EA",     // warm paper background
        gold: "#B8892B",      // development-capital gold accent
        gold2: "#E4C77A",     // pale gold for highlights
        clay: "#9C4A32",      // alert / dependency red-clay
        line: "#D8D2C2",      // hairline rule color on paper
        inkline: "#1F4A40",   // hairline rule color on ink
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};
