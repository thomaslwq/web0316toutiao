<!--  -->
<template>
  <div class="content">
    <div
      v-if="!userInfo.oauth_token"
      class='tt-index-not-login'
    >
      <p class="text">登录后可以保存你的浏览喜好、评论、收藏，并于APP同步，更可以发布微头条</p>
      <div
        class="login-index"
        @click.stop="goToUserLogin"
      >登录</div>
    </div>
    <div
      v-else
      class="tt-index-login"
    >
      <div class="logout">退出登录</div>
      <div class="imager">
        <img
          :src="userInfo.avator"
          alt=""
          @click="gotoUserCenter"
        >
      </div>
      <div class="nickname">
        {{userInfo.nickname}}
      </div>
      <div class="bottom">
        <div class="left">
          <div class="count">{{userInfo.article_count}}</div>
          <div class="text">头条数</div>
        </div>
        <div class="right">
          <div class="count">{{userInfo.article_count}}</div>
          <div class="text">头条数</div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { UPDATE_USER_INFO } from "../../vuex/mutationsType"
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
    userInfo: function () {
      return this.$store.state.userInfo;
    },
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    gotoUserCenter: function () {
      this.$router.push({
        path: "/userCenter"
      })
    },
    logout: function () {
      this.$axios.post("/logout").then(res => {
        this.$message({
          msg: res.msg
        });
      })
      this.$store.commit(UPDATE_USER_INFO, {})
    },
    goToUserLogin: function () {
      // this.$router.push("userLogin");
      // 直接通过name属性跳转
      this.$router.push({
        path: "/userLogin"
      })
      // 直接通过路径跳转
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

  },
  beforeCreate() { }, //生命周期 - 创建之前
  beforeMount() { }, //生命周期 - 挂载之前
  beforeUpdate() { }, //生命周期 - 更新之前
  updated() { }, //生命周期 - 更新之后
  beforeDestroy() { }, //生命周期 - 销毁之前
  destroyed() { }, //生命周期 - 销毁完成
  activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang="less" scoped>
.content {
  width: 350px;
  border: 20px solid #777777;
  .tt-index-not-login {
    height: 240px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding: 50px;
    .text {
      text-align: center;
      font-size: 12px;
      color: #777777;
    }

    .login-index {
      width: 250px;
      height: 40px;
      line-height: 40px;
      background-color: red;
      border-radius: 10px;
      text-align: center;
      color: white;
    }
  }
  .tt-index-login {
    width: 350px;
    border: 1px solid #ddd;
    margin-top: 10px;
    padding: 4px;
    .logout {
      text-align: right;
      font-size: 14px;
      color: #ddd;
    }

    .imager {
      text-align: center;
      img {
        height: 50px;
        width: 50px;
        border-radius: 50%;
      }
    }

    .nickname {
      text-align: center;
    }

    .bottom {
      display: flex;
      justify-content: space-around;
      .left {
        .count {
          text-align: center;
        }

        .text {
          text-align: center;
        }
      }

      .right {
        .count {
          text-align: center;
        }

        .text {
          text-align: center;
        }
      }
    }
  }
}
</style>