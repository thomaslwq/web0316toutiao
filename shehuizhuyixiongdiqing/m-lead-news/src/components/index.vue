<template>
  <div class="index">
    <el-dialog :visible.sync="ifPop" fullscreen>
      <img src="//s3a.pstatp.com/growth/mobile_list/image/popup_banner_6006ac97.png" />
      <p>已加载好您感兴趣的头条</p>
      <a
        href="https://s9.pstatp.com/package/apk/news_article/news_article_Wap_index_left_v7760_af7ee20.apk?v=1591636034"
        target="_blank"
      >
        <el-button type="primary">立即打开</el-button>
      </a>
    </el-dialog>
    <header>
      <div class="i-notice" @click="notice">
        <img src="//s3.pstatp.com/growth/mobile_list/image/feed_ic_message_normal@3x_f2ea949f.png" />
        <i v-if="!ifNotice"></i>
      </div>
      <div class="i-app">
        <img
          src="//s3b.pstatp.com/growth/mobile_list/image/wap_logo@3x_581de69e.png"
          @click="toTop(false)"
        />
        <i @click="toTop(true)" :class="{refresh: ifRefresh}"></i>
      </div>
      <div class="i-search">
        <a @click="goTo('/search')">
          <img src="//s3.pstatp.com/growth/mobile_list/image/feed_ic_search_normal@3x_0f198e56.png" />
        </a>
      </div>
    </header>
    <nav>
      <el-menu
        :default-active="activeIndex"
        mode="horizontal"
        active-text-color="#799"
        background-color="#f4f6f6"
      >
        <el-menu-item v-for="(item,idx) in channelList.added" :key="idx" :index="`${idx}`">{{item}}</el-menu-item>
        <el-menu-item>&emsp;</el-menu-item>
      </el-menu>
      <i @click="goTo('/channel')">+</i>
    </nav>
    <ul class="i-news">
      <li v-for="(item,index) in newsList" :key="index" @click="goToDetail(item.nid)">
        <div class="news-img" v-if="item.img">
          <a target="_blank">
            <img :src="item.img" lazy="loaded" />
          </a>
        </div>
        <div class="news-detail">
          <a target="_blank" class="news-title" @click="goToDetail(item.nid)">{{item.title}}</a>
          <div>
            <a class="user-img">
              <img :src="item.user.avator" lazy="loaded" />
            </a>
            <a class="user-name">{{item.user.nickname}}</a>
          </div>
          <p>{{item.created_at}}</p>
        </div>
      </li>
    </ul>
    <div v-loading="loading" class="loading"></div>
    <Download style="position: fixed; bottom: 0" />
  </div>
</template>

<script>
import Download from "@/components/download/download";

export default {
  components: { Download },
  data() {
    return {
      ifNotice: localStorage.getItem("if-notice") || false,
      ifPop: false,
      ifRefresh: false,
      timer: null,
      activeIndex: "0",
      newsList: [],
      refresh: true,
    };
  },
  computed: {
    lazyPages() {
      return this.$store.state.lazyPages;
    },
    loading() {
      return this.$store.state.loading;
    },
    channelList() {
      return this.$store.state.channelList;
    },
    oldLength() {
      return localStorage.getItem('old-length') || 0;
    }
  },
  mounted() {
    this.reloadNews();
    window.addEventListener("scroll", e => {
      let scrollTotal =
        document.body.scrollHeight - document.documentElement.clientHeight;
      if (document.documentElement.scrollTop >= scrollTotal) {
        this.$store.commit("lazyPages", this.lazyPages + 1);
        this.refresh = false;
        this.reloadNews();
      }
    });
    let startY, endY;
    window.addEventListener("touchstart", e => {
      if (document.documentElement.scrollTop === 0) {
        startY = e.touches[0].clientY;
      }
    });
    window.addEventListener("touchend", event => {
      endY = event.changedTouches[0].clientY;
      if (endY - startY >= 100) {
        this.reloadNews();
      }
    });
  },
  methods: {
    goTo(url) {
      this.$router.push(url);
    },
    goToDetail(id) {
      this.$router.push({
        path: "/newsDetail",
        query: { nid: id }
      });
    },
    reloadNews() {
      this.ifRefresh = true;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.ifRefresh = false;
      }, 1000);
      let page = this.refresh ? 0 : this.lazyPages;
      let params = new FormData();
      params.append("page", page);
      params.append("number", 15);
      this.axios.post("/getArticles", params).then(res => {
        if (res.data.ret == 0) {
          if (this.refresh) {
            console.log(res.data);
            this.newsList = [];
          }
          this.newsList.push(...res.data.articles);
          this.$store.commit("newsList", this.newsList);
          if (res.data.counts - this.oldLength && this.refresh) {
            this.$message(
              `为您推荐${res.data.counts - this.oldLength}篇新头条`
            );
          }
          localStorage.setItem('old-length', res.data.counts);
          this.refresh = true;
        }
      });
    },
    toTop(refresh) {
      window.scrollTo(0, 0);
      if (refresh) this.reloadNews();
    },
    notice() {
      this.ifPop = true;
      this.ifNotice = true;
      localStorage.setItem("if-notice", this.ifNotice);
    }
  }
};
</script>

<style scoped lang="less">
.el-menu-item.is-active {
  background: #f4f6f6 !important;
}
.el-submenu__title.is-active {
  background: #f4f6f6 !important;
}
.index /deep/ .el-dialog {
  width: 540px;
  height: 450px;
  border-radius: 10px;
  position: fixed;
  top: calc(40% - 225px);
  left: calc(50% - 270px);

  .el-dialog__header {
    height: 0;
    padding: 0;
  }

  .el-dialog__body {
    padding: 20px;
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;

    img {
      width: 320px;
      margin: 0 auto;
    }

    a {
      .el-button {
        width: 270px;
        height: 60px;
        background: #699;
      }
    }
  }
}
@keyframes refresh {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
.index {
  header {
    width: 100%;
    height: 88px;
    background: #799;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
    position: fixed;
    z-index: 10;

    .i-notice {
      position: relative;

      img {
        height: 48px;
      }

      i {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #fff;
        position: absolute;
        right: 0;
        top: 0;
      }
    }

    .i-app {
      width: 166px;
      position: relative;

      img {
        width: 100%;
      }

      i {
        width: 50px;
        height: 50px;
        position: absolute;
        right: -54px;
        top: calc(50% - 25px);
        background: url("//s3a.pstatp.com/growth/mobile_list/image/titlebar_refresh_small@3x_96fb31e4.png")
          no-repeat center center;
        background-size: 30px;

        &.refresh {
          animation: refresh 1s ease;
        }
      }
    }

    .i-search {
      a {
        img {
          height: 48px;
        }
      }
    }
  }

  nav {
    width: 100%;
    position: fixed;
    top: 88px;
    overflow: hidden;
    box-shadow: 0 0 10px #aaa;

    .el-menu {
      height: 74px;
      display: flex;
      overflow: auto;

      &::-webkit-scrollbar {
        height: 0;
      }

      .el-menu-item {
        height: 100%;
        margin: 0 10px;
        font-size: 25px;
        display: flex;
        align-items: center;
      }
    }

    i {
      width: 72px;
      height: 72px;
      position: absolute;
      top: 0;
      right: 0;
      font-size: 50px;
      text-align: center;
      line-height: 72px;
      background: #f4f6f6;
      color: #599;

      &::after {
        content: "";
        display: block;
        width: 20px;
        height: 74px;
        position: absolute;
        top: 0;
        left: -20px;
        background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAABXCAQAAACjUt0DAAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAAAEgAAABIAEbJaz4AAAAJdnBBZwAAABIAAABXAK421QoAAAFiSURBVEjH1ZbbtoMgDERnKP//yaYPVSAhF077dHQtamU7k0RKAxwcPCF4ItF+tWMNsVZS91uJhNlRX7FGPMgizOrEObJSiZUUAnRkR6q0qnErm7Lhc9UDBaXUt0kN0FOaOo4SQ5BRCahOA3HT5KwTE50GZhV37VazJKYljjE2SE+sPsittC1XW/FmgNVsZJcvuhvrAbLqffNadPXLYgaLzs8wWSo6rk9FYdeBUW/x1DRswfS6ysuNlcDZ7ssTSCpIfDsZn/J8b+Omh8pjR/X8DkuWndwnINpOlukFbtvzVslAEmF+TCMaCC4fkr8oKUgVzmQ4IBojHfqFqwd28O0S6AXA7ib2P+HOTlzLcXZ3+tFz6yRObiOmGY+3k6ev5XN97Uq7FoCXkl5HTrT6tQiw2u1aY/TrZF551jyMFPZiOqW1O5zXiJx1PV/2Tw52tD8ddYc/9Zlq7qhBrlrtuhX/98cbycGBFpNaiv0AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTQtMDItMjdUMTc6NDQ6NDErMDg6MDDFbrv7AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE0LTAyLTI3VDE3OjQ0OjQxKzA4OjAwtDMDRwAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAASUVORK5CYII=")
          no-repeat;
        background-size: 100% 100%;
      }
    }
  }

  .i-news {
    padding: 162px 30px 100px;

    li {
      padding: 30px 0;
      border-bottom: 1px solid #eee;
      display: flex;
      align-items: center;

      .news-img {
        width: 300px;
        height: 200px;
        background: #f6f6f4;
        margin-right: 30px;
        overflow: hidden;
        flex-shrink: 0;

        a {
          display: inline-block;
          width: 300px;
          height: 200px;
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
        .news-title {
          font-size: 40px;
          margin-bottom: 20px;
        }

        div {
          display: flex;
          align-items: center;
          font-size: 25px;
          margin-bottom: 10px;

          img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            margin-right: 10px;
          }

          a {
            color: #666;
            white-space: nowrap;
          }
        }

        p {
          color: #aaa;
        }
      }
    }
  }

  .loading {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-9px, -50px);
  }
}
</style>
