<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Index from "./components/Index.vue"
import Login from "./components/Login.vue"
import Register from "./components/Register.vue"

export default {
  name: 'App',
  components: {
    Index,
    Login,
    Register
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
