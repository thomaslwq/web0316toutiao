<!--  -->
<template>
<div class='tt'>
    <Header></Header>
    <div class='tt-cotent'>
        <Nav class='tt-nav-left'></Nav>
        <div class='tt-middle'>
            <post></post>
            <message></message>
        </div>
        <div class='tt-right'>
            <div class="searchInput">
                <searchInput></searchInput>
            </div>
            <div class="login">
                <login></login>
            </div>
            <div class="newsList">
                <newsList></newsList>
            </div>
        </div>
    </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Header from '../components/header/Header'
import login from '../components/login/Login'
import Nav from '../components/nav/Nav'
import searchInput from '../components/searchInput/searchInput'
import post from '../components/post/Post'
import message from '../components/message/message'
import newsList from '../components/newsList/NewsList'
export default {
//import引入的组件需要注入到对象中才能使用
components: {
    Header,
    login,
    Nav,
    searchInput,
    post,
    message,
    newsList

},
data() {
//这里存放数据
return {

};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {

},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' scoped>
    .tt{
        .tt-cotent{
            width: 100vw;
             padding: 12px 10vw 10px 15vw;
             display:flex;
             justify-content: space-evenly;
            .tt-nav-left{
               
            }
            .tt-middle{
                
               
            }
            .tt-right{
               
                .searchInput{
                }
                .login{
                    width: 350px;
                    margin: 20px 0;
                    padding: 20px;
                    padding-top: 10px;
                    background-color: #ddd;
                }
                .newsList{
                    
                }
            }
        }
       
    }
</style>