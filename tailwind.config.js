/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pgblue: {
          light: '#336791',
          DEFAULT: '#336791',
          dark: '#274e6f',
        }
      }
    },
  },
  plugins: [],
}
