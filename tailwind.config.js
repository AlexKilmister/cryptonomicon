module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.{vue,js}'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
}
