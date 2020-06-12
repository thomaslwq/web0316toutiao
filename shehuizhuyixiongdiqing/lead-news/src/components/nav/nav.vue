<template>
  <el-row>
    <el-col :span="24">
      <h2>{{appName}}</h2>
      <el-menu
        default-active="0"
        background-color="#fff"
        hover-text-color="#fff"
        active-text-color="#f66"
      >
        <el-menu-item :index="index + ''" v-for="(item,index) in this.navs" :key="index">
          <span slot="title"  @click="goTo(item.nav_url)">{{ item.title }}</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      appName: "隔夜头条",
      navs: [
        { title: "推荐" },
        { title: "榴莲视频" },
        { title: "财经" },
        { title: "热点" },
        { title: "国际范" },
        { title: "图片" },
        { title: "科技" },
        { title: "生活" },
        { title: "直播间" },
        { title: "娱乐" },
        { title: "游戏" },
        { title: "体育" },
      ],
      msg: "欢迎进入隔夜头条"
    };
  },
  methods: {
    goTo(url) {
      this.$router.replace(url);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.el-row {
  text-align: center;
  padding: 0 20px;

  .el-col {
    h2 {
      color: #f66;
      line-height: 44px;
      font-size: 18px;
      border: 3px solid #f66;
      border-radius: 10px;
      margin-bottom: 10px;
    }

    .el-menu {
      border-right: none;

      .el-menu-item {
        height: 40px;
        line-height: 40px;
        border-radius: 5px;
      }
    }
  }
}
.el-submenu__title:hover {
  color: #fff !important;
  background-color: #f66 !important;
}
.el-menu-item:hover {
  color: #fff !important;
  background-color: #f66 !important;
}
</style>
