/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#e8e8ec',
        textPrimary: '#333333',
        highlightYellow: '#FFB700',
        highlightBlue: '#0078D4',
        accentGreen: '#2E8540',
        accentGold: '#D4A017',
        accentBlue: '#0078D4',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}