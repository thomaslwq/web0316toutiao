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

<style lang='less' scoped>
* {
  margin: 0px;
  padding: 0px;
  --themeColor: #ea5254;
  box-sizing: border-box;
}
.tt-message {
  line-height: 50px;
  height: 50px;
  text-align: center;
  font-size: 16px;
  color: #6ac144;
  position: fixed;
  left: 50%;
  top: 0;
  width: 400px;
  margin-left: -200px;
}
</style>
