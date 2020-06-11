<template>
    <div class='main'>
        <div class="main-left">
            <Nav></Nav>
        </div>
        <div class="main-center"></div>
        <div class="main-right"></div>
    </div>
</template>
<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Nav from './nav/Nav.vue'
export default {
//import引入的组件需要注入到对象中才能使用
components: {
    Nav
},
data: function() {
//这里存放数据
    return {

    };
},
//监听属性 类似于data概念
computed: {

},
//监控data中的数据变化
watch: {

},
//方法集合
methods: {

},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
//生命周期 - 创建之前
beforeCreate() {

},
//生命周期 - 挂载之前
beforeMount() {

},
//生命周期 - 更新之前
beforeUpdate() {

},
 //生命周期 - 更新之后
updated() {

},
//生命周期 - 销毁之前
beforeDestroy() {

},
//生命周期 - 销毁完成
destroyed() {

},
//如果页面有keep-alive缓存功能，这个函数会触发
activated() {

},
}
</script>
<style lang='less' scoped>
.main {
    display: flex;
    width: 100vw;
    height: 100vh;

    div.main-left {
        display: flex;
        justify-content: flex-start;
        flex: 20%;
        nav {
            
        }
    }

    div.main-center {
        flex: 60%;
    }

    div.main-right {
        flex: 20%;
    }
}
</style>