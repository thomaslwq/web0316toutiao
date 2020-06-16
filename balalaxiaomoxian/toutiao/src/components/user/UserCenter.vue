<template>
<div class='userCenter'>
    <div class="userCenter-tab">
        <img src="https://s3.pstatp.com/site/tt_mfsroot/pc_img/bg_profile.png" class="tab-bg">
        <div class="tab-user">
            <img :src="userInfo.avator" class="userImg">
            <span>{{userInfo.nickname}}</span>
            <div class="edit-userInfo" @click.stop="toUserData">编辑</div>
        </div>
    </div>
    <div class="userCenter-content">
        <div class="content-left">
            <div class="left-tab">
                <div :class="['tab',{active:nav.id==activeTab}]" 
                    v-for="nav in navs"
                    :key="nav.id"
                    @click.stop="changeTab(nav.id)"
                >
                {{nav.title}}
                </div>
            </div>
            <div class="left-content">
                <div class="content" v-if="activeTab=='toutiao'">
                    <div class="content-item" v-for="itemw in toutiaos" :key="itemw.nid">
                        <div>{{itemw.title}}</div>
                        <div>{{itemw.created_at}}</div>
                        <div class="deleteItemw" @click="deleteItemw(itemw.nid)">删除</div>
                    </div>
                </div>
                <div class="content" v-if="activeTab=='article'">
                    <div class="content-item" v-for="itema in articles" :key="itema.nid">
                        <img class="item-img" :src="itema.img" v-if="itema.img">
                        <div class="item-title">标题：{{itema.title}}</div>
                        内容：<div class="item-content" v-html="itema.content"></div>
                        <div class="item-createTime">{{itema.created_at}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="content-right">
            <div class="right-article">
                <div class="article-num">{{userInfo.article_count}}</div>
                <div class="article-title">文章数</div>
            </div>
            <div class="right-TT">
                <div class="TT-num">{{userInfo.tt_count}}</div>
                <div class="TT-title">微头条数</div>
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
       toutiaos:[],
       articles:[],
       activeTab:"toutiao",
       navs:[
           {
               id:"toutiao",
               title:"微头条"
            },
           {
               id:"article",
               title:"文章"
           }
       ]
   };
},
computed:{
    userInfo:function(){
        return this.$store.state.userInfo
    }
},
methods:{
    changeTab:function(id){
        this.activeTab = id
    },
    deleteItemw:function(id){
        this.$axios.post("/deleteArticle",{
            nid:id
        }).then(res=>{
            this.$message({
                msg:res.msg
            })
            if(res.status == 0){
                let index = this.articles.findIndex(v=>v.nid==id)
                if(index!=-1){
                    this.articles.splice(index,1)
                    return true
                }
                index = this.toutiaos.findIndex(v=>v.nid==id)
                if(index!=-1){
                    this.toutiaos.splice(index,1)
                    return true
                }
            }
        })
    },
    toUserData:function(){
        this.$router.push({
            path:"/UserData"
        })
    }
},
mounted(){
    document.body.style.backgroundColor="var(--bgColor)";
    //获取微头条数据
    this.$axios.post("/getArticlesByType",{
        type:"TT"
    }).then(res=>{
        this.toutiaos = res.articles
    })
    //获取文章数据
    this.$axios.post("/getArticlesByType",{
        type:"article"
    }).then(res=>{
        this.articles = res.articles
    })
}
}
</script>
<style lang='less' scoped>
.userCenter{
    width: 1060px;
    margin: 5px auto;
    .userCenter-tab{
        width: 100%;
        height: 260px;
        background-color: white;
        position: relative;
        .tab-bg{
            width: 100%;
        }
        .tab-user{
            width: 500px;
            display: flex;
            align-items: center;
            position: absolute;
            bottom: 40px;
            left: 40px;
            .userImg{
                width: 100px;
                height: 100px;
                border-radius: 50%;
            }
            span{
                margin-left: 10px;
            }
            .edit-userInfo{
                width: 50px;
                height: 50px;
                border-radius: 50%;
                text-align: center;
                line-height: 50px;
                font-size: 12px;
                color: white;
                margin-left: 100px;
                background-color: skyblue;
            }
            .edit-userInfo:hover{
                cursor: pointer;
                background-color: #20a4d9;
            }
        }
    }
    .userCenter-content{
        display: flex;
        margin-top: 20px;
        position: relative;
        .content-left{
            width: 700px;
            background-color: white;
            .left-tab{
                display: flex;
                .tab{
                    cursor: pointer;
                    margin: 15px;
                }
                .active{
                    color: rgb(33, 165, 218);
                    border-bottom:2px solid var(--themeColor) ;
                }

            }
            .left-content{
                .content{
                    .content-item{
                        width: 100%;
                        padding: 10px;
                        border-bottom:1px solid #ddd ;
                        position: relative;
                        .deleteItemw{
                            position: absolute;
                            right: 20px;
                            bottom: 20px;
                            cursor: pointer;
                        }
                        .deleteItemw:hover{
                            color: var(--themeColor);
                        }

                        //arcticle
                        .item-img {
                            width: 150px;
                            height: 100px;
                        }

                        .item-title {

                        }

                        .item-content {

                        }

                        .item-createTime {

                        }
                    }
                    
                }
            }
            
        }
        .content-right{
            width: 340px;
            position: absolute;
            right: 0;
            background-color: white;
            display: flex;
            .right-article {
                width: 50%;
                height: 100px;
                text-align: center;
                margin-top: 50px;
                font-weight: 700;
                .article-num {

                }

                .article-title {

                }
                }

            .right-TT {
                width: 50%;
                height: 100px;
                text-align: center;
                margin-top: 50px;
                font-weight: 700;
                .TT-num {

                }

                .TT-title {

                }
            }
        }
    }
}
</style>