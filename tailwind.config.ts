import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-base': '#0a0a0a',
        'bg-card': '#111111',
        'accent': '#c8a876',
        'text-primary': '#f5f5f5',
        'text-muted': '#888888',
        'border-base': '#222222',
      },
    },
  },
  plugins: [],
}
export default config
