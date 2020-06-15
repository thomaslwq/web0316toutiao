<!--  -->
<template>
  <div class=''>
    <section class="loginBox">
      <section class="login-title">账号密码登录</section>
      <input
        type="text"
        v-model="username"
      >
      <input
        type="password"
        v-model="password"
      >
      <section
        class="login-confirm"
        @click.stop="confirm"
      >确定</section>
      <section class="bottom">
        <section class="left">登录/注册即表示你同意
          <a href="#">用户协议</a>和<a href="#">隐私条款</a>
        </section>
        <a
          href="#"
          class="right"
          @click.prevent.stop="gotoUserRegister"
        >注册用户</a>

      </section>
    </section>
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
      username: "",
      password: ""
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    gotoUserRegister: function () {
      this.$router.push({
        name: "userRegister"
      })
    },
    confirm: function () {
      // 1. 获取输入框的值
      let password = this.password;
      let username = this.username;
      // 2. 账号密码为空的情况下 提示用户不能为空
      if (!password || !username) {
        this.$message({
          msg: "账号密码不能为空！"
        })
        return false;
      }
      this.$axios.post("/loginCheck", {
        username, password
      }).then((res) => {
        console.log(res);
        this.$message({
          msg: res.msg
        })
        if (res.status === 0) {
          // 登录成功
          // a. 将用户信息 保存到本地 localStorage
          // b. 将用户信息 使用 vuex 存起来 方便实现页面组件间的数据共享
          // c. 跳转到首页
          this.$store.commit("UPDATE_USER_INFO", res.wdata)
          this.$router.push({ "name": "index" });
        }
      })
        .catch(err => err);
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
<style lang='less' scoped>
.loginBox {
  height: 300px;
  width: 400px;
  border: 1px solid #ddd;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 5px;
  .login-title {
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-bottom: 1px solid #ddd;
    font-size: 16px;
    padding: 5px;
  }

  input {
    width: 100%;
    border: 1px solid #ddd;
    height: 45px;
    margin-top: 10px;
    padding: 10px;
  }

  .login-confirm {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background-color: red;
    color: white;
    border-radius: 5px;
    margin-top: 10px;
  }

  .bottom {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: #ddd;
    margin-top: 20px;
    .left {
      a {
        text-decoration: none;
      }
    }

    .right {
      text-decoration: none;
    }
  }
}
</style>