/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {},
    dir: "rtl",
    colors: {
      black: {
        200: "#2E2C3A",
        600: "#1B1D27",
        700: "#393868",
        800: "#1A1D27",
        900: "#16151C",
      },
      gray: {
        100: "#dddd",
        200: "#C7C7D1",
        500: "#ACACAC",
      },

      dark: "#2E2C3A",
      darkBlue: "#1a1d27",
      red: "red",
      boxbg: "#2e2c3a",
      muted: "#74788d ",
      green: {
        100: "rgb(201, 243, 138)",
        200: "#2ab57d",
      },
      white: {
        100: "#FFFFFF",
        200: "#F7F8FC",
        300: "#F7F8FC",
      },
      blue: {
        600: "#2762EB",
      },
      orange: {
        100: "#FFEFE4",
        400: "#DD9654",
      },
    },
  },
  plugins: [],
};
