<template>
<div class='searchInput'>
    <input class="search-input" type="text" placeholder="搜索站内资讯、视频或用户">
    <div class="search-buttom">搜索</div>
</div>
</template>

<script>

export default {
components: {},
data() {
   return {

   };
},
}
</script>
<style lang='less'  scoped>
.searchInput {
    width: 340px;
    display: flex;
    .search-input{
        width: 260px;
        height: 45px;
        background-color: var(--bgColor);
        border: 0;
        border-radius: 5px;
        border: 1px solid #ddd;
        outline:none;
        padding:20px;
    }
    .search-buttom{
        width: 80px;
        height: 45px;
        line-height: 45px;
        text-align: center;
        background-color: #208eda;
        border-radius: 5px;
        color: white;
        cursor:pointer;
    }
    .search-buttom:hover{
        background-color:#208eFF;
    }
}
</style>