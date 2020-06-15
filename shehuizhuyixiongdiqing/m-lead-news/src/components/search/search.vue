<template>
  <div class="search">
    <div class="s-index" v-show="!showInput">
      <div class="s-top">
        <img
          src="https://sf3-ttcdn-tos.pstatp.com/obj/card-system/HeadBar/dist_browser/images/logo.545e6c99.png"
        />
        <el-input placeholder="搜点啥呢？" @focus="showInput = true">
          <i slot="append" class="el-icon-search"></i>
        </el-input>
      </div>
      <div class="s-btm">
        <img
          src="https://lf1-ttcdn-tos.pstatp.com/obj/card-system/26-hotlist/dist_browser/images/img_title-3x.f09da03a.png"
        />
        <span>冒充热搜的随机头条</span>
        <ul>
          <li v-for="(item,index) in rdNews" :key="index" @click="goToDetail(item.nid)">
            <h1>{{index + 1}}</h1>
            <p>{{item.title}}</p>
          </li>
        </ul>
        <a
          class="s-more"
          href="https://ib.snssdk.com/rogue/aladdin_landingpage/template/aladdin_landingpage/hot_words.html?isBrowser=true&traffic_source="
        >
          更多热搜
          <i class="el-icon-arrow-right"></i>
        </a>
      </div>
    </div>
    <div class="s-input" v-show="showInput">
      <form @submit.prevent="goToSearch()">
        <el-autocomplete placeholder="搜点啥呢？" v-model="searchText" :fetch-suggestions="searchAsync">
          <el-button slot="append" @click="goToSearch()">{{searchText ? '搜索' : '取消'}}</el-button>
        </el-autocomplete>
      </form>
      <div class="s-history" v-if="history.length">
        <div class="s-options">
          <h1>历史记录</h1>
          <i v-if="!delOption" class="el-icon-delete" @click="delOption = true"></i>
          <p v-else>
            <span @click="delHistory(-1)">全部删除</span>
            <span @click="delOption = false">完成</span>
          </p>
        </div>
        <ul>
          <li v-for="(item,index) in history" :key="index" @click="historyTo(item)">
            <span>{{item}}</span>
            <i v-if="delOption" class="el-icon-close" @click="delHistory(index)"></i>
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
      showInput: false,
      searchText: "",
      timer: null,
      delOption: false,
      history: JSON.parse(localStorage.getItem("search-history")) || []
    };
  },
  computed: {
    rdNews() {
      return this.$store.state.newsList
        .sort(() => parseInt(Math.random() + 1))
        .slice(0, 9);
    },
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
  methods: {
    goToDetail(id) {
      this.$router.push({
        path: "/newsDetail",
        query: { nid: id }
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
    historyTo(text) {
      if (!this.delOption) {
        this.$router.push({
          path: "/searchRes",
          query: { searchText: text }
        });
      }
    },
    goToSearch() {
      if (this.searchText.trim() !== "") {
        this.history.unshift(this.searchText);
        localStorage.setItem("search-history", JSON.stringify(this.history));
        this.$router.push({
          path: "/searchRes",
          query: { searchText: this.searchText }
        });
      } else {
        this.showInput = false;
      }
    },
    delHistory(index) {
      if (index >= 0) this.history.splice(index, 1);
      else this.history = [];
      localStorage.setItem("search-history", JSON.stringify(this.history));
    }
  }
};
</script>

<style scoped lang="less">
.search /deep/ .el-input__inner {
  padding: 0 30px;
  height: 100px;
  font-size: 30px;
  border: none;
}

.search /deep/ .el-input-group__append {
  height: 100px;
  background: #fff;
  border: none;
}

.search {
  .s-index {
    padding: 0 30px;

    .s-top {
      display: flex;
      flex-flow: column;
      align-items: center;
      margin: 100px 0;

      img {
        width: 260px;
        margin: 50px 0;
      }

      .el-input {
        height: 100px;
        border: 2px solid #333;
        border-radius: 10px;
        overflow: hidden;

        i {
          background: #fff;
          color: #333;
          font-size: 45px;
          padding: 0 10px;
        }
      }
    }

    .s-btm {
      img {
        width: 120px;
      }

      span {
        height: 30px;
        float: right;
        font-size: 27px;
        line-height: 30px;
        color: #888;
      }

      ul {
        li {
          height: 100px;
          display: flex;
          align-items: center;
          font-size: 33px;
          border-bottom: 2px solid #eee;

          h1 {
            margin-right: 30px;
            color: #f66;
          }

          &:nth-of-type(n + 4) h1 {
            color: #888;
          }
        }
      }

      .s-more {
        display: block;
        margin: 30px;
        text-align: center;
        color: #f66;
        font-size: 27px;
      }
    }
  }

  .s-input {
    padding: 30px;

    .el-autocomplete {
      width: 100%;
      height: 100px;
      border: 2px solid #666;
      border-radius: 10px;
      display: flex;
      align-items: center;
      overflow: hidden;
      margin-bottom: 20px;

      .el-input {
        height: 100px;

        .el-button {
          width: 120px;
          height: 50px;
          color: #333;
          font-size: 27px;
          border-left: 2px solid #ddd;
        }
      }
    }

    .s-history {
      margin-top: 30px;
      padding: 0 10px;

      .s-options {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 30px;

        i {
          color: #999;
        }

        p {
          color: #999;
          font-size: 27px;
          span {
            margin-left: 30px;
          }
        }
      }

      ul {
        margin-top: 20px;
        li {
          height: 66px;
          display: inline-flex;
          font-size: 25px;
          line-height: 66px;
          padding: 0 20px;
          background: #bcc;
          border-radius: 33px;
          margin-right: 20px;

          &:last-of-type {
            margin: 0;
          }

          i {
            margin-left: 20px;
            line-height: 66px;
          }
        }
      }
    }
  }
}
</style>
