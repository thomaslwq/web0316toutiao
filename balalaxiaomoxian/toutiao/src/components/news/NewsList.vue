<template>
<div class='newsList'>
    <div class="newsList-refresh">
        <div class="refresh-text">点击刷新</div>
    </div>
    <div class="newsList-list">
    </div>
</div>
</template>

<script>

export default {
components: {},
data() {
   return {

   };
},
}
</script>
<style lang='less' scoped>
.newsList {
  .newsList-refresh {
      width: 100%;
      height: 30px;
      line-height: 30px;
      border: 1px solid #95c1e8;
      background-color: #eff6fc;
      color: #4b8cd6;
      text-align: center;
      border-radius: 5px;
      cursor: pointer;
    .refresh-text {

    }
  }

  .newsList-list {

  }
}
</style>