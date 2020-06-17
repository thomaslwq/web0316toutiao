<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
    
  }
}
</script>

<style lang="less">
*{
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;

  --themeColor:#ea4245;
  --bgColor:#f3f6f6;
}
a{
  text-decoration: none;
}
ul{
  list-style: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.tt-message {
  width: 400px;
  height: 50px;
  line-height: 50px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.3);
  font-size: 16px;
  color: #6ac144;
  text-align: center;
  left: 50%;
  position: fixed;
  top: 20px;
  margin-left: -200px;
  transition: all 1s;
}
</style>
