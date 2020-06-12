<template>
  <div class="news">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="懒人冒泡" name="textMsg">
        <el-input
          class="text-msg"
          type="textarea"
          placeholder="有啥子懊糟事儿，讲出来让大家伙儿乐呵一下"
          maxlength="500"
          :autosize="{minRows: 5}"
          :rows="5"
          show-word-limit
          v-model="msgText"
        ></el-input>
        <div class="msg-btm">
          <el-popover placement="bottom-start" trigger="click" class="img-upload">
            <el-upload
              drag
              multiple
              action="http://tt.linweiqin.com/api/tt/aliossUpload"
              :limit="9"
              :file-list="imgList"
            >
              <i class="el-icon-upload"></i>
              <div>
                将文件拖到此处，或
                <em>点击上传</em>
              </div>
              <div>只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <el-button slot="reference" class="upload-img">
              <i class="el-icon-picture"></i>有图有真香
            </el-button>
          </el-popover>
          <el-button class="send-msg" @click="sendMsg">发布</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="闲者拽文" name="textAtc">
        <el-input
          type="text"
          placeholder="求你做个标题党呗"
          maxlength="30"
          show-word-limit
          v-model="atcTitle"
        ></el-input>
        <vue-editor
          id="editor"
          use-custom-image-handler
          placeholder="救救审核君吧！不要写错别字了啊！"
          v-model="atcText"
        />
        <div class="msg-btm">
          <el-button class="send-msg" @click="sendMsg">发布</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-button icon="el-icon-refresh" class="refresh" @click="reloadNews">&nbsp;点击刷新&nbsp;</el-button>
    <ul>
      <li v-for="(item,index) in newsList" :key="index">
        <div class="news-img" v-if="item.img">
          <a target="_blank" @click="goToDetail(item.nid)">
            <img :src="item.img" lazy="loaded" />
          </a>
        </div>
        <div class="news-detail">
          <a target="_blank" class="news-title" @click="goToDetail(item.nid)">{{item.title}}</a>
          <div>
            <a class="user-img">
              <img :src="item.user.avator" lazy="loaded" />
            </a>
            <a class="user-name">&nbsp;{{item.user.nickname}}&nbsp;⋅</a>
            <span>&nbsp;{{item.created_at}}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  data() {
    return {
      activeTab: "textMsg",
      newsList: [],
      msgText: "",
      atcTitle: "",
      atcText: "",
      imgList: [],
      imgArr: []
    };
  },
  components: { VueEditor },
  mounted() {
    this.reloadNews();
  },
  methods: {
    sendMsg() {
      if (!this.$store.state.ifLogin) {
        this.$message(`谁啊谁啊，没登录就发？`);
      } else {
        let imgArr = [];
        for (let i = 0; i < this.imgList.length; i++) {
          imgArr.push(this.imgList[i].response.url);
        }
        this.imgArr = imgArr;
        let params = new FormData();
        params.append("content", this.msgText);
        params.append("imgArr", JSON.stringify(this.imgArr));
        params.append("oauth_token", this.$store.state.userInfo.oauth_token);
        this.axios.post("/createTT", params).then(res => {
          if (res.data.ret == 0) {
            this.$message(`${res.data.msg}`);
            this.$store.commit("tt_count", this.$store.state.userInfo.tt_count + 1);
            this.reloadNews();
          } else {
            this.$message(`发布头条失败_${res.data.msg}`);
          }
        });
      }
    },
    goToDetail(id) {
      this.$router.push({
        path: "/newsDetail",
        query: { nid: id }
      });
    },
    reloadNews() {
      let param = new FormData();
      param.append("lastid", this.lastId);
      this.axios.post("/getArticles").then(res => {
        if (res.data.ret == 0) {
          for (let i = res.data.articles.length - 1; i >= 0; i--) {
            if (res.data.articles[i].nid > this.lastId) {
              this.lastId = res.data.articles[i].nid;
            }
            this.newsList.unshift(res.data.articles[i]);
          }
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.news {
  .el-tabs {
    border: 1px solid #ddd;
    .el-tab-pane {
      .el-input {
        padding: 15px 0;
      }

      .msg-btm {
        border-top: 1px solid #ddd;

        .el-upload {
          width: 100%;
          div {
            color: #f66;
          }
        }

        .el-button.upload-img {
          border: none;
          background: transparent;

          i {
            color: #f66;
            margin-right: 5px;
          }

          &:hover {
            color: #f66;
          }
        }
        .el-button.send-msg {
          width: 110px;
          border: none;
          background: #f66;
          color: #fff;
          border-radius: 0;
          float: right;

          &:hover {
            background: #999;
          }
        }
      }
    }
  }

  .el-button.refresh {
    margin-top: 20px;
    width: 100%;
    background: #fff6f0;
    border: 1px solid #fca;
    color: #666;

    &:hover {
      color: #f66;
    }
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
        .news-title {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 10px;
        }

        div {
          display: flex;
          align-items: center;
          font-size: 15px;
          color: #aaa;

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
</style>
