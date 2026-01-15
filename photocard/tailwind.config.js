/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#22c55e', // lush green
          dark: '#16a34a',
          light: '#86efac',
        },
        background: {
          DEFAULT: '#f0fdf4', // very light green tint
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // decent default, can swap for Hind Siliguri for Bengali if needed later
      }
    },
  },
  plugins: [],
};
