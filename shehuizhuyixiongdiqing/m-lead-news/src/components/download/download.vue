<template>
  <div class="download">
    <a href="https://d.toutiao.com/N13p/">
      <div>
        <img src="//s3.pstatp.com/growth/fe_sdk/image/banner_toutiao_icon_bce0b302.png" />
        <span>今日头条</span>
      </div>
      <el-button>打开</el-button>
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.download {
  width: 100%;
  height: 100px;
  background: #f4f6f6;
  box-shadow: 0 0 10px #aaa;

  a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;

    div {
      height: 100px;
      display: flex;
      align-items: center;
      
      img {
        width: 74px;
        margin-right: 15px;
      }

      span {
        font-size: 27px;
      }
    }

    .el-button {
      width: 150px;
      height: 60px;
      border-radius: 30px;
      background: #699;
      color: #fff;
      font-size: 25px;
    }
  }
}
</style>
