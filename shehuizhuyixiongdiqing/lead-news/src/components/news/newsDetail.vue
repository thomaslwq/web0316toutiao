<template>
  <div class="news-detail">
    <div class="n-header">
      <div class="n-headerCt">
        <a href="/">
          <img src="//s3.pstatp.com/toutiao/static/img/logo.271e845.png" />
        </a>
        <el-autocomplete
          placeholder="搜索站内资讯、视频或用户"
          v-model="searchText"
          :fetch-suggestions="searchAsync"
          @keyup.enter.native="goToSearch"
        >
          <el-button slot="append" @click="goToSearch">搜索</el-button>
        </el-autocomplete>
      </div>
    </div>
    <div class="n-content">
      <ul class="n-share">
        <li>
          <img src="//s3.pstatp.com/toutiao/static/img/repost.021bf16.png" />
          <span>转发</span>
        </li>
        <li>
          <i class="iconfont icon-square-Weibo"></i>
          <span>微博</span>
        </li>
        <li>
          <i class="iconfont icon-square-QQspace"></i>
          <span>Qzone</span>
        </li>
        <li>
          <i class="iconfont icon-square-WeChat"></i>
          <span>微信</span>
        </li>
      </ul>
      <div class="n-body">
        <h1>{{newsInfo.title}}</h1>
        <p>
          <span>{{newsInfo.n_user.nickname}}</span>
          <span>{{newsInfo.created_at}}</span>
        </p>
        <div class="n-text" v-html="newsInfo.content"></div>
        <div class="n-imgs" v-if="newsInfo.imgs && newsInfo.imgs.length">
          <img
            v-for="(item,index) in newsInfo.imgs"
            v-show="index !== failImgIdx"
            :src="item"
            :key="index"
            @error="hideFail(index)"
          />
        </div>
        <ul class="n-options">
          <li>
            <i class="iconfont icon-collect"></i>
            <span>收藏</span>
          </li>
          <li>
            <i class="iconfont icon-warning"></i>
            <span>举报</span>
          </li>
        </ul>
      </div>
      <div class="n-user">
        <a href="/" target="_blank">
          <img :src="newsInfo.n_user.avator" />
        </a>
        <a href="/" target="_blank">
          <span>{{newsInfo.n_user.nickname}}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchText: "",
      newsInfo: {
        n_user: {},
        title: "",
        content: "",
        imgs: null,
        created_at: ""
      },
      failImgIdx: null,
      timer: null,
      srhList: [],
      newsList: []
    };
  },
  computed: {
    newsCount() {
      return this.$store.state.newsCount;
    }
  },
  mounted() {
    this.getAllNews();
    let params = new FormData();
    params.append("nid", this.$route.query.nid);
    this.axios.post("/getArticleById", params).then(res => {
      this.newsInfo = res.data.article;
    });
  },
  methods: {
    hideFail(index) {
      this.failImgIdx = index;
    },
    searchAsync(searchText, callback) {
      let showList = searchText
        ? this.srhList.filter(ele => {
            return (
              ele.value.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
            );
          })
        : [{ value: "请输入关键词" }];
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        callback(showList);
      }, 1000);
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
          this.newsList.forEach(ele => {
            this.srhList.push({
              value: ele.title,
              type: ele.type
            });
          });
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.news-detail /deep/ .el-input__inner {
  background: #fff;
  font-size: 15px;
  font-weight: 400;
}

.news-detail {
  .n-header {
    box-shadow: 0 0 5px #ccc;
    background: #fff;

    .n-headerCt {
      width: 1170px;
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

      .el-autocomplete {
        width: 340px;
        border: 1px solid #ddd;
        border-radius: 5px;
        overflow: hidden;

        .el-input {
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
  }

  .n-content {
    width: 1170px;
    margin: 20px auto;
    display: flex;

    .n-share {
      flex: 0 0 110px;

      li {
        display: flex;
        align-items: center;
        margin: 10px 0;
        cursor: pointer;

        img {
          width: 34px;
          height: 34px;
          margin-left: 1px;
        }

        i {
          font-size: 37px;
        }

        span {
          margin-left: 10px;
        }

        img:hover,
        i:hover {
          opacity: 0.6;
        }

        &:nth-of-type(2) i {
          color: #f66;
        }

        &:nth-of-type(3) i {
          color: #fa6;
        }

        &:nth-of-type(4) i {
          color: #6c6;
        }
      }
    }

    .n-body {
      flex: 1;
      margin: 0 30px;

      h1 {
        font-size: 36px;
        font-weight: 600;
        margin-bottom: 15px;
      }

      p {
        margin-bottom: 30px;

        span {
          font-size: 13px;
          color: #999;

          &:first-of-type {
            color: #333;
            font-size: 14px;
            padding-right: 5px;
          }
        }
      }

      .n-text {
        margin-bottom: 20px;
      }

      .n-imgs {
        display: flex;
        flex-flow: column;
        align-items: center;
        margin-bottom: 20px;

        img {
          max-width: 100%;
          margin-bottom: 20px;
        }
      }

      .n-options {
        display: flex;
        justify-content: flex-end;

        li {
          margin-left: 20px;
          color: #999;
          cursor: pointer;

          &:hover {
            color: #333;
          }
        }
      }
    }

    .n-user {
      flex: 0 0 340px;
      height: 90px;
      background: #f6f6f4;
      border-top: 2px solid #f66;
      padding: 0 20px;
      display: flex;
      align-items: center;

      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 15px;
      }

      span {
        font-size: 20px;
        font-weight: 600;
      }
    }
  }
}
</style>
