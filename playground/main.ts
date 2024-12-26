import '@assets/main.css'
import { createApp } from 'vue'
import App from '@/App.vue'
import { setupLayoutComponents } from '@/plugins/layout'
import { router } from '@/router'

const app = createApp(App)

setupLayoutComponents(app)

app.use(router)

app.mount('#app')
