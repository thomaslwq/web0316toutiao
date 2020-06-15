<template>
    <ul >
        <li v-for='(item,index) in data' :key='index' class="text" ref='list'>
                <img :src="item.img" v-if="item.img"  class="img">
                <div class="right">
                    <p @click='goDetail(item.nid)'> {{item.title}}</p>
                        <div class="bottom">
                            <img :src="item.user.avator">
                        <span>{{item.user.nickname}}</span>
                        <span>{{item.created_at}}</span>
                        </div>
                </div>
        </li>
    </ul>
</template>

<script>
import { mapState } from 'vuex'
import { mapMutations } from 'vuex'
import { Loading } from 'element-ui';
export default {
    data(){
        return {
            num:10,
            now:1,
            resdata:[],
        }
    },
    computed: {
            ...mapState(['userinfo']),
            data(){
                if(this.resdata.length > this.num){
                    this.resdata.slice(0,this.num * this.now)
                    return this.resdata.slice(0,this.num * this.now)
                }
                return this.resdata
            }
        },
    methods:{
        ...mapMutations(['setSearchData','setScrollHandle']),
        goDetail(id){
                this.$router.push({name:'newsdetail',params:{id :id}})
            },
        handleScroll(){
             let flag = true
             if(!flag)return;
                let s =  document.documentElement.scrollTop + document.documentElement.clientHeight 
                if(document.body.offsetHeight-200 <  s){
                    if(this.data.length == this.resdata.length){
                        return flag =false
                    };
                    let loadingInstance=Loading.service({
                        target : this.$refs.list[this.$refs.list.length-1],
                        text:'加载中'
                    });
                    flag = false
                    setTimeout(()=>{
                        this.now++
                        this.$nextTick(() => { 
                        loadingInstance.close();
                        });
                        flag = true
                    },1000)
                }
        }
    },
    mounted() {
            this.$axios.get('/getArticles').then(res=>{
                this.resdata = res.articles
                this.setSearchData(res.articles)
            })
            document.addEventListener('scroll',this.handleScroll)
            console.log(1)
            this.setScrollHandle(this.handleScroll)
        },
   
}
</script>

<style lang='less' scoped>
.text{
        display: flex;
        padding: 0 10px;
        margin-bottom: 20px;
        border-bottom: 1px solid #f0f0f0;
        .img{
            margin-bottom: 20px;
            width: 100px;
            margin-right: 20px
        }
        p {
            font-size: 20px;
            font-weight: 500;
            cursor: pointer;
            display: inline-block;
        }
        p:hover{
            opacity: .7;
        }
        .bottom{
            display: flex;
            align-items: center;
            height: 40px;
            
            img{
            width: 20px;
                vertical-align: top;
                 margin-bottom: 0px;
            }
            span {
                margin: 0 5px;
                color: #a4a4a4;
            }
        }
    }
</style>