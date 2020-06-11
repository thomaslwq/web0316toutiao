<template>
  <div id="app">
    <div class="nav">
      <div class="nav-item">123</div>
      <div class="nav-item">123</div>
      <div class="nav-item">123</div>
      <div class="nav-item">123</div>
      <div class="nav-item">123</div>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style lang='less' scope>
  #app {
    .nav {
      .nav-item {
        color:red;
    }
  }
}
</style>
