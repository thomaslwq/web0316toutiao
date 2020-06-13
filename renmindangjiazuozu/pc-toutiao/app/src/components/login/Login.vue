<template>
    <div class='tt-login'>
        <div class="tt-login-tips">
            <span>登录后可以保存您的浏览喜好、评论、收藏，并与APP同步，更可以发布微头条</span>
        </div>
        <div class="tt-login-button">
            <router-link to="login">登录</router-link>
        </div>
        <div class="tt-login-more">
            <div class="login-qq">
                <div class="more-icon qq"></div>
                <span class="more-name">QQ</span>
            </div>
            <div class="login-wx">
                <div class="more-icon wx"></div>
                <span class="more-name">微信</span>
            </div>
        </div>
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
    .tt-login {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        background-color: white;

        .tt-login-tips {
            flex: 35%;
            padding: 15px;
            span {
                font-size: 14px;
            }
        }

        .tt-login-button {
            display: flex;
            justify-content: center;
            align-items: center;
            flex: 30%;

            a {
                width: 80%;
                font-size: 25px;
                background-color: #e43c46;
                color: white;
                border: none;
                border-radius: 5px;
                outline: none;
            }
        }

        .tt-login-more {
            display: flex;
            justify-content: center;
            flex: 35%;

            div {
                display: flex;
                flex-direction: column;
                align-items: center;
                margin: 0 10px;

                .more-icon {
                    flex: 0 1 48px;
                    display: inline-block;
                    width: 48px;
                    border: 1px solid black;
                    border-radius: 50%;
                    background-repeat: no-repeat;
                    background-position: center;
                }

                .more-icon.qq {
                    background-image: url("../../assets/images/qq-icon.png");
                }

                .more-icon.wx {
                    background-image: url("../../assets/images/wx-icon.png");
                }

                .more-name {
                    flex: 1;
                    font-size: 14px;
                }
            }
        }
    }
</style>