<template>
<!-- index的中间部分 -->
    <div class="main"> 
        <write-box></write-box>
        <el-button type="primary" class="refresh-mode" @click="refresh">点击刷新
        <i class="el-icon-refresh" style="font-size: 12px; color: rgb(42, 144, 215);"></i>
        </el-button>
        <news-item></news-item>
    </div>
    
</template>

<script>
    import { VueEditor } from "vue2-editor";
    import { mapState } from 'vuex'
    import { mapMutations } from 'vuex'
    import WriteBox from '../modules/WriteBox'
    import NewsItem from '../modules/NewsItem'
    export default {
        components:{WriteBox,NewsItem},
        methods:{
            refresh(){
                this.$axios.get('/getArticles').then(res=>{
                    this.resdata = res.articles
                    this.$message({
                        message: '刷新成功',
                        type: 'success'
                    })
                })
            },
        }
    }
</script>

<style lang='less' scoped>

.main {
    .refresh-mode{
    width: 100%;
    margin:20px 0;
}
}
</style>