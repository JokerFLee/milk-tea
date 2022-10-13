import { createApp } from 'vue'

import App from './App.vue'

import router from "./router/index.js"

import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'




const app = createApp(App)

app.use(VueChartkick)

app.use(router)

app.mount('#app')
