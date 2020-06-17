<template>
<div class='copyright'>
    <ul v-for="item in list">
        <li>
            <p><img :src="item.icon">{{item.title}}</p>
        </li>
    </ul>
</div>
</template>

<script>

export default {
components: {},
data() {
   return {
       list:[
           {title:"© 2020 今日头条"},
           {title:"中国互联网举报中心 京ICP证140141号"},
           {title:"京ICP备12025439号-3 网络文化经营许可证"},
           {title:"营业执照"},
           {title:"京-非经营性-2016-0081"},
           {title:"互联网药品信息服务资格证书"},
           {title:"跟帖评论自律管理承诺书"},
           {title:"违法和不良信息举报：400-140-2108"},
           {title:"举报邮箱：jubao@toutiao.com"},
           {title:"公司名称：北京字节跳动科技有限公司"},
           {title:"京公网安备 11000002002023号",icon:"https://s3.pstatp.com/toutiao/static/img/gongan.d0289dc.png"},
           ]
   };
},
}
</script>
<style lang='less' scoped>
.copyright {
    margin-top: 20px;
    width: 340px;
    background-color: var(--bgColor);
  ul {
      margin: 15px;
    li {
      p {
          color: #777;
          font-size: 14px;
      }
    }
  }
}
</style>