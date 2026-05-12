/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d7ff',
          300: '#a5baff',
          400: '#7c93ff',
          500: '#5c6ef5',
          600: '#4a52e8',
          700: '#3d42cc',
          800: '#3237a4',
          900: '#2d3382',
          950: '#1c1f4f',
        },
        accent: {
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
