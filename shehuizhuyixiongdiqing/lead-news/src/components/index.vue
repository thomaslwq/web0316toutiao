<template>
  <div class="index">
    <header>
      <div class="left">
        <a href="//app.toutiao.com/news_article/" target="_blank">下载APP</a>
        <a href="//mp.toutiao.com" target="_blank">注册头条号</a>
      </div>
      <div class="right">
        <a href="//www.toutiao.com/complain/" target="_blank">侵权投诉</a>
      </div>
    </header>
    <article>
      <el-row>
        <el-col :span="3">
          <div class="grid-content"></div>
        </el-col>
        <el-col :span="18">
          <div class="grid-content">
            <el-row>
              <el-col :span="4" class="c-left">
                <div class="grid-content">
                  <Nav />
                </div>
              </el-col>
              <el-col :span="12" class="c-middle">
                <div class="grid-content">
                  <News />
                </div>
              </el-col>
              <el-col :span="8" class="c-right">
                <div class="grid-content">
                  <Option />
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </article>
  </div>
</template>

<script>
import Nav from "./nav/nav";
import News from "./news/news";
import Option from "./options/options";

export default {
  appName: "泽林头条",
  components: {
    Nav,
    News,
    Option
  },
  data() {
    return {
      msg: "欢迎进入泽林头条"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.index {
  header {
    height: 50px;
    background: #666;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .left {
      a {
        color: #fff;
        border-right: 1px solid #fff;
        padding: 0 10px;

        &:last-of-type {
          border: none;
          border-right: none;
        }
      }
    }

    .right {
      a {
        color: #fff;
        padding: 0 10px;
      }
    }
  }

  article {
    min-width: 1200px;
  }
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
