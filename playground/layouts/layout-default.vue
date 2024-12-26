<template>
  <main class="flex h-screen w-full overflow-auto bg-slate-100">
    <div class="h-full w-full pt-0">
      <slot></slot>
    </div>
  </main>
</template>

<script setup lang="ts">
defineOptions({ name: 'LayoutDefault' })
</script>
