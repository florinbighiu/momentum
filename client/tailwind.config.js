/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter Medium"],
        bahn: ["Bahnschrift"],
      },
      backgroundImage: {
        background: "url('./assets/background.jpg')",
        bg: "url('./assets/bg.jpg')",
      },
    },
  },
  plugins: [],
};

