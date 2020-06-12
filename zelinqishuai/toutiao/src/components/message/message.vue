<!--  -->
<template>
  <div class="messageBox">
    <div class="refresh">
      <div class="clickRefresh">点击刷新</div>
    </div>
    <div class="messagelist">
      <div class="list-left">
        <img src="http://image.yy.com/yywebalbumbs2bucket/144152f8680f421599233c6ffcfcef49_1476265267104.jpeg" alt />
      </div>
      <div class="list-right">
        <div class="middle-top">笑一个吧</div>
        <div class="middle-botton">
          <div class="headPortrait">
            <img src="http://image.yy.com/yywebalbumbs2bucket/144152f8680f421599233c6ffcfcef49_1476265267104.jpeg" alt />
          </div>
          <div class="userName">李白</div>
          <div class="dot">·</div>
          <div class="time">2020-06-11 19:34:20</div>
        </div>
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
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
      
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
.messageBox {
  width: 500px;
  margin: auto;
  .refresh {
    width: 100%;
    height: 35px;
    text-align: center;
    line-height: 35px;
    border-radius: 5px;
    background-color: #eff6fc;
    border: 1px solid #6dacdf;
    position: relative;
    .clickRefresh {
      color: #6dacdf;
    }

    img {
      position: absolute;
      top: -9px;
      right: 165px;
      width: 30px;
      height: 30px;
    }
  }

  .messagelist {
    width: 100%;
    height: 120px;
    display: flex;
    margin-top: 10px;
    .list-left {
      width: 30%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .list-right {
      width: 70%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .middle-top {
          width: 100%;
          height: 50px;
          font-weight: 700;
          font-size: 20px;
          line-height: 80px;
          padding-left: 10px;
      }

      .middle-botton {
          width: 100%;
          height: 50px;
          display: flex;
          color: #979797;
          line-height: 50px;
          padding-left: 10px;
        .headPortrait{
              width: 30px;
              height: 30px;
              margin-right: 10px;
              border-radius: 50%;
          img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
          }
        }

        .userName {
            line-height: 35px;
        }
        .dot{
            line-height: 35px;
            margin-left: 10px;
        }
        .time {
            line-height: 35px;
            margin-left: 10px;
        }
      }
    }
  }
}
</style>