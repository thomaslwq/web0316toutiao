<template>
    <div class='tt-article-list'>
        <transition name="el-fade-in-linear">
            <div class="refresh-button" v-show="true" @click="refreshList() ;getNewsList()">
                <span>点击刷新</span>
                <div :class="{stop :!isLoadingplay}"></div>
            </div>
        </transition>
        <div class="article-list">
            <div class="article-list-item" v-for="e in articleData">
                <div class="article-item-left" v-show="e.img">
                    <img :src="e.img" alt="">
                </div>
                <div class="article-item-right">
                    <div class="article-item-right-top">
                        <span>{{e.title}}</span>
                    </div>
                    <div class="article-item-right-bottom">
                        <div class="article-item-avator">
                            <img :src="e.user.avator" alt="">
                        </div>
                        <div class="article-item-author">
                            <span>{{e.user.nickname}}</span>
                        </div>
                        <div class="article-item-date">{{e.created_at}}</div>
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
    isLoadingplay: false,
    articleData: [],
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
    refreshList: function() {
        this.isLoadingplay = !this.isLoadingplay;
    },
    getNewsList: function() {
        this.axios({
            method: 'POST',
            url: "/getArticles",
            data: {
                type: "TT",
                page: 0,
                number: 20
            }
        }).then(res => {
            this.articleData = res.data.articles;
            this.isLoadingplay = false;
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
    .tt-article-list {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        .refresh-button {
            flex: 5%;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 30px;
            font-size: 20px;
            color: #7eb4e4;
            background-color: #eff6fc;
            border: 1px solid #93c1e8;
            border-radius: 5px;
            user-select: none;
            cursor: pointer;
            transition: all ease-in-out .3s;

            &:hover {
                background-color: #d7e9f7;
                color: #3e54af
            }

            div {
                background-image: url("../../assets/images/refresh.png");
                background-repeat: no-repeat;
                background-size: contain;
                width: 20px;
                height: 20px;
                animation: iconrotate 2s ease-in-out infinite;

                &.stop {
                    animation-play-state: paused;
                }
            }

        }

        .article-list {
            flex: 95%;
            display: flex;
            flex-direction: column;
            .article-list-item {
                display: flex;
                padding: 10px;
                border-bottom: 1px solid #e8e8e8;
                .article-item-left {
                    flex: 0 1 30%;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .article-item-right {
                    flex: 70%;
                    display: flex;
                    flex-direction: column;
                    padding: 0 10px;
                    font-size: 20px;
                    text-align: left;
                    
                    .article-item-right-top {
                        flex: 1 1 50px;
                        line-height: 50px;
                    }

                    .article-item-right-bottom {
                        flex: 1 1 50px;
                        display: flex;
                        align-items: center;
                        font-size: 15px;

                        & > div {
                            margin: 0 5px;
                        }

                        .article-item-avator {
                            width: 24px;
                            height: 24px;
                            border-radius: 50%;
                            overflow: hidden;

                            img {
                                width: 100%;
                                height: 100%;
                            }
                        }
                    }
                }
            }
        }
    }

    @keyframes iconrotate {
        from {
            transform: rotate(0);
        }

        to {
            transform: rotate(360deg)
        }
    }
</style>