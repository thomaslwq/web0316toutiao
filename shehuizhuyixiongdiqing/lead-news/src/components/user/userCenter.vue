<template>
  <div class="user-center">
    <div class="u-header">
      <div class="u-headerCt">
        <a href="/">
          <img src="//s3.pstatp.com/toutiao/static/img/logo.271e845.png" />
        </a>
      </div>
    </div>
    <div class="u-content">
      <div class="u-info-box">
        <a href="/c/user/1873206208636088/" class="u-bg">
          <img src="//s3.pstatp.com/site/tt_mfsroot/pc_img/bg_profile.png" />
        </a>
        <div class="u-info">
          <a href="/c/user/1873206208636088/" class="u-img">
            <img :src="userInfo.avator" />
          </a>
          <a @click="goTo('/userInfo')" class="u-edit">
            <span>{{userInfo.nickname}}</span>
            <el-button type="primary" icon="el-icon-edit" circle></el-button>
          </a>
        </div>
      </div>
      <div class="u-news-box">
        <LeadNews />
        <ul>
          <li>
            <a href="/c/user/relation/1873206208636088/?tab=followed" target="_blank">
              <p>{{userInfo.article_count}}</p>
              <span>文章数</span>
            </a>
          </li>
          <li>
            <a href="/c/user/1873206208636088/?tab=following" target="_blank">
              <p>{{userInfo.tt_count}}</p>
              <span>头条数</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import LeadNews from "./leadNews";

export default {
  components: {
    LeadNews
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  mounted() {
    if (!this.userInfo.oauth_token) {
      this.$message(`请先登录`);
      this.$router.replace("/");
    }
  },
  methods: {
    goTo(url) {
      this.$router.replace(url);
    }
  }
};
</script>

<style scoped lang="less">
.user-center {
  height: 100%;
  min-height: 100vh;
  background: #f6f6f4;

  .u-header {
    box-shadow: 0 0 5px #ccc;
    background: #fff;
    margin-bottom: 15px;

    .u-headerCt {
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
    }
  }

  .u-content {
    width: 1060px;
    margin: 0 auto;

    .u-info-box {
      background: #fff;
      margin-bottom: 20px;

      .u-bg {
        img {
          width: 100%;
        }
      }

      .u-info {
        height: 80px;
        position: relative;
        left: 25px;
        display: flex;
        align-items: center;

        .u-img {
          margin-right: 10px;
          transform: translateY(-30px);

          img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
          }
        }

        .u-edit {
          display: flex;
          align-items: center;
          font-size: 25px;
          transform: translateY(-10px);

          span {
            margin-right: 10px;
          }
        }
      }
    }

    .u-news-box {
      display: flex;
      justify-content: space-between;

      ul {
        width: 340px;
        height: 88px;
        background: #fff;
        display: flex;
        justify-content: space-around;
        align-items: center;
        position: relative;

        &::after {
          content: "";
          display: block;
          width: 1px;
          height: 50px;
          background: #ddd;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }

        li {
          text-align: center;

          a {
            p {
              font-size: 18px;
              font-weight: 700;
              margin-bottom: 10px;
            }

            span {
              font-size: 14px;
              color: #666;
            }

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
