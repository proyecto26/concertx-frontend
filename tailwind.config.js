// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: process.env.NODE_ENV ? 'jit' : undefined,
  preflight: false,
  // To purge CSS in .ts .tsx files
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // Use css classes for dark mode
  // variants: {}, // activate any variant you want here
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'dark-gray': '#1A1B1D',
        primary: {
          DEFAULT: 'var(--theme-color-primary)',
          contrast: 'var(--theme-color-primary-contrast)',
          shade: 'var(--theme-color-primary-shade)',
          tint: 'var(--theme-color-primary-tint)',
        },
        secondary: {
          DEFAULT: 'var(--theme-color-secondary)',
          contrast: 'var(--theme-color-secondary-contrast)',
          shade: 'var(--theme-color-secondary-shade)',
          tint: 'var(--theme-color-secondary-tint)',
        },
        tertiary: {
          DEFAULT: 'var(--theme-color-tertiary)',
          contrast: 'var(--theme-color-tertiary-contrast)',
          shade: 'var(--theme-color-tertiary-shade)',
          tint: 'var(--theme-color-tertiary-tint)',
        },
        success: {
          DEFAULT: 'var(--theme-color-success)',
          contrast: 'var(--theme-color-success-contrast)',
          shade: 'var(--theme-color-success-shade)',
          tint: 'var(--theme-color-success-tint)',
        },
        warning: {
          DEFAULT: 'var(--theme-color-warning)',
          contrast: 'var(--theme-color-warning-contrast)',
          shade: 'var(--theme-color-warning-shade)',
          tint: 'var(--theme-color-warning-tint)',
        },
        danger: {
          DEFAULT: 'var(--theme-color-danger)',
          contrast: 'var(--theme-color-danger-contrast)',
          shade: 'var(--theme-color-danger-shade)',
          tint: 'var(--theme-color-danger-tint)',
        },
        medium: {
          DEFAULT: 'var(--theme-color-medium)',
          contrast: 'var(--theme-color-medium-contrast)',
          shade: 'var(--theme-color-medium-shade)',
          tint: 'var(--theme-color-medium-tint)',
        },
        light: {
          DEFAULT: 'var(--theme-color-light)',
          contrast: 'var(--theme-color-light-contrast)',
          shade: 'var(--theme-color-light-shade)',
          tint: 'var(--theme-color-light-tint)',
        },
        dark: {
          DEFAULT: 'var(--theme-color-dark)',
          contrast: 'var(--theme-color-dark-contrast)',
          shade: 'var(--theme-color-dark-shade)',
          tint: 'var(--theme-color-dark-tint)',
        }
      },
    },
  },
}
