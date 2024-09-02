/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.ts', 'index.html'],
  theme: {
    extend: {
      screens: {
        'max-content': '125rem'
      },
      fontSize: {
        10: '.625rem',
        12: '.75rem',
        14: '.875rem',
        16: '1rem',
        18: '1.125rem',
        22: '1.375rem',
        24: '1.5rem',
        28: '1.75rem',
        32: '2rem',
        64: '4rem',
        48: '3rem',
        80: '5rem',
        96: '6rem'
      }
    }
  },
  plugins: ['prettier-plugin-tailwindcss']
};
