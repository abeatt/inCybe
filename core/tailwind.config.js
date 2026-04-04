/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Rajdhani', 'sans-serif'],
        heading: ['Oswald', 'sans-serif'],
        mono: ['Share Tech Mono', 'monospace'],
      },
      colors: {
        gold: { start: '#bf953f', mid: '#fcf6ba', end: '#b38728' }
      }
    },
  },
  plugins: [],
}