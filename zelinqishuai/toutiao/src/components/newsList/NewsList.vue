<!--  -->
<template>
<div class='tt-news'>
    <h3 class="news-title">24小时热闻</h3>
    <div class="news-list" v-for="n,index in news" :key="index">
        <div class="list-img">
            <img src="http://img4.imgtn.bdimg.com/it/u=2934711476,1098502088&fm=26&gp=0.jpg" alt="" class="img-image">
        </div>
        <div class="list-text">
            {{n.text}}
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
    news: [{
        img: "./images/1.jpg",
        text: "贾乃亮又开豪车区李小璐➕,已主动符合"
    },{
        img: "./images/2.jpg",
        text: "贾乃亮又开豪车区李小璐➕,已主动符合"
    },{
        img: "./images/3.jpg",
        text: "贾乃亮又开豪车区李小璐➕,已主动符合"
    },{
        img: "./images/4.jpg",
        text: "贾乃亮又开豪车区李小璐➕,已主动符合"
    }]
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
.tt-news {
    width: 350px;
    height: 380px;
    margin-top: 10px;
    background-color: #f4f5f6;
    border-top: 2px solid #e93545;
    padding: 20px;

  .news-title {
      color: #4c4c4c;
      margin-bottom: 20px
  }

  .news-list {
        height: 70px;
        display: flex;
        border-bottom: 1px solid #e8e8e8;
    .list-img {
        width: 60px;
        height: 60px;
        display: block;
      .img-image {
          width: 60px;
          height: 60px;

      }
    }
    .list-text {
        height: 60px;
        padding: 5px;
        font-size: 16px;
    }
  }
  .news-list:nth-child(5){
      border: 0;
  }
}
</style>