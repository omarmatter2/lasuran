import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        tajawal: ['Tajawal', 'sans-serif'],
        klein: ['Klein', 'sans-serif'],
        kleinCondensed: ['Klein Condensed', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
