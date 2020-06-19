<template>
    <div class='tt-detail'>
        <div class="detail-header">
            <div class="detail-header-left">
                <span @click="$router.push('/')">今日头条</span>
            </div>
            <div class="detail-header-right">
                <Search></Search>
            </div>
        </div>
        <div class="detail-content">
            <div class="detail-content-left">
                <ul class="share-to">
                    <li>
                        <div class="icon zhuanfa"></div>
                        <span>转发</span>
                    </li>
                    <li>
                        <div class="icon weibo"></div>
                        <span>微博</span>
                    </li>
                    <li>
                        <div class="icon weixin"></div>
                        <span>微信</span>
                    </li>
                    <li>
                        <div class="icon qzone"></div>
                        <span>Qzone</span>
                    </li>
                </ul>
            </div>
            <div class="detail-content-center">
                <div class="detail-article-container">
                    <div class="article-title">
                        <span>{{articleDetail.title}}</span>
                    </div>
                    <div class="article-upload-info">
                        <span class="user-nickname">{{articleDetail.n_user.nickname}}</span>
                        <span class="upload-date">{{articleDetail.created_at}}</span>
                    </div>
                    <div class="article-content" v-html="articleDetail.content"></div>
                    <div class="article-operate">
                        <div class="collection">
                            <img src="../assets/images/collection.png" alt="">
                            <span>收藏</span>
                        </div>
                        <div class="report">
                            <img src="../assets/images/report.png" alt="">
                            <span>举报</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="detail-content-right">
                <div class="user-info">
                    <div class="user-avator">
                        <img :src="articleDetail.n_user.avator" alt="">
                    </div>
                    <span class="user-nickname">{{articleDetail.n_user.nickname}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Search from "./search/Search"
export default {
//import引入的组件需要注入到对象中才能使用
components: {
    Search
},
data() {
//这里存放数据
return {
    articleDetail: [],
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
    this.axios({
        method: "POST",
        url: "/getArticleById",
        data: {
            nid: this.$router.currentRoute.params.id
        }
    }).then(res => {
        if(res.data.msg == "获取成功") {
            this.articleDetail = res.data.article
        }
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
    .tt-detail {
        width: 100%;
        height: 100vh;

        .detail-header {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 50px;
            color: #e43c46;
            box-shadow: 2px 0 5px grey;

            .detail-header-left {
                display: inline-flex;
                align-items: center;
                text-align: left;
                width: 50%;
                height: 100%;
                span {
                    font-size: 30px;
                    font-weight: bold;
                    cursor: pointer;
                    user-select: none;
                }
            }

            .detail-header-right {
                width: 20%;
                height: 40px;
                border: 1px solid grey;
                border-radius: 5px;
                overflow: hidden;
            }
        }

        .detail-content {
            margin: 0 auto;
            width: 70%;
            height: 100%;
            display: flex;

            & > div {
                padding: 20px 0;
            }

            .detail-content-left {
                flex: 11%;

                .share-to {
                    width: 100%;
                    height: 100%;

                    li {
                        display: flex;
                        align-items: center;
                        margin: 10px 0;

                        .icon {
                            margin: 0 10px;
                            width: 32px;
                            height: 32px;
                            border-radius: 5px;
                            background-repeat: no-repeat;
                            background-size: contain;
                        }

                        .zhuanfa {
                            background-image: url("../assets/images/img.png");
                        }

                        .weibo {
                            background-image: url("../assets/images/weibo.png");
                            background-color: #f6653a;
                        }

                        .weixin {
                            background-image: url("../assets/images/wx-icon.png");
                        }

                        .qzone {
                            background-image: url("../assets/images/qzone.png");
                            background-color: #f8bf28;
                        }
                    }
                }
            }

            .detail-content-center {
                flex: 68%;

                .detail-article-container {
                    padding: 0 10px;
                    width: 100%;
                    text-align: left;

                    & > div {
                        margin: 5px 0;
                    }

                    .article-title {
                        width: 100%;
                        height: 50px;
                        font-size: 30px;
                        font-weight: bold;
                    }

                    .article-upload-info {
                        width: 100%;
                        height: 25px;
                        font-size: 14px;
                        color: #a1a1a1;

                        span {
                            margin: 0 5px;
                        }
                    }

                    .article-content {
                        margin: 15px 0;
                    }

                    .article-operate {
                        display: flex;
                        justify-content: flex-end;
                        width: 100%;
                        height: 30px;
                        text-align: right;

                        & > div {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            margin: 0 10px;
                            width: 50px;
                            height: 100%;
                        }

                        img {
                            width: 16px;
                            height: 16px;
                        }

                        span {
                            font-size: 14px;
                            color: #919191;
                            cursor: pointer;
                        }
                    }
                }
            }

            .detail-content-right {
                flex: 31%;

                .user-info {
                    display: flex;
                    align-items: center;
                    padding: 0 10px;
                    width: 100%;
                    height: 100px;
                    background-color: #f4f5f6;
                    border-top: 2px solid #e43c46;

                    & > * {
                        margin: 0 5px;
                    }

                    .user-avator {
                        width: 64px;
                        height: 64px;
                        border-radius: 50%;
                        overflow: hidden;

                        img {
                            width: 100%;
                            height: 100%;
                            background-repeat: no-repeat;
                            background-size: contain;
                        }
                    }

                    span {
                        font-size: 20px;
                        font-weight: bold;
                    }
                }
            }
        }
    }
</style>