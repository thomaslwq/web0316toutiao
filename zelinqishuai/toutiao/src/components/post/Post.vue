<!--  -->
<template>
<div class='tt-post'>
    <div class="title">
       <span class="blue">发微头条</span>
       <span>写文章</span>
    </div>
    <textarea placeholder="有什么新鲜事儿告诉大家" name="" id="" cols="30" rows="10"></textarea>
    <div class="bottom">
        <div class="post-left">
            图片
        </div>
        <div class="post-right">
            发布
        </div>
    </div>
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
    title:'写代码真的很快乐'
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
    .tt-post{
        margin: 0 auto 20px;
        width: 512px;
        height: 225px;
        border: 1px solid #e8e8e8;
        .title{
            font-size: 14px;
            border-bottom: 3px solid #e8e8e8;
            height: 35px;
            line-height: 35px;
            span{
                padding: 0 20px;
            }
           .blue{
               color: blue;
           }
        }
        textarea{
            width: 100%;
            height: 140px;
            padding: 0;
            padding-top: 20px;
            margin: 0;
            background-color: #f4f5f6;
            border: none;
            text-indent: 4em;
        }
        .bottom{
            height: 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .post-left{
                width: 93px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                font-size:12px;
            }
            .post-right{
                width: 120px;
                height: 40px;
                background-color: #fe898e;
                color: white;
                line-height: 40px;
                text-align: center;
            }
        }
    }
</style>