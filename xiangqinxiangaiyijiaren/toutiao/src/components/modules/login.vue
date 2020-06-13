<!--  -->
<template>
  <div class="newsList">
      <div class="login">
          <div class="content" v-if="!isLogin">
              <p>登录后可以保持您的浏览爱好、评论、收藏,</p>
              <p>并与APP同步,更可以发布微头条</p>
              <el-button class="btn" @click="dlmsg">登录</el-button>
          </div>
          <div class="admin" v-else>
              <div class="loginOut">
                  <span @click="ttmsg">退出登录</span>
              </div>
              <img :src="userinfo.avator" 
              @click="goUserCenter"
              >
              <div class="name">
                  <span>
                      {{userinfo.nickname}}
                  </span>
              </div>
              <div class="ttcount">
                  <p class="p1">
                      <span>{{userinfo.tt_count}}</span>
                  </p>
                  <p class="p2">
                      <span>头条数</span>
                  </p>
              </div>
              <div class="artcount">
                  <p class="p1">
                      <span>{{userinfo.article_count}}</span>
                  </p>
                  <p class="p2">
                      <span>文章数</span>
                  </p>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import NewPane from './PaneModule'
import {mapState} from 'vuex'
import {mapMutations} from 'vuex'
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {NewPane},
  data() {
    //这里存放数据
    return {
        tpmsg:[
            {}
        ],
    };
  },
  //监听属性 类似于data概念
  computed: {
      ...mapState(['isLogin','userinfo'])
  },
  //监控data中的数据变化
  watch: {
   
  },
  //方法集合
  methods: {
    //   登录
    ...mapMutations(['logout','Login']),
      dlmsg(){
          this.$router.push('/login')
      },
    //退出登录
    ttmsg(){
        this.logout()
    },
    // 点击图片
    goUserCenter(){
        this.$router.push("userCenter")
    }

  },
  mounted() {
      if(this.Login){
          let now = new Date().getTime()
          let last = new Date(this.userinfo.oauth_expire_time).getTime()
          now > last && this.logout()
      }
  },

};
</script>
<style lang='less' scoped>
.newsList{
    padding: 0 30px;
    .searchBox{
        width: 100%;
        font-weight: 100;
        margin: 15px 0;
        display: flex;
        input{
            width: 100%;
            height: 40px;
            border: 1px solid #e8e8e8;
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
            color: #585858;
            padding: 10px;
            box-sizing: border-box;
            background-color: #f5f6f7;
            outline: none;
        }
        input:hover,input:focus{
            border: 1px solid #428bd9;
            border-right: 0px;
        }
        .btn{
            border: none;
            background-color:#428bd9;
            color: white;
            font-weight: 100;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
        }
    }
    .login{
        background-color: #f4f5f6;
        padding: 20px;
        box-sizing: border-box;
        .content{
            background-color: #fff;
            width: 100%;
            height: 100%;
            padding: 20px;
            box-sizing: border-box;
            font-size: 12px;
            color: #949494;
            .btn{
                width: 100%;
                background-color: #e43c46;
                color: white;
                font-weight: 100;
                margin: 15px 0;
            }
            .btn:hover{
                    opacity: .7;
                }
            .icon-login{
                display: flex;
                justify-content: center;
                div{
                    display: flex;
                    flex-direction: column;
                    margin:0 10px;
                }
                div:hover{
                    opacity: .7;
                }
            }
        }
        .admin{
            width: 100%;
            height: 100%;
            padding: 10px;
            box-sizing: border-box;
            background-color: white;
            .loginOut{
                font-size: 12px;
                text-align: end;
                color: #aaaaaa;
            }
            img{
                width: 60px;
                margin: auto;
                border-radius: 50%;
                cursor: pointer;
            }
            .ttcount,.artcount{
                width: 50%;
                display: inline-block;
                margin-top: 10px;
                .p1{
                    font-weight: 900;
                    font-size: 18px;
                    
                }
                .p2{
                    color: #aaaaaa;
                    font-size:14px ;
                    font-weight: 200;
                }
            }
            span:hover{
                color: #496399;
            }
            .ttcount{
                box-sizing: border-box;
                border-right:1px solid #f4f4f4;
            }
            
        }
    }
    .company{
        margin-top: 20px;
        background-color:#f4f5f6 ;
        padding: 20px;
        box-sizing: border-box;
        p{
            text-align: start;
            font-size: 14px;
            color: #979898;
            line-height: 30px;
        }
    }
}
</style>