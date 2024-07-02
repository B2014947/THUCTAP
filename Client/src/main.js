
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.js"
import App from './App.vue'
import router from './router/index'
const app = createApp(App)
import axios from 'axios';
app.use(createPinia())
app.use(router)

app.config.globalProperties.$axios = axios.create({
    baseURL: 'http://localhost:5000/api', // Thay đổi baseURL tùy vào cấu hình của backend của bạn
    headers: {
        'Content-Type': 'application/json',
    },
});


app.mount('#app')

