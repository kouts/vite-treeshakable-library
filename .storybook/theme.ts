// https://storybook.js.org/docs/configure/user-interface/theming
import { create } from '@storybook/theming/create'

export default create({
  base: 'light',
  fontBase: '"Inter", sans-serif',
  brandTitle: 'Vite treeshakable library',
  appBg: 'white',
  colorSecondary: '#966957',
  barBg: '#f1f5f9',
  inputBorder: '#cbd5e1',
  appBorderColor: '#e2e8f0',
  barHoverColor: '#966957',
})
