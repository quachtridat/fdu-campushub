module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'usafa-blue': '#025697',
        'oxford-blue-light': '#041C3B',
        'oxford-blue-dark': '#03152D',
        'vivid-burgundy': '#9D2235',
      },
      fontFamily: {
        sans: ['Nunito'],
        body: ['Nunito'],
      }
    },
  },
  variants: {
    extend: {
      cursor: ['hover', 'focus'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
