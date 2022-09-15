import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/index.css'
import store from './vuex/index'
import {axiosInstance} from './api/api'

const app = createApp(App)

export const axios = app.config.globalProperties.$axios = { ...axiosInstance }

app.use(store)
app.mount('#app')
