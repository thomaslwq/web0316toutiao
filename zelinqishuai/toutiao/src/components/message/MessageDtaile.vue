<!--  -->
<template>
<div class='messageDtaile'>
    <div class="messageDtaile-hearder">
        <div class="hearder-img">
            <img
            src="http://s3.pstatp.com/toutiao/resource/ntoutiao_web/static/image/logo_271e845.png"/>
        </div>
        <searchInput></searchInput>
    </div>
    <div class="messageDtaile-content">
        <div class="content-left">
            <ul>
                <li >
                    <img src="http://s3.pstatp.com/toutiao/static/img/repost.021bf16.png" alt="">
                    <span>转发</span>
                </li>
                <li >
                    <img src="http://s3.pstatp.com/toutiao/static/img/repost.021bf16.png" alt="">
                    <span>微博</span>
                </li>
                <li >
                    <img src="http://s3.pstatp.com/toutiao/static/img/repost.021bf16.png" alt="">
                    <span>Qzone</span>
                </li>
                <li >
                    <img src="http://s3.pstatp.com/toutiao/static/img/repost.021bf16.png" alt="">
                    <span>微信</span>
                </li>
            </ul>
        </div>
        <div class="content-middle">
            <div class="content-title">
                {{articleList.title}}
            </div>
            <div class="content-user">
                <span>{{articleList.user.nickname}}</span>
                <span>{{articleList.created_at}}</span>
            </div>
            <div class="content-txt" v-html=" articleList.content">
            </div>
            <div class="content-img">
                <img src="" alt="">
            </div>
        </div>
        <div class="content-right">
            <img :src="articleList.user.avator" alt="">
            <span>{{articleList.user.nickname}}</span>
        </div>
    </div>
</div>
</template>
<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import searchInput from '../searchInput/searchInput'
export default {
//import引入的组件需要注入到对象中才能使用
components: {
    searchInput
},
data() {
//这里存放数据
return {
    articleList:{},
    nid:''
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
    this.nid = this.$route.query.nid
    let articleLists = this.$store.state.articleLists
    let index = articleLists.findIndex(e => {
        return e.nid = this.nid
    })
    this.articleList = articleLists[index]
    console.log(this.articleList);
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
.messageDtaile {
    padding: 0 20vw;
  .messageDtaile-hearder {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 80px;
      border-bottom: 2px solid #ddd;
     .hearder-img{
      img {
          width: 100px;
          height: 30px;
      }
    }
  }
  .messageDtaile-content {
      display: flex;
      justify-content: space-between;

    .content-left {
      ul {
          list-style: none;
        li {
            padding: 5px 0;
          img {
              vertical-align: middle;
          }

          span {
              padding-left: 10px;
          }
        }
      }
    }

    .content-middle {
      .content-title {
          font-size: 40px;
          font-weight: 800;
          padding-bottom: 20px;
      }
      .content-user{
          text-align: start;
          span{
              font-size: 14px;
              color: grey;
          }
      }
      .content-txt {

      }

      .content-img {
        img {

        }
      }
    }

    .content-right {
        display: flex;
        width: 300px;
        padding: 10px 20px;
      img {
          width: 70px;
          height: 70px;
          border-radius: 50%;
      }

      span {
          padding-left:10px;
      }
    }
  }
}
</style>