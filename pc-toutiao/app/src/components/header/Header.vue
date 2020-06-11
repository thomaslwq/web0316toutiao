<template>
    <div class='tt-header'>
        <div class="tt-header-left">下载APP</div>
        <div class="tt-header-center">
            <div class="tt-header-center-left">
                <span>注册头条号</span>
                <span>北京 / 阴</span>
                <span>21°C / 29°C</span>
            </div>
            <div class="tt-header-center-right">
                <span>投诉侵权</span>
            </div>
        </div>
        <div class="tt-header-right">头条产品</div>
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
    .tt-header {
        display: flex;
        width: 100%;
        height: 30px;
        color: white;
        background-color: black;
        user-select: none;

        div {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .tt-header-left {
            flex: 5%;
            border: 1px solid grey;
        }
        .tt-header-center {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 10px;
            flex: 90%;

            .tt-header-center-left {
                span {
                    display: inline-block;
                    margin: 0 15px;
                    user-select: none;
                }

                span:last-of-type {
                    position: relative;
                }

                span:last-of-type::after {
                    content: "";
                    display: block;
                    position: absolute;
                    top: 40%;
                    right: -20%;
                    width: 8px;
                    height: 8px;
                    border-top: 2px solid white;
                    border-right: 2px solid white;
                    transform: translateY(-50%) rotate(135deg);
                }
            }
        }
        .tt-header-right {
            flex: 5%;
            border: 1px solid grey;
        }
    }
</style>