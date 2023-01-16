/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{html,js}',
    './components/**/*.{html,js,tsx,ts,jsx}',
    './src/**/*.{html,js,tsx,ts,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        'gray':'#f5f5f5',
        'loginBtn':'rgb(17, 158, 0)'
      }
    },
  },
  plugins: [],
}