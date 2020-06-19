<!--  -->
<template>
<div class='newsList'>
    <div class="newsList-item" v-for="n in news" :key="n.nid" 
    @click="jumpNewDetail(n.nid)"
    >
        <div class="item-text" >
            <p class="title">{{n.title}}</p>
            <p>{{n.content}}</p>
            <div class="img" v-if="n.imgs">
                <span v-for=" (img,i) in n.imgs" :key="i">
                    <img :src="img" alt="">
                </span>
            </div>
        </div>
        <div class="item-detail">
            <span class="userAvator">
                <img :src="n.user.avator" alt="">
            </span>
            <span class="nickName">{{n.user.nickname}}</span>
            <span class="date">{{n.created_at}}</span>
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
};
},
//监听属性 类似于data概念
computed: {
    news(){
        return this.$store.state.news
    }
},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
     jumpNewDetail:function(id){
        localStorage.setItem('nid',id);
        this.$router.push('/NewDetail') 
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
     this.$axios.post('/getArticles',{
        'type':'TT',
        page:0,
        number:15
        }).then(res => {
            console.log(res);
            if(res.ret === 0){
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
    .newsList {
        overflow: hidden;
  .newsList-item {
      margin: 0 2rem;
      padding: 1rem 0;
      border-bottom: 1px solid rgba(221, 221, 221, 0.6);
    .item-text {
      p {
          padding: 0 0 1rem;
          font-size: 1.5rem;
      }
      .title{
          font-size: 2rem;
      }
      .img{
        //   width: 10rem;
          margin: 1rem 0;
         span{
                padding: 1rem;
              img{
                width: 20rem;
                height: auto;             
            }
         }
      }
    }

    .item-detail {
      .userAvator {
        img {
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 50%;
            vertical-align: middle;
        }
      }

      .nickName {
          padding: 0 1rem;
          color: blue;
      }

      .date {
          
      }
    }
  }
}
</style>