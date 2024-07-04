import axios from 'axios';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';


// Cấu hình axios instance để gửi yêu cầu đến API
export const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api', // Điều chỉnh cho phù hợp với server backend của bạn
    headers: {
        'Content-Type': 'application/json',
    },
});


const app = createApp(App);


app.use(createPinia());


app.use(router);


app.mount('#app');
