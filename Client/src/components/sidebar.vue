<template>
    <aside class="sidebar">
        <ul>
            <li><a href="#">Dashboard</a></li>
            <li><a href="#">Documents</a></li>
            <li><a href="#">Users</a></li>
            <li><a href="#">Settings</a></li>
        </ul>
    </aside>
</template>

<script>
export default {};
</script>

<style scoped>
.sidebar {
    width: 200px;
    background-color: #cbc8e0;
    color: #fffffe;
    padding: 20px;
    height: 100vh;
    top: 0;
    left: 0;
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
}

.sidebar a:hover {
    color: #ff8906;
}
</style>