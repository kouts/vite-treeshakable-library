import { type App, defineAsyncComponent } from 'vue'

export const DEFAULT_LAYOUT = 'layout-default'

export const setupLayoutComponents = (app: App) => {
  app.component(
    'LayoutDefault',
    defineAsyncComponent(() => import('@/layouts/layout-default.vue')),
  )
}
