import './assets/main.css'
import './assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { VueQueryPlugin } from "vue-query";


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin);

app.mount('#app')
