<!--  -->
<template>
  <div class="tt-userLogin">
    <div class="userLogin-titleImg">
      <img
        src="http://s3.pstatp.com/toutiao/resource/ntoutiao_web/static/image/logo_271e845.png"
        alt
      />
    </div>
    <div class="userLogin-img1">
      <img
        src="http://s3a.pstatp.com/toutiao/resource/ntoutiao_web/static/image/login/slogan_c6bab2f.png"
        alt
      />
    </div>
    <div class="userLogin-box">
      <div class="login">
        <h4>账号登录</h4>
        <div class="usernameInput">
          <input placeholder="账号/邮箱" type="text" v-model.trim="username" />
        </div>
        <div class="paswordInput">
          <input @keyup.enter="login" placeholder="密码"  autocomplete="off" type="password" v-model.trim="password"/>
        </div>
        <div class="tijiao"  @click.stop="login">确定</div>
      </div>
      <div class="loginDetail">
        <span>登录/注册表示你同意</span>
        <a href="https://www.toutiao.com/user_agreement/" target="_blank">用户协议</a> 和
        <a href="https://www.toutiao.com/privacy_protection/" target="_blank">隐私条款</a>
        <a style="margin-left: 40px;" @click="goUserSign('/userSign')">注册用户</a>
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
        username:'',
        password:''
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
      goUserSign:function(url){
          this.$router.replace(url).catch(data=>{})
      },
     
      login:function(){
           let parmas = new FormData();
           parmas.append('username',this.username);
           parmas.append('password',this.password)
           this.$axios.post('/loginCheck',parmas)
           .then(res=>{
              //  console.log(res);
              //  console.log(parmas);
               if(res.ret === 0){
                  this.$Message({msg:'登录成功'})
                   this.$store.commit('userInfo',res.wdata);
                   this.$store.commit('isLogin',true)
                   this.$router.replace('/')
               }else{
                 this.$Message({msg:'账号或密码不正确'})
                  this.username = '';
                  this.password = ''
               }
           })
      }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
       if (this.$store.state.isLogin){
        this.$router.replace('/').catch(data => {  })
      }
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
<style  lang='less' scoped>
.tt-userLogin {
  position: relative;
  background-color: #ddd;
  padding: 20px;
  height: 100vh;
  background-image: url('//s3b.pstatp.com/toutiao/resource/ntoutiao_web/static/image/login/login_bg_7584f6a.png');
  .userLogin-titleImg {
    width: 115px;
    height: 30px;
    position: absolute;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .userLogin-img1 {
    width: 520px;
    height: 360px;
    margin-left: 50%;
    transform: translateX(-50%);
    img {
      width: 100%;
      height: 100%;
    }
  }

  .userLogin-box {
    width: 375px;
    // height: 300px;
    // position: absolute;
    margin-left: 50%;
    margin-top: 0;
    transform: translate(-50%, -50%);
    .login {
      background-color: white;
      padding: 0 25px 20px 25px;
      h4 {
        height: 50px;
        text-align: center;
        line-height: 50px;
        border-bottom: 1px solid #ddd;
        font-weight: 200;
      }

      .usernameInput {
        height: 46px;
        margin: 20px 0;
        border: 1px solid #ddd;
        border-radius: 5px;
        input {
          width: 100%;
          height: 100%;
          border: none;
          text-indent: 1em;
        }
      }

      .paswordInput {
        height: 46px;
        border: 1px solid #ddd;
        border-radius: 5px;
        margin-bottom: 20px;
        input {
          height: 100%;
          width: 100%;
          border: none;
          text-indent: 1em;
        }
      }
      .tijiao {
        height: 46px;
        padding: 20px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 6px;
        background-color: #f85959;
        color: white;
        font-weight: 200;
      }
    }
    .loginDetail{
        margin-top: 10px;
        font-size: 12px;
        text-align: center;
        a{
            color:#406599;
            cursor: default;
        }
    }
  }
}
</style>