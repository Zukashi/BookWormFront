/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{html,js}',
    './components/**/*.{html,js,tsx,ts,jsx}',
    './src/**/*.{html,js,tsx,ts,jsx}',
  ],
  theme: {
    screens: {
      'sm': '576px',
      // => @media (min-width: 576px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        'gray':'#f5f5f5',
        'loginBtn':'rgb(17, 158, 0)'
      },
      fontFamily:{
        'liberville':['Libre Baskerville']
      }
    },
  },
  plugins: [],
}