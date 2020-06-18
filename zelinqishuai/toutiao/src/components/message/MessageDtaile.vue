<!--  -->
<template>
  <div class="messageDtaile">
    <div class="messageDtaile-hearder">
      <div class="hearder-img">
        <img src="http://s3.pstatp.com/toutiao/resource/ntoutiao_web/static/image/logo_271e845.png" />
      </div>
      <searchInput></searchInput>
    </div>
    <div class="messageDtaile-content">
      <div class="content-left">
        <ul>
          <li>
            <img src="http://s3.pstatp.com/toutiao/static/img/repost.021bf16.png" alt />
            <span>转发</span>
          </li>
          <li>
            <img src="http://s3.pstatp.com/toutiao/static/img/repost.021bf16.png" alt />
            <span>微博</span>
          </li>
          <li>
            <img src="http://s3.pstatp.com/toutiao/static/img/repost.021bf16.png" alt />
            <span>Qzone</span>
          </li>
          <li>
            <img src="http://s3.pstatp.com/toutiao/static/img/repost.021bf16.png" alt />
            <span>微信</span>
          </li>
        </ul>
      </div>
      <div class="content-middle">
        <div class="content-title">{{articleList.title}}</div>
        <div class="content-user">
          <img :src="avator" alt />
          <span>{{nickname}}</span>
          <span>{{articleList.created_at}}</span>
        </div>
        <div class="content-txt" v-html="articleList.content"></div>
        <div v-if="articleList.imgs" class="content-img" v-for="img in articleList.imgs">
          <img :src="img" />
        </div>
      </div>
      <div class="content-right">
        <img :src="avator" alt @click="modifyUser" />
        <span>{{nickname}}</span>
      </div>
    </div>
  </div>
</template>
<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import searchInput from "../searchInput/searchInput";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    searchInput
  },
  data() {
    //这里存放数据
    return {
      articleList: {},
      nickname: "",
      avator: "",
      imgs: [],
      nid: ""
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    modifyUser: function() {
      this.$router.push("/UserDetail");
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
 
    this.$axios
      .post("/getArticleById", {
          'nid':this.$route.query.nid
      })
      .then(res => {
        if (res.ret === 0) {
            console.log(res);
            this.articleList = res.article;
            this.nickname = res.article.n_user.nickname;
            this.avator = res.article.n_user.avator;
            }
      })
      .catch(err => err);
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
.messageDtaile {
  padding: 0 15vw;
  .messageDtaile-hearder {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    border-bottom: 2px solid #ddd;
    .hearder-img {
      img {
        width: 100px;
        height: 30px;
      }
    }
  }
  .messageDtaile-content {
    display: flex;
    justify-content: space-between;
    padding-top: 20px;
    .content-left {
      padding: 0 20px;
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
      flex: 6;
      padding: 0 20px;
      border-left: 1px solid #ddd;
      border-right: 1px solid #ddd;
      .content-title {
        font-size: 40px;
        font-weight: 800;
        padding-bottom: 20px;
      }
      .content-user {
        text-align: start;
        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          vertical-align: middle;
        }
        span {
          padding: 0 10px;
          font-size: 14px;
          color: grey;
        }
      }
      .content-txt {
        padding: 20px 0;
      }

      .content-img {
        padding: 20px 0;
        text-align: center;
        img {
          width: 300px;
        }
      }
    }

    .content-right {
      display: flex;
      width: 300px;
      height: 200px;
      background-color: #ddd;
      padding: 10px 20px;
      border-top: 2px solid red;
      margin: 0 0 0 10px;
      img {
        width: 70px;
        height: 70px;
        border-radius: 50%;
      }

      span {
        padding-left: 10px;
      }
    }
  }
}
</style>