import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#edf9ff',
          100: '#d6f0ff',
          200: '#a8dcff',
          300: '#79c7ff',
          400: '#4bb3ff',
          500: '#1e9fff',
          600: '#007fe6',
          700: '#005fb4',
          800: '#003f82',
          900: '#001f51'
        },
        compliance: '#38b2ac',
        critical: '#f56565'
      }
    }
  },
  plugins: []
};

export default config;
