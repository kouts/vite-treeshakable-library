<template>
  <div v-if="visible" class="mb-4 flex items-center rounded-lg p-4" :class="types[type].div" role="alert">
    <div class="ms-3 text-sm font-medium">
      <slot></slot>
    </div>
    <button
      v-if="closable"
      type="button"
      class="-mx-1.5 -my-1.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 p-1.5 text-blue-500 hover:bg-blue-200 focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
      :class="types[type].button"
      aria-label="Close"
      @click="hide"
    >
      <span class="sr-only">Close</span>
      <XIcon class="h-3 w-3" aria-hidden="true" />
    </button>
  </div>
</template>

<script setup lang="ts">
import XIcon from '@lib/assets/x-icon.svg?inline'
import { type AlertType } from '@lib/components/v-alert/v-alert.types'
import { ref } from 'vue'

defineOptions({
  name: 'VAlert',
})

type Props = {
  type?: AlertType
  closable?: boolean
}

withDefaults(defineProps<Props>(), {
  type: 'info',
  closable: false,
})

const types: Record<AlertType, { div: string; button: string }> = {
  info: {
    div: 'text-blue-800 bg-blue-50 dark:bg-gray-800 dark:text-blue-400',
    button:
      'bg-blue-50 text-blue-500 focus:ring-blue-400 hover:bg-blue-200 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700',
  },
  error: {
    div: 'text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400',
    button:
      'bg-red-50 text-red-500 focus:ring-red-400 hover:bg-red-200 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700',
  },
  warning: {
    div: 'text-yellow-800 bg-yellow-50 dark:bg-gray-800 dark:text-yellow-400',
    button:
      'bg-yellow-50 text-yellow-500 focus:ring-yellow-400 hover:bg-yellow-200 dark:bg-gray-800 dark:text-yellow-400 dark:hover:bg-gray-700',
  },
  success: {
    div: 'text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400',
    button:
      'bg-green-50 text-green-500 focus:ring-green-400 hover:bg-green-200 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700',
  },
}

const visible = ref(true)

const hide = () => {
  visible.value = false
}
</script>
