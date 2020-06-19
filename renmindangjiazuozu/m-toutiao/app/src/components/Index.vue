<template>
    <div class='tt-main-container'>
        <div class="tt-header">
            <div class="header-left">
                <i class="iconfont icon-youjian"></i>
            </div>
            <div class="header-center">
                <span>今日头条</span>
            </div>
            <div class="header-right">
                <i class="iconfont icon-search"></i>
            </div>
        </div>
        <div class="tt-navs-bar">
            <div class="navs-bar-content">
                <ul>
                    <li v-for="e in navBarData" :key="e.item">{{e.name}}</li>
                </ul>
            </div>
            <div class="add-navs-button">
                <span>+</span>
            </div>
        </div>
        <div class="tt-news-list">
            <ul>
                <li class="tt-news-item" v-for="e in newsData" :key="e.key">
                    <span class="item-title">{{e.title}}</span>
                    <span class="item-upload-date">{{e.created_at}}</span>
                </li>
            </ul>
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
    navBarData: [
        {
            name: "推荐"
        },
        {
            name: "科技"
        },
        {
            name: "汽车"
        },
        {
            name: "体育"
        },
        {
            name: "时尚"
        },
        {
            name: "养生"
        },
        {
            name: "故事"
        },
    ],
    newsData: []
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
        method: 'POST',
        url: "/getArticles",
        data: {
            type: "TT",
            page: 0,
            number: 10
        }
    }).then(res => {
        this.newsData = res.data.articles;
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
.tt-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    width: 100%;
    height: 50px;
    font-size: 2rem;
    color: white;
    background-color: #ca3c47;

    span {
        font-weight: bold;
    }

    .iconfont {
        font-size: 3rem;
    }
}

.tt-navs-bar {
    display: flex;
    width: 100%;
    height: 30px;
    border-bottom: 1px solid #bab7b7;

    .navs-bar-content {
        height: 100%;
        overflow-x: scroll;
        
        ul {
            display: inline-flex;
            align-items: center;
            white-space: nowrap;
            height: 100%;

            li {
                float: left;
                font-size: 1.5rem;
                margin: 0 15px;
            }
        }

        &::-webkit-scrollbar {
            display: none;
        }
    }

    .add-navs-button {
        display: flex;
        align-items: center ;
        float: right;
        width: 32px;
        height: 100%;
        font-size: 3rem;
        color: #ca3c47;
    }

    
}

.tt-news-list {
    width: 100%;
    height: 400px;

    ul {
        width: 100%;
        height: 100%;

        .tt-news-item {
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 10px;
            width: 100%;
            height: 60px;
            border-bottom: 1px solid #d2d2d2;

            & > span {
                display: flex;
                justify-content: flex-start;
            }

            .item-title {
                font-size: 2rem;
                white-space: nowrap;
                text-overflow: ellipsis;
            }

            .item-upload-date {
                font-size: 1.5rem;
            }
        }
    }
}


</style>