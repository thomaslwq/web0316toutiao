<!--  -->
<template>
  <div class="messageBox">
    <div class="refresh">
      <div class="clickRefresh" @click="getArticles">点击刷新</div>
    </div>
    
    <div class="messagelist" v-for="(article,index) in articleLists" :key='index'>
      <div v-if="article.img == null || article.img == 'undefined'"></div>
      <div class="list-left" @click.stop="jumpMessageDetaile(article.nid)"  v-else>
        <img :src="article.img"/>
      </div>
      <div class="list-right">
        <div class="middle-top" @click.stop="jumpMessageDetaile(article.nid)" >{{article.title}}</div>
        <div class="middle-botton">
          <div class="headPortrait">
            <img :src="article.user.avator" />
          </div>
          <div class="userName">{{article.user.nickname}}</div>
          <div class="dot">·</div>
          <div class="time">{{article.created_at}}</div>
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
  components: {},
  data() {
    //这里存放数据
    return {
      isLogin:false,
      userInfo:{}
    };
  },
  //监听属性 类似于data概念
  computed: {
    articleLists() {
      return this.$store.state.articleLists
    }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getArticles:function(){
      let parmas = new FormData;
      parmas.append('lastid',0);
      this.$axios.post('/getArticles',parmas)
      .then(res => {
        if(res.ret == 0){
          // console.log(res);
          this.$store.commit('updateArticleLists',res.articles)
          // this.articleList = this.$store.state.articleLists
        }else{
          this.$Message({msg:'加载留言失败了'})
          // console.log('1231321');
        }
      }).catch(res => [
        console.log('加载失败了')
      ])
    },
    jumpMessageDetaile:function(nid){
      // this.$route.query = ""
      console.log(nid);
      this.$router.push({
        path:'/MessageDtaile',
        query: { nid: nid }
      })
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
      this.isLogin = this.$store.state.isLogin;
      this.userInfo = this.$store.state.userInfo;
      this.getArticles()
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less' scoped>
.messageBox {
  width: 500px;
  margin: auto;
  .refresh {
    width: 100%;
    height: 35px;
    text-align: center;
    line-height: 35px;
    border-radius: 5px;
    background-color: #eff6fc;
    border: 1px solid #6dacdf;
    position: relative;
    .clickRefresh {
      color: #6dacdf;
    }

    img {
      position: absolute;
      top: -9px;
      right: 165px;
      width: 30px;
      height: 30px;
    }
  }

  .messagelist {
    width: 100%;
    height: 120px;
    display: flex;
    margin-top: 10px;
    border-bottom: 1px solid #ddd;
    .list-left {
      width: 30%;
      height: 100%;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .list-right {
      width: 70%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .middle-top {
          width: 100%;
          height: 50px;
          font-weight: 700;
          font-size: 20px;
          line-height: 80px;
          padding-left: 10px;
          cursor: pointer;
      }

      .middle-botton {
          width: 100%;
          height: 50px;
          display: flex;
          color: #979797;
          line-height: 50px;
          padding-left: 10px;
        .headPortrait{
              width: 30px;
              height: 30px;
              margin-right: 10px;
              border-radius: 50%;
          img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
          }
        }

        .userName {
            line-height: 35px;
        }
        .dot{
            line-height: 35px;
            margin-left: 10px;
        }
        .time {
            line-height: 35px;
            margin-left: 10px;
        }
      }
    }
  }
}
</style>