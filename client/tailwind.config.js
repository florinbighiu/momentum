/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "Inter", "system-ui", "sans-serif"],
      },
      keyframes: {
        "slide-in": { from: { transform: "translateX(100%)" }, to: { transform: "translateX(0)" } },
        "fade-up":  { from: { opacity: 0, transform: "translateY(8px)" }, to: { opacity: 1, transform: "translateY(0)" } },
        "pulse-dot":{ "0%,100%": { opacity: 1 }, "50%": { opacity: 0.4 } },
        shimmer:    { from: { backgroundPosition: "200% 0" }, to: { backgroundPosition: "-200% 0" } },
      },
      animation: {
        "slide-in":  "slide-in 0.25s cubic-bezier(0.32,0.72,0,1)",
        "fade-up":   "fade-up 0.2s ease",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
        shimmer:     "shimmer 2.5s linear infinite",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.25rem",
      },
    },
  },
  plugins: [],
};
