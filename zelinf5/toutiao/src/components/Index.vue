<!--  -->
<template>
  <div class=''>
    <div class="header">
      <!-- a.3 在模板中使用组件 -->
      <Header></Header>
    </div>
    <!-- 首页内容开始 -->
    <div class="tt-content">
      <div class="tt-content-left">
        <Nav class="tt-content-nav"></Nav>
      </div>
      <div class="tt-content-middle">
        <Post></Post>
        <NewList></NewList>
      </div>
      <div class="tt-content-right">
        <!-- 搜索框开始 -->
        <div class="searchinput">
          <SearchInput></SearchInput>
        </div>
        <!-- 搜索框结束 -->
        <!-- 登录组件开始 -->
        <div class="login">
          <Login></Login>
        </div>
        <!-- 登录组件结束 -->
      </div>
    </div>
    <!-- 首页内容结束 -->
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
// a.1 引入Header组件
import Header from '../components/header/Header'
import Nav from '../components/nav/Nav'
import SearchInput from '../components/searchinput/SearchInput'
import Login from '../components/login/Login'
import Post from '../components/post/Post'
import NewList from '../components/news/NewList'
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    // a.2 将Header 组件 添加到当前组件中
    Header,
    Nav,
    SearchInput,
    Login,
    Post,
    NewList

  },
  data() {
    //这里存放数据
    return {
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {

  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

  },
  beforeCreate() { }, //生命周期 - 创建之前
  beforeMount() { }, //生命周期 - 挂载之前
  beforeUpdate() { }, //生命周期 - 更新之前
  updated() { }, //生命周期 - 更新之后
  beforeDestroy() { }, //生命周期 - 销毁之前
  destroyed() { }, //生命周期 - 销毁完成
  activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style  scoped lang="less">
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
</style>