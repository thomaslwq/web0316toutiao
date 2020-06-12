<!--  -->
<template>
<div class='tt-index-login'>
    <p class="text">登录后可以保存您的浏览喜好、评论、收藏，并与APP同步，更可以发布微头条</p>
    <div class="login-button">登陆</div>
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
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.tt-index-login {
    margin-top:10px;
    width:310px;
    height:230px;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding:50px;
    border:1px solid #ddd;
    background-color: white;
  .text {
      text-align: center;
      font-size:12px;
      color:#777777;
  }

  .login-button {
      border-radius: 5px;
      font-size:16px;
      background-color:var(--themeColor);
      line-height: 40px;
      text-align: center;
      color:white;
      height:40px;
      width:250px;
  }
}
</style>