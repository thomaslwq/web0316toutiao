<template>
  <div class="nav">
        <img src="https://s3.pstatp.com/toutiao/static/img/logo.271e845.png" alt="">
        <li 
        v-for="(item,index) in navList" 
        :key="index"
        :class="['btn',{'firstBtn':iNow==index}]">
            {{item}}
        </li>
  </div>
</template>

<script>
export default {
    data(){
        return{
            navList:['推荐','西瓜视频','热点','直播','图片','科技','娱乐','游戏','体育','懂车帝','财经','搞笑','更多'],
            iNow:0
        }
    }
}
</script>

<style lang="less" scoped>
.nav{
    width: 200px;
    img{
        transform: scale(0.5);
        margin-left: -7px;
    }
    .btn{
        width: 120px;
        height: 40px;
        transition: all 0.3s;
        line-height: 40px;
        text-align: center;
        font-size: 14px;
        border-radius: 5px;
        transition: all 0.3s;
        margin: 0px auto;
        color:#606266;
        cursor: pointer;
    }
    .firstBtn{
        background-color: #e43c46;
        color: #fff;
    }
    .btn:hover{
        background-color: #e43c46;
        color: #fff;
    }
}

</style>