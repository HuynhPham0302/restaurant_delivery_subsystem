import type { Config } from 'tailwindcss';
import color from 'tailwindcss/colors';

const Config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      primary: '#2F27CE',
      secondary: '#DEDCFF',
      accent: '#433BFF',
      ...color,
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default Config;
