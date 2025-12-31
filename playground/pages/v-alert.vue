<template>
  <div>
    <h1 class="text-2xl font-bold">VAlert</h1>
    <div class="mt-4 flex flex-col gap-2 bg-white p-4">
      <h2 class="text-lg font-semibold">Default alert</h2>
      <VAlert v-for="type in ALERT_TYPES" :key="type" :type="type"
        >A simple info alert with an <a href="#" class="font-semibold underline hover:no-underline">example link</a>. Give it a
        click if you like.</VAlert
      >
      <h2 class="text-lg font-semibold">Closable alert</h2>
      <VAlert v-for="type in ALERT_TYPES" :key="type" :type="type" :closable="true"
        >A simple info alert with an <a href="#" class="font-semibold underline hover:no-underline">example link</a>. Give it a
        click if you like.</VAlert
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ALERT_TYPES } from '@lib/components/v-alert/v-alert.types'
import VAlert from '@lib/components/v-alert/v-alert.vue'

defineOptions({
  name: 'PlaygroundPagesVAlert',
})
</script>
