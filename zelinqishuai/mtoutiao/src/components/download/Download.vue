<!--  -->
<template>
<div class='download'>
    <div class="download-left">
        <div class="left-bg"></div>
        <div>今日头条</div>
    </div>
    <div class="download-right">
        <a href="https://www.toutiao.com/m/detail/" >打开</a>
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
    .download {
        height: 4rem;
        padding: 0 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: white;
         box-shadow: 0 2px 4px 0 rgba(0,0,0,0.1);
  .download-left {
      display: flex;
      align-items: center;
    .left-bg {
        width: 2.5rem;
        height: 2.5rem;
        background: url(//s3.bytecdn.cn/growth/fe_sdk/image/banner_toutiao_icon_bce0b302.png) no-repeat;
        overflow: hidden;
        background-size: 100% 100%;
        border: 1px solid #eee;
        border-radius: 7px;
    }
    div{
        padding-left: 2rem;
    }
  }

  .download-right {
        width: 5rem;
        height: 2rem;
        font-size: 1rem;
        line-height: 2rem;
        border-radius: 1.5rem;
        font-weight: 500;
        background-image: linear-gradient(90deg,red,#ff5050);
        text-align: center;
    a {
        color: #fff;

    }
  }
}
</style>