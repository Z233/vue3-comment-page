const colors = require('tailwindcss/colors');

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#575f75',
          light: '#7a85a3'
        }
      }
    },
  },
  variants: {
    extend: {
    },
  },
  plugins: [],
}
