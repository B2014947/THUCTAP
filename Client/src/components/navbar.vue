<template>
    <nav class="navbar">
        <ul>
            <li><a href="#">Dashboard</a></li>
            <li><a href="#">Documents</a></li>
            <li><a href="#">Settings</a></li>
            <li>
                <router-link :to="{ name: 'login.admin' }">Logout</router-link>
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
    padding: 10px;
    margin: 0;
}

.navbar ul {
    list-style: none;
    display: flex;
    justify-content: space-around;
}

.navbar li {
    margin: 0 10px;
    padding-top: 10px;
}

.navbar a {
    color: #fffffe;
    text-decoration: none;
}

.navbar a:hover {
    color: #ff8906;
}
</style>