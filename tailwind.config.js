/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: "#090514", // Deep void background
          card: "#130E26", // Translucent dark purple card
          cardHeader: "#1A1435",
          border: "#2E2454", // Cyber purple border
          text: "#E5E1F4", // Off-white
          muted: "#908BA8" // Desaturated text
        },
        neon: {
          violet: "#8B5CF6",
          magenta: "#D946EF",
          cyan: "#22D3EE",
          gold: "#F59E0B"
        }
      }
    },
  },
  plugins: [],
};
