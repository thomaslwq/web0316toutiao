<template>
<!-- index页面user模块 -->
    <div class="newsList">
        <search></search>
        <login></login>
    </div>
</template>

<script >
import {mapState} from 'vuex'
import { mapMutations } from 'vuex'
import login from '../modules/login'
import search from '../modules/searchBox'

export default {
    components:{login,search}
}
</script>

<style lang='less' scoped>

</style>