<template>
    <div class='tt-user-center'>
        <div class="user-center-header">
            <span @click="$router.push('/')">今日头条</span>
        </div>
        <div class="user-center-main-container">
            <div class="user-center-main">
                <div class="user-info-header">
                    <div class="user-info-background"></div>
                    <div class="user-info-myself"></div>
                    <div class="user-info-detail">
                        <div class="user-avator">
                            <img :src="$store.state.userInfo.avator" alt="">
                        </div>
                        <span class="user-name">{{$store.state.userInfo.nickname}}</span>
                        <div class="user-editor" @click="$router.push('/userData')"></div>
                    </div>
                </div>
                <div class="user-upload-container">
                    <div class="user-upload-left">
                        <el-tabs v-model="activeName" @tab-click="handleClick">
                            <el-tab-pane label="文章" name="wz">
                                <div class="articles-container">
                                    <ul>
                                        <li class="articles-item" v-for="e ,i in userArticleData">
                                            <div class="item-top" @click="viewArticle(e.nid)">
                                                <span class="item-title">{{e.title}}</span>
                                            </div>
                                            <div class="item-center">
                                                <span>{{e.created_at}}</span>
                                            </div>
                                            <div class="item-bottom" v-html="e.content"></div>
                                            <div class="item-operate" @click="dropArticle(i ,e.nid ,'wz')">
                                                <div class="icon-drop"></div>
                                                <span>删除</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="微头条" name="tt">
                                <div class="articles-container">
                                    <ul>
                                        <li class="articles-item" v-for="e ,i in userToutiaoData">
                                            <div class="item-top" @click="viewArticle(e.nid)">
                                                <span class="item-title">{{e.title}}</span>
                                            </div>
                                            <div class="item-center">
                                                <span>{{e.created_at}}</span>
                                            </div>
                                            <div class="item-bottom">{{e.content}}</div>
                                            <div class="item-operate" @click="dropArticle(i ,e.nid ,'tt')">
                                                <div class="icon-drop"></div>
                                                <span>删除</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                    <div class="user-upload-right">
                        <div class="user-upload-count">
                                <div class="user-upload-toutiao">
                                    <span class="count">{{$store.state.userInfo.tt_count}}</span>
                                    <span class="type">头条数</span>
                                </div>
                                <div class="user-upload-article">
                                    <span class="count">{{$store.state.userInfo.article_count}}</span>
                                    <span class="type">文章数</span>
                                </div>
                        </div>
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
    activeName: "wz",
    userArticleData: [],
    userToutiaoData: [],
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
    viewArticle: function(id) {
        this.$router.push({
            name: "detail",
            params: {
                id
            }
        })
    },
    dropArticle: function(index ,id ,type) {
        let dataArr;
        let func;
        switch(type) {
            case "wz":
                dataArr = this.userArticleData;
                func = "modifyArticleCount";
                break;
            case "tt":
                dataArr = this.userToutiaoData;
                func = "modifyToutiaoCount";
                break;
            default:
                throw new error("unkonw error");
        }
        this.axios({
            method:'post',
            url: "/deleteArticle",
            data: {
                nid: id,
                oauth_token: this.$store.state.userInfo.oauth_token
            }
        }).then(res => {
            if(res.data.msg == "删除成功") {
                this.$message({
                    type: "success",
                    message: res.data.msg
                })
                dataArr.splice(index ,1);
                this.$store.commit({
                    type: func,
                    kind: "reduce"
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
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    this.axios({
        method: 'POST',
        url: "/getArticlesByType",
        data: {
            type: "TT",
            oauth_token: this.$store.state.userInfo.oauth_token
        }
    }).then(res => {
        this.userToutiaoData = res.data.articles;
    });

    this.axios({
        method: 'POST',
        url: "/getArticlesByType",
        data: {
            type: "article",
            oauth_token: this.$store.state.userInfo.oauth_token
        }
    }).then(res => {
        this.userArticleData = res.data.articles;
    })
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
        background-color: white;
        padding: 0 10px;
    }

    /deep/ .el-tabs__active-bar {
        background-color: #e43c46;
    }

    .tt-user-center {
        width: 100%;
        height: 100%;

        .user-center-header {
            width: 100%;
            height: 50px;
            color: #e43c46;
            box-shadow: 2px 0 5px grey;

            span {
                display: inline-flex;
                align-items: center;
                text-align: left;
                width: 60%;
                height: 100%;
                font-size: 30px;
                font-weight: bold;
                cursor: pointer;
                user-select: none;
            }
        }

        .user-center-main-container {
            width: 100%;
            height: auto;
            min-height: 100vh;
            background-color: #f4f5f6;

            .user-center-main {
                margin: 3px auto;
                padding: 10px;
                width: 65%;
                height: 100%;

                .user-info-header {
                    display: flex;
                    flex-direction: column;
                    position: relative;
                    width: 100%;
                    height: 300px;

                    .user-info-background {
                        flex: 65%;
                        background-image: url("../assets/images/bg_profile.png");
                        background-repeat: no-repeat;
                        background-size: cover;
                        background-position: center;
                    }

                    .user-info-myself {
                        flex: 35%;
                        background-color: white;
                    }

                    .user-info-detail {
                        position: absolute;
                        left: 2%;
                        bottom: 5%;
                        display: flex;
                        align-items: flex-end;

                        & > * {
                            margin: 0 5px;
                        }

                        .user-avator {
                            width: 128px;
                            height: 128px;
                            border-radius: 50%;
                            overflow: hidden;

                            img {
                                width: 100%;
                                height: 100%;
                            }
                        }

                        .user-name {
                            margin: 20px 10px;
                            font-size: 30px;
                            font-weight: bold;
                        }

                        .user-editor {
                            margin: 20px 10px;
                            width: 36px;
                            height: 36px;
                            background-color: #5b99fe;
                            border-radius: 50%;
                            background-image: url("../assets/images/modify.png");
                            background-repeat: no-repeat;
                            background-size: 50%;
                            background-position: center;
                            cursor: pointer;
                            transition: all ease-in-out .3s;

                            &:hover {
                                background-color: #76aefe;
                            }
                        }
                    }
                }

                .user-upload-container {
                    display: flex;
                    justify-content: space-between;
                    margin: 20px 0;
                    width: 100%;
                    height: 100%;

                    .user-upload-left {
                        width: 69%;
                        height: 100%;

                        .articles-container {
                            width: 100%;
                            // height: 400px;

                            ul {
                                width: 100%;
                                height: 100%;

                                .articles-item {
                                    display: flex;
                                    flex-direction: column;
                                    position: relative;
                                    padding: 5px;
                                    width: 100%;
                                    height: 130px;
                                    text-align: left;
                                    background-color: white;
                                    border-bottom: 1px solid #dddddd;
                                    border-radius: 3px;
                                    user-select: none;

                                    & > div {
                                        flex: 1;
                                        padding: 0 10px;
                                    }

                                    .item-top {
                                        font-size: 30px;
                                        font-weight: bold;
                                    }

                                    .item-center {
                                        font-size: 15px;
                                    }

                                    &:hover .item-operate {
                                        visibility: visible;
                                        opacity: 1;
                                    }

                                    .item-operate {
                                        display: flex;
                                        align-items: center;
                                        position: absolute;
                                        visibility: hidden;
                                        opacity: 0;
                                        bottom: 10px;
                                        right: 5px;
                                        width: 80px;
                                        height: 30px;
                                        transition: all ease-in-out .1s;
                                        cursor: pointer;

                                        .icon-drop {
                                            width: 16px;
                                            height: 16px;
                                            background-image: url("../assets/images/drop.png");
                                            background-repeat: no-repeat;
                                            background-size: contain;
                                        }
                                    }
                                }
                            }
                        }
                    }

                    .user-upload-right {
                        width: 30%;
                        height: 100%;

                        .user-upload-count {
                            display: flex;
                            align-items: center;
                            width: 100%;
                            height: 100px;
                            background-color: white;

                            & > div {
                                display: flex;
                                flex-direction: column;
                                flex: 1;
                            }

                            .user-upload-toutiao {
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
                                    border: 1px solid #e8e8e8;
                                    transform: translateY(-50%);
                                }
                            }

                            .count {
                                font-size: 30px;
                                font-weight: bold;
                            }

                            .type {
                                font-size: 15px;
                                color: grey;
                            }
                        }
                    }
                }
            }
        }
    }
</style>