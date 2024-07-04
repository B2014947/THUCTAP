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


        const response = await axios.post('http://localhost:5000/api/auth/logout', { token });
        console.log(response.data); 


        localStorage.removeItem('token');

        router.push('/login');
    } catch (error) {
        console.error('Lỗi khi đăng xuất:', error.response ? error.response.data.error : error.message);

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

}

.navbar li.logout {
    color: #ff8906;
}

.navbar li.logout:hover {
    color: #ffffff;
}
</style>
