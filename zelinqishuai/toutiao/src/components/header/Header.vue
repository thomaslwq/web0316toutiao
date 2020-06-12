<!--  -->
<template>
<div class='tt-header'>
    <div class="tt-header-left">
        <a class="left-list"
        target="_blank"
        href="https://app.toutiao.com/news_article/">下载APP</a>
        <a href="#" class="left-list">注册头条账号</a>
        <a href="#" class="left-list">深圳</a>
        <a href="#" class="left-list">晴 21℃  /  31℃</a>
    </div>
    <div class="tt-header-right">
        <div class="right-list">侵权投诉</div>
        <div class="right-list">产品介绍</div>
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
    .tt-header {
        width: 100vw;
        background-color: black;
        color: white;
        display: flex;
        justify-content: space-between;
  .tt-header-left {
      display: flex;
    .left-list {
        height: 30px;
        line-height: 30px;
        padding-left: 20px;
        text-decoration: none;
        color: white;
        cursor: pointer;
    }
    .left-list:nth-child(1)::after{
        content: "";
        
        border-right:1px solid #ddd;
        padding-left: 15px;
        height: 30px;
    }
    
}
.tt-header-right {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 20px;
    .right-list {
        margin-right: 20px;
  }
  
    .right-list:nth-child(1)::after {
        content: "";
        border-right:1px solid #ddd;
        padding-left: 20px;
        height: 30px;
  }
  }
}

</style>