module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  darkMode: false,
  theme: {
    extend: {
      transitionProperty: {
        'spacing': 'margin',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
