<template>
<div class='newsDetail'>
    <div class="newsDetail-content">
        <div class="content-left">
            <div>转发</div>
            <div>微博</div>
            <div>Qzone</div>
            <div>微信</div>
        </div>
        <div class="content-middle">
            <h1 class="title">{{article.title}}</h1>
            <div class="publishDate">{{article.created_at}}</div>
            <div v-html="article.content"></div>
        </div>
        <div class="content-right">
            <div class="right-user">
                <img :src="this.userInfo.avator" >
                <span>{{this.userInfo.user_id}}</span>
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
       article:"",
       userInfo:this.$store.state.userInfo
   };
},
mounted(){
    let nid = this.$router.history.current.query.nid
    this.$axios.post("/getArticleById",{
        nid:nid
    }).then(res=>{
        this.article = res.article
    })
}
}
</script>
<style lang='less' scoped>
.newsDetail {
  .newsDetail-content {
      width: 1100px;
      margin: 10px auto;
      display: flex;
    .content-left {
        flex: 1;
        padding: 5px;
        line-height: 40px;
    }

    .content-middle {
        flex: 6;
        width: 660px;
        border: 1px solid rgba(236, 236, 236);
        margin: 15px;
        padding: 5px;
        .title {

        }

        .publishDate {

        }

        .articleImg {
            img {
                width: 660px;
            }
        }
    }

    .content-right {
        flex: 2.5;
        background-color: var(--bgColor);
        border-top: 2px solid var(--themeColor);
        display: flex;
        padding:20px;
        .right-user {
            display: flex;
            align-items: center;
            img {
                margin: 10px;
                width: 80px;
                height: 80px;
                border-radius: 50%;
            }

            span {

            }
            }
    }
  }
}
</style>