<!--  -->
<template>
  <div class="tt-index">
    <div class="header">
      <!-- a.3 在模版中使用组件  -->
      <Header></Header>
    </div>
    <!-- 首页内容开始 -->
    <div class="tt-content">
      <div class="tt-content-left">
        <!-- b.3 在模版中使用组件 -->
        <Nav class="tt-content-nav"></Nav>
      </div>
      <div class="tt-content-middle">
        <Post></Post>
        <NewsList></NewsList>
      </div>
      <div class="tt-content-right">
          <!-- 搜索框开始 -->
          <div class="searchinput">
              <SearchInput></SearchInput>
          </div>
          <!-- 搜索框结束 -->
          <!-- 登陆组件开始 -->
           <div class="login">
               <Login></Login>
           </div>
          <!-- 登陆组件结束 -->
      </div>
    </div>
    <!-- 首页内容开始结束 -->
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
// a.1 引入Header 组件
// b.1 引入Nav 组件
import Header from "../components/header/Header";
import Nav from "../components/nav/Nav";
import SearchInput from "../components/searchinput/SearchInput";
import Login from "../components/login/Login";
import Post from "../components/post/Post";
import NewsList from "../components/news/NewsList";
export default {
  //import引入的组件需要注入到对象中才能使用

  components: {
    // a.2 将Header 组件添加到当前组件中
    // b.2 将Nav 组件添加到当前组件中
    // Header:Header
    Header,
    Nav,
    SearchInput,
    Login,
    Post,
    NewsList
  },
  data() {
    //这里存放数据
    return {};
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
  mounted() {},
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
.tt-index {
  .header {
  }

  .tt-content {
    width: 100vw;
    padding: 10px 5vw 10px 10vw;
    display: flex;
    .tt-content-left {
      flex: 1;
      .tt-content-nav {
        margin: 0 auto;
      }
    }

    .tt-content-middle {
      flex: 2;
    }

    .tt-content-right {
      flex: 2;
    }
  }
}
</style>