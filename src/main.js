import { createApp} from 'vue'

// import App from './App.vue'
// import login from "./components/login.vue"

import framep from "./components/framep.vue"

import router from "./router/index.js"

// import "./index.css"

// createApp(App).mount('#app')

import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'




const app = createApp(framep)

app.use(VueChartkick)

app.use(router)

app.mount('#app')
