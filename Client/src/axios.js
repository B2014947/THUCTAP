import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
});

instance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    error => Promise.reject(error)
);

instance.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {
            localStorage.removeItem('token');
            router.push('/login');
        }
        return Promise.reject(error);
    }
);

export default instance;
