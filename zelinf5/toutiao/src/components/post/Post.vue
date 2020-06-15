<!--  -->
<template>
  <div class='text-box'>
    <!-- tab 切换栏开始 -->
    <div class="text-box-tabs">
      <div
        :class="['tabs-item',{'active':tab.id==activeTab}]"
        @click="changeId(tab.id)"
        v-for="tab in tabs"
        :key="tab.id"
      >{{tab.text}}</div>
    </div>
    <!-- tab 切换栏结束 -->
    <!-- tab 内容开始 -->
    <div class="tab-content">
      <div
        class="tab-title-content"
        v-show="activeTab == 'title'"
      >
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="有什么新鲜事想告诉大家"
          v-model="tt_content"
        ></textarea>
        <div class="title-bottom">
          <div class="left">
            <div
              class="left-title"
              @click.stop="toggleUpload"
            >图片</div>
            <div
              class="upload-imgs-area"
              v-show="showUpload"
            >
              <div class="upload">
                <div class="title">+</div>
                <input
                  type="file"
                  id="input"
                  multiple
                  accept=".jpg,.png"
                  @change="handleImgs"
                >
              </div>
              <!-- 上传图片 的地方开始 -->
              <div
                class="img-item"
                v-for="(img,index) in updatedImgs"
                :key="img"
              >
                <img
                  :src="img"
                  alt=""
                >
                <div
                  class="deleteImg"
                  @click.stop="deleteImg(index)"
                >X</div>
              </div>
              <!-- 上传图片 的地方结束 -->
            </div>
          </div>

          <div
            class="right"
            @click.stop="publishTT"
          >发布</div>
        </div>
      </div>
      <div
        class="tab-article-content clearfix"
        v-show="activeTab == 'article'"
      >
        <input
          type="text"
          placeholder="请输入内容"
          v-model="article_title"
        />
        <vue-editor
          id="editor"
          use-custom-image-handler
          @image-added="handleImageAdded"
          v-model="richContent"
          class="rich-editor"
          placeholder="请输入正文..."
        />
        <div
          class="rich-publish"
          @click.stop="publishArticle"
        >发布</div>
      </div>
    </div>
    <!-- tab 内容结束 -->
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { VueEditor } from "vue2-editor";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    VueEditor
  },
  data() {
    //这里存放数据
    return {
      tt_content: "",
      tabs: [{
        id: "title",
        text: "发微头条"
      }, {
        id: "article",
        text: "写文章"
      }],
      activeTab: "article",
      showUpload: false, // 隐藏
      updatedImgs: [],
      richContent: "", // 富文本编辑器内容的值
      article_title: "",
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    publishArticle: function () {
      if (!this.article_title || !this.richContent) {
        this.$message({
          msg: "标题或者内容不能为空"
        });
        return false;
      }
      this.$axios.post("/createArticle", {
        content: this.richContent,
        img: "",
        title: this.article_title
      }).then(res => {
        this.$message({
          msg: res.msg
        });
      });
    },
    handleImageAdded: function (file, Editor, cursorLocation, resetUploader) {
      var formData = new FormData();
      formData.append("file", file);

      this.$axios.post("/aliossUpload", formData).then(res => {
        let url = res.url;
        Editor.insertEmbed(cursorLocation, "image", url);
        resetUploader();
      })
    },
    publishTT: function () {
      let content = this.tt_content;
      if (!content) {
        this.$message({
          msg: "微头条内容不能为空"
        })
        return false;
      }
      this.$axios.post("/createTT", {
        content: content,
        imgs: this.updatedImgs.join(",")
      }).then(res => {
        this.$message({
          msg: res.msg
        })
      }).catch(err => err)
    },
    // 删除上传图片
    deleteImg: function (index) {
      this.updatedImgs.splice(index, 1);
    },
    toggleUpload: function () {
      this.showUpload = !this.showUpload
    },
    changeId: function (id) {
      this.activeTab = id;
    },
    handleImgs: function (e) {
      Array.from(e.target.files).forEach((f) => {
        // 1. 构造请求的参数
        // {
        //     file:文件的数据
        // }
        let params = new FormData();
        params.append("file", f)
        // 2.发请求
        this.$axios.post("/aliossUpload", params).then((res) => {
          this.updatedImgs.push(res.url)
        })
      })
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

  },
  beforeCreate() { }, //生命周期 - 创建之前
  beforeMount() { }, //生命周期 - 挂载之前
  beforeUpdate() { }, //生命周期 - 更新之前
  updated() { }, //生命周期 - 更新之后
  beforeDestroy() { }, //生命周期 - 销毁之前
  destroyed() { }, //生命周期 - 销毁完成
  activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' scoped>
.clearfix:after {
  /*伪元素是行内元素 正常浏览器清除浮动方法*/
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.clearfix {
  *zoom: 1; /*ie6清除浮动的方式 *号只有IE6-IE7执行，其他浏览器不执行*/
}
.text-box {
  padding: 5px;
  .text-box-tabs {
    display: flex;
    .tabs-item {
      height: 50px;
      line-height: 50px;
      width: 80px;
      font-size: 16px;
      text-align: center;
      margin-left: 20px;
    }
    .active {
      border-bottom: 2px solid red;
      color: #46a0fc;
    }
  }
  .tab-content {
    .tab-title-content {
      padding: 5px;
      textarea {
        width: 100%;
        border: 1px solid #ddd;
      }

      .title-bottom {
        display: flex;
        justify-content: space-between;
        .left {
          position: relative;
          .left-title {
            height: 30px;
            line-height: 30px;
            font-size: 16px;
          }
          .upload-imgs-area {
            background-color: #fff;
            display: flex;
            flex-wrap: wrap;
            width: 300px;
            position: absolute;
            .upload {
              position: relative;
              width: 100px;
              height: 100px;
              .title {
                width: 100px;
                height: 100px;
                border: 1px dashed #ddd;
                line-height: 100px;
                text-align: center;
                font-weight: 50;
              }

              #input {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                opacity: 0;
              }
            }
            .img-item {
              width: 100px;
              height: 100px;
              padding: 5px;
              position: relative;
              img {
                height: 100%;
                width: 100%;
              }
              .deleteImg {
                display: none;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
              }
              &:hover {
                background-color: #7f7f7f;
                opacity: 0.8;
                transition: all 0.5s;
                .deleteImg {
                  color: white;
                  display: block;
                }
              }
            }
          }
        }

        .right {
          height: 30px;
          line-height: 30px;
          text-align: center;
          color: white;
          font-size: 16px;
          width: 100px;
          background-color: red;
        }
      }
    }

    .tab-article-content {
      input {
        height: 30px;
        width: 100%;
        border: none;
      }

      .rich-editor {
      }
      .rich-publish {
        float: right;
        height: 40px;
        line-height: 40px;
        text-align: center;
        width: 100px;
        font-size: 16px;
        color: white;
        background-color: var(--themeColor);
      }
    }
  }
}
</style>