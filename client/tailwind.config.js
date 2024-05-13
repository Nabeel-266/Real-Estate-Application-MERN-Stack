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
    },
    fontFamily: {
      montAlter: ["'Montserrat Alternates'", "sans-serif"],
      mont: ["'Montserrat'", "sans-serif"],
      quick: ["'Quicksand'", "sans-serif"],
    },
    backgroundImage: {
      "banner-bg": "url('/src/assets/banner-bg-new.jpg')",
    },
  },
  plugins: [],
};
