<template>
  <div class="options">
    <el-autocomplete
      placeholder="搜索站内资讯、视频或用户"
      v-model="searchText"
      :fetch-suggestions="searchAsync"
      @keyup.enter.native="goToSearch"
    >
      <el-button slot="append" @click="goToSearch">搜索</el-button>
    </el-autocomplete>
    <div class="user-box">
      <div class="user-brief" v-if="ifLogin">
        <a class="log-out" @click="logOut">退出登录</a>
        <div>
          <img :src="userInfo.avator" @click="goTo('/userCenter')" />
          <a href="/c/user/1873206208636088/">{{userInfo.nickname}}</a>
        </div>
        <ul>
          <li>
            <a href="/c/user/1873206208636088/?tab=following" target="_blank">
              <p>{{userInfo.tt_count}}</p>
              <span>头条数</span>
            </a>
          </li>
          <li>
            <a href="/c/user/relation/1873206208636088/?tab=followed" target="_blank">
              <p>{{userInfo.article_count}}</p>
              <span>文章数</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="user-login" v-else>
        <p>登录后可以保存您的浏览喜好、评论、收藏，并与APP同步，更可以发布微头条</p>
        <el-button @click="goTo('/login')">登录</el-button>
      </div>
    </div>
    <div class="news-24">
      <h1>24小时热闻</h1>
      <ul>
        <li v-for="(item,index) in hotNews" :key="index">
          <a :href="item.hn_href" target="_blank">
            <img :src="item.img" />
            <span>{{item.title}}</span>
          </a>
        </li>
      </ul>
    </div>
    <div class="more-link">
      <h1>更多</h1>
      <ul>
        <li v-for="(item,index) in moreLink" :key="index">
          <a :href="item.ml_href" :target="item.is_blank ? '_blank' : '_self'">{{item.title}}</a>
        </li>
      </ul>
    </div>
    <div class="friend-link">
      <h1>友情链接</h1>
      <ul>
        <li v-for="(item,index) in friendLink" :key="index">
          <a :href="item.fl_href" :target="item.is_blank ? '_blank' : '_self'">{{item.title}}</a>
        </li>
      </ul>
    </div>
    <div class="company">
      <p>© 2020 今日头条</p>
      <a href="http://www.12377.cn/" target="_blank">中国互联网举报中心</a>
      <a href="https://tsm.miit.gov.cn/dxxzsp/" target="_blank">京ICP证140141号</a>
      <div>
        <a href="http://beian.miit.gov.cn" target="_blank">京ICP备12025439号-3</a>
        <a href="/license/" target="_blank">网络文化经营许可证</a>
      </div>
      <a href="/business_license/" target="_blank">营业执照</a>
      <p>京-非经营性-2016-0081</p>
      <p>互联网药品信息服务资格证书</p>
      <a href="/a3642705768/" target="_blank">跟帖评论自律管理承诺书</a>
      <span>违法和不良信息举报：400-140-2108</span>
      <span>举报邮箱：jubao@toutiao.com</span>
      <span>公司名称：北京字节跳动科技有限公司</span>
      <a
        href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11000002002023"
        target="_blank"
        class="police"
      >
        <img src="//s3.pstatp.com/toutiao/static/img/gongan.d0289dc.png" />&nbsp;京公网安备 11000002002023号
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchText: "",
      hotNews: [
        {
          hn_href: "https://toutiao.com/group/1667089134708739/",
          img:
            "//p3.pstatp.com/list/240x240/tos-cn-i-0022/456486626f6f464d94b5d4fbba5f2eca",
          title:
            "#赖弘国点赞绯闻女友# 最近，#赖弘国# 的绯闻女友陈怡安在社交软件上上传了自己的美照，照片中的她穿着红色比基尼狂秀身材，十分热辣。随后，有网友发现赖弘国点赞了这张照片。"
        },
        {
          hn_href: "https://toutiao.com/group/6828402238218568195/",
          img:
            "//p9.pstatp.com/list/240x240/pgc-image/1e4a9d9e2300495c950a21fd9b948577",
          title:
            "对中国独立审查？成立“THO”？疫苗成为全球谋霸工具？世界卫生大会辟谣"
        },
        {
          hn_href: "https://toutiao.com/group/6828413869761757704/",
          img: "//p1.pstatp.com/list/240x240/pgc-image/RzPHIRNta0fJ1",
          title: "舒兰感染链达45人，5岁男童确诊；病源尚未查明，怀疑四种可能"
        },
        {
          hn_href: "https://toutiao.com/group/6828431817993880071/",
          img:
            "//p1.pstatp.com/list/240x240/pgc-image/c600a14aa6974dfb9bacf9fde0642adb",
          title: "31省份一季度GDP出炉！仅两省破2万亿，山东领衔第二梯队"
        }
      ],
      moreLink: [
        {
          is_blank: true,
          title: "关于头条",
          ml_href: "https://toutiao.com/about/"
        },
        {
          is_blank: true,
          title: "加入头条",
          ml_href: "https://job.bytedance.com"
        },
        {
          is_blank: true,
          title: "媒体报道",
          ml_href: "https://toutiao.com/report/"
        },
        {
          is_blank: true,
          title: "媒体合作",
          ml_href: "https://toutiao.com/media_partners/"
        },
        {
          is_blank: true,
          title: "产品合作",
          ml_href: "https://toutiao.com/cooperation/"
        },
        {
          is_blank: true,
          title: "合作说明",
          ml_href: "https://toutiao.com/media_cooperation/"
        },
        {
          is_blank: true,
          title: "广告投放",
          ml_href: "https://www.oceanengine.com/?source=pchomemore"
        },
        {
          is_blank: true,
          title: "联系我们",
          ml_href: "https://toutiao.com/contact/"
        },
        {
          is_blank: true,
          title: "用户协议",
          ml_href: "https://toutiao.com/user_agreement/"
        },
        {
          is_blank: true,
          title: "隐私政策",
          ml_href: "https://toutiao.com/privacy_protection/"
        },
        {
          is_blank: true,
          title: "侵权投诉",
          ml_href: "https://toutiao.com/complain/"
        },
        {
          is_blank: true,
          title: "廉洁举报",
          ml_href: "https://toutiao.com/corrupt_report/"
        }
      ],
      friendLink: [
        { is_blank: true, title: "光明网", fl_href: "http://www.gmw.cn" },
        { is_blank: true, title: "央广网", fl_href: "http://www.cnr.cn" },
        { is_blank: true, title: "国际在线", fl_href: "http://www.cri.cn" },
        { is_blank: true, title: "中国西藏网", fl_href: "http://www.tibet.cn" },
        {
          is_blank: true,
          title: "参考消息",
          fl_href: "http://www.cankaoxiaoxi.com"
        },
        { is_blank: true, title: "环球网", fl_href: "http://www.huanqiu.com" },
        { is_blank: true, title: "中青在线", fl_href: "http://www.cyol.com" },
        { is_blank: true, title: "中青网", fl_href: "http://www.youth.cn" },
        { is_blank: true, title: "海外网", fl_href: "http://www.haiwainet.cn" },
        { is_blank: true, title: "中国网", fl_href: "http://h5.china.com.cn" }
      ],
      timer: null,
      srhList: [],
      newsList: []
    };
  },
  computed: {
    ifLogin() {
      return this.$store.state.ifLogin;
    },
    userInfo() {
      return this.$store.state.userInfo;
    },
    newsCount() {
      return this.$store.state.newsCount;
    }
  },
  mounted() {
    this.getAllNews();
  },
  methods: {
    goTo(url) {
      this.$router.replace(url);
    },
    logOut() {
      this.axios.post("/logout").then(res => {
        this.$store.commit("ifLogin", false);
      });
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
.options /deep/ .el-input__inner {
  background: #fff;
  font-size: 15px;
  font-weight: 400;
}

.options {
  width: 340px;
  margin-left: 40px;

  .el-autocomplete {
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 5px;
    overflow: hidden;
    margin-bottom: 20px;

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

  .user-box {
    padding: 20px;
    background: #f6f6f4;
    margin-bottom: 20px;

    .user-brief {
      height: 200px;
      background: #fff;
      border: 1px solid #eee;
      padding: 0 30px;
      display: flex;
      flex-flow: column;
      justify-content: space-evenly;
      align-items: center;
      position: relative;

      .log-out {
        position: absolute;
        right: 10px;
        top: 10px;
        font-size: 13px;
        color: #999;

        &:hover {
          color: #f66;
        }
      }

      div {
        display: flex;
        flex-flow: column;
        align-items: center;

        img {
          width: 55px;
          height: 55px;
          border-radius: 50%;
          margin-bottom: 10px;
          cursor: pointer;
        }
      }

      ul {
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        position: relative;

        &::after {
          content: "";
          display: block;
          width: 1px;
          height: 40px;
          background: #eee;
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

    .user-login {
      height: 200px;
      background: #fff;
      border: 1px solid #eee;
      padding: 30px;
      display: flex;
      flex-flow: column;
      justify-content: space-around;

      p {
        font-size: 15px;
        color: #999;
        text-align: center;
      }

      .el-button {
        width: 100%;
        background: #f66;
        color: #fff;
        border: none;
      }
    }
  }

  .news-24 {
    border-top: 2px solid #f66;
    background: #f6f6f4;
    padding: 20px;
    margin-bottom: 20px;

    h1 {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 10px;
    }

    ul {
      li {
        border-bottom: 1px solid #ddd;
        padding: 10px 0;

        &:last-of-type {
          border: none;
        }

        a {
          display: flex;
          align-items: center;

          img {
            width: 60px;
            height: 60px;
            margin-right: 10px;
          }

          span {
            height: 44px;
            line-height: 22px;
            font-size: 14px;
            color: #333;
            overflow: hidden;
          }
        }
      }
    }
  }

  .more-link,
  .friend-link {
    border-top: 2px solid #f66;
    background: #f6f6f4;
    padding: 20px;
    margin-bottom: 20px;

    h1 {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 10px;
    }

    ul {
      display: flex;
      flex-flow: wrap;

      li {
        padding: 10px 19px 10px 0;

        a {
          font-size: 14px;
          color: #666;
        }
      }
    }
  }

  .company {
    background: #f6f6f4;
    padding: 10px 20px;
    line-height: 30px;
    font-size: 14px;
    color: #666;

    .police {
      display: flex;
      align-items: center;
    }

    a {
      color: #666;
    }
  }
}
</style>
