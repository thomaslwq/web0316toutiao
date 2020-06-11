<template>
    <div class='nav-container'>
        <ul>
            <li v-for="e in data">{{e.text}}</li>
        </ul>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
components() {

},
data() {
//这里存放数据
return {
    data: [
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
computed() {

},
//监控data中的数据变化
watch() {

},
//方法集合
methods() {

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
    @red: #a43f3f;
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .nav-container {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        ul {
            width: 100%;
            height: 100%;
            list-style-type: none;
            li {
                margin: 10px 0;
                font-size: 20px;
                user-select: none;
                cursor: pointer;
                border-radius: 10px;
                transition: all ease-in-out .3s;
            }
            li:hover {
                background-color: @red;
                color: white
            }
        }
    }
</style>