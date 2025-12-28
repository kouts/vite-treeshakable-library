<template>
  <div class="flex min-h-full w-full flex-col p-6">
    <nav v-if="!playgroundPageLoading" class="flex">
      <ul class="inline-flex items-center space-x-1">
        <li class="inline-flex items-center">
          <RouterLink
            to="/playground"
            class="group inline-flex items-center text-sm font-medium text-slate-400 hover:text-slate-500"
          >
            <HomeIcon class="mr-2 h-4 w-4 fill-slate-400 group-hover:fill-slate-500" /> Playground Home
          </RouterLink>
        </li>
        <li v-if="$route.params.page">
          <div class="flex items-center opacity-70">
            <ChevronRight class="h-4 w-4 fill-slate-400" />
            <span class="ml-1 text-sm font-medium text-slate-400">{{ $route.params.page }}</span>
          </div>
        </li>
      </ul>
    </nav>
    <VAlert v-if="error" type="error" class="mt-2">
      <p>An error occurred while fetching the requested playground page!</p>
      <p class="mt-1">
        Make sure that the component
        <span class="bg-slate-100 px-1">
          {{ `playground/pages/${($route.params.page as string).toLowerCase()}.vue` }}
        </span>
        exists.
      </p>
      <p class="mt-4">
        Error details: <span class="bg-slate-100 px-1">{{ error }}</span>
      </p>
    </VAlert>
    <template v-if="!error && !playgroundPage && !playgroundPageLoading">
      <div class="mt-4 shrink-0">
        <h1 class="text-3xl font-bold">Welcome to the playground!</h1>
        <div class="mt-4">Select a playground <strong>page</strong> from the list below:</div>
      </div>
      <div class="mt-2 mb-6 overflow-y-auto rounded-lg bg-white shadow-sm lg:w-1/3">
        <ul class="block divide-y divide-slate-200">
          <li v-for="link in playgroundPageLinks" :key="link" class="hover:bg-slate-400 hover:text-white">
            <RouterLink :to="`/playground/${link}`" class="block p-3">{{ link }}</RouterLink>
          </li>
        </ul>
      </div>
    </template>
    <Component
      :is="playgroundPage"
      v-if="!error && playgroundPage && !playgroundPageLoading"
      :class="{ 'mt-4': !error && playgroundPage && !playgroundPageLoading }"
    />
  </div>
</template>

<script lang="ts">
import VAlert from '@lib/components/v-alert/v-alert.vue'
import { type Component, defineComponent, markRaw } from 'vue'
import ChevronRight from '@/assets/chevron-right.svg?inline'
import HomeIcon from '@/assets/home.svg?inline'

type Page = {
  default: Component
}

const excludePages = ['playground', 'not-found']

const playgroundPages = import.meta.glob('./**/*.vue')

const playgroundPageLinks = Object.keys(playgroundPages).reduce((acc, curr) => {
  const link = curr.replace('./', '').replace('.vue', '')

  return [...acc, ...(!excludePages.includes(link) ? [link] : [])]
}, [] as string[])

export default defineComponent({
  name: 'PlaygroundPagesPlayground',
  components: {
    VAlert,
    HomeIcon: HomeIcon as unknown as Component,
    ChevronRight: ChevronRight as unknown as Component,
  },
  data() {
    return {
      playgroundPage: null as Component | null,
      playgroundPageLinks,
      playgroundPageLoading: false,
      error: '',
    }
  },
  watch: {
    '$route.params.page': {
      async handler(nV) {
        if (nV) {
          this.playgroundPageLoading = true
          try {
            const page = (await playgroundPages[`./${nV}.vue`]()) as Page

            if (page) {
              this.playgroundPage = markRaw(page.default)
            }
          } catch (error) {
            console.error(error)
            if (error instanceof Error) {
              this.error = error.message
            }
          }
          this.playgroundPageLoading = false
        } else {
          this.playgroundPage = null
        }
      },
      immediate: true,
      deep: true,
    },
  },
})
</script>
