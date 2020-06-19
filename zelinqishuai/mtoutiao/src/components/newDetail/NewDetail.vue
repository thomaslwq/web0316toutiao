<!--  -->
<template>
  <div class="newsDetail">
      <Download></Download>
    <div class="title">{{news.title}}</div>
    <div class="userInfo">
      <img :src="news.n_user.avator" alt />
      <span>{{news.n_user.nickname}}</span>
    </div>
    <div class="img" v-if="news.imgs">
      <span v-for="img in news.imgs" :key="img">
        <img :src="img" alt />
      </span>
    </div>
    <div class="content" v-html="news.content"></div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Download from '../download/Download'
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
      Download
  },
  data() {
    //这里存放数据
    return {
      news: {}
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.$axios
      .post("/getArticleById", {
        nid: localStorage.getItem("nid")
      })
      .then(res => {
        console.log(res);
        this.news = res.article;
      });
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less' scoped>

.newsDetail{
    
  .title {
      font-size: 3rem;
      padding: 2rem;
  }

  .userInfo {
      padding: 2rem 2rem;
       box-shadow: 0px 2px 4px 2px rgba(0,0,0,0.1);
    img {
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
        vertical-align: middle;
    }

    span {
        padding-left:2rem;
        font-size: 2rem;
        color:var(--themeColor);
    }
  }

  .content {
      padding: 2rem;
      font-size: 1.5rem;
  }

  .img {
      width: 100%;
      padding: 2rem;
    span {
        padding: 0 20%;
       
        // margin: 1rem auto;
      img {
          width: 60%;
          height: auto;
           box-shadow: 2px 2px 4px 2px rgba(0,0,0,0.1);
      }
    }
  }
}
</style>