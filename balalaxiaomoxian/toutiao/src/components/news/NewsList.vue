<template>
<div class='newsList'>
    <div class="newsList-refresh">
        <div class="refresh-text" @click.stop="refresh">点击刷新</div>
    </div>
    <div class="newsList-list">

      <div class="list-item" v-for="article in articles"  @click="toNewsDetail(article.nid)">
        <div class="item-left" v-if="article.img">
          <img :src="article.img" />
        </div>
        <div class="item-right">
          <div class="right-title">{{article.title}}</div>
          <div class="right-profile">
            <img :src="article.user.avator" />
            <div class="profile-nickname">{{article.user.nickname}}</div>
          </div>
          <div class="right-date">{{article.created_at}}</div>
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
     lastid:0,
     articles:[],
     page:0,
     number:20,
     isloding:false,
   };
},
methods:{
  refresh:function(){
    if(this.isloding){
      return false
    }
    this.isloding  = true
    this.$axios.post("/getArticles",{
      lastid:this.lastid,
      page:this.page++,
      number:this.number
    }).then(res =>{
      this.isloding = false
      this.articles = (this.articles).concat(res.articles||[])
      //判断是否最后一页
      res.counts/this.number <= res.current_page?this.$message({
        msg:"已经到最后一页了"
      }):""
    })
  },
  toNewsDetail:function(nid){
    this.$router.push(
      {
        path:"/newsDetail",
        query:{
          nid:nid
          }
      })
  }
},
mounted(){
  let that = this
  window.addEventListener("scroll",()=>{
    console.log('在滚动');
    let htmlElement = document.documentElement
    let scrollHeight = htmlElement.scrollHeight;
    let scrollTop = htmlElement.scrollTop
    let clienHeight = htmlElement.clientHeight

    scrollHeight-scrollTop<=clienHeight?that.refresh():""
  })
  this.refresh()

  // this.$axios.post("/getArticles",{
  //   lastid:this.lastid
  // }).then(res=>{
  //   this.articles = res.articles || []
  //   if (this.articles.length > 0) {
  //     // 获取最后一条文章或头条的 id
  //     this.lastid = this.articles[0].nid;
  //   }
  // })
}
}
</script>
<style lang='less' scoped>
.newsList {
  .newsList-refresh {
      width: 100%;
      height: 30px;
      line-height: 30px;
      border: 1px solid #95c1e8;
      background-color: #eff6fc;
      color: #4b8cd6;
      text-align: center;
      border-radius: 5px;
      cursor: pointer;
    .refresh-text {

    }
  }

  .newsList-list {
    .list-item {
      display: flex;
      padding: 20px 0;
      border-bottom: 1px solid #ddd;
      cursor: pointer;
      .item-left {
        img {
          width: 156px;
          height: 100px;
        }
      }

      .item-right {
        margin: 10px;
        line-height: 30px;
        .right-title {
          font-size: 18px;
          font-weight: 600;
        }

        .right-profile {
          display: flex;
          img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            margin-right: 8px;
          }

          .profile-nickname {

          }
        }

        .right-date {

        }
      }
    }
  }
}
</style>