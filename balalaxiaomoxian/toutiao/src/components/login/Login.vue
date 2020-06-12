<template>
<div class='login'>
    <div class="login-content">
        <p class="text">登录后可以保存您的浏览喜好、评论、收藏，并与APP同步，更可以发布微头条</p>
        <input class="login-button" type="button" value="登录">
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
  }
}
</style>