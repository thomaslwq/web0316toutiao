<!--  -->
<template>
  <div class="tt-post-box">
    <!-- tab切换栏开始 -->
    <div class="tt-post-tabs">
      <div
        @click="switchTab(tab.id)"
        :class="['tabs-item',{'active':tab.id==activeTab}]"
        v-for="tab in tabs"
        :key="tab.id"
      >{{tab.text}}</div>
    </div>
    <!-- tab切换栏结束 -->
    <!-- tab内容开始 -->
    <div class="tab-content">
      <div class="tab-toutiao-content" v-show="activeTab=='toutiao'">
        <textarea name id cols="30" v-model="tt_content" rows="10" placeholder="有什么新鲜事想告诉大家"></textarea>
        <div class="toutiao-bottom">
          <div class="left">
            <div class="left-title" @click.stop="toggleUploadArea">图片</div>
            <div class="upload-imgs" v-show="showUploadImgArea">
              <div class="upload">
                <div class="title">+</div>
                <input type="file" multiple @change="handleImgsUpload" accept=".jpg, .png" />
              </div>
              <!-- 上传的图片的地方开始 -->
              <div class="img-item" v-for="(img,index) in uploadImgs" :key="img">
                <img :src="img" alt />
                <div class="deleteImg" @click.stop="deleteImg(index)">X</div>
              </div>
              <!-- 上传的图片的地方结束 -->
            </div>
          </div>
          <div class="right" @click.stop="publishTT">发布</div>
        </div>
      </div>
      <div class="tab-article-content clearfix" v-show="activeTab=='article'">
        <input type="text" placeholder="请输入内容" v-model="article_title" />
        <!-- 官方例子上传图片有问题的，需要改成下面的形式 -->
        <vue-editor
          id="editor"
          use-custom-image-handler
          @image-added="handleImageAdded"
          v-model="richContent"
          class="rich-editor"
        />
        <div class="rich-publish" @click.stop="publishArticle">发布</div>
      </div>
    </div>
    <!-- tab内容内容结束 -->
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
      article_title: "", //文章的标题
      tt_content: "", // 微头条 textarea 内容
      tabs: [
        {
          id: "toutiao",
          text: "发微头条"
        },
        {
          id: "article",
          text: "写文章"
        }
      ],
      activeTab: "toutiao",
      richContent: "", //富文本编辑器的内容 值
      //   showUploadImgArea: true, //隐藏
      //   uploadImgs: [
      //     "http://wlanya.oss-cn-shenzhen.aliyuncs.com/2020_06_12/8e88757a-ad57-73c5-7860-ad7ebf7b15ce.png",
      //     "http://wlanya.oss-cn-shenzhen.aliyuncs.com/2020_06_12/8e88757a-ad57-73c5-7860-ad7ebf7b15ce.png",
      //     "http://wlanya.oss-cn-shenzhen.aliyuncs.com/2020_06_12/8e88757a-ad57-73c5-7860-ad7ebf7b15ce.png"
      //   ]
      showUploadImgArea: false, //隐藏
      uploadImgs: []
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //发布文章
    publishArticle: function() {
      if (!this.article_title || !this.richContent) {
        this.$message({
          msg: "标题或者内容不能为空"
        });
        return false;
      }
      this.$axios
        .post("/createArticle", {
          content: this.richContent,
          img: "",
          title: this.article_title
        })
        .then(res => {
          this.$message({
            msg: res.msg
          });
        });
    },
    handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)
      console.log("vue2-editor上传图片");
      var formData = new FormData();
      formData.append("file", file);
      this.$axios.post("/aliossUpload", formData).then(res => {
        let url = res.url;
        Editor.insertEmbed(cursorLocation, "image", url);
        resetUploader();
      });
      // axios({
      //   url: "https://fakeapi.yoursite.com/images",
      //   method: "POST",
      //   data: formData
      // })
      //   .then(result => {
      //     let url = result.data.url; // Get url from response
      //     Editor.insertEmbed(cursorLocation, "image", url);
      //     resetUploader();
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    },
    // 发头条的方法
    publishTT: function() {
      let content = this.tt_content;
      if (!content) {
        this.$message({
          msg: "微头条内容不能为空"
        });
        return false;
      }
      this.$axios
        .post("/createTT", {
          content: content,
          imgs: this.uploadImgs.join(",")
        })
        .then(res => {
          this.$message({
            msg: res.msg
          });
        })
        .catch(err => err);
    },
    // 删除上传图片
    deleteImg: function(index) {
      // 删除图片
      this.uploadImgs.splice(index, 1);
    },
    //  文件上传事件
    handleImgsUpload: function(e) {
      Array.from(e.target.files).forEach(f => {
        //1. 构造请求的参数
        // {
        //     file:文件的数据
        // }
        let params = new FormData();
        params.append("file", f);
        //2. 发请求
        this.$axios.post("/aliossUpload", params).then(res => {
          this.uploadImgs.push(res.url);
        });
        // console.log(f);
      });
    },
    // 切换是否显示图片上传
    toggleUploadArea: function() {
      this.showUploadImgArea = !this.showUploadImgArea;
    },
    // 切换tab栏
    switchTab: function(tabId) {
      this.activeTab = tabId;
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
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
.tt-post-box {
  padding: 5px;
  .tt-post-tabs {
    display: flex;
    .tabs-item {
      height: 50px;
      line-height: 50px;
      width: 80px;
      text-align: center;
      margin-left: 20px;
      font-size: 16px;
    }
    .active {
      border-bottom: 2px solid var(--themeColor);
      color: #46a0fc;
    }
  }
  .tab-content {
    // overflow: hidden;
    .tab-toutiao-content {
      padding: 5px;
      textarea {
        width: 100%;
        border: 1px solid #ddd;
      }

      .toutiao-bottom {
        display: flex;
        justify-content: space-between;
        .left {
          position: relative;
          .left-title {
            height: 30px;
            line-height: 30px;
            font-size: 16px;
          }
          .upload-imgs {
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
                font-size: 50px;
                line-height: 100px;
                text-align: center;
                width: 100px;
                height: 100px;
                border: 1px dashed #ddd;
                font-weight: 100;
              }
              input {
                opacity: 0;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
              }
            }
            .img-item {
              padding: 5px;
              width: 100px;
              height: 100px;
              position: relative;
              img {
                height: 100%;
                width: 100px;
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
          width: 100px;
          text-align: center;
          color: white;
          font-size: 16px;
          background-color: var(--themeColor);
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