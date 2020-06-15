<!--  -->
<template>
  <div class="friendslink">
    <div>友情链接</div>
    <ul>
      <li v-for="item,index in friendslink" :key="index">
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
      friendslink: [
        { path: "http://localhost:8081/", title: "光明网" },
        { path: "http://localhost:8081/", title: "央广网" },
        { path: "http://localhost:8081/", title: "国际在线" },
        { path: "http://localhost:8081/", title: "中国西藏网" },
        { path: "http://localhost:8081/", title: "参考消息" },
        { path: "http://localhost:8081/", title: "环球网" },
        { path: "http://localhost:8081/", title: "中青在线" },
        { path: "http://localhost:8081/", title: "中青网" },
        { path: "http://localhost:8081/", title: "海外网" },
        { path: "http://localhost:8081/", title: "中国网" }
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
  .friendslink {
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
          padding: 0 15px;
          font-size: 20px;
          font-weight: bold;
      }
      ul {
          flex: 70%;
          padding: 0 5px;
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          align-items: center;
          li {
              margin: 10px;
              a {
                  color: #777777;
              }
          }
      }
  }
</style>