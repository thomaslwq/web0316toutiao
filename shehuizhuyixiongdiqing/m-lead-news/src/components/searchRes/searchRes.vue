<template>
  <div class="search-res">
    <div class="sr-input">
      <form @submit.prevent="goToSearch">
        <el-input placeholder="搜点啥呢？" v-model="searchText" :fetch-suggestions="searchAsync">
          <el-button slot="append" @click="goToSearch">搜索</el-button>
        </el-input>
      </form>
    </div>
    <h1 class="sr-notice">"{{this.searchText}}"&emsp;的搜索结果</h1>
    <div class="sr-content">
      <div class="msg-res">
        <h3>微头条</h3>
        <ul>
          <li v-for="(item,index) in msgRes" :key="index" @click="goToDetail(item.nid)">
            <div class="news-img" v-if="item.img">
              <a target="_blank">
                <img :src="item.img" lazy="loaded" />
              </a>
            </div>
            <div class="news-detail">
              <a target="_blank" class="news-title">{{item.title}}</a>
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
          <li v-for="(item,index) in atcRes" :key="index" @click="goToDetail(item.nid)">
            <div class="news-img" v-if="item.img">
              <a target="_blank">
                <img :src="item.img" lazy="loaded" />
              </a>
            </div>
            <div class="news-detail">
              <a target="_blank" class="news-title">{{item.title}}</a>
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
      atcRes: []
    };
  },
  computed: {
    newsList() {
      return this.$store.state.newsList;
    }
  },
  mounted() {
    this.searchText = this.$route.query.searchText;
    this.searchRes();
  },
  methods: {
    goToDetail(id) {
      this.$router.push({
        path: "/newsDetail",
        query: { nid: id }
      });
    },
    searchRes() {
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
    searchAsync(searchText, callback) {
      let showList = searchText
        ? this.newsList.filter(ele => {
            return (
              ele.value.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
            );
          })
        : [];
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        callback(showList);
      }, 1000);
    },
    goToSearch() {
      if (this.searchText.trim() !== "") {
        this.$router.push({
          path: "/searchRes",
          query: { searchText: this.searchText }
        });
      }
    }
  }
};
</script>

<style scoped lang="less">
.search-res /deep/ .el-input__inner {
  padding: 0 30px;
  height: 100px;
  font-size: 33px;
  border: none;
}

.search-res /deep/ .el-input-group__append {
  height: 100px;
  background: #fff;
  border: none;
}

.search-res {
  .sr-input {
    padding: 30px;

    .el-input {
      width: 100%;
      height: 100px;
      border: 2px solid #666;
      border-radius: 10px;
      overflow: hidden;
      margin-bottom: 20px;

      .el-button {
        width: 120px;
        height: 50px;
        color: #333;
        font-size: 27px;
        border-left: 2px solid #ddd;
      }
    }
  }
  .sr-notice {
    text-align: center;
    font-weight: 600;
    font-size: 25px;
    color: #999;
    margin-bottom: 20px;
  }
  .sr-content {
    padding: 0 30px;
    .msg-res,
    .atc-res {
      background: #fff;
      border-top: 4px solid #f66;
      padding: 0 20px;
      margin-bottom: 40px;
      h3 {
        font-size: 27px;
        color: #f66;
        padding: 30px 0;
      }
      ul {
        li {
          padding: 20px 10px;
          border-bottom: 2px solid #eee;
          display: flex;
          align-items: center;

          &:last-of-type {
            border: none;
          }

          .news-img {
            width: 240px;
            height: 160px;
            background: #f6f6f4;
            margin-right: 20px;
            overflow: hidden;
            flex-shrink: 0;
            a {
              display: inline-block;
              width: 240px;
              height: 160px;
              display: flex;
              align-items: center;
              justify-content: center;
              img {
                max-width: 100%;
                height: auto;
              }
            }
          }
          .news-detail {
            max-width: 370px;
            .news-title {
              font-size: 36px;
              font-weight: 600;
              margin-bottom: 20px;
            }
            .news-body {
              color: #999;
              max-width: 100%;
              max-height: 80px;
              overflow: hidden;
              font-size: 30px;
            }
            .news-info {
              font-size: 25px;
              color: #aaa;
              margin-top: 20px;
              white-space: nowrap;
              display: flex;
              align-items: center;

              a {
                color: #666;
                img {
                  width: 30px;
                  height: 30px;
                  border-radius: 50%;
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
