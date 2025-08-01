/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pastelPurple: '#F3E8FF',
        pastelButton: '#E6E6FA',
        purpleText: '#6B46C1',
        purpleHover: '#D6BCFA',
        purpleCard: '#B794F4'
      }
    }
  },
  plugins: []
};