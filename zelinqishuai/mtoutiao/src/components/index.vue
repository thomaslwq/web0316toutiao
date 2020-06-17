<!--  -->
<template>
<div class='mToutiao'>
    <Search></Search>
    <Navs></Navs>
    <NewsList></NewsList>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
//搜索栏
import Search from '../components/search/Search'
//导航栏
import Navs from '../components/nav/Nav'
//新闻
import NewsList from '../components/newsList/NewsList'
export default {
//import引入的组件需要注入到对象中才能使用
components: {
    Search,
    Navs,
    NewsList
},
data() {
//这里存放数据
return {
    page:1
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    getNews(){
        let scrollTop = document.documentElement.scrollTop;
        let scrollHeight = document.documentElement.scrollHeight;
        let cHeight = document.documentElement.clientHeight
        console.log(scrollTop);
        console.log(scrollHeight);
        console.log(cHeight);
        if(scrollTop === scrollHeight - cHeight ){
             console.log('触发了');
             console.log(this.page);
            this.$axios.post('/getArticles',{
             type:'TT',
            page:this.page,
            number:15
            }).then(res => {
                console.log('进来了');
                if(res.ret === 0){
                    this.page++
                    let arr = res.articles
                    arr.map(item => {
                        if(item.imgs){
                        item.imgs  = item.imgs.split(',')
                        }
                    });
                    this.$store.state.news.push(...arr) 
                    // console.log(arr);
                    this.$Message({msg:res.msg})
                }else{
                    this.$Message({msg:res.msg})
                }
            }).catch(err=>{
                console.log('加载失败');
                return Promise.reject(err)
            })
        }
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    // this.getNews()
    window.addEventListener('scroll',this.getNews)
   
},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {
    window.removeEventListener('scroll',this.getNews)
}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' scoped>
    .mToutiao{
        height: 100vh;
    }
</style>