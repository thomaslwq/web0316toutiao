<!--  -->
<template>
<div class='UserDtail'>
    <div class="UserDtail-header">
       <div>
            <img
        src="http://s3.pstatp.com/toutiao/resource/ntoutiao_web/static/image/logo_271e845.png"/>
       </div>
    </div>
    
    <div class="UserDtail-userInfo">
            <img src="http://s3.pstatp.com/site/tt_mfsroot/pc_img/bg_profile.png" alt="">
            <div class="user">
                <img :src="userInfo.avator" @click.stop="jumpIndex" alt="">
                <span>{{userInfo.nickname}}</span>
                <span style="color:blue;cursor:pointer;" @click="modifyUserInfoTab">修改信息</span>
            </div>
    </div>
    <div class="UserDtail-articles">
        <div class="articles-title">
            <span :class="{active:currentId === item.id}" @click="currentTAb(item.id)" 
            :key='item.id'
            v-for='item in title'>{{item.txt}}</span>
        </div>
        <div class="articles-content">
            <div class="content">
                 <div class="articleslist" v-for="(article,index) in articles" :key='article.nid'>
                    <div v-if="article.img == null || article.img == 'undefined'"></div>
                    <div class="list-left" @click.stop="jumpMessageDetaile(article.nid)"  v-else>
                        <img :src="article.img"/>
                    </div>
                    <div class="list-right">
                        <div class="middle-top" @click.stop="jumpMessageDetaile(article.nid)" >{{article.title}}</div>
                        <div class="middle-botton">
                        <div class="headPortrait">
                            <img :src="userInfo.avator" />
                        </div>
                        <div class="userName">{{userInfo.nickname}}</div>
                        <div class="dot">·</div>
                        <div class="time">{{article.created_at}}</div>
                    </div>
                    <div class="delete" @click="deleteArticle(index,article.nid)">
                        <span>删除</span>
                    </div>
                </div>
                </div>
            </div>
            <div class="articles-count">
                <div class="left">
                    <p>{{article_count}}</p>
                    <p>文章数</p>
                </div>
                <div class="right">
                    <p>{{tt_count}}</p>
                    <p>头条数</p>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Message from '../message/message'

export default {
//import引入的组件需要注入到对象中才能使用
components: {
    Message
},
data() {
//这里存放数据
return {
    title:[{
        txt:'微头条',
        id:'weitoutiao'
    },{
        txt:'文章',
        id:'wenzahng'
    }],
    currentId:'weitoutiao',
    userInfo:{},
    articles:[]
};
},
//监听属性 类似于data概念
computed: {
    tt_count(){
        return this.$store.state.userInfo.tt_count
    },
    article_count(){
        return this.$store.state.userInfo.article_count
    }
},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    currentTAb:function(id){
        this.currentId = id;
    },
    modifyUserInfoTab:function(){
        if(this.$store.state.isLogin){
            this.$router.push('/Usermodify')
        }
    },
    deleteArticle(index,nid){
        console.log(index,nid);
          this.$axios.post('/deleteArticle',{'nid':nid})
          .then((res) => {
            if (res.ret == 0){
                let i = this.$store.state.userInfo.tt_count
                console.log(i);
                this.$store.state.userInfo.tt_count  = i - 1
                console.log(this.$store.state.userInfo.tt_count);
                this.articles.splice(index,1);
            }else{
              this.$Message({msg:res.msg})
              return false;
            }
          })
          .catch((res) => {
            console.log('加载失败');
            return false;
          })
        
      },
    jumpMessageDetaile:function(nid){
        this.$router.push({
            path:'/MessageDtaile',
            query:{nid:nid}
        })
    },
    jumpIndex(){
         this.$router.push('/')
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
     document.body.style.backgroundColor = '#f4f5f6'
    this.userInfo = this.$store.state.userInfo;
    this.$axios.post('/getArticlesByType',{
        'type':'TT',
        'oauth_token':this.userInfo.oauth_token
    }).then(res => {
        // console.log(res);
        if(res.ret === 0){
            // console.log( res.articles);
            this.articles = res.articles
        }
    })
},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {
     document.body.style.backgroundColor = '#fff'
}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' scoped>
    .UserDtail {
        width: 100%;
        // height: 100%;
        background-color:#f4f5f6;
    .UserDtail-header {
        height: 60px;
        line-height: 60px;
        background-color: white;
        div{
            width: 70vw;
            margin: auto;
             img {
                width: 100px;
                height: 30px;
                vertical-align: middle;
        }
        }
       
    }

    .UserDtail-userInfo {
         width: 70%;
        margin:0 auto 20px;
        position: relative;
        height: 250px;
        background-color: white;
        img{
            width: 100%;
        }
        .user{
            position: absolute;
            top: 130px;
            padding-left: 20px;
            span{
                // display: inline-block;
                
                padding: 0 10px;
                margin-bottom: 20px;
                font-size: 26px;
                font-weight: 800;
            }
            img{
                width: 100px;
                height: 100px;
                border-radius: 50%;
                // vertical-align: middle;
            }
        }
    }

    .UserDtail-articles {
        width: 70%;
        margin: auto;
        
        .articles-title {
            display: flex;
            height: 60px;
            width: 70%;
            justify-content: start;
            align-items: center;
            // border-bottom: 1px solid #ddd;
            // background-color: white;
            span {
                padding: 0 20px;
                font-size: 20px;

            }
            .active{
                color: blue;
            }
        }

        .articles-content {
           
            display: flex;
            // justify-content: space-between;
            .content{
                margin-right: 20px;
                 background-color: white;
                   width: 70%;
                .articleslist{
                    width: 100%;
                    height: 160px;
                    display: flex;
                    padding: 10px 0;
                    border-bottom: 1px solid #ddd;
                    position: relative;
                    .list-left {
                        width: 30%;
                        height: 100%;
                        cursor: pointer;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .list-right {
                        width: 70%;
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        .middle-top {
                            width: 100%;
                            height: 50px;
                            font-weight: 700;
                            font-size: 20px;
                            line-height: 80px;
                            padding-left: 10px;
                            cursor: pointer;
                        }

                        .middle-botton {
                            width: 100%;
                            height: 50px;
                            display: flex;
                            color: #979797;
                            line-height: 50px;
                            padding-left: 10px;
                            .headPortrait{
                                width: 30px;
                                height: 30px;
                                margin-right: 10px;
                                border-radius: 50%;
                            img {
                                width: 100%;
                                height: 100%;
                                border-radius: 50%;
                            }
                            }

                            .userName {
                                line-height: 35px;
                            }
                            .dot{
                                line-height: 35px;
                                margin-left: 10px;
                            }
                            .time {
                                line-height: 35px;
                                margin-left: 10px;
                            }
                        }
                        }
                    .delete{
                        cursor: pointer;
                        position: absolute;
                        right: 10px;
                        display: none;
                    }
                    &:hover .delete{
                        display: block;
                    }
                }
                
            }
            .articles-count{
                display: flex;
                width: 350px;
                height: 100px;
                background-color: white;
                margin: 0 auto;
                div{
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    p{
                        text-align: center;
                        font-size: 20px;
                        padding: 0 10px 10px;
                    }
                }
                .left{
                    border-right: 1px solid #ddd;
                }
            }
        }
    }
}
</style>