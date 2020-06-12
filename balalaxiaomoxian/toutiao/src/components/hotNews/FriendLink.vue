<template>
<div class='friendLink'>
    <h3>友情链接</h3>
    <ul>
        <li v-for="item in linkList" :key="item.title">
            <a :href="item.href">{{item.title}}</a>
        </li>
    </ul>
</div>
</template>

<script>

export default {
components: {},
data() {
   return {
       linkList:[
        { title: '光明网', href : 'http://www.gmw.cn'},
        { title: '央广网', href : 'http://www.cnr.cn'},
        { title: '国际在线', href : 'http://www.cri.cn'},
        { title: '中国西藏网', href : 'http://www.tibet.cn'},
        { title: '参考消息', href : 'http://www.cankaoxiaoxi.com'},
        { title: '环球网', href : 'http://www.huanqiu.com'},
        { title: '中青在线', href : 'http://www.cyol.com'},
        { title: '中青网', href : 'http://www.youth.cn'},
        { title: '海外网', href : 'http://www.haiwainet.cn'},
        { title: '中国网', href : 'http://h5.china.com.cn'},
        { title: '未来网', href : 'javascript:;'},
        { title: '千龙网', href : 'javascript:;'},
        { title: '新京报', href : 'javascript:;'},
        { title: '北青网', href : 'javascript:;'},
        { title: '法制晚报', href : 'javascript:;'},
        { title: '北京晨报', href : 'javascript:;'},
        { title: '北京商报', href : 'javascript:;'},
        { title: '北京娱乐信报', href : 'javascript:;'},
        { title: '奥一网', href : 'javascript:;'},
        { title: '金羊网', href : 'javascript:;'},
        { title: '华商网', href : 'javascript:;'},
        { title: '新民网', href : 'javascript:;'},
        { title: '红网', href : 'javascript:;'},
        { title: '中国江苏网', href : 'javascript:;'},
        { title: '中国江西网', href : 'javascript:;'},
        { title: '齐鲁网', href : 'javascript:;'},
        { title: '南海网', href : 'javascript:;'},
        { title: '安徽网', href : 'javascript:;'},
        { title: '河北新闻网', href : 'javascript:;'},
        { title: '闽南网', href : 'javascript:;'},
        { title: '海峡网', href : 'javascript:;'},
        { title: '华声在线', href : 'javascript:;'},
        { title: '中国蓝TV', href : 'javascript:;'},
        { title: '北国网', href : 'javascript:;'},
        { title: '龙虎网', href : 'javascript:;'},
        { title: '东莞时间网', href : 'javascript:;'},
        { title: '懂车帝', href : 'javascript:;'},
        { title: '汽车之家', href : 'javascript:;'},
        { title: 'Onlylady女人志', href : 'javascript:;'},
        { title: '中国搜索', href : 'javascript:;'},
        { title: '每日经济新闻', href : 'javascript:;'},
        { title: '网上车市', href : 'javascript:;'},
        { title: '网通社汽车', href : 'javascript:;'},
        { title: '北方网', href : 'javascript:;'},
        { title: '湖南省旅发委官网', href : 'javascript:;'},
        { title: '乐居网', href : 'javascript:;'},
        { title: '人民论坛网', href : 'javascript:;'},

        ]
   };
},
}
</script>
<style lang='less' scoped>
.friendLink {
    margin-top: 20px;
    border-top: 2px solid var(--themeColor);
    width: 340px;
    background-color: var(--bgColor);
    padding:0 20px;
  h3 {
    margin-top: 10px;
  }

  ul {
      display: flex;
      flex-wrap: wrap;
    li {
        height: 40px;
        line-height: 30px;
      a {
          margin-right: 22px;
          color: #777;
          font-size: 14px;
      }
    }
  }
}
</style>