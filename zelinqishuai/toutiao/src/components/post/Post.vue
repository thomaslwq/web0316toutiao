<!--  -->
<template>
  <div class="tt-post">
    <div class="title">
      <div
        v-for="tab in tabs"
        :key="tab.id"
        :class="['title-itme',{active:tab.id===activeTab}]"
        @click="tabClick(tab.id)"
      >{{tab.text}}</div>
    </div>
    <div class="post-content">
      <div class="post-wb" v-show="activeTab=='toutiao'">
        <textarea v-model="messages" placeholder="有什么新鲜事儿告诉大家" name id cols="30" rows="10"></textarea>
        <div class="bottom">
          <div class="post-left">
            <div class="img" @click.stop="toggleAddImg">图片</div>
            <div class="upload-imgs" v-show="toggleAdd">
              <div class="addImg">
                <div class="add">+</div>
                <input type="file" multiple accept=".jpg, .png" @change="handleImgsUpload" />
              </div>
              <div class="img-item" v-for="(img,index) in uploadImgs" :key="img">
                <img :src="img" alt />
                <div class="deleteImg" @click.stop="deleteImg(index)">X</div>
              </div>
            </div>
          </div>
          <div class="post-right" @click.stop="submit">发布</div>
        </div>
      </div>
      <div class="post-article" v-show="activeTab=='article'">
        <input class="article-input" v-model="title" type="text" placeholder="请输入文章标题..." />
        <vue-editor 
        id="editor" use-custom-image-handler @image-added="HandleImageAdded"
        v-model="richContent" placeholder="请输入正文..." class="article-editor" />
        <div class="article-bottom">
          <div class="articleNumber">字数</div>
          <div class="submit" @click.stop="submitArticle">发布</div>
        </div>
      </div>
    </div>
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
      activeTab: "toutiao",//切换title
      toggleAdd: false,//显示图片开关
      uploadImgs: [],//添加图片的URL
      articlesImgs:[],
      title:'',
      richContent: "",//v-model文章输入框
      messages: ""//v-modeltexteara输入框
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    // imgs:function(value){
    //     console.log(this.imgs);
    // }
  },
  //方法集合
  methods: {
      //切换title
    tabClick: function(id) {
      this.activeTab = id;
    },
    //切换图片显示
    toggleAddImg: function() {
      this.toggleAdd = !this.toggleAdd;
    },
    //拿到图片URL
    handleImgsUpload: function(e) {
      console.log(e.target.files);
      Array.from(e.target.files).forEach(item => {
        let params = new FormData();
        // console.log(params);
        params.append("file", item);
        this.$axios.post("/aliossUpload", params).then(res => {
          this.uploadImgs.push(res.url);
        });
      });
      console.log(this.uploadImgs);
    },
   
    //删除图片
    deleteImg: function(index) {
      this.uploadImgs.splice(index, 1);
    },
    //提交tt留言板
    submit: function() {
      if (!this.$store.state.isLogin) {
        this.$Message({msg:'请先登录'})
        return;
      }
      this.$axios.post("/createTT", {
          "content":this.messages,
          "imgs":this.uploadImgs.join(',')
      }).then(res => {
          //成功后个人信息文章数量加1
        if (res.ret === 0) {
          res.status = 'success';
          this.$store.commit(
            "updateTTCount",
            this.$store.state.userInfo.tt_count + 1
          );
          this.messages = '';
          this.uploadImgs = [];
          this.toggleAdd = false
          this.refreshMessages()
          this.$Message({msg:res.msg})
        }else{
            res.status = 'fail'
            this.$Message({msg:res.msg})
        }
      }).catch(({err}) => {
          this.$Message({msg:'服务器繁忙'});
        });
    },
    //刷新最新文章目录
    refreshMessages: function() {
      let parmas = new FormData;
      parmas.append('lastid',0);
      this.$axios.post('/getArticles',parmas)
        .then(res => {
          if (res.ret == 0) {
            // console.log(res);
            this.$store.commit('updateArticleLists',res.articles)
          } else {
            this.$Message({msg:'加载留言失败了'});
          }
        })
        .catch(res => [console.log("加载失败了")]);
    },

     //Vue2Edit上传图片
    HandleImageAdded:function(file, Editor, cursorLocation, resetUploader){
        console.log('上传图片');
        let param = new FormData();
        param.append('file',file);
        this.$axios.post('/aliossUpload',param).then(res => {
          let url = res.url;
          Editor.insertEmbed(cursorLocation, "image", url);
          this.articlesImgs = url;
          resetUploader()
        }).catch(error=>error)
    },
    //发布文章
    submitArticle:function(){
      if (!this.$store.state.isLogin) {
        this.$Message({msg:'请先登录'});
        return
      }else if(this.richContent === "" || this.title === ""){
        this.$Message({msg:'不能发布空内容'})
        return
      }
      this.$axios.post('/createArticle',{
          'content':this.richContent,
          'img':this.articlesImgs,
          'title':this.title
        })
        .then(res => {
          if(res.ret === 0){
            res.status = 'success';
            this.title = '';
            this.richContent = ''
            this.$store.commit("updateArticleCount",this.$store.state.userInfo.article_count + 1);
            this.refreshMessages()
            this.$Message({msg:'发布成功'})
          }else{
            res.status = 'fail'
            this.$Message({msg:'发布文章失败了'})
            return
          }
        }).catch(({err}) => {
          this.$Message({msg:'服务器繁忙'})
          return false;
        })
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
.tt-post {
  margin: 0 auto 20px;
  width: 512px;
  border: 1px solid #e8e8e8;
  .title {
    font-size: 14px;
    border-bottom: 3px solid #e8e8e8;
    height: 35px;
    line-height: 35px;
    display: flex;
    .title-itme {
      padding: 0 20px;
      cursor: default;
    }
    .active {
      color: blue;
    }
  }
  .post-content {
    width: 100%;
    .post-wb {
      textarea {
        width: 100%;
        // padding: 0;
        padding-top: 20px;
        // margin: 0;
        background-color: #f4f5f6;
        border: none;
        text-indent: 4em;
        outline: medium;
      }
    }
    .post-article {
      .article-input {
        height: 50px;
        width: 100%;
        border: none;
        text-indent: 1em;
        font-size: 20px;
        outline: medium;
      }
      .article-editor {
        border: none;
      }
      .article-bottom {
        // position: absolute;
        height: 58px;
        line-height: 58px;
        position: relative;
        display: flex;
        justify-content: space-between;
        .articleNumber {
          padding: 0 10px;
          font-size: 14px;
          color: #737373;
        }
        .submit {
          background-color: #fe898e;
          height: 58px;
          width: 100px;
          text-align: center;
          line-height: 58px;
          color: white;
          position: absolute;
          right: 0;
        }
      }
    }
  }

  .bottom {
    display: flex;
    justify-content: space-between;
    .post-right {
      width: 120px;
      height: 50px;
      line-height: 50px;
      background-color: #fe898e;
      color: white;
      text-align: center;
    }
    .post-left {
      .img {
        width: 93px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 12px;
        cursor: pointer;
      }
      .upload-imgs {
        width: 300px;
        display: flex;
        flex-wrap: wrap;
        background-color: #fff;
        .addImg {
          width: 100px;
          height: 100px;
          position: relative;
          .add {
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
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
          &:hover {
            opacity: 0.6;
            transition: all 0.5s;
            .deleteImg {
              display: block;
              color: black;
              cursor: default;
            }
          }
        }
      }
    }
  }
}
</style>