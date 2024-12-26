import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { DEFAULT_LAYOUT } from '@/plugins/layout'

// Route components dynamic imports
const PlaygroundPage = () => import('@/pages/playground.vue')
const PageNotFound = () => import('@/pages/not-found.vue')

const history = createWebHistory()

const routes = [
  {
    path: '/',
    redirect: '/playground',
  },
  {
    path: '/playground/:page?',
    name: 'playground',
    component: PlaygroundPage,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: PageNotFound,
  },
].map((route: RouteRecordRaw) => {
  // Set default layout for all routes to avoid flash of content on the welcome back page
  route.meta = route.meta?.layout ? route.meta : { ...route.meta, layout: DEFAULT_LAYOUT }

  return route
})

const router = createRouter({
  linkActiveClass: 'active',
  history,
  routes,
})

export { router }
