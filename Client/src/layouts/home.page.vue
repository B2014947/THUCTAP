<template>
    <div class="home-page">
        <Navbar />
        <div class="content-wrapper">
            <Sidebar />
            <div class="content">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script setup>
import Navbar from "@/components/navbar.vue";
import Sidebar from "@/components/sidebar.vue";
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html,
body {
    height: 100%;
}

.home-page {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.content-wrapper {
    display: flex;
    flex: 1;
}

.sidebar {
    width: 250px;
    background-color: #1a1b1d;
    color: #fffffe;
    padding: 20px;
    min-height: 100vh;
}

.content {
    flex: 1;
    padding: 20px;
    background-color: #cbc7c7;
    /* Assuming the color based on your previous preference */
    color: #fffffe;
    /* Assuming the color based on your previous preference */
    min-height: 100vh;
    overflow: auto;
}
</style>