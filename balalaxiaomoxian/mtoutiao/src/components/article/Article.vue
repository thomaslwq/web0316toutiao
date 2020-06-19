<template>
    <section class="article">
        <section class="article-list">
            <section class="list-item">
                <section class="item-username">{{article.n_user.nickname}}</section>
                <section class="item-content" v-html="article.content"></section>
                <section class="item-time">{{article.created_at}}</section>
            </section>
        </section>
    </section>
</template>

<script>

export default {
components: {},
data() {
   return {
       article:{}
   };
},
mounted() {
    this.$axios.post("http://tt.linweiqin.com/api/tt/getArticleById",{
       nid:localStorage.getItem("nid")
    }).then(res=>{
        this.article = res.data.article
        console.log(this.article);
    })
},
}
</script>
<style lang='less' scoped>

</style>