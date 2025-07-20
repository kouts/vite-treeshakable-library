<template>
  <Component :is="typeof $route.meta.layout === 'function' ? $route.meta.layout() : $route.meta.layout">
    <RouterView />
  </Component>
</template>

<script setup lang="ts">
defineOptions({
  name: 'App',
})
</script>
