<template>
<div class='userLogin'>
    <div class="login-account">
        <h4 class="login-title">账号登录</h4>
        <input type="text" v-model="username" placeholder="请输入用户名" />
        <input type="password" v-model="password" placeholder="请输入密码" />
        <div class="confirm" @click.stop="confirm">登录</div>
        <div class="login-buttom">
            <div class="buttom-left">
                登录/注册即表示你同意
                <a href="javascript:;">用户协议</a>和
                <a href="javascript:;">营私条款</a>
            </div>
            <div class="buttom-right">
                <a href="javascript:;" @click.prevent.stop="toUserRegister">注册用户</a>
            </div>
        </div>
    </div>
</div>
</template>

<script>

export default {
components: {},
data() {
   return {
    username:'',
    password:'',
   };
},
methods:{
    confirm:function(){
        let password = this.password;
        let username = this.username;
        if (!password || !username) {
            this.$message({
            msg: "账号或者密码不能为空！"
            });
            return false;
        }
        this.$axios.post("/loginCheck",{
            username,password
        }).then(res=>{
            this.$message({
                msg:res.msg
            })
            if(res.status === 0){
                this.$store.commit("updateUserInfo",res.wdata)
                this.$router.push({"name":"index"})
            }
        })
    },
    toUserRegister:function(){
        this.$router.push({"name":"userRegister"})
    }
}
}
</script>
<style lang='less' scoped>
.userLogin {
    width: 100vw;
    height: 100vh;
    background-image: url("../../assets/bgimage.png");
  .login-account {
        height: 250px;
        width: 400px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 5px;
    .login-title {
        height: 40px;
        font-size: 20px;
        text-align: center;
        border-bottom:1px solid #ddd ;
    }

    input{
        width: 100%;
        border: 1px solid #ddd;
        height: 45px;
        padding: 10px;
        margin-top: 10px;
    }

    .confirm {
        width: 100%;
        height: 40px;
        border-radius: 5px;
        color: white;
        text-align: center;
        line-height: 40px;
        cursor: pointer;
        background-color: var(--themeColor);
        margin-top: 20px;
    }
  }

  .login-buttom {
      font-size: 14px;
      display: flex;
      margin-top: 15px;
    .buttom-left {
        a {

        }
    }

    .buttom-right {
        a {
            position: absolute;
            right: 0;
        }
    }
  }
}
</style>