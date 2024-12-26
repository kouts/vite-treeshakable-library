export default {
  '*.{vue,ts,js}': ['npm run lint-fix'],
  '*.{vue,ts}': [
    () => {
      return `vue-tsc --noEmit --skipLibCheck`
    },
  ],
}
