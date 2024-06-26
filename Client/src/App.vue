<!-- App.vue -->
<template>
  <div id="app">
    <router-view /> <!-- Component sẽ được hiển thị tại đây -->
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
#app {
  font-family: 'Arial', sans-serif;
  height: 100vh;
  background-color: #f0f0f0;
}
</style>
