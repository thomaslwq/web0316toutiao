<!--  -->
<template>
  <div class="tt-index-nav">
    <h3>头条</h3>
    <div class="nav-list">
      <div class="nav-list-item" v-for="nav,index in navs" :key="nav.id">{{nav.text}}</div>
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
      navs: [
        { id: 1, text: "推荐" },
        { id: 2, text: "西瓜视频" },
        { id: 3, text: "财经" },
        { id: 4, text: "热点" },
        { id: 5, text: "直播" },
        { id: 6, text: "图片" },
        { id: 7, text: "科技" },
        { id: 8, text: "娱乐" },
        { id: 9, text: "游戏" },
        { id: 10, text: "体育" },
        { id: 11, text: "懂车帝" },
        { id: 12, text: "热点" }
      ]
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
.tt-index-nav {
    width:120px;
    text-align: center;
    h3 {
        color:var(--themeColor);
        font-weight: 200;
    }
  .nav-list {
    .nav-list-item {
        height:40px;
        line-height: 40px;
        font-size:16px;
        transition: all 0.5s;
    }
    .nav-list-item:hover{
        background-color: var(--themeColor);
        border-radius: 5px;
        color:white;
    }
  }
}
</style>