<template>
<div class='nav'>
    <h3>新闻头条</h3>
    <div class="nav-list">
        <div class="list-item" v-for="(item,i) in navList">{{item.text}}</div>
    </div>
</div>
</template>

<script>

export default {
components: {},
data() {
   return {
       navList:[{
           id:1,text:"推荐"
       },{
           id:2,text:"西瓜视频"
       },{
           id:3,text:"热点"
       },{
           id:4,text:"直播"
       },{
           id:5,text:"图片"
       },{
           id:6,text:"科技"
       },{
           id:7,text:"娱乐"
       },{
           id:8,text:"游戏"
       },{
           id:9,text:"体育"
       },{
           id:10,text:"懂车帝"
       },{
           id:11,text:"财经"
       },{
           id:12,text:"搞笑"
       },{
           id:13,text:"更多"
       }]
   };
},
}
</script>
<style lang='less'  scoped>
.nav {
    width: 100px;
  h3 {
    width: 110px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: var(--themeColor);
  }

  .nav-list {
    .list-item {
        width: 110px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-radius: 5px;
        transition: all 0.3s;
        cursor: pointer;
    }
    .list-item:hover{
        color: white;
        background-color: var(--themeColor);
    }
  }
}
</style>