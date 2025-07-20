import '../playground/assets/main.css'
import { setup } from '@storybook/vue3-vite'
import { createRouter, createWebHistory } from 'vue-router'
import theme from './theme'

// Create a dummy router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/dummy',
      name: 'dummy',
      component: { template: '<div>Dummy</div>' },
      beforeEnter: (to, from, next) => {
        alert('Navigating to dummy route...')
        // noop
      },
    },
  ],
})

setup((app) => {
  app.use(router)
})

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    theme,
  },
  options: {
    // https://storybook.js.org/docs/7.0/vue/writing-stories/naming-components-and-hierarchy#sorting-stories
    storySort: {
      order: ['Vite treeshakable library', ['Introduction', 'Colors'], 'Components', '*'],
    },
  },
}
