import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#02C76A",
        primary: "#050020",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sora: ["Sora", "serif"],
        poppins: ["Poppins", "serif"],
      },
      boxShadow: {
        joinWaitlistBtnShadow:
          "0px -4px 4px 0px rgba(0, 0, 0, 0.2) inset, 0px 4px 4px 0px rgba(225, 225, 225, 0.25) inset, 0px 0px 0px 1px rgba(2, 199, 106, 0.25)",
      },
    },
  },
  plugins: [tailwindAnimate],
};
export default config;
