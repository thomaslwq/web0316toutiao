<template>
    <div class="searchBox">
        <el-autocomplete
        class="inline-input"
        v-model="searchBox"
        :fetch-suggestions="querySearch"
        placeholder="搜索站内资讯, 视频或用户"
        :trigger-on-focus="false"
        @select="search"
        ref='input'>
        <div slot="append" class="slot" @click='search(searchDefault)'>
            搜索
        </div>
        </el-autocomplete>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data(){
        return {
            searchBox:'',
            searchDefault:'',
        }
    },
    props:['searchData'],
   
    methods:{
        querySearch(queryString, cb) {
        let restaurants = this.searchData.filter(e=>e.title.indexOf(queryString)!= -1);
            restaurants=restaurants.map(e => ({value : e.title,id:e.nid}))
            this.searchDefault=restaurants[0] || {}
            cb(restaurants);
        },
        search({id}){
            if(!this.searchBox){
                return this.$message('请输入内容')
            }
            this.searchBox=''
            if(!id){
                return this.$message('没有该资讯')
            }
            
            this.$router.push({name:'newsdetail',params:{id :id}})
        },
    },
    mounted() {
            this.$refs.input.$children[0].$el.addEventListener('keyup',(e)=>{
                if(e.key === 'Enter'){
                    this.search(this.searchDefault)
                }
            })
        },
}
</script>

<style lang='less' scoped>
.searchBox{
        width: 340px;
        font-weight: 100;
        margin: 15px auto;
        display: flex;
        
       /deep/.el-input-group__append{
           background-color: #4075fd;
           color: white;
           border: 1px solid #4075fd;
       }
        .inline-input{
            width: 100%;
                .slot{
                    cursor: pointer;
                     width: 100%;
                     height: 100%;
                }
            
        }
        input{
            width: 100%;
            height: 40px;
            border: 1px solid #e8e8e8;
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
            color: #585858;
            padding: 10px;
            box-sizing: border-box;
            background-color: #f5f6f7;
            outline: none;
        }
        input:hover,input:focus{
            border: 1px solid #428bd9;
            border-right: 0px;
        }
        .btn{
            border: none;
            background-color:#428bd9;
            color: white;
            font-weight: 100;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
        }
    }
</style>