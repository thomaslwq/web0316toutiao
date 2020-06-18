<template>
<div class='userData'>
    <div class="userData-content">
        <div class="tab">
            <div :class="['tab-item',{active:activeTab==nav.id}]" 
            v-for="nav in navs" 
            :key="nav.id"
            @click="changeTab(nav.id)"
            >
                {{nav.text}}
            </div>
        </div>

        <div class="content">
            <div v-if="activeTab=='account'">
                <div class="nickname">
                    <div>名称</div>
                    <input type="text" placeholder="请输入新的昵称" v-model="nickname">
                </div>
                <div class="userImg">
                    <div>头像</div>
                    <div class="imgWrapper">
                        <img :src="updateImgUrl" >
                        <input type="file" @change="uploadImg">
                    </div>
                </div>
                <div class="updateInfo" @click.stop="updateInfo">更新资料</div>
            </div>
            <div v-if="activeTab=='password'">
                <div class="nowPwd">
                    <div>当前密码</div>
                    <input type="password" placeholder="请输入原始密码" v-model="currentPassword">
                </div>
                <div class="modify">
                    <div>新密码</div>
                    <input type="password" placeholder="请输入新密码" v-model="updatePassword">
                </div>
                <div class="updateInfo" @click.stop="updatePwd">修改密码</div>
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
       activeTab:"account",
       navs:[{
           id:"account",
           text:"账户信息",
       },{
           id:"password",
           text:"密码管理"
       }],
       nickname:this.$store.state.userInfo.nickname,
       updateImgUrl:this.$store.state.userInfo.avator,
       currentPassword:"",
       updatePassword:"",
   };
},
computed:{

},
methods:{
    changeTab:function(id){
        this.activeTab = id
    },
    uploadImg:function(e){
        Array.from(e.target.files).forEach(f=>{
            let param = new FormData()
            param.append("file",f)
            this.$axios.post("/aliossUpload",param).then(res=>{
                this.updateImgUrl = res.url
            })
        })
    },
    updateInfo:function(e){
        let nickname = this.nickname
        let updateImgUrl = this.updateImgUrl
        if(!nickname){
            this.$message({
                msg:"请输入昵称"
            })
            return false
        }
        this.$axios.post("/updateUserInfo",{
            nickname,
            avator:updateImgUrl
        }).then(res=>{
            this.$message({
                msg:res.msg
            });
            if(res.status == 0){
                let userInfo = this.$store.state.userInfo
                userInfo.nickname = nickname
                userInfo.avator = updateImgUrl
                this.$store.commit('updateUserInfo',userInfo)
            }
        })
    },
    updatePwd:function(){
        if(!this.currentPassword||!this.updatePassword){
            this.$message({
                msg:"当前密码或者新密码不能为空"
            })
            return false
        }
        this.$axios.post("/updatePassword",{
            currentPassword:this.currentPassword,
            updatePassword:this.updatePassword
        }).then(res=>{
            this.$message({
                msg:res.msg
            })
        })
    }
},
mounted() {
  document.body.style.backgroundColor="var(--bgColor)";  
},
}
</script>
<style lang='less' scoped>
.userData {
    .userData-content{
        background-color: white;
        width: 1060px;
        margin: 5px auto;
        .tab {
            display: flex;
            border-bottom:1px solid #ddd ;
            .tab-item {
                padding: 10px;
                cursor: pointer;
            }
            .active{
                color: rgb(33, 165, 218);
                border-bottom:2px solid var(--themeColor) ;
            }
        }
    .content{
        div {
            padding: 10px;
        .nickname {
            display: flex;
            div {

            }

            input {
                width: 50%;
                border: 1px solid #ddd;
                border-radius: 5px;
                padding: 10px;
                font-size: 16px;
            }
        }

        .userImg {

            display: flex;
            div {

            }
            .imgWrapper{
                position: relative;
                img{
                    width: 100px;
                    height: 100px;
                }
                input {
                    width: 120px;
                    height: 120px;
                    position: absolute;
                    left: 10px;
                    opacity: 0;
                    cursor: pointer;
                }
            }
        }

        .updateInfo {
            width: 100px;
            height: 50px;
            text-align: center;
            line-height: 30px;
            color: white;
            background-color: rgb(59, 188, 240);
            border-radius: 10px;
            cursor: pointer;
        }
        .updateInfo:hover{
            background-color: rgb(0, 179, 250);
        }
        }
    //管理密码样式
    .nowPwd {
        display: flex;
    div {

    }

    input {
        border: 1px solid #ddd;
        border-radius: 5px;
    }
    }

    .modify {
        display: flex;
    div {

    }

    input {
        border: 1px solid #ddd;
        border-radius: 5px;
    }
    }

    .updateInfo {

    }
    }
  }
}
</style>