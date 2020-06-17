<template>
    <div class='tt-user-data-container'>
        <div class="user-center-header">
            <span @click="$router.push('/')">今日头条</span>
            <div class="user-panel">
                <div class="user-avator">
                    <img :src="$store.state.userInfo.avator" alt="">
                </div>
                <span class="user-name">{{$store.state.userInfo.nickname}}</span>
                <div class="user-panel-dropdown">
                    <span>退出登录</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
components: {

},
data() {
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

    .tt-user-data-container {
        width: 100%;
        height: 100%;

        .user-center-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
            padding: 0 20%;
            width: 100%;
            height: 50px;
            box-shadow: 2px 0 5px grey;

            & > span {
                color: #e43c46;
                font-size: 30px;
                font-weight: bold;
                user-select: none;
                cursor: pointer;
            }

            .user-panel {
                flex: 0 1 150px;
                display: flex;
                align-items: center;
                position: relative;
                height: 100%;
                user-select: none;
                cursor: pointer;

                &::after {
                    content: "";
                    width: 8px;
                    height: 8px;
                    top: 50%;
                    position: absolute;
                    right: 10px;
                    border-right: 2px solid black;
                    border-bottom: 2px solid black;
                    transform: translateY(-50%) rotate(45deg);
                }

                & > div {
                    margin: 0 10px;
                }

                .user-avator {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    overflow: hidden;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }

                .user-name {
                    font-size: 18px;
                }

                &:hover .user-panel-dropdown {
                    visibility: visible;
                    opacity: 1;
                }

                .user-panel-dropdown {
                    position: absolute;
                    top: 100%;
                    visibility: hidden;
                    opacity: 0;
                    width: 100%;
                    height: 50px;
                    background-color: white;
                    box-shadow: 1px 1px 5px #d2d0d0;
                    transition: all ease-in-out .3s;
                }
            }

        }

    }

</style>