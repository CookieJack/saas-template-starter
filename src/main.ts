import { createApp } from 'vue'
import './style.css'
import router from "./router"
import pinia from "./store"
import i18n from "./locale"
import { createPinia } from "pinia"
import useAppStore from "./store/modules/app"
import directives from "./directives"
import App from './App.vue'
import 'animate.css'

const app = createApp(App)
const store = createPinia()
const appStore = useAppStore(store)

document.title = appStore.name

app.use(router).use(pinia).use(i18n).use(directives).mount('#app')