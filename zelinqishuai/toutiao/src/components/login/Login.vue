<!--  -->
<template>
  <div class="tt-index-login">
    <div class="notLogin" v-if="!isLogin">
      <p class="text">登录后可以保存您的浏览喜好、评论、收藏，并与APP同步，更可以发布微头条</p>
      <div class="login-button" @click="goUserLogin('/userLogin')">登陆</div>
    </div>
    <div class="isLogin" v-if="isLogin">
      <p @click.stop="outLogin">退出登录</p>
      <div class="userInfo">
        <img @click="jumpModify" :src="userdata.avator" alt />
        <p>{{userdata.nickname}}</p>
      </div>
      <div class="messageCount">
        <div>
          <div>{{userdata.tt_count}}</div>
          <div>头条数</div>
        </div>
        <div>
          <div>{{userdata.article_count}}</div>
          <div>文章数</div>
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
      isLogin: false,//登录状态开关
      userdata: {}//用户信息
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //跳转到登录页面
    goUserLogin: function(url) {
      this.$router.replace(url).catch(data => {});
    },
    outLogin:function(){
      console.log('111');
        this.$axios.post('logout').then(res => {
            this.$store.commit('outLogin');
            this.isLogin = this.$store.state.isLogin
            // console.log(res);
        }).catch(error => {
            console.log(error);
            return error
        })
    },
    //跳转到修改信息页面
    jumpModify:function(){
      this.$router.push('/UserDetail')
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    //从$store中获取到登录状态和用户信息
    this.isLogin = this.$store.state.isLogin;
    this.userdata = this.$store.state.userInfo;
    // console.log(this.userdata);
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
//@import url(); 引入公共css类
.tt-index-login {
  background-color: white;
  margin-top: 10px;
  .notLogin {
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding: 50px;
    border: 1px solid #ddd;
    .text {
      text-align: center;
      font-size: 12px;
      color: #777777;
    }

    .login-button {
      border-radius: 5px;
      font-size: 16px;
      background-color: var(--themeColor);
      line-height: 40px;
      text-align: center;
      color: white;
      height: 40px;
      width: 250px;
    }
  }
  .isLogin {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    height: 200px;
    padding-top: 10px;
    p {
      width: 100%;
      text-align: end;
      padding: 0 10px;
      font-size: 14px;
      color: gray;
    }
    .userInfo {
      width: 100px;
      height: 100px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 70px;
        height: 70px;
        border-radius: 50%;
      }
      p {
          color: black;
            text-align: center;
            padding: 10px 0;
      }
    }
    .messageCount {
      display: flex;
      height: 80px;
      text-align: center;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      div {
        flex: 1;
        div{
            padding: 10px 0;
        }
      }
    }
  }
}
</style>