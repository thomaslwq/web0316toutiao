<!--  -->
<template>
  <div class="tt-news-list">
    <div class="tt-news-refresh" @click.stop="refresh">点击刷新</div>
    <div class="list-item" v-for="article in articles" 
    @click.stop="goToNewsDetail(article.nid)"
    :key="article.nid">
      <div class="left" v-if="article.img">
        <img :src="article.img" alt />
      </div>
      <div class="right">
        <div class="title">{{article.title}}</div>
        <div class="profile">
          <img :src="article.user.avator" alt />
          <div class="nickname">{{article.user.nickname}}</div>
        </div>
        <div class="date">{{article.created_at}}</div>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      lastid: 0, // 最新一条资讯的id
      articles: [] // 文章列表
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    goToNewsDetail:function(nid){
      console.log(nid);
      this.$router.push({
        path:"/newsDetail",query:{
          nid:nid
        }
      })
    },
    refresh: function() {
      this.$axios
        .post("/getArticles", {
          lastid: this.lastid
        })
        .then(res => {
          console.log(res);
          // 将最新的数据 拼接到 现有的数据上 
          this.articles = (res.articles || []).concat(this.articles);
          if (this.articles.length > 0) {
            // 获取最后一条文章或头条的 id
            this.lastid = this.articles[0].nid;
          }
        });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.$axios
      .post("/getArticles", {
        lastid: this.lastid
      })
      .then(res => {
        console.log(res);

        this.articles = res.articles || [];
        if (this.articles.length > 0) {
          // 获取最后一条文章或头条的 id
          this.lastid = this.articles[0].nid;
        }
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
//@import url(); 引入公共css类
.tt-news-list {
  .tt-news-refresh {
    height: 30px;
    line-height: 30px;
    text-align: center;
    width: 100%;
    font-size: 14px;
    color: #3192d5;
    border: 1px solid #3192d5;
    border-radius: 5px;
    margin-bottom: 10px;
  }

  .list-item {
    display: flex;
    border-bottom: 1px solid #ddd;
    .left {
      flex: 1;
      height: 100px;
      width: 160px;
      padding: 5px;
      img {
        height: 100%;
        width: 100%;
      }
    }

    .right {
      flex: 2;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 5px;
      .title {
        font-weight: 600;
      }

      .profile {
        display: flex;
        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
        .nickname {
          width: 100px;
          height: 30px;
          color: #7b7b7b;
          line-height: 30px;
          font-size: 16px;
        }
      }

      .date {
        color: #7b7b7b;
        font-size: 16px;
      }
    }
  }
}
</style>