<template>
        <div class='tt-login' >
            <div class="tt-no-login" v-show="!$store.state.loginStatus">
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
            <div class='tt-is-login' v-show="$store.state.loginStatus">
                <div class="exit-login">
                    <span @click="exitLogin">退出登录</span>
                </div>
                <div class="user-info">
                    <div class="user-avator" @click="$router.push('userCenter')">
                        <img :src="$store.state.userInfo.avator" alt="">
                    </div>
                    <div class="user-name">{{$store.state.userInfo.nickname}}</div>
                    <div class="user-upload-content">
                        <div class="user-toutiao">
                            <span class="count">{{$store.state.userInfo.tt_count}}</span>
                            <span class="type">头条数</span>
                        </div>
                        <div class="user-article">
                            <span class="count">{{$store.state.userInfo.article_count}}</span>
                            <span class="type">文章数</span>
                        </div>
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
    exitLogin: function() {
        this.axios({
            method: 'POST',
            url: "/logout",
        }).then(res => {
            this.$message({
                type: "success",
                message: "退出成功",
            })
            this.$store.commit({
                type: "exitLogin"
            })
        });
    },
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    if(localStorage["userInfo"]) {
        this.$store.state.userInfo = JSON.parse(localStorage["userInfo"]);
        this.$store.state.loginStatus = true;
    }
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
            margin: 5px 0;
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
            margin: 15px 0;
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
                    border: 2px solid #aeabab;
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

        .tt-is-login {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            background-color: white;

            .exit-login {
                flex: 5%;
                padding: 5px;
                font-size: 14px;
                text-align: right;
                color: #a4a4a4;
                transition: all ease-in-out .3s;

                &:hover {
                    color: black;
                }
                
                span {
                    cursor: pointer;
                }
            }

            .user-info {
                flex: 95%;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;

                & > div {
                    margin: 5px 0;
                }

                .user-avator {
                    width: 64px;
                    height: 64px;
                    border-radius: 50%;
                    overflow: hidden;
                    cursor: pointer;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }

                .user-upload-content {
                    display: flex;
                    align-items: center;
                    flex: 1;
                    width: 100%;

                    .count {
                        font-size: 25px;
                        font-weight: bold;
                    }
                    
                    .user-toutiao {
                        position: relative;
                        flex: 1;
                        display: flex;
                        flex-direction: column;

                        &::after {
                            content: "";
                            position: absolute;
                            top: 50%;
                            right: 0;
                            display: inline-block;
                            height: 70%;
                            border: 1px solid black;
                            transform: translateY(-50%);
                        }
                    }

                    .user-article {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                    }
                }
            }
        }
    }
</style>