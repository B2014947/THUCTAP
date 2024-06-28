<template>
    <div class="sidebar">
        <ul>
            <li>
                <router-link to="/" exact><font-awesome-icon :icon="['fas', 'house']" />Trang chủ</router-link>
            </li>
            <li>
                <router-link to="/document-list">Loại văn bản</router-link>
            </li>
            <li>
                <router-link to="/document-management">Văn bản</router-link>
            </li>
            <li>
                <router-link to="/department-list">Phòng ban</router-link>
            </li>
            <li>
                <router-link to="/member-list">Thành viên</router-link>
            </li>
            <li>
                <router-link to="/role-management">Vai trò thành viên</router-link>
            </li>
        </ul>
    </div>
</template>

<script>

export default {};
</script>

<style scoped>
.sidebar {
    width: 250px;
    background-color: #1a1b1d;
    color: #fffffe;
    padding: 20px;
    margin: 0;
    min-height: 100vh;
    /* Set the minimum height to 100% of the viewport height */
}

.sidebar ul {
    list-style: none;
    padding: 0;
}

.sidebar li {
    margin-bottom: 10px;
}

.sidebar a {
    color: #fffffe;
    text-decoration: none;
    display: block;
    padding: 10px;
    border-radius: 5px;
    transition: background-color 0.3s;
}

.sidebar a:hover {
    background-color: #ff8906;
}
</style>
