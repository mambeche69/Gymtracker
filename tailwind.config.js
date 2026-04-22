/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Primary: sharp, industrial, gym-appropriate
        display: ["'Barlow Condensed'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        // Matte black + electric lime — utilitarian, no-nonsense
        gym: {
          bg: "#0C0C0C",
          surface: "#161616",
          border: "#2A2A2A",
          muted: "#3D3D3D",
          text: "#F0F0F0",
          sub: "#888888",
          accent: "#C8FF00",      // electric lime
          accentDark: "#9DCC00",
          danger: "#FF4444",
          warn: "#FFB800",
          success: "#00E87A",
        },
      },
      animation: {
        "slide-up": "slideUp 0.25s ease-out",
        "fade-in": "fadeIn 0.2s ease-out",
        "pulse-accent": "pulseAccent 1s ease-in-out infinite",
        "tick": "tick 1s linear infinite",
      },
      keyframes: {
        slideUp: {
          "0%": { transform: "translateY(12px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        pulseAccent: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(200,255,0,0.3)" },
          "50%": { boxShadow: "0 0 0 8px rgba(200,255,0,0)" },
        },
        tick: {
          "0%": { opacity: "1" },
          "50%": { opacity: "0.4" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
