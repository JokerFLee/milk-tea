import { createApp} from 'vue'

// import App from './App.vue'
// import login from "./components/login.vue"

import framep from "./components/framep.vue"

import router from "./router/index.js"

// import "./index.css"



// createApp(App).mount('#app')


const app = createApp(framep)

app.use(router)

app.mount('#app')
