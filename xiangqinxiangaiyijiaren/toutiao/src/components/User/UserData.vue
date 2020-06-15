<template>
    <div class="body">
        <div class="userData">
            <header>
                <div class="l" @click='goIndex'>头条号</div>
                <div class="r">
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            <img :src="userinfo.avator" />
                            <span>{{userinfo.nickname}}</span>
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>
                                <span @click="logOut">退出登录</span>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </header>
        </div>
        <div class="main">
            <el-tabs class="box" value="admin">
                <el-tab-pane label="账户信息" name="admin" class="admin">
                    <div class="name">
                        <span>名称</span>
                        <input type="text" v-model="username" />
                    </div>
                    <div class="pic">
                        <span>头像</span>
                        <el-upload action="http://tt.linweiqin.com/api/tt/aliossUpload" :show-file-list="false"
                            :http-request="uploadImg" :on-success="uploadImgSuccess" :before-upload="beforeAvatarUpload"
                            style="text-indent: 0;display: inline-block;" accept='.jpg,.png'>
                            <img v-if="avator" :src="avator" class="avatar" style="width: 170px;" />
                        </el-upload>
                    </div>
                    <div>
                        <el-button class="updata" type="primary" @click="updataUser">更新资料</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="密码管理" name="pass" class="admin">
                    <div class="oldp">
                        <span>旧密码</span>
                        <input type="password" v-model="oldpass" />
                    </div>
                    <div class="newp">
                        <span>新密码</span>
                        <input type="password" v-model="newpass" />
                    </div>
                    <div>
                        <el-button class="updata" type="primary" @click="updataPass">更新资料</el-button>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import {
        mapState
    } from "vuex";
    import {
        mapMutations
    } from "vuex";
    export default {
        computed: {
            ...mapState(["userinfo"])
        },
        data() {
            return {
                username: "",
                avator: "",
                oldpass: "",
                newpass: ""
            };
        },
        mounted() {
            this.username = this.userinfo.nickname;
            this.avator = this.userinfo.avator;
        },
        methods: {
            ...mapMutations(["updateUserInfo", "logout"]),
            uploadImgSuccess(response) {
                if (!response.ret) {
                    this.avator = response.url;
                }
            },
            uploadImg(f) {
                let param = new FormData();
                param.append("file", f.file);
                this.$axios
                    .post(f.action, param)
                    .then(response => {
                        if (response.ret == 0) {
                            response.status = "success";
                            f.onSuccess(response);
                        } else {
                            response.status = "fail";
                            f.onFail(response);
                        }
                    })
            },
            beforeAvatarUpload(file) {
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    this.$message.error("上传头像图片大小不能超过 2MB!");
                }
                return isLt2M;
            },

            updataUser() {
                if (
                    this.username === this.userinfo.nickname &&
                    this.avator === this.userinfo.avator
                )
                    return;

                let param = new FormData();
                param.append("nickname", this.username);
                param.append("avator", this.avator);
                param.append("oauth_token", this.userinfo.oauth_token);

                let newUserInfo = Object.assign(this.userinfo, {
                    nickname: this.username,
                    avator: this.avator
                });
                this.$axios.post("updateUserInfo", param).then(res => {
                    if (res.ret) {
                        this.$message({
                            type: "error",
                            message: res.msg
                        });
                        this.updateUserInfo(newUserInfo);
                    } else {
                        this.$message({
                            type: "success",
                            message: res.msg
                        });
                    }
                });
            },
            updataPass() {
                if (!this.newpass || !this.oldpass) return;
                let param = new FormData();
                param.append("currentPassword", this.oldpass);
                param.append("updatePassword", this.newpass);
                param.append("oauth_token", this.userinfo.oauth_token);
                this.$axios.post("/updatePassword", param).then(res => {
                    let type = res.ret?"error":"success"
                        this.$message({
                            type,
                            message: res.msg
                        });
                });
            },
            logOut() {
                this.$axios.post("/logout").then(() => {
                    this.logout();
                    this.$router.replace("/");
                });
            },
            goIndex(){
                this.$router.push('/')
            }
        }
    };
</script>

<style lang='less' scoped>
    .body {
        width: 100vw;

        .userData {
            box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.12);

            header {
                display: flex;
                width: 1180px;
                min-width: 1180px;
                margin: auto;
                justify-content: space-between;
                align-items: center;
                height: 60px;

                .l {
                    color: transparent;
                    width: 75px;
                    height: 100%;
                    background-image: url(//sf1-ttcdn-tos.pstatp.com/obj/ttfe/pgcfe/sz/mp-logo-toutiaohao.svg);
                    background-repeat: no-repeat;
                    background-size: contain;
                    background-position: center;
                }

                .r {
                    .el-dropdown-link {
                        img {
                            width: 30px;
                            height: 30px;
                            border-radius: 50%;
                            vertical-align: middle;
                            margin: 0 10px;
                        }
                    }
                }
            }
        }

        .main {
            width: 1180px;
            margin: 50px auto;
            text-indent: 12px;

            .el-tabs__active-bar.is-top {
                background-color: red;
                width: 58px;
                margin-left: 17px;
            }

            .admin {
                margin-left: 30px;

                span {
                    margin-right: 10px;
                }

                input {
                    box-sizing: border-box;
                    padding-left: 20px;
                }
            }

            .name {
                margin-top: 10px;
                color: #8d8e91;
                font-size: 14px;

                input {
                    width: calc(100% - 69px);
                    height: 40px;
                    border: 1px solid #dddfe6;
                    border-radius: 5px;
                }
            }

            .pic {
                margin: 30px 0;
                color: #8d8e91;
                font-size: 14px;

                img {
                    vertical-align: top;
                    border-radius: 5px;
                    border: 1px dashed #d9d9d9;
                    box-sizing: border-box;
                }
            }

            .updata {
                margin-left: 38px;
            }

            .newp,
            .oldp {
                margin-top: 10px;
                color: #8d8e91;
                font-size: 14px;

                input {
                    width: calc(100% - 71px);
                    height: 40px;
                    border: 1px solid #dddfe6;
                    border-radius: 5px;
                }
            }

            .newp {
                margin-bottom: 20px;
            }
        }
    }
</style>