<!--  -->
<template>
  <section class="tt-m-index">
    <section class="tt-m-header">
      <section class="header-message">邮件</section>
      <section class="header-title">头条</section>
      <section class="header-search">搜索</section>
    </section>
    <section class="tt-m-add">+</section>
    <!-- 分类开始 -->
    <section class="tt-m-nav">
      <section class="nav-box">
        <a class="nav-left-item">推荐</a>
        <a class="nav-left-item">科技</a>
        <a class="nav-left-item">汽车</a>
        <a class="nav-left-item">体育</a>
        <a class="nav-left-item">时尚</a>
        <a class="nav-left-item">养生</a>
        <a class="nav-left-item">故事</a>
      </section>
    </section>
    <!-- 分类结束 -->
    <!-- 列表开始 -->
    <section class="tt-m-list">
      <a v-for="article in articles" class="list-item" @click.stop="goToArticle(article.nid)">
        <section class="title">{{article.title}}</section>
        <section class="date">{{article.created_at}}</section>
      </a>
    </section>
    <!-- 列表结束 -->
  </section>
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
      lastid: 0, // 默认都是0 不用修改
      articles: [], // 文章列表
      page: 0, //当前请求的页码
      number: 20, //请求的条数
      is_loading: false //是否正在请求
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    refresh: function() {
      if (this.is_loading) {
        return false;
      }
      this.is_loading = true; //正在发请求
      this.$axios
        .post("http://tt.linweiqin.com/api/tt/getArticles", {
          lastid: 0,
          page:this.page++,
          number: 20
        })
        .then(res => {
          this.articles = (this.articles).concat(res.data.articles || []);
          this.page = res.current_page || this.page; // 设置当前的页码
          // 判断是否是最后一页 总页数17  当前页码 17,16
          if (res.counts / this.number <= res.current_page) {
            this.$message({
              msg: "已经到最后一页了"
            });
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.is_loading = false;
        });
    },
    goToArticle: function(nid) {
      console.log(nid);
      localStorage.setItem("nid", nid);
      this.$router.push({
        path: "/article"
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    let _this = this;
    // 添加页面的滚动事件
    window.addEventListener("scroll", () => {
      //console.log("正在滚动中");
      //1. 获取整个屏幕可以滚动的高度
      let htmlElement = document.documentElement;
      let scrollHeight = htmlElement.scrollHeight;
      //2. 获取当前已经滚动的距离
      let scrollTop = htmlElement.scrollTop;
      //3. 获取当前浏览器可视区域的高度
      let clientHeight = htmlElement.clientHeight;
      // scrollHeight-scrollTop<=clientHeight 说明已经触底
      console.log(
        scrollHeight - scrollTop <= clientHeight ? "触底" : "继续努力，还没触底"
      );
      // 如果触底
      scrollHeight - scrollTop <= clientHeight ? _this.refresh() : "";
    });
    this.refresh();
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
.tt-m-index {
  .tt-m-header {
    background-color: var(--themeColor);
    display: flex;
    padding: 0.5rem;
    align-items: center;
    justify-content: space-between;
    height: 4rem;
    color: white;
    font-weight: 200;

    .header-message {
      font-size: 1.5rem;
    }

    .header-title {
      font-weight: 600;
      font-size: 2rem;
    }

    .header-search {
      font-size: 1.5rem;
    }
  }
  .tt-m-add {
    height: 3rem;
    line-height: 3rem;
    float: right;
    font-size: 1.9rem;
    width: 3rem;
    text-align: center;
    color: var(--themeColor);
  }

  .tt-m-nav {
    height: 3rem;

    .nav-box {
      overflow-x: scroll;
      overflow-y: hidden;
      white-space: nowrap;
      border-bottom: 1px solid #ddd;
      .nav-left-item {
        display: inline-block;
        width: 6rem;
        font-size: 1.5rem;
        text-align: center;
        height: 3rem;
        line-height: 3rem;
      }
    }
    .nav-box::-webkit-scrollbar {
      display: none;
    }
  }
  .tt-m-list {
    .list-item {
      padding: 1rem;
      text-decoration: none;
      color: black;
      border-bottom: 0.1rem solid #ddd;
      .title {
        font-size: 1.5rem;
      }
      .date {
        font-size: 0.5rem;
        color: #9a9a9a;
      }
    }
  }
}
</style>