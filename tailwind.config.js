// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: process.env.NODE_ENV ? 'jit' : undefined,
  preflight: false,
  // To purge CSS in .ts .tsx files
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  // darkMode: "media", // Use media queries for dark mode
  // variants: {}, // activate any variant you want here
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'dark-gray': '#1A1B1D',
      },
    }
  },
};