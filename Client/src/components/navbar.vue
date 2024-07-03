<template>
    <nav class="navbar">
        <ul>
            <li>
                <div class="db">
                    <h2>DASHBOARD</h2>
                </div>
            </li>
            <li class="logout" @click="logout">
                Logout
            </li>
        </ul>
    </nav>
</template>

<script setup>
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found');
        }

        // Gọi API đăng xuất
        const response = await axios.post('http://localhost:5000/api/auth/logout', { token });
        console.log(response.data); // Log thông báo từ backend (vd: Đăng xuất thành công)

        // Xóa token trong Local Storage
        localStorage.removeItem('token');

        // Chuyển hướng đến trang đăng nhập
        router.push('/login');
    } catch (error) {
        console.error('Lỗi khi đăng xuất:', error.response ? error.response.data.error : error.message);
        // Xử lý lỗi khi đăng xuất (vd: Hiển thị thông báo lỗi)
    }
};
</script>

<style scoped>
.navbar {
    background-color: #0f0e17;
    color: #fffffe;
    padding: 13px;
    margin: 0;
}

.navbar ul {
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    margin: 0;
    width: 100%;
}

.navbar li {
    margin: 0 10px;
    cursor: pointer;
    /* Biểu thị rằng nút logout có thể click */
}

.navbar li.logout {
    color: #ff8906;
}

.navbar li.logout:hover {
    color: #ffffff;
}
</style>
