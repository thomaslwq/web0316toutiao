<!--  -->
<template>
  <div class="tt-news">
    <h3 class="news-title">24小时热闻</h3>
    <div class="news-list" v-for="n,index in news" :key="index">
        <a :href="n.hn_href" target="_blank">
            <div class="list-img">
                <img :src="n.img" class="img-image" />
            </div>
            <div class="list-text">{{n.title}}</div>
        </a>
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
      news: [
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
      ]
    };
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
.tt-news {
  width: 350px;
  height: 380px;
  margin-top: 10px;
  background-color: #f4f5f6;
  border-top: 2px solid #e93545;
  padding: 20px;

  .news-title {
    color: #4c4c4c;
    margin-bottom: 20px;
  }

  .news-list {
    height: 70px;
     margin-bottom: 10px;
    a {
        color: black;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid #e8e8e8;
       
      .list-img {
        width: 60px;
        height: 60px;
        display: block;
        .img-image {
          width: 60px;
          height: 60px;
          vertical-align: middle;
        }
      }
      .list-text {
          width: 250px;
        height: 60px;
        margin: 10px;
        font-size: 16px;
        // white-space: nowrap;
        text-overflow:ellipsis;
        overflow: hidden;
      }
    }
  }
  .news-list:nth-child(5) {
    border: 0;
  }
}
</style>