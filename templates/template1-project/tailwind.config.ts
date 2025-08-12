import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'PRIMARY_COLOR_TOKEN',
        secondary: 'SECONDARY_COLOR_TOKEN',
      },
      fontFamily: {
        sans: ['FONT_TOKEN', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
