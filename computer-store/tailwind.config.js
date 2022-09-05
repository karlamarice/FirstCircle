/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    minWidth: {
      '300': '300px',
    },
    extend: {
      fontFamily: null,
      screens: {
        sm: '320px',
        tb: '768px',
        md: '1024px',
        lg: '1280px',
        xl: '1920px'
      },
      extend: {
        fontSize: {
            xs: ['0.813rem', { lineHeight: '1.125rem' }],
            sm: ['0.875rem', { lineHeight: '1.25rem' }],
            base: ['1rem', { lineHeight: '1.625rem' }],
            lg: ['1.125rem', { lineHeight: '1.75rem' }],
            xl: ['1.375rem', { lineHeight: '1.75rem' }]
        },
        fontFamily: null,
        colors: {
          white: {
            400: '#fff',
            600: '#f4f7ff'
          },
          violet: {
            100: '#565ef0'
          },
          indigo: {
            400: '#001e42',
            600: '#003a70'
          }
        }
      }
    },
  },
  plugins: [],
}
