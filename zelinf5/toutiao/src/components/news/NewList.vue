<!--  -->
<template>
  <div class="tt-news-list">
    <div class="tt-news-refresh">点击刷新</div>
    <div class="list-item">
      <div class="left">
        <img
          src="http://wlanya.oss-cn-shenzhen.aliyuncs.com/2020_06_11/1c872634-9527-7d84-5da2-a72e5911078b.jpg"
          alt
        />
      </div>
      <div class="right">
        <div class="title">删除文章</div>
        <div class="profile">
          <img
            src="http://sf1-ttcdn-tos.pstatp.com/img/pgc-image/f6cc8e95467f44e3bcdcf9d4ca0a58f6~120x256.image"
            alt
          />
          <div class="nickname">小菜比</div>
        </div>
        <div class="date">2020-06-12 11:30:51</div>
      </div>
    </div>
    <div class="list-item">
      <div class="left">
        <img
          src="http://wlanya.oss-cn-shenzhen.aliyuncs.com/2020_06_11/1c872634-9527-7d84-5da2-a72e5911078b.jpg"
          alt
        />
      </div>
      <div class="right">
        <div class="title">删除文章</div>
        <div class="profile">
          <img
            src="http://sf1-ttcdn-tos.pstatp.com/img/pgc-image/f6cc8e95467f44e3bcdcf9d4ca0a58f6~120x256.image"
            alt
          />
          <div class="nickname">小菜比</div>
        </div>
        <div class="date">2020-06-12 11:30:51</div>
      </div>
    </div>
    <div class="list-item">
      <div class="left">
        <img
          src="http://wlanya.oss-cn-shenzhen.aliyuncs.com/2020_06_11/1c872634-9527-7d84-5da2-a72e5911078b.jpg"
          alt
        />
      </div>
      <div class="right">
        <div class="title">删除文章</div>
        <div class="profile">
          <img
            src="http://sf1-ttcdn-tos.pstatp.com/img/pgc-image/f6cc8e95467f44e3bcdcf9d4ca0a58f6~120x256.image"
            alt
          />
          <div class="nickname">小菜比</div>
        </div>
        <div class="date">2020-06-12 11:30:51</div>
      </div>
    </div>
    <div class="list-item">
      <div class="left">
        <img
          src="http://wlanya.oss-cn-shenzhen.aliyuncs.com/2020_06_11/1c872634-9527-7d84-5da2-a72e5911078b.jpg"
          alt
        />
      </div>
      <div class="right">
        <div class="title">删除文章</div>
        <div class="profile">
          <img
            src="http://sf1-ttcdn-tos.pstatp.com/img/pgc-image/f6cc8e95467f44e3bcdcf9d4ca0a58f6~120x256.image"
            alt
          />
          <div class="nickname">小菜比</div>
        </div>
        <div class="date">2020-06-12 11:30:51</div>
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
  created() { },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() { },
  beforeCreate() { }, //生命周期 - 创建之前
  beforeMount() { }, //生命周期 - 挂载之前
  beforeUpdate() { }, //生命周期 - 更新之前
  updated() { }, //生命周期 - 更新之后
  beforeDestroy() { }, //生命周期 - 销毁之前
  destroyed() { }, //生命周期 - 销毁完成
  activated() { } //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.tt-news-list {
  .tt-news-refresh {
    height: 30px;
    line-height: 30px;
    text-align: center;
    width: 100%;
    font-size: 14px;
    color: #3192d5;
    border: 1px solid #3192d5;
    border-radius: 5px;
    margin-bottom: 10px;
  }

  .list-item {
    display: flex;
    border-bottom: 1px solid #ddd;
    .left {
      flex: 1;
      height: 100px;
      width: 160px;
      padding: 5px;
      img {
        height: 100%;
        width: 100%;
      }
    }

    .right {
      flex: 2;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 5px;
      .title {
        font-weight: 600;
      }

      .profile {
        display: flex;
        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
        .nickname {
          width: 100px;
          height: 30px;
          color: #7b7b7b;
          line-height: 30px;
          font-size: 16px;
        }
      }

      .date {
        color: #7b7b7b;
        font-size: 16px;
      }
    }
  }
}
</style>