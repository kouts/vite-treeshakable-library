import { config } from '@kouts/eslint-config'
import storybook from 'eslint-plugin-storybook'

export default [
  ...config(),
  {
    // Ignores has to be its own object - https://github.com/eslint/eslint/issues/17400
    name: 'project-ignores',
    ignores: ['!.storybook', 'coverage', '.pnpm-store', 'storybook-static/**/*.*'],
  },
  {
    name: 'project-overrides',
    files: ['*.spec.ts'],
    rules: {
      'vue/require-name-property': 'off',
    },
  },
  {
    // Disable the no-restricted-imports rule for certain files
    name: 'project-disable-no-restricted-imports',
    files: ['vite.config.ts', 'tailwind.config.ts', '.storybook/**/*.*'],
    rules: {
      'no-restricted-imports': 'off',
    },
  },
  // Storybook plugin
  ...storybook.configs['flat/recommended'],
]
