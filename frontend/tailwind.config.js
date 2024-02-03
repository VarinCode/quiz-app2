/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'mali': ['Mali', 'cursive']
    },
    extend: {
      animation: {
        'spin-slow': 'spin 13s linear infinite',
      }
    },
  },
  plugins: [],
}