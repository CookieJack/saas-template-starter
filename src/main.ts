import { createApp } from 'vue'
import './style.css'
import router from "./router"
import pinia from "./store"
import i18n from "./locale"
import directives from "./directives"
import { createHead } from "@unhead/vue/client"
import App from './App.vue'
import 'animate.css'

const app = createApp(App)
const head = createHead()

app.use(router).use(pinia).use(i18n).use(directives).use(head).mount('#app')