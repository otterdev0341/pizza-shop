import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./lib/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        tomato: {
          50: "#fff7f3",
          100: "#ffe8dc",
          500: "#e6482e",
          600: "#c93622",
          700: "#9d281c"
        },
        basil: "#2f7d4f",
        crust: "#f3b35b"
      },
      boxShadow: {
        soft: "0 18px 45px rgba(46, 36, 20, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
