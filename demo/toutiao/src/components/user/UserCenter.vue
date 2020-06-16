<!--  -->
<template>
  <div class="tt-user-center">
    <div class="tt-user-header">
      <img :src="userInfo.avator" alt />
      <span>{{userInfo.nickname}}</span>
      <button @click.stop="goTotoUserData">编辑</button>
    </div>
    <!-- 用户文章内容开始 -->
    <div class="tt-user-content">
      <div class="tt-user-tabs">
        <div
          :class="['tt-user-tabs-item',{active:nav.id==activeTab}]"
          v-for="nav in navs"
          :key="nav.id"
          @click.stop="changeTab(nav.id)"
        >{{nav.text}}</div>
      </div>
      <div class="tt-user-tabs-content">
        <div v-if="activeTab=='toutiao'">
          <div v-for="item in toutiaos" :key="item.nid" class="toutiao-item">
            <div class="toutiao-item-top">
              <img :src="userInfo.avator" alt />
              <span>{{userInfo.nickname}}</span>
            </div>
            <div class="toutiao-item-middle">{{item.title}}</div>
            <div class="toutiao-item-bottom">
              <div class="left">
                {{item.created_at
                }}
              </div>
              <div class="right" @click="deleteItem(item.nid)">删除</div>
            </div>
          </div>
        </div>
        <div v-if="activeTab=='article'">
          <div v-for="item in articles" :key="item.nid" class="toutiao-item">
            <div class="toutiao-item-top">
              <img :src="userInfo.avator" alt />
              <span>{{userInfo.nickname}}</span>
            </div>
            <div class="toutiao-item-middle">{{item.title}}</div>
            <div class="toutiao-item-bottom">
              <div class="left">
                {{item.created_at
                }}
              </div>
              <div class="right" @click="deleteItem(item.nid)">删除</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 用户文章内容结束 -->
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      activeTab: "toutiao",
      articles: [], // 文章数据
      toutiaos: [], //头条数据
      navs: [
        {
          id: "toutiao",
          text: "微头条"
        },
        {
          id: "article",
          text: "文章"
        }
      ]
    };
  },
  //监听属性 类似于data概念
  computed: {
    userInfo: function() {
      return this.$store.state.userInfo;
    }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    goTotoUserData: function() {
        this.$router.push({
            path:"/userData"
        })
    },
    changeTab(id) {
      this.activeTab = id;
    },
    deleteItem: function(nid) {
      this.$axios
        .post("/deleteArticle", {
          nid: nid
        })
        .then(res => {
          this.$message({
            msg: res.msg
          });
          // res.status ==0 代表删除成功
          if (res.status == 0) {
            let index = this.articles.findIndex(v => v.nid == nid);
            if (index != -1) {
              this.articles.splice(index, 1);
              return true;
            }
            index = this.toutiaos.findIndex(v => v.nid == nid);
            if (index != -1) {
              this.toutiaos.splice(index, 1);
              return true;
            }
          }
        });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // 微头条数据
    this.$axios
      .post("/getArticlesByType", {
        type: "TT"
      })
      .then(res => {
        //console.log(res)
        this.toutiaos = res.articles;
      });
    // 文章数据
    this.$axios
      .post("/getArticlesByType", {
        type: "article"
      })
      .then(res => {
        // console.log(res)
        this.articles = res.articles;
      });
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.tt-user-center {
  .tt-user-header {
    height: 100px;
    line-height: 100px;
    display: flex;
    align-items: center;
    img {
      height: 60px;
      width: 60px;
      border-radius: 50%;
      margin-right: 10px;
    }

    span {
    }

    button {
      margin-left: 10px;
    }
  }
  .tt-user-content {
    .tt-user-tabs {
      display: flex;
      border-bottom: 1px solid #ddd;
      .tt-user-tabs-item {
        width: 100px;
        height: 40px;
        text-align: center;
      }
      .active {
        border-bottom: 2px solid var(--themeColor);
        color: #66b0fd;
      }
    }
    .tt-user-tabs-content {
      .toutiao-item {
        height: 150px;
        display: flex;
        padding: 10px;
        flex-direction: column;
        justify-content: space-around;
        .toutiao-item-top {
          display: flex;
          align-items: center;
          img {
            height: 30px;
            width: 30px;
            border-radius: 50%;
          }
          span {
          }
        }

        .toutiao-item-middle {
          font-size: 16px;
        }
        &:hover {
          .toutiao-item-bottom {
            .right {
              display: block;
            }
          }
        }
        .toutiao-item-bottom {
          display: flex;
          justify-content: space-between;
          .left {
            font-size: 14px;
          }

          .right {
            font-size: 14px;
            display: none;
          }
        }
      }
    }
  }
}
</style>