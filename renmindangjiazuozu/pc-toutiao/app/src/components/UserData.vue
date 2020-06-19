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
                    <span @click="exitLogin">退出登录</span>
                </div>
            </div>
        </div>
        <div class="user-center-main">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="账户信息" name="account">
                    <div class="user-account">
                        <div class="user-nickname">
                            <div class="left">
                                <span>名称</span>
                            </div>
                            <div class="right">
                                <input type="text" v-model="currentNickName">
                            </div>
                        </div>
                        <div class="upload-avator">
                            <div class="left">
                                <span>头像</span>
                            </div>
                            <div class="right">
                                <div class="user-avator" :style="{'background-image': `url(${userUploadAvator})`}">
                                    <input type="file" accept=".jpg ,.png" @change="uploadImg">
                                </div>
                            </div>
                        </div>
                        <div class="upload-info-button">
                            <div class="left"></div>
                            <div class="right">
                                <button @click="updateUserInfo">更新资料</button>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="密码管理" name="password">
                    <div class="password-management">
                        <div class="current-password">
                            <div class="left">
                                <span>当前密码</span>
                            </div>
                            <div class="right">
                                <input type="password" v-model="currentPassword">
                            </div>
                        </div>
                        <div class="new-password">
                            <div class="left">
                                <span>新密码</span>
                            </div>
                            <div class="right">
                                <input type="password" v-model="newPassword">
                            </div>
                        </div>
                        <div class="upload-info-button">
                            <div class="left"></div>
                            <div class="right">
                                <button @click="updatePassword">更新资料</button>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
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
    activeName: "account",
    userUploadAvator: "",
    currentNickName: "",
    currentPassword: "",
    newPassword: "",
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
    handleClick(tab, event) {
    },
    uploadImg: function(e) {
        Array.from(e.target.files).forEach(item => {
            let params = new FormData();
            params.append("file", item);
    
            this.axios({
                method: "POST",
                url: "/aliossUpload",
                data: params
            }).then(res => {
                this.userUploadAvator = res.data.url;
            })
        })
    },
    updateUserInfo: function() {
        if(!this.currentNickName){
            this.$message({
                type: "warning",
                message: "不能为空"
            })
        }
        else {
            this.axios({
                method: 'POST',
                url: "/updateUserInfo",
                data: {
                    nickname: this.currentNickName,
                    avator: this.userUploadAvator,
                    oauth_token: this.$store.state.userInfo.oauth_token
                }
            }).then(res => {
                if(res.data.msg === "修改成功") {
                    this.$message({
                        type: "success",
                        message: res.data.msg
                    })
                    this.$store.commit({
                        type: "updateUserInfo" ,
                        params: {
                            nickname: this.currentNickName.trim(),
                            url: this.userUploadAvator,
                        }
                    })
                    this.$router.push("/");
                }
                else {
                    this.$message({
                        type: "warning",
                        message: "修改失败"
                    })
                }
            })
        }
    },
    updatePassword: function() {
        if(!this.currentPassword || !this.updatePassword){
            this.$message({
                    type: "warning",
                    message: "不能为空"
            })
        }
        else {
            this.axios({
                method: 'POST',
                url: "/updatePassword",
                data: {
                    currentPassword: this.currentPassword.trim(),
                    updatePassword: this.newPassword.trim(),
                    oauth_token: this.$store.state.userInfo.oauth_token
                }
            }).then(res => {
                if(res.data.msg === "修改成功") {
                    this.$message({
                        type: "success",
                        message: res.data.msg
                    })
                }
                else {
                    this.$message({
                        type: "warning",
                        message: res.data.msg
                    })
                }
            })
        }
    },
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
            this.$router.push("/")
        });
    },
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    this.currentNickName = this.$store.state.userInfo.nickname;
    this.userUploadAvator = this.$store.state.userInfo.avator;
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
    /deep/ .el-tabs__nav-scroll {
        padding: 0 10px;
    }

    /deep/ .el-tabs__active-bar {
        background-color: #e43c46;
    }

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
                    right: 0;
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
                    display: flex;
                    flex-direction: column;
                    position: absolute;
                    top: 100%;
                    visibility: hidden;
                    opacity: 0;
                    width: 100%;
                    height: 100%;
                    background-color: white;
                    box-shadow: 1px 1px 5px #d2d0d0;
                    transition: all ease-in-out .2s;

                    span {
                        flex: 1;
                        height: 100%;
                        padding: 10px 0;
                        cursor: pointer;
                    }
                }
            }

        }

        .user-center-main {
            margin: 20px auto;
            width: 80%;
            height: 800px;

            .user-account {
                display: flex;
                flex-direction: column;
                width: 100%;
                height: 280px;

                .upload-avator {
                    .right {
                        .user-avator {
                            width: 150px;
                            height: 150px;
                            border: 1px dashed black;
                            border-radius: 5px;
                            background-repeat: no-repeat;
                            background-size: contain;
                        }

                        input {
                            width: 100%;
                            height: 100%;
                            opacity: 0;
                            cursor: pointer;
                        }
                    }
                }

                & > div {
                    display: flex;
                    flex: 1;

                    .left {
                        display: flex;
                        justify-content: flex-end;
                        align-items: center;
                        flex: 0 1 100px;
                        padding-right: 20px;
                        color: #7a7c7f;
                    }

                    .right {
                        display: flex;
                        align-items: center;
                        flex: 1 0 80%;
                        width: 80%;
                        height: 100%;

                        input {
                            padding: 0 10px;
                            font-size: 20px;
                            width: 100%;
                            height: 75%;
                            border: 2px solid #dddfe6;
                            border-radius: 5px;
                        }

                        button {
                            width: 105px;
                            height: 75%;
                            color: white;
                            background-color: #5b99fe;
                            border: none;
                            border-radius: 5px;
                            overflow: hidden;
                            outline: none;
                            cursor: pointer;
                            transition: all ease-in-out .3s;

                            &:hover {
                                background-color: #76aefe;
                            }
                        }
                    }
                }
            }

            .password-management {
                display: flex;
                flex-direction: column;
                width: 100%;
                height: 200px;

                & > div {
                    display: flex;
                    flex: 1;

                    .left {
                        display: flex;
                        justify-content: flex-end;
                        align-items: center;
                        flex: 0 1 100px;
                        padding-right: 20px;
                        color: #7a7c7f;
                    }

                    .right {
                        display: flex;
                        align-items: center;
                        flex: 1 0 80%;
                        width: 80%;
                        height: 100%;

                        input {
                            padding: 0 10px;
                            font-size: 20px;
                            width: 100%;
                            height: 75%;
                            border: 2px solid #dddfe6;
                            border-radius: 5px;
                        }

                        button {
                            width: 105px;
                            height: 75%;
                            color: white;
                            background-color: #5b99fe;
                            border: none;
                            border-radius: 5px;
                            overflow: hidden;
                            outline: none;
                            cursor: pointer;
                            transition: all ease-in-out .3s;

                            &:hover {
                                background-color: #76aefe;
                            }
                        }
                    }
                }
            }
        }
    }

</style>