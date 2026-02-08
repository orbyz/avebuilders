/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        /* ===== DASHBOARD (admin / profesional / cliente) ===== */
        app: {
          bg: "#09090b", // fondo principal (zinc-950)
          surface: "#18181b", // cards, aside, header (zinc-900)
          surface2: "#27272a", // hover / borders (zinc-800)
          border: "#3f3f46", // borders suaves (zinc-700)
          text: "#fafafa", // texto principal
          muted: "#a1a1aa", // texto secundario
          accent: "#facc15", // acento (oro suave)
          danger: "#ef4444",
        },

        /* ===== MARKETING ===== */
        brand: {
          bg: "#000000",
          accent: "#d4af37",
          text: "#E5E7EB", // oro AVE Builders
        },
      },
    },
  },
  plugins: [],
};
