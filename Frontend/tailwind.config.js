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
        poppins: ['Poppins', 'sans-serif'],
      },
      // colors: {
      //   nav: 'var(--nav-color)',
      //   sidebar: 'var(--sidebar-color)',
      //   background: 'var(--background-color)',
      //   card: 'var(--card-color)',
      //   text: 'var(--text-color)',
      //   heading: 'var(--heading-color)',
      //   submit: 'var(--button-submit)',
      //   cancel: 'var(--button-cancel)',
      // },
    },
  },
  plugins: [],
}



// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   darkMode: 'class',
//   theme: {
//     extend: {
//       fontFamily: {
//         poppins: ['Poppins', 'sans-serif'],
//       },
//       colors: {
//         nav: '#ff0000',           // red
//         sidebar: '#e3f6f5',
//         background: '#fffffe',
//         card: '#bae8e8',
//         text: '#2d334a',
//         heading: '#272343',
//         submit: '#ffd803',
//         cancel: '#e53170',
//       },
//     },
//   },
//   plugins: [],
// }
