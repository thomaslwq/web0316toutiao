<template>
  <div class="search-res">
    <div class="s-header">
      <div class="s-headerCt">
        <a href="/">
          <img src="//s3.pstatp.com/toutiao/static/img/logo.271e845.png" />
        </a>
        <el-input placeholder="搜索站内资讯、视频或用户" v-model="searchText" @keyup.enter.native="goToSearch">
          <el-button slot="append" @click="getAllNews">搜索</el-button>
        </el-input>
      </div>
    </div>
    <h1>"{{this.searchText}}"&emsp;的搜索结果</h1>
    <div class="s-content">
      <div class="msg-res">
        <h3>微头条</h3>
        <ul>
          <li v-for="(item,index) in msgRes" :key="index">
            <div class="news-img" v-if="item.img">
              <a target="_blank" @click="goToDetail(item.nid)">
                <img :src="item.img" lazy="loaded" />
              </a>
            </div>
            <div class="news-detail">
              <a target="_blank" class="news-title" @click="goToDetail(item.nid)">{{item.title}}</a>
              <div v-html="item.content" class="news-body n-body"></div>
              <div class="news-info">
                <a class="user-img">
                  <img :src="item.user.avator" lazy="loaded" />
                </a>
                <a class="user-name">&nbsp;{{item.user.nickname}}&nbsp;⋅</a>
                <span>&nbsp;{{item.created_at.slice(0, 10)}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="atc-res">
        <h3>文章</h3>
        <ul>
          <li v-for="(item,index) in atcRes" :key="index">
            <div class="news-img" v-if="item.img">
              <a target="_blank" @click="goToDetail(item.nid)">
                <img :src="item.img" lazy="loaded" />
              </a>
            </div>
            <div class="news-detail">
              <a target="_blank" class="news-title" @click="goToDetail(item.nid)">{{item.title}}</a>
              <div v-html="item.content" class="news-body n-body"></div>
              <div class="news-info">
                <a class="user-img">
                  <img :src="item.user.avator" lazy="loaded" />
                </a>
                <a class="user-name">&nbsp;{{item.user.nickname}}&nbsp;⋅</a>
                <span>&nbsp;{{item.created_at.slice(0, 10)}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchText: "",
      timer: null,
      msgRes: [],
      atcRes: [],
      newsList: []
    };
  },
  computed: {
    newsCount() {
      return this.$store.state.newsCount;
    }
  },
  mounted() {
    this.searchText = this.$route.query.searchText;
    this.getAllNews();
  },
  methods: {
    goToDetail(id) {
      this.$router.push({
        path: "/newsDetail",
        query: { nid: id }
      });
    },
    searchRes() {
      console.log(this.newsList);
      this.msgRes = this.newsList.filter(ele => {
        return (
          ele.title.toLowerCase().indexOf(this.searchText.toLowerCase()) !==
            -1 && ele.type === "TT"
        );
      });
      this.atcRes = this.newsList.filter(ele => {
        return (
          ele.title.toLowerCase().indexOf(this.searchText.toLowerCase()) !==
            -1 && ele.type === "Article"
        );
      });
    },
    goToSearch() {
      if (this.searchText.trim() !== "") {
        this.$router.push({
          path: "/newsSearch",
          query: { searchText: this.searchText }
        });
      }
    },
    getAllNews() {
      let params = new FormData();
      params.append("page", 0);
      params.append("number", this.newsCount);
      this.axios.post("/getArticles", params).then(res => {
        if (res.data.ret == 0) {
          this.newsList = res.data.articles;
          this.searchRes();
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.search-res /deep/ .el-input__inner {
  background: #fff;
  font-size: 15px;
  font-weight: 400;
}

.search-res {
  background: #f6f6f4;
  min-height: 100vh;
  height: 100%;

  .s-header {
    width: 100%;
    box-shadow: 0 0 5px #ccc;
    background: #fff;
    position: fixed;
    top: 0;
    z-index: 10;

    .s-headerCt {
      width: 1060px;
      height: 60px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;

      a {
        img {
          width: 108px;
        }
      }

      .el-input {
        width: 500px;
        border: 1px solid #ddd;
        border-radius: 5px;
        overflow: hidden;

        .el-button {
          height: 42px;
          background: #f66;
          color: #fff;
          border: 0;
          border-radius: 0;
        }
      }
    }
  }

  h1 {
    width: 1060px;
    margin: 0 auto;
    padding-top: 100px;
    font-weight: 600;
    color: #999;
  }

  .s-content {
    width: 1060px;
    margin: 30px auto 0;
    display: flex;
    justify-content: space-between;

    .msg-res,
    .atc-res {
      width: 500px;
      background: #fff;
      border-top: 2px solid #f66;
      padding: 0 20px;

      h3 {
        font-size: 18px;
        color: #f66;
        padding: 15px 0;
      }

      ul {
        li {
          padding: 15px 5px;
          border-bottom: 1px solid #eee;
          display: flex;
          align-items: center;

          .news-img {
            width: 150px;
            height: 100px;
            background: #f6f6f4;
            margin-right: 15px;
            overflow: hidden;
            flex-shrink: 0;

            a {
              display: inline-block;
              width: 150px;
              height: 100px;
              display: flex;
              align-items: center;
              justify-content: center;

              img {
                max-width: 100%;
                height: auto;
                transition: all 0.3s ease 0.1s;

                &:hover {
                  transform: scale(1.1);
                }
              }
            }
          }

          .news-detail {
            max-width: 285px;

            .news-title {
              font-size: 20px;
              font-weight: 600;
              margin-bottom: 10px;
            }

            .news-body {
              color: #999;
              max-width: 100%;
              max-height: 40px;
              overflow: hidden;
            }

            .news-info {
              display: flex;
              align-items: center;
              font-size: 15px;
              color: #aaa;
              margin-top: 10px;
              white-space: nowrap;

              img {
                width: 20px;
                height: 20px;
                border-radius: 50%;
              }

              a {
                color: #666;

                &:hover {
                  color: #f66;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
