<template>
  <div class="login">
    <a href="/" class="to-index">
      <img src="//s3.pstatp.com/toutiao/resource/ntoutiao_web/static/image/logo_271e845.png" />
    </a>
    <img
      src="//s3a.pstatp.com/toutiao/resource/ntoutiao_web/static/image/login/slogan_c6bab2f.png"
      class="loginBg"
    />
    <div class="login-box">
      <form name="loginform" method="post" @submit.prevent="login">
        <h1>账密登录</h1>
        <input type="text" placeholder="账号/邮箱/手机号" autocomplete="on" v-model="username" />
        <input type="password" placeholder="密码" v-model="password" />
        <button type="submit" @click.prevent="login">确定</button>
      </form>
      <div class="others">
        登录/注册即表示你同意
        <a href="https://www.toutiao.com/user_agreement/" target="_blank">用户协议</a> 和
        <a href="https://www.toutiao.com/privacy_protection/" target="_blank">隐私条款</a>
        <a @click="goTo('/sign')" class="right">注册用户</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    goTo(url) {
      this.$router.replace(url);
    },
    login() {
      if (this.username === "" || this.password === "")
        this.$message.warning(`帐密不能为空`);
      else {
        let params = new FormData();
        params.append("username", this.username);
        params.append("password", this.password);
        this.axios.post("/loginCheck", params).then(res => {
          if (res.data.ret === 0) {
            this.$store.commit("userInfo", res.data.wdata);
            this.$store.commit("ifLogin", true);
            this.$message.success(`${res.data.msg}`);
            this.$router.replace("/");
          } else this.$message.warning(`${res.data.msg}`);
        });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
#app {
  height: 100%;

  .login {
    min-height: 100vh;
    background: url(//s3b.pstatp.com/toutiao/resource/ntoutiao_web/static/image/login/login_bg_7584f6a.png)
      no-repeat top center;

    .to-index {
      position: absolute;
      top: 15px;
      left: 15px;

      img {
        width: 110px;
        height: 27px;
      }
    }

    .loginBg {
      width: 520px;
      height: 360px;
      position: absolute;
      top: 10px;
      left: calc(50% - 260px);
    }

    .login-box {
      width: 375px;
      position: absolute;
      top: 215px;
      left: 50%;
      transform: translateX(-50%);

      form {
        background: #fff;
        border-radius: 6px;
        padding: 0 25px;
        display: flex;
        flex-flow: column;
        box-shadow: 0 0 5px #ccc;

        h1 {
          height: 40px;
          font-size: 18px;
          text-align: center;
          line-height: 40px;
          border-bottom: 1px solid #ccc;
          margin: 15px 0 5px;
        }

        input {
          height: 50px;
          margin-top: 15px;
          border: 1px solid #ddd;
          border-radius: 5px;
          outline: none;
          box-sizing: border-box;
          padding: 0 20px;
          font-size: 16px;

          &::placeholder {
            color: #aaa;
          }
        }

        button {
          height: 45px;
          margin: 30px 0 20px;
          background: #f66;
          border: none;
          outline: none;
          border-radius: 5px;
          font-size: 18px;
          color: #fff;
          cursor: pointer;
        }
      }

      .others {
        padding: 10px 15px;
        font-size: 12px;
        color: #666;

        a {
          color: #6ae;

          &.right {
            float: right;
          }
        }
      }
    }
  }
}
</style>
