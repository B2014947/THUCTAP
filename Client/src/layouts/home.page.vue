<template>
    <Navbar></Navbar>
    <div class="d-flex">
        <div class="flex-col">
            <Sidebar></Sidebar>
        </div>
        <div class="flex-col">
            <Content></Content>
        </div>
    </div>
</template>

<style scoped>
* {
    margin: 0
}
</style>
<script setup>
import Sidebar from "@/components/sidebar.vue";
import Navbar from "@/components/navbar.vue"
import Content from "@/components/content.vue";
</script>
