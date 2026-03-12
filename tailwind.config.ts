import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "spin-slow": "spin 5s linear 0s infinite forwards",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "fade-in": "fadeIn 0.4s ease-out forwards",
        "slide-up": "slideUp 0.35s ease-out forwards",
        "float-vinyl": "floatVinyl 4s ease-in-out infinite",
        "waveform": "waveform 1.1s ease-in-out infinite",
        "pulse-ring": "pulseRing 1.4s cubic-bezier(0.4,0,0.6,1) infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        floatVinyl: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-6px) rotate(1.5deg)" },
        },
        waveform: {
          "0%, 100%": { transform: "scaleY(0.35)" },
          "50%": { transform: "scaleY(1)" },
        },
        pulseRing: {
          "0%": { transform: "scale(1)", opacity: "0.65" },
          "70%": { transform: "scale(1.38)", opacity: "0" },
          "100%": { transform: "scale(1.38)", opacity: "0" },
        },
      },
      boxShadow: {
        disc: "0 0 40px rgba(0,0,0,0.6), 0 0 80px rgba(0,0,0,0.3)",
        "glow-green":
          "0 0 20px rgba(74,222,128,0.35), 0 0 60px rgba(74,222,128,0.15)",
        card: "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
        "glow-amber": "0 0 24px rgba(201,169,110,0.4), 0 0 60px rgba(201,169,110,0.15)",
        "album-art": "0 8px 32px rgba(0,0,0,0.7), 0 0 0 1px rgba(201,169,110,0.1)",
      },
    },
  },
  plugins: [],
};
export default config;
