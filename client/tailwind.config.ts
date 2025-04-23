import type { Config } from 'tailwindcss';

const Config: Config = {
  important: true,
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2F27CE',
        secondary: '#DEDCFF',
        accent: '#433BFF',
      },
      fontFamily: {
        sans: ['Quicksand', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default Config;
