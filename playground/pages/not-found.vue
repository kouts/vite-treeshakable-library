<template>
  <div class="flex h-full flex-col items-center justify-center">
    <NotFoundIcon class="w-32 flex-none text-slate-800" />
    <h1 class="mt-6 text-xl font-semibold">Page not found</h1>
    <p class="mt-4 text-sm font-medium text-slate-400">We couldn’t find the page you were looking for.</p>
  </div>
</template>

<script setup lang="ts">
import NotFoundIcon from '@assets/not-found.svg?inline'

defineOptions({
  name: 'PlaygroundPagesNotFound',
})
</script>
