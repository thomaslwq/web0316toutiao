<template>
    <div class="container">
        <div class="header">
            <span @click="$router.push('index')">今日头条</span>
        </div>
        <div class="vertical-text"></div>
        <div class="register-model">
            <el-alert class="tips" v-show="tipsStatus" :title="tipsMsg" :type="tipsType" show-icon></el-alert>
            <div class="register-main">
                <div class="main-title">账密注册</div>
                <div class="main-email">
                    <input type="text" v-model="username" placeholder="账号 / 邮箱">
                </div>
                <div class="main-password">
                    <input type="password" v-model="password" @keyup.enter="submitRegister" placeholder="密码">
                </div>
                <div class="main-confirm" @click="submitRegister"></div>
            </div>
            <div class="register-other">
                <div class="user-agreement">
                    <span>
                        注册/登录即表示你同意
                        <a href="https://www.toutiao.com/user_agreement/" target="_blank">用户协议</a>
                        和
                        <a href="https://www.toutiao.com/privacy_protection/" target="_blank">隐私条款</a>
                    </span>
                </div>
                <div class="login-model">
                    <router-link to="login">登录</router-link>
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
    username: "",
    password: "",
    tipsType: "",
    tipsMsg: "",
    tipsStatus: false,
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
    check: function(msg) {
        let type = "";
        switch(msg) {
            case "注册成功":
                type = "success";
                break;

            case "该账号已经存在":
                type = "error";
                break;

            case "帐密不能为空":
                type = "warning"
                break;

            default:
                type = "error";
                msg = "unknow error";
        }

        this.tipsType = type;
        this.tipsMsg = msg;
        this.tipsStatus = true;

        if(type == "success") {
            setTimeout(() => {
                this.$router.push("/login")
            } ,2500)
            return
        }

        setTimeout(() => {
            this.tipsStatus = false;
        } ,2500)
    },
    submitRegister: function() {
        this.axios({
            method: "POST",
            url: "/createUser",
            data: {
                username: this.username,
                password: this.password
            }
        }).then(({data}) => {
            this.check(data.msg);
        })
    }
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
    /deep/ .el-alert__title {
        font-size: 20px;
        line-height: 28px;
    }

    /deep/ .el-alert__icon {
        font-size: 20px;
        width: 20px;
    }

    /deep/ .el-alert__closebtn {
        font-size: 20px;
    }

    .container {
        position: relative;
        display: flex;
        justify-content: center;
        width: 100%;
        height: 100vh;
        background-image: url("../assets/images/login_bg.png");
        .header {
            position: absolute;
            padding: 10px;
            width: 100%;
            text-align: left;
            font-size: 30px;
            font-weight: bold;
            color: #e43c46;

            span {
                user-select: none;
                cursor: pointer;
            }
        }
        .vertical-text {
            width: 100%;
            height: 200px;
            background-image: url("../assets/images/login_bg_font.png");
            background-repeat: no-repeat;
            background-size: 35%;
            background-position: top;
        }

        .register-model {
            position: absolute;
            top: 250px;
            display: flex;
            flex-direction: column;
            width: 400px;
            height: 300px;

            .tips {
                position: absolute;
                top: -12%;
            }

            .register-main {
                flex: 90%;
                display: flex;
                flex-direction: column;
                padding: 10px 25px;
                border-radius: 5px;
                background-color: white;
                & > div {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                input {
                    padding: 0 10px;
                    width: 100%;
                    height: 100%;
                    border: none;
                    outline: none;
                    font-size: 20px;
                    color: #9d9d9d;
                    border: 1px solid #d9d9d9;
                    border-radius: 5px;
                }

                .main-title {
                    flex: 20%;
                    font-size: 20px;
                    color: black;
                    border-bottom: 1px solid #d9d9d9;
                }

                .main-email ,.main-password{
                    margin: 5px 0;
                    padding: 10px 0;
                    flex: 30%;
                }

                .main-confirm {
                    position: relative;
                    flex: 20%;
                    background-color: #ef565e;
                    border-radius: 10px;
                    border: none;
                    outline: none;
                    transition: all ease-in-out .3s;
                    cursor: pointer;

                    &::after {
                        content: "确认";
                        position: absolute;
                        display: inline-block;
                        font-size: 20px;
                        color: white;
                    }

                    &:hover {
                    transform: scale(1.01);
                }
                }
            }

            .register-other {
                flex: 10%;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 14px;
                color: grey;

                a {
                    color: #5a72a1;
                }

                .user-agreement {
                    flex: 80%;
                }

                .login-model {
                    flex: 20%;
                }
            }
        }
    }
</style>