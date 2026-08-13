import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0C1D38",
          2: "#142743",
          3: "#172C4B",
          line: "#24365A",
          line2: "#2C3F62",
          line3: "#3C4E6B",
          outline: "#4A5C79",
        },
        red: { DEFAULT: "#C8102E", hover: "#E8564A", deep: "#A00D24" },
        pink: "#F0A79C",
        paper: "#F7F6F2",
        panel: { DEFAULT: "#F2F1EC", 2: "#E9E7E0" },
        hair: { DEFAULT: "#E4E1D8", 2: "#EFEDE6" },
        rule: { DEFAULT: "#DCD8CC", 2: "#D8D4C8", 3: "#D6D2C6" },
        ink: { soft: "#46545F", mute: "#6B7C93", muteDark: "#8695A1" },
        onNavy: { DEFAULT: "#C2CBD8", 2: "#A9B4CC", 3: "#E4E8F0" },
        hover: { cream: "#FBFAF6" },
        success: { bg: "#E4EDE4", line: "#2E7D4F" },
      },
      fontFamily: {
        sans: ["var(--font-archivo)", "Helvetica", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      borderRadius: { none: "0" },
      spacing: { rail: "var(--rail)", band: "96px", bandBottom: "104px" },
      maxWidth: { canvas: "1440px" },
      boxShadow: {
        cta: "0 12px 26px rgba(0,0,0,0.3)",
        picker: "0 18px 36px rgba(0,0,0,0.28)",
      },
      keyframes: {
        drift: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        pulse2: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0.25" } },
        rise: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        drift: "drift 16s linear infinite",
        pulse2: "pulse2 2.2s ease-in-out infinite",
        rise: "rise 0.7s ease both",
        riseSlow: "rise 0.9s ease both",
      },
    },
  },
  plugins: [],
};

export default config;
