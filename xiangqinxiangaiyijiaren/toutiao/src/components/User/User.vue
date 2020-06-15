<template>
<!-- index页面user模块 -->
    <div class="newsList">
        <search :searchData='searchData'></search>
        <login></login>
    </div>
</template>

<script >
import {mapState} from 'vuex'
import login from '../modules/Login'
import search from '../modules/SearchBox'

export default {
    components:{login,search},
    computed: {
        ...mapState(['searchData'])
    },
}
</script>

<style lang='less' scoped>

</style>