<template>
<div class='hotNews'>
    <h3 class="hotNews-title">24小时热闻</h3>
    <div class="hotNews-list">
        <ul>
            <li v-for="item in hotNews" :key="item.id">
                <img :src='item.imageURL'>
                <p>{{item.title}}</p>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
export default {
components: {
},
data() {
   return {
       hotNews:[{
           id:1,
           imageURL:"https://p3.pstatp.com/list/240x240/tos-cn-i-0022/46ffb66294d24261b43bb3fd8faf76ef",
           title:"hi，自拍美图营业，我又上线啦 #该营业了姐姐#大家记得要戴好口罩哦",
       },{
           id:2,
           imageURL:"https://p1.pstatp.com/list/240x240/tos-cn-p-0000/2e3d6207cc524900831cf72a96d520ac",
           title:"俄将高超声速武器作为筹码与美谈判能否奏效？|曹卫东",
       },{
           id:3,
           imageURL:"https://p3.pstatp.com/list/240x240/tos-cn-i-0000/c6b8dc402e4e41d6a0fe0f7bfde2ce4a",
           title:"美国爆发大规模蝉灾，每亩地爬出250000只，百万知了大军来袭！",
       },{
           id:4,
           imageURL:"https://p3.pstatp.com/list/240x240/pgc-image/ef2825cf76554889a5d85a86a804902b",
           title:"“80后”厅官成湖北省委委员，曾是“中国最年轻市长”",
       }]
   };
},
methods: {
    
},
}
</script>
<style lang='less' scoped>
.hotNews{
    width: 340px;
    height: 386px;
    background-color: var(--bgColor);
    margin-top: 20px;
    border-top: 2px solid var(--themeColor);
    padding: 20px;
  .hotNews-title {

  }

  .hotNews-list {
    ul {
      li {
          display: flex;
          margin:20px 0 ;
          cursor: pointer;
        img {
            width: 60px;
            height: 60px;
        }

        p {
        margin-left: 15px;
        font-size: 14px;
        line-height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        }
        p:hover{
            color:#50699d
        }
      }
    }
  }
  .more{
      width: 340px;
      height: 215px;
      background-color: var(--bgColor);
  }
}

</style>