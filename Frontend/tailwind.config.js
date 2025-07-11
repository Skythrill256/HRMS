/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Geist', 'sans-serif'],
      },
      colors: {
        nav: '#6246ea',
        background: '#fffffe',
        card: '#eaeafa',
        // card: '#CBC3E3',
        sidebar: '#3730A3',
        text: '#2b2c34',
        button: '#FF4500',
        primary: 'white',
        secondary: '#CBD5E1'
      },
    },
  },
  plugins: [],
}
