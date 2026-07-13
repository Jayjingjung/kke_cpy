import type { Config } from 'tailwindcss';

export default {
  content: [
    './components/**/*.{vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
  ],
  theme: {
    fontFamily: {
      sans: ['Phetsarath', 'Noto Sans SC', 'Inter', 'sans-serif'],
      heading: ['Playfair Display', 'Phetsarath', 'Noto Sans SC', 'serif'],
      body: ['Phetsarath', 'Noto Sans SC', 'Inter', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: { DEFAULT: '#E2231A', dark: '#B91C14', light: '#F04E47' },
        gold: { DEFAULT: '#C9A227', dark: '#A68520', light: '#E0BA3F' },
        dark: '#040636',
      },
    },
  },
  plugins: [],
} satisfies Config;
