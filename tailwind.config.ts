import { libTailwindConfig } from './lib/tailwind/config'

export default {
  ...libTailwindConfig,
  content: [
    './index.html',
    './lib/**/*.{vue,js,ts,jsx,tsx,mdx}',
    './playground/**/*.{vue,js,ts,jsx,tsx,mdx}',
    './stories/**/*.{vue,js,ts,jsx,tsx,mdx}',
  ],
}
