import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'gpt-dark': '#202123',
        'gpt-light': '#343541',
        'gpt-hover': '#2f3138',
        'gpt-border': '#4d4d4f',
        'gpt-text': '#ececf1',
        'gpt-text-secondary': '#d1d5db',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
export default config
