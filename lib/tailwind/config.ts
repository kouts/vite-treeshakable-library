import type { Config } from 'tailwindcss'

export const libTailwindConfig = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx,mdx}'],
  theme: {
    fontFamily: {
      sans: ['Helvetica', 'Arial', 'sans-serif'],
    },
    extend: {
      colors: {
        white: '#fff',
        black: '#000',
      },
      spacing: {
        7.5: '1.875rem',
      },
      zIndex: {
        110: '110',
      },
      screens: {},
    },
  },
} as const satisfies Config

export type LibTailwindConfig = typeof libTailwindConfig
