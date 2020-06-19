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

<style lang='less'>
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    text-decoration: none;
    --themeColor:#ea4245;
  }
  .tt-message {
  line-height: 5rem;
  font-size: 1.6rem;
  color: #6ac144;
  text-align: center;
  left: 50%;
  position: fixed;
  top: 0;
  width: 20rem;
  height: 5rem;
  margin-left: -10rem;
  background: #fcf6ec;
}
</style>
