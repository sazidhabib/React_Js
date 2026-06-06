/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#03030a",
        secondary: "#8b8fa3",
        tertiary: "#0c0c16",
        "black-100": "#08080f",
        "black-200": "#05050a",
        "white-100": "#eef1ff",
        accent: "#4facfe",
        "accent-dark": "#3b82f6",
        surface: "#111122",
        "surface-light": "#1a1a30",
      },
      boxShadow: {
        card: "0 0 0 1px rgba(255,255,255,0.04)",
        glow: "0 0 30px rgba(79,172,254,0.12)",
        glass: "0 8px 32px rgba(0,0,0,0.4)",
      },
      screens: {
        xs: "450px",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        display: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hero-pattern": "linear-gradient(to bottom, rgba(3, 3, 10, 0) 50%, #03030a 100%), url('/src/assets/herobg.png')",
        "grid-pattern":
          "linear-gradient(rgba(79,172,254,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(79,172,254,0.03) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "60px 60px",
      },
      animation: {
        scroll: "scroll 30s linear infinite",
        "scroll-reverse": "scroll-reverse 30s linear infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 3s ease-in-out infinite",
      },
      keyframes: {
        scroll: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
        "scroll-reverse": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
