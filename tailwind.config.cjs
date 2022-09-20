/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        DarkBlue: "hsl(209, 23%, 22%)",
        VeryDarkBlue: " hsl(207, 26%, 17%)",
        veryDarkBlue: " hsl(200, 15%, 8%)",
        DarkGray: "hsl(0, 0%, 52%)",
        VeryLightGray: " hsl(0, 0%, 98%)",
        White: "hsl(0, 0%, 100%)",
      },
      screens:{
        lg: '1200px'
      }
    },
  },
  plugins: [],
};