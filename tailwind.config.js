/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blackPrimary: "#0B0B0B",
        blackSecondary: "#1A1A1A",
        yellowPrimary: "#f6ae2d",
        goldPrimary: "#F6AE2D",
        goldHover: "#E0B95B",
        grayText: "#A3A3A3",
      },
    },
  },
  plugins: [],
};
