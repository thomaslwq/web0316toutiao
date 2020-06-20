<template>
    <div class="main-container">
    <Header></Header>
    <div class='main'>
        <div class="main-left">
            <Nav></Nav>
        </div>
        <div class="main-center">
            <el-alert class="login-success" v-show="loginSuccessTips" title="欢迎回来" type="success" show-icon></el-alert>
            <div class="comment-input-container">
                <Comment></Comment>
            </div>
            <div class="article-list-container">
                <ArticleList></ArticleList>
            </div>
        </div>
        <div class="main-right">
            <div class="search-container">
                <Search></Search>
            </div>
            <div class="login-container">
                <Login></Login>
            </div>
            <div class="more-container">
                <More></More>
            </div>
            <div class="friends-link">
                <Friendslink></Friendslink>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Nav from "./nav/Nav.vue"
import Header from "./header/Header.vue"
import Search from "./search/Search.vue"
import Comment from "./comment/Comment.vue"
import ArticleList from "./articleList/ArticleList.vue"
import Login from "./login/Login.vue"
import More from "./more/More.vue"
import Friendslink from "./friendslink/Friendslink.vue"
import { VueEditor } from "vue2-editor";

export default {
//import引入的组件需要注入到对象中才能使用
components: {
    Nav,
    Header,
    Search,
    Comment,
    ArticleList,
    Login,
    More,
    Friendslink,
    VueEditor
},
data: function() {
//这里存放数据
    return {
        loginSuccessTips: false,
        flag: true,
        currentPage: 1
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
    loginSuccess: function() {
        this.loginSuccessTips = true;
        setTimeout(() => {
            this.loginSuccessTips = false;
        } ,3000)
    },
    scrollToBottom: function() {
        let webTotalHeight = document.body.scrollHeight;
        let clientHeight = document.documentElement.clientHeight;
        if(document.documentElement.scrollTop == webTotalHeight - clientHeight && this.flag) {
            this.flag = false;
            this.$message({
                type: "success",
                message: "请求成功"
            })
            this.axios({
                method: 'POST',
                url: "/getArticles",
                data: {
                    type: "TT",
                    page: this.currentPage++,
                    number: 20
                }
            }).then(res => {
                this.$store.commit({
                    type: "appendArticle",
                    arr: res.data.articles
                })
            })
            setTimeout(() => {
                this.flag = true;
            } ,3000)
        }
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    if(this.$store.state.loginStatus){
        this.loginSuccess();
    }
    window.addEventListener("scroll" ,this.scrollToBottom);
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
    window.removeEventListener("scroll" ,this.scrollToBottom);
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

.main {
    display: flex;
    width: 100%;
    height: 100%;

    .main-left {
        padding: 0 10px;
        display: flex;
        justify-content: flex-end;
        flex: 20%;
    }

    .main-center {
        position: relative;
        flex: 50%;
        margin: 10px 0;
        padding: 0 50px;

        .login-success {
            position: absolute;
            top: 0;
            left: 50%;
            width: 50%;
            transform: translateX(-50%);
        }

        .comment-input-container {
            width: 100%;
            height: auto;
            border: 1px solid #e8e8e8;
        }

        .article-list-container {
            margin: 15px 0;
            width: 100%;
            height: 600px;
        }
    }

    .main-right {
        flex: 30%;

        .search-container {
            margin: 10px 0;
            width: 70%;
            height: 50px;
            border: 1px solid grey;
            border-radius: 5px;
            overflow: hidden;
        }

        .login-container {
            margin: 10px 0;
            padding: 20px;
            width: 70%;
            height: 250px;
            background-color: #f4f5f6;
        }

        .more-container {
            margin: 10px 0;
            width: 70%;
            height: 220px;
        }

        .friends-link {
            margin: 10px 0;
            width: 70%;
            height: 220px;
        }
    }
}
</style>