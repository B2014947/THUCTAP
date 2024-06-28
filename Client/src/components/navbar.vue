<template>
    <nav class="navbar">
        <ul>
            <li>
                <div class="db">
                    <h2>DASHBOARD</h2>
                </div>
            </li>

            <li class="logout">
                <router-link :to="{ name: 'login.admin' }">Logout
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    methods: {
        logout() {
            // Xử lý đăng xuất ở đây
            console.log('Logged out');
        }
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
    /* Đẩy các phần tử ra hai bên */
    align-items: center;
    /* Căn giữa các phần tử theo chiều dọc */
    padding: 0;
    margin: 0;
    width: 100%;
}

.navbar li {
    margin: 0 10px;
}

.navbar a {
    color: #fffffe;
    text-decoration: none;
}

.navbar a:hover {
    color: #ff8906;
}
</style>
