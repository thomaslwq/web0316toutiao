<template>
    <div class="nav"> 
        <el-image src='https://s3.pstatp.com/toutiao/static/img/logo.271e845.png'
        fit='contain'
        class="img"
        ></el-image>
            <el-button 
            label-width='200' 
            v-for='(item,index) in navLists' :key='index'
            :class="{'active':iNow == index,'btn':true}"
            >{{item}}</el-button>
    </div>
</template>

<script>
export default {
    data(){
        return {
            navLists:['推荐','西瓜视频','热点','直播','图片','科技','娱乐','游戏','体育','懂车帝','财经','搞笑','更多'],
            iNow:0
        }
    }
}
</script>

<style lang='less' scoped>
.nav{
    background-color: #fff;
    .img{
        margin: 16px 0;
        width: 70%;
    }
    .btn{
        width: 80%;
        border: none;
        transition: all .5s;
    }
    .active,.btn:hover{
        background-color: #e43c46;
        color: white;
    } 
    .el-button{
        margin-left: 0;
    }
}
</style>