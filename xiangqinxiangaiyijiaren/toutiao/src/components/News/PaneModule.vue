<template>
    <div class="container">
        <h1>{{title}}</h1>
       <div class="content">
            <span v-for='(v,i) in data' :key='i'>
                <img :src="v.img" v-if='v.img' style="width:60px;float:left;margin-right:20px">
                <a :href="v.ml_href"  target="_blank" v-if="v.is_blank" >
                    {{ v.title }}
                </a>
                <a :href="v.ml_href" v-else>{{ v.title.substr(0,40) }}</a>
            </span>
            
       </div>
    </div>
</template>

<script>
export default {
    props:['data','title']
}
</script>

<style lang='less' scoped>
.container{
    border-top:2px solid #e43c46;
    margin-top:18px;
    padding: 15px 20px 20px;
    box-sizing: border-box;
    background-color:#f4f5f6 ;
    h1{
        padding: 0;
        margin-bottom: 15px;
        font-size: 18px;
        text-align: start;
    }
    .content{
        display: flex;
        flex-wrap: wrap;
        span {
            margin-right: 19px;
            margin-bottom: 18px;
            color: #777777;
            text-align: start;
            font-size: 14px;
            font-weight: 200;
            a {
                text-decoration: none;
            color: #777777;
            }
        }
    }
}
</style>