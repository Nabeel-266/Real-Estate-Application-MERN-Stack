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
        moveArrow: "move 0.3s ease-out 1",
        holding: "hold 2.5s linear 0s infinite alternate",
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
        move: {
          "0%": {
            opacity: 0,
            transform: "translateX(-150%)",
          },
          "100%": {
            opacity: 1,
            transform: "translateX(0)",
          },
        },
        hold: {
          "0%": {
            transform: "translateX(-2%)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
      },
      backgroundImage: {
        "about-hd-image": "url('/src/assets/about-bg.jpg')",
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
