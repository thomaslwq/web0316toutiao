<!--  -->
<template>
<div class='navs'>
    <div class="nav">
         <a href="javascript:;" 
         :class="{active:nav.id === currentId}"
         @click="activTab(nav.id)"
         v-for="nav in navs" 
         :key="nav.id">
        {{nav.title}}
        </a>
    </div>
    <div class="add">+</div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
    navs:[{
        id:'tuijian',
        title:'推荐'
    },{
        id:'shipin',
        title:'视频'
    },{
        id:'redian',
        title:'热点'
    },{
        id:'shehui',
        title:'社会'
    },{
        id:'yule',
        title:'娱乐'
    },{
        id:'junshi',
        title:'军事'
    },{
        id:'keji',
        title:'科技'
    },{
        id:'qiche',
        title:'汽车'
    },{
        id:'fangchan',
        title:'房产'
    },{
        id:'jiaju',
        title:'家居'
    },{
        id:'tiyu',
        title:'体育'
    },{
        id:'caijing',
        title:'财经'
    }],
    currentId:'tuijian'
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    activTab(id){
        this.currentId = id;
        this.$store.state.currentId = id
    }
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
<style lang='less'  scoped>
    .navs{
        height: 4rem;
        line-height: 4rem;
        white-space: nowrap;
        background-color: #f4f5f6;
        position: relative;
       .nav{
           overflow: auto;
            a{
            display: inline-block;
            padding: 0 2rem;
            text-align: center;
            color: #505050;
            font-size: 1.5rem;
            font-weight: 400;
            }
            a:last-child{
                margin-right: 4rem;
            }
            .active{
                color: var(--themeColor);
            }
       }
       .nav::-webkit-scrollbar{
           display: none;
       }
       .add{
           font-size: 3rem;
           width: 4rem;
           height: 100%;
           line-height: 100%;
           color: black;
           position: absolute;
           top: 0;
           right: 0;
           background-color:#f4f5f6;
           text-align: center;
           color: #f85959;
       }
    }
</style>