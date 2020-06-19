<template>
<section class="tt-m-index">
        <section class="tt-m-header">
            <section class="header">
                <section class="header-email">邮件</section>
                <section class="header-title">头条</section>
                <section class="header-search">搜索</section>
            </section>
            <section class="tt-m-tab">
                <section class="tab-nav">
                    <a href="">推荐</a>
                    <a href="">视频</a>
                    <a href="">热点</a>
                    <a href="">社会</a>
                    <a href="">娱乐</a>
                    <a href="">军事</a>
                    <a href="">科技</a>
                    <a href="">汽车</a>
                    <a href="">房产</a>
                    <a href="">家居</a>
                    <a href="">体育</a>
                    <a href="">财经</a>
                </section>
                <section class="tab-more">+</section>
            </section>
        </section>

        <section class="tt-m-content">
            <section class="content-list" v-for="article in articles">
               <a class="list-item"
               @click.stop="toAriticle(article.nid)"
               >
                    <section class="item-title">{{article.title}}</section>
                    <section class="item-time">{{article.created_at}}</section>
                </a>
            </section>
        </section>
    </section>
</template>

<script>

export default {
   components: {},
   data() {
      return {
        lastid: 0, // 默认都是0 不用修改
        articles: [], // 文章列表
        page: 0, //当前请求的页码
        number: 20, //请求的条数
        is_loading: false //是否正在请求
      };
   },
   mounted() {
      let _this = this;
    // 添加页面的滚动事件
    window.addEventListener("scroll", () => {
      //console.log("正在滚动中");
      //1. 获取整个屏幕可以滚动的高度
      let htmlElement = document.documentElement;
      let scrollHeight = htmlElement.scrollHeight;
      //2. 获取当前已经滚动的距离
      let scrollTop = htmlElement.scrollTop;
      //3. 获取当前浏览器可视区域的高度
      let clientHeight = htmlElement.clientHeight;
      // scrollHeight-scrollTop<=clientHeight 说明已经触底
      console.log(
        scrollHeight - scrollTop <= clientHeight ? "触底" : "继续努力，还没触底"
      );
      // 如果触底
      scrollHeight - scrollTop <= clientHeight ? _this.refresh() : "";
    });
    this.refresh();
   },
   methods: {
        refresh: function() {
      if (this.is_loading) {
        return false;
      }
      this.is_loading = true; //正在发请求
      this.$axios
        .post("http://tt.linweiqin.com/api/tt/getArticles", {
          lastid: 0,
          page:this.page++,
          number: 20
        })
        .then(res => {
          this.articles = (this.articles).concat(res.data.articles || []);
          this.page = res.current_page || this.page; // 设置当前的页码
          // 判断是否是最后一页 总页数17  当前页码 17,16
          if (res.counts / this.number <= res.current_page) {
            this.$message({
              msg: "已经到最后一页了"
            });
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.is_loading = false;
        });
    },
      toAriticle:function(nid){
         localStorage.setItem("nid",nid)
         this.$router.push({
            path:"/article"
         })
      }
   },
}

</script>
<style lang='less' scoped>
//在屏幕可视窗口尺寸大于 480 像素的设备上修改背景颜色:
// @media screen and (min-width:480px){
//     body{
//       background-color:lightgreen;
//     }
//   }
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
html{
    //设置为移动端的字体大小，默认16px  1rem=10px 10/16=0.625
    font-size: 62.5%;
    --themeColor:#d23f42;
    --bgColor:rgba(221, 221, 221);
}
a{
    text-decoration: none;
    color: black;
}

.tt-m-index {
    .tt-m-header{
        position: fixed;
        width: 100vw;
        z-index: 999;
        .header {
            height: 4.5rem;
            background-color: var(--themeColor);
            font-size: 1.8rem;
            display: flex;
            justify-content: space-between;
            padding: 1rem;
            color: white;
        .header-email {
    
        }
    
        .header-title {
            font-weight: 600;
        }
    
        .header-search {
    
        }
        }
        .tt-m-tab{
            display: flex;
            background-color:var(--bgColor);
            .tab-nav{
                width: 90%;
                font-size: 1.8rem;
                overflow-x: scroll;
                overflow-y: hidden;
                white-space: nowrap;
                a{
                    padding: 0.8rem;
                    display: inline-block;
                    text-align: center;
                    color: #555;
                }
            }
            .tab-nav::-webkit-scrollbar{
                display: none;
            }
            .tab-more{
                width: 10%;
                text-align: center;
                line-height: 3.4rem;
                font-size: 2rem;
            }
        }
    }
    .tt-m-content {
        position: absolute;
        top: 9rem;
        .content-list {
          .list-item {
             display: inline-block;
             width: 100vw;
              padding: 1rem;
              border-bottom: 1px solid #ddd;
            .item-title {
                margin: 0.5rem;
                font-size: 2rem;
            }
            
            .item-time {
                margin: 0.5rem;
                font-size: 1.5rem;
                color: #777;
            }
          }
        }
      }
  }
</style>