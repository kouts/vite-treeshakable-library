const config = {
  stories: ['../stories/**/*.mdx', '../lib/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-a11y', '@storybook/addon-docs', '@storybook/addon-vitest'],

  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },

  staticDirs: ['./public'],
}

export default config
