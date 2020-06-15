<template>
<!-- index首页 -->
    <el-container >
        <el-header style="padding:0;" >
            <my-header></my-header>
        </el-header>
        <el-container class="index">
            <el-aside width="170px" class="leftAside">
                <my-nav></my-nav>
            </el-aside>
            <el-main>
                <my-main></my-main>
            </el-main>
            <el-aside width="400px" class="rigthAside">
                <my-user></my-user>
            </el-aside>
        </el-container>
    </el-container>
</template>

<script>
    import MyNav from './Nav/Nav'
    import MyUser from './User/User'
    import MyHeader from './modules/Header'
    import MyMain from './News/News'
    import {mapState} from 'vuex'
    export default {
        name: 'index',
        computed: {
            ...mapState(['handleScroll'])
        },
        components: {
            MyNav,
            MyUser,
            MyHeader,
            MyMain
        },
        beforeRouteLeave (to, from, next) {
            document.removeEventListener('scroll',this.handleScroll)
            next()
        }
    }
</script>

<style>
    .el-aside {
        text-align: center;
        overflow: none;
    }
    .leftAside{
        overflow:hidden !important;
    }
    .el-main {
        min-width: 660px;
    }
    .el-input__inner{
        font-weight: 100;
    }
    .index{
            width: 80%;
    min-width: 700px;
    margin: 0 auto;
    }
</style>