<template>
  <div class="lead-news">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="文章" name="textAtc">
        <ul>
          <li v-for="(item,index) in atcArr" :key="index">
            <div class="news-img" v-if="item.img">
              <a target="_blank" @click="goToDetail(item.nid)">
                <img :src="item.img" lazy="loaded" />
              </a>
            </div>
            <div class="news-detail">
              <div class="user-info">
                <img :src="userInfo.avator" lazy="loaded" class="user-img" />
                <span class="user-name">{{userInfo.nickname}}</span>
              </div>
              <a target="_blank" class="news-content n-body" @click="goToDetail(item.nid)">
                <div v-html="item.content"></div>
              </a>
              <span class="news-time">&nbsp;{{item.created_at.slice(0, 10)}}</span>
            </div>
            <div class="delete" @click="delNews('文章', item.nid, index)">
              <i class="iconfont icon-shanchu"></i>
              <span>删除</span>
            </div>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="微头条" name="textMsg">
        <ul>
          <li v-for="(item,index) in msgArr" :key="index">
            <div class="news-img" v-if="item.img">
              <a target="_blank" @click="goToDetail(item.nid)">
                <img :src="item.img" lazy="loaded" />
              </a>
            </div>
            <div class="news-detail">
              <div class="user-info">
                <img :src="userInfo.avator" lazy="loaded" class="user-img" />
                <span class="user-name">{{userInfo.nickname}}</span>
              </div>
              <a target="_blank" class="news-content" @click="goToDetail(item.nid)">
                <div v-html="item.content"></div>
              </a>
              <span class="news-time">&nbsp;{{item.created_at.slice(0, 10)}}</span>
            </div>
            <div class="delete" @click="delNews('微头条', item.nid, index)">
              <i class="iconfont icon-shanchu"></i>
              <span>删除</span>
            </div>
          </li>
        </ul>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: "textAtc",
      msgArr: [],
      atcArr: []
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  mounted() {
    this.getNews("TT");
    this.getNews("Article");
  },
  methods: {
    getNews(type) {
      let params = new FormData();
      params.append("type", type);
      params.append("oauth_token", this.$store.state.userInfo.oauth_token);
      this.axios.post("/getArticlesByType", params).then(res => {
        if (res.data.ret == 0) {
          if (type === "TT") this.msgArr = res.data.articles;
          else if (type === "Article") this.atcArr = res.data.articles;
        } else {
          this.$message(`获取文章失败`);
        }
      });
    },
    goToDetail(id) {
      this.$router.push({
        path: "/newsDetail",
        query: { nid: id }
      });
    },
    delNews(type, nid, index) {
      this.$confirm(`确定删除该${type}`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = new FormData();
          params.append("nid", nid);
          params.append("oauth_token", this.$store.state.userInfo.oauth_token);
          this.axios.post("/deleteArticle", params).then(res => {
            if (res.data.ret == 0) {
              if (type === "微头条") {
                this.msgArr.splice(index, 1);
                this.$store.commit(
                  "msgCount",
                  this.msgArr.length
                );
                this.getNews("TT");
              } else if (type === "文章") {
                this.atcArr.splice(index, 1);
                this.$store.commit(
                  "articleCount",
                  this.atcArr.length
                );
                this.getNews("Article");
              }
            } else {
              this.$message(`${res.data.msg}`);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style scoped lang="less">
.lead-news {
  width: 700px;
  background: #fff;

  .el-tabs {
    .el-tab-pane {
      ul {
        padding: 0 30px;

        li {
          padding: 30px 0;
          border-bottom: 1px solid #eee;
          display: flex;
          align-items: center;
          position: relative;

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
            width: 475px;
            display: flex;
            flex-flow: column;

            .user-info {
              display: flex;
              align-items: center;
              font-size: 15px;
              color: #555;
              white-space: nowrap;

              .user-img {
                width: 25px;
                height: 25px;
                border-radius: 50%;
                margin-right: 10px;
              }

              .user-name {
                font-size: 18px;
                font-weight: 600;
              }
            }

            .news-content {
              margin: 15px 0 15px 2em;
              max-width: 100%;
              max-height: 40px;
              overflow: hidden;
            }

            .news-time {
              color: #999;
              font-size: 14px;
              text-indent: 2em;
            }
          }

          .delete {
            color: #999;
            font-size: 15px;
            display: none;
            position: absolute;
            bottom: 30px;
            right: 0;
            cursor: pointer;

            &:hover {
              color: #f66;
            }
          }

          &:hover .delete {
            display: block;
          }
        }
      }
    }
  }
}
</style>
