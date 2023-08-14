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
        800: "#7B7B7B",
      },

      red: {
        100: "#FCE5E6",
        300: "#ED7071",
        700: "red",
      },
      green: {
        100: "#DFF7E9",
        300: "#2AC770",
        400: "rgb(201, 243, 138)",
        500: "#2ab57d",
      },
      white: {
        100: "#FFFFFF",
        200: "#F7F8FC",
        300: "#F7F8FC",
      },
      blue: {
        300: "#6D77D0",
        600: "#2762EB",
        700: "#3C49C7",
        800: "#1223C2",
        900: "#030E8E",
      },
      orange: {
        100: "#FFEFE4",
        400: "#DD9654",
      },
    },
  },
  plugins: [],
};
