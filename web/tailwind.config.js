/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundColor: {
        'purr-dark': '#070212',
        'purr-pink': '#f45f80',
      },
      backgroundImage: {
        'purr-gradient':
          'linear-gradient(to right, #f45f80 0%, #d44d93  51%, #f45f80  100%)',
      },
      backgroundSize: {
        'size-200%': '200% auto',
      },
      colors: {
        'purr-pink': '#f45f80',
      },
      dropShadow: {
        purple: '0 25px 25px #6930c320',
      },
      gridTemplateColumns: {
        posts: 'repeat(auto-fit, minmax(300px, 1fr))',
      },
    },
  },
  plugins: [],
};
