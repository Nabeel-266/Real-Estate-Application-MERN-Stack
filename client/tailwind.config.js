/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        mobileSm: "320px",
        mobileRg: "376px",
        tabletSm: "480px",
        tabletRg: "640px",
        tabletLg: "768px",
        laptopSm: "901px",
        laptopRg: "1024px",
        desktopSm: "1200px",
        desktopRg: "1350px",
        desktopLg: "1536px",
      },
      animation: {
        pulse: "pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        pulse: {
          "0%, 100%": {
            opacity: 1,
          },
          "50%": {
            opacity: 0.4,
          },
        },
      },
      backgroundImage: {
        "footer-image": "url('/src/assets/footer-bg.jpg')",
      },
    },
    fontFamily: {
      montAlter: ["'Montserrat Alternates'", "sans-serif"],
      mont: ["'Montserrat'", "sans-serif"],
      quick: ["'Quicksand'", "sans-serif"],
      sans: ["DM Sans", "sans-serif"],
    },
  },
  plugins: [],
};
