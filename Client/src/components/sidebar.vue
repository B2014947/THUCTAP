<template>
    <div class="sidebar">
        <ul>
            <li>
                <router-link to="/" exact>Trang chủ 🏠
                </router-link>
            </li>
            <li>
                <router-link to="/document-list">Loại văn bản 📑</router-link>
            </li>
            <li @click="toggleDocuments">
                <span class="expandable-link">Văn bản 📝▾</span>
                <ul v-if="showDocuments">
                    <li>
                        <router-link to="/document-in">▸ Văn bản đến 📥</router-link>
                    </li>
                    <li>
                        <router-link to="/document-out">▸ Văn bản đi 📤</router-link>
                    </li>
                </ul>
            </li>
            <li>
                <router-link to="/department-list">Phòng ban 🏢</router-link>
            </li>
            <li>
                <router-link to="/member-list">Thành viên 🧑‍💼👩‍💼</router-link>
            </li>
            <li>
                <router-link to="/role-management">Vai trò thành viên 🔧</router-link>
            </li>
        </ul>
    </div>
</template>

<script>


export default {
    data() {
        return {
            showDocuments: false
        };
    },
    methods: {
        toggleDocuments() {
            this.showDocuments = !this.showDocuments;
        }
    }
};
</script>

<style scoped>
.sidebar {
    width: 250px;
    background-color: #1a1b1d;
    color: #fffffe;
    padding: 20px;
    margin: 0;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}

.sidebar ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.sidebar li {
    margin-bottom: 10px;
    cursor: pointer;
}

.sidebar a,
.sidebar .expandable-link {
    color: #fffffe;
    text-decoration: none;
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 5px;
    transition: background-color 0.3s;
}

.sidebar a:hover,
.sidebar .expandable-link:hover {
    background-color: #ff8906;
}

.sidebar ul ul {
    margin-left: 20px;
    margin-top: 10px;
}

.sidebar ul ul li {
    margin-bottom: 0;
}

.sidebar ul ul li a {
    padding-left: 10px;
}
</style>
