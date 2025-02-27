/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        sans: ['Poppins','sans-serif']
      },
      gridTemplateColumns:{
        '70/30': '70% 28%'
      },
      colors:{
        "primary":"#28282C",
        "secondary":"#D9D9D9",
        "whitish":"#EFF9F0",
        "accent":"#B38D97"

      }
    },

  },
  plugins: [],
}

