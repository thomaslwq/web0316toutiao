<template>
  <div class="news-detail">
    <Download />
    <div class="n-content">
      <div class="n-body">
        <h1>{{newsInfo.title}}</h1>
        <div class="n-user">
          <p>
            <a href="/" target="_self">
              <img :src="newsInfo.n_user.avator" />
            </a>
            <strong>{{newsInfo.n_user.nickname}}</strong>
          </p>
          <span>{{newsInfo.created_at}}</span>
        </div>
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
      </div>
    </div>
    <div class="n-options">
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
          <i class="iconfont icon-square-WeChat"></i>
          <span>微信</span>
        </li>
      </ul>
      <ul class="n-others">
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
  </div>
</template>

<script>
import Download from "@/components/download/download";

export default {
  components: { Download },
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
      timer: null
    };
  },
  computed: {
    newsList() {
      let arr = [];
      this.$store.state.newsList.forEach(ele => {
        arr.push({
          value: ele.title,
          type: ele.type
        });
      });
      return arr;
    }
  },
  mounted() {
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
        ? this.newsList.filter(ele => {
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
    goToSearch() {}
  }
};
</script>

<style scoped lang="less">
.news-detail {
  min-height: 100vh;
  display: flex;
  flex-flow: column;
  .n-content {
    width: 100%;
    flex: 1;
    margin: 40px auto 0;
    .n-body {
      margin: 0 30px;
      h1 {
        font-size: 66px;
        margin-bottom: 20px;
      }
      .n-user {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
        p {
          padding: 0 5px;
          display: flex;
          align-items: center;
          a {
            img {
              width: 50px;
              height: 50px;
              border-radius: 50%;
              margin-right: 20px;
            }
          }
          strong {
            color: #333;
            font-size: 30px;
            font-weight: 600;
          }
        }
        span {
          font-size: 25px;
          color: #999;
          transform: translateY(6px);
        }
      }
      .n-text {
        padding: 0 10px;
        margin-bottom: 30px;
        font-size: 33px;
      }
      .n-imgs {
        display: flex;
        flex-flow: column;
        align-items: center;
        margin-bottom: 30px;
        img {
          max-width: 100%;
          margin-bottom: 30px;
        }
      }
    }
  }
  .n-options {
    height: 200px;
    display: flex;
    flex-flow: column;
    justify-content: space-evenly;
    align-items: center;
    .n-share {
      display: flex;
      justify-content: center;
      li {
        display: flex;
        flex-flow: column;
        align-items: center;
        margin: 0 30px;
        img {
          width: 58px;
        }
        i {
          font-size: 60px;
        }
        span {
          margin-top: 10px;
          font-size: 27px;
          color: #666;
        }
        &:nth-of-type(2) i {
          color: #f66;
        }
        &:nth-of-type(3) i {
          color: #6c6;
        }
      }
    }
    .n-others {
      display: flex;
      justify-content: center;
      li {
        margin: 0 20px;
        color: #999;
        font-size: 25px;
      }
    }
  }
}
</style>