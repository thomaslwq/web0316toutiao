<!--  -->
<template>
  <div class="Usermodify">
    <div class="header">
      <div class="headerImg">
        <img src="http://s3.pstatp.com/toutiao/resource/ntoutiao_web/static/image/logo_271e845.png" />
      </div>
      <div class="userInfo">
        <img :src="userInfo.avator" @click.stop="jumpIndex" alt />
        <span>{{userInfo.nickname}}</span>
        <div class="tuichu" @click.stop="outLogin">退出登录</div>
      </div>
    </div>
    <div class="modify">
      <div class="title">
        <span
          :class="{active:currentID == item.id}"
          @click.stop="toggleTab(item.id)"
          v-for="item in title"
          :key="item.id"
        >{{item.txt}}</span>
      </div>
      <div class="content" v-if="currentID=='zhanghuxinxi'">
        <div class="modifyNickname">
          <span>名称</span>
          <input type="text" v-model="nickname" />
        </div>
        <div class="modifyAvator">
          <span>头像</span>
          <div class="userAvator">
            <img :src="avator" />
            <input type="file" multiple accept=".jpg, .png" @change="handleImgsUpload" />
          </div>
        </div>
      </div>
      <div class="passwrod" v-else>
        <div>
          <span>新密码：</span>
          <input v-model="oldPasswrod" type="password" />
        </div>
        <div>
          <span>再次输入：</span>
          <input v-model="newPasswrod" type="password" />
        </div>
      </div>
      <div class="modifuBtn">
        <span @click.stop="modifyUserInfo">更新资料</span>
      </div>
    </div>
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
      title: [
        {
          txt: "账户信息",
          id: "zhanghuxinxi"
        },
        {
          txt: "密码管理",
          id: "password"
        }
      ],
      currentID:'zhanghuxinxi',
      userInfo:{},
      nickname:'',
      avator:'',
      oldPasswrod:'',
      newPasswrod:''
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
      toggleTab:function(id){
          this.currentID = id
      },
      handleImgsUpload:function(e){
          console.log(e.target.files);
          Array.from(e.target.files).forEach(item => {
            let params = new FormData();
            // console.log(params);
            params.append("file", item);
            this.$axios.post("/aliossUpload", params).then(res => {
            this.avator = res.url;
            });
        });
        // console.log(this.avator);
      },
      modifyUserInfo:function(){
          console.log(this.oldPasswrod,this.newPasswrod);
          if(this.nickname !== '' && this.avator !== ''){
              this.$axios.post('/updateUserInfo',{
              'nickname':this.nickname,
              'avator':this.avator
            }).then(res => {
                    console.log(res);
                    if(res.ret === 0){
                        this.$store.state.userInfo.nickname = this.nickname
                        this.$store.state.userInfo.avator = this.avator
                       this.nickname = '';
                       this.avator = '';
                       this.$router.replace('/')
                    }
                    this.$Message({msg:res.msg})
                }).catch(err => err)
          }
          if(this.oldPasswrod !== '' && this.newPasswrod !== ''){
              this.$axios.post('/updatePassword',{
                  'currentPassword':this.oldPasswrod,
                  'updatePassword':this.newPasswrod,
              }).then(res => {
                  console.log(res);
                  if(res.ret === 0){
                      this.oldPasswrod = '';
                      this.newPasswrod = '';
                      this.$router.push('/')
                    // console.log(res);
                  }
                this.$Message({msg:res.msg})
              }).catch(err => {
                  return err
              })
          }
      },
      //跳转到主页
      jumpIndex:function(){
          this.$router.push('/')
      },
      //退出登录
     outLogin:function(){
        this.$axios.post('logout').then(res => {
            this.$store.commit('outLogin');
            this.isLogin = this.$store.state.isLogin
            if(res.ret === 0){
                this.$router.push('/')
            }
        }).catch(error => {
            console.log(error);
            return error
        })
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
      this.userInfo = this.$store.state.userInfo
      this.avator  = this.userInfo.avator
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
<style lang='less'  scoped>
.Usermodify {
  width: 80vw;
  margin: auto;
  .header {
    display: flex;
    justify-content: space-between;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ddd;
    .headerImg {
      width: 100px;
      height: 30px;
      img {
        width: 100%;
        height: 100%;
        vertical-align: middle;
      }
    }

    .userInfo {
      position: relative;
      padding-right: 30px;
      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        vertical-align: middle;
      }

      span {
        padding: 0 10px;
      }
      .tuichu {
        display: none;
        text-align: center;
        cursor: pointer;
        border: 1px solid #ddd;
        border-radius: 5px;
        background-color: #ddd;
      }
    }
    .userInfo::after {
      display: block;
      content: "";
      width: 15px;
      height: 15px;
      border-left: 2px solid black;
      border-top: 2px solid black;
      position: absolute;
      right: 0;
      top: 10px;
      transform: rotate(-135deg);
    }
    .userInfo:hover .tuichu {
      display: block;
    }
  }

  .modify {
    padding: 40px 0;

    .title {
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #ddd;
      span {
        padding: 0 20px;
        cursor: pointer;
      }
      .active {
        color: blue;
      }
    }

    .content {
      padding: 10px 20px;
      .modifyNickname {
        height: 100px;
        line-height: 100px;
        span {
          color: #ddd;
          padding-right: 20px;
        }

        input {
          height: 50px;
          width: 1000px;
          border-radius: 8px;
          text-indent: 2em;
          font-size: 18px;
          border: 1px solid #ddd;
          outline: medium;
        }
      }

      .modifyAvator {
        width: 200px;
        height: 120px;
        //   line-height: 300px;
        display: flex;
        span {
          color: #ddd;
          padding-right: 20px;
        }
        .userAvator {
            width: 128px;
            height: 120px;
          position: relative;
          border: 1px dashed #ddd;
          img {
            width: 100%;
            height: 100%;
          }
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
    }
    .passwrod {
      padding: 10px 10px;
      div {
        padding: 20px 0;

        span{
           display: inline-block;
           width: 80px;
            color: #ddd;
        }
        input {
          height: 50px;
          width: 1000px;
          border-radius: 8px;
          text-indent: 2em;
          font-size: 18px;
          border: 1px solid #ddd;
          outline: medium;
        }
      }
    }
    .modifuBtn {
        cursor: pointer;
      text-align: center;
      height: 40px;
      line-height: 40px;
      width: 120px;
      border-radius: 6px;
      margin-left: 70px;
      background-color: #409eff;
      span {
        color: white;
      }
    }
  }
}
</style>