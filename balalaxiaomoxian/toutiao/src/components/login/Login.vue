<template>
<div class='login'>
    <div class="login-content" v-if="!userInfo.oauth_token">
        <p class="text">登录后可以保存您的浏览喜好、评论、收藏，并与APP同步，更可以发布微头条</p>
        <input class="login-button" type="button" value="登录" @click.stop="toUserLogin">
    </div>
    <div class="login-content" v-else>
        <span class="exit" @click="logout">退出登录</span>
        <div class="content-info">
            <img :src="userInfo.avator" @click.stop="toUserCenter">
            <div>{{userInfo.nickname}}</div>
        </div>
        <div class="article">
            <div class="left">
                <div>{{userInfo.tt_count}}</div>
                <div>头条数</div>
            </div>
            <div class="right">
                <div>{{userInfo.article_count}}</div>
                <div>文章数</div>
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

   };
},
computed:{
    userInfo:function(){
        return this.$store.state.userInfo
    }
},
methods:{
    toUserLogin:function(){
        //通过name属性跳转
        this.$router.push("userLogin")

        //通过路径跳转
        // this.$router.push({
        //     path:"/userLogin"
        // })
    },
    logout:function(){
        this.$axios.post("/logout").then(res=>{
            this.$message({
                msg:res.msg
            });
            this.$store.commit("updateUserInfo",{})
        })
    },
    toUserCenter:function(){
        this.$router.push({
            path:"/userCenter"
        })
    }
}
}
</script>
<style lang='less' scoped>
.login {
    width: 340px;
    height: 240px;
    background-color: var(--bgColor);
    display: flex;
    justify-content: center;
    align-items: center;
  .login-content {
      width: 300px;
      height: 200px;
      border: 1px solid #ddd;
      background-color: white;
      padding: 25px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    position: relative;
    .text{
        font-size: 12px;
        color: #777;
    }
    .login-button{
        width: 240px;
        height: 40px;
        border: 0;
        border-radius: 5px;
        background-color: var(--themeColor);
        color: white;
        outline: none;
        cursor: pointer;
    }
    .login-button:hover{
        background-color:#ee5353;
    }




// else
.exit {
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
}

.content-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      cursor: pointer;
  }

  div {
      text-align: center;
  }
}

.article {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-around;
    padding: 10px;
  .left {
    div {
        text-align: center;
        font-weight: 700;
    }
  }

  .right {
    div {
        font-weight: 700;
        text-align: center;
    }
  }
}


  }
}
</style>