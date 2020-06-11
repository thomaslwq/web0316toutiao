<template>
  <div id="app">
    <router-view></router-view>
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
*{
  margin: 0px;
  padding: 0px;
  --themeColor:#ea5254;
  box-sizing: border-box;
}
</style>
