<!--  -->
<template>
  <div class="more">
      <div>更多</div>
    <ul>
      <li v-for="item,index in morelink" :key="index">
        <a :href="item.path">{{item.title}}</a>
      </li>
    </ul>
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
      morelink: [
        { path: "http://localhost:8081/", title: "关于头条" },
        { path: "http://localhost:8081/", title: "加入头条" },
        { path: "http://localhost:8081/", title: "媒体报道" },
        { path: "http://localhost:8081/", title: "媒体合作" },
        { path: "http://localhost:8081/", title: "产品合作" },
        { path: "http://localhost:8081/", title: "合作说明" },
        { path: "http://localhost:8081/", title: "广告投放" },
        { path: "http://localhost:8081/", title: "联系我们" },
        { path: "http://localhost:8081/", title: "用户协议" },
        { path: "http://localhost:8081/", title: "私隐政策" },
        { path: "http://localhost:8081/", title: "侵权投诉" },
        { path: "http://localhost:8081/", title: "廉洁举报" }
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
  *{
      margin: 0;
      padding: 0;
  }
  .more {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      background-color: #f4f5f6;
      text-align: left;
      border-top: 3px solid #c43333;
      div {
          display: flex;
          align-items: center;
          flex: 30%;
          margin: 5px;
          padding: 0 10px;
          font-size: 20px;
          font-weight: bold;
      }
      ul {
          flex: 70%;
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
          align-items: center;
          list-style: none;
          li {
              padding: 5px;
              a {
                  text-decoration: none;
                  color: #777777;
              }
          }
      }
  }
</style>