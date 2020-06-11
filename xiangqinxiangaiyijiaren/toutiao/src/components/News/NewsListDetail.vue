<template>
    <div class="newsDetail">
        <!-- <div class="header">
            <img src="https://s3.pstatp.com/toutiao/static/img/logo.271e845.png">
            
        </div> -->
        <head-module>
            <div class="searchBox">
                <input type="text" placeholder="搜索站内资讯, 视频或用户" />
                <el-button class="btn" type='danger'>搜索</el-button>
            </div>
        </head-module>
        <div class="body">
            
            <div class="left">
                <img src="//s3.pstatp.com/toutiao/static/img/repost.021bf16.png" class="repost-img">
                <span>转发</span>
                <img src="//s3.pstatp.com/toutiao/static/img/repost.021bf16.png" class="repost-img">
                <span>微博</span>
                <img src="//s3.pstatp.com/toutiao/static/img/repost.021bf16.png" class="repost-img">
                <span>Qzone</span>
                <img src="//s3.pstatp.com/toutiao/static/img/repost.021bf16.png" class="repost-img">
                <span>微信</span>
            </div>
            <div class="main">
                <h1>{{data.title}}</h1>
                <p class="p1">{{data.n_user.nickname +"  "+ data.created_at}}</p>
                <!-- <p >
                </p> -->
                <div class="div2" v-html=" data.content" >
                </div> 
                <div class="div">
                    <span><i class="el-icon-star-off"></i> 收藏</span>
                    <span><i class="el-icon-warning-outline"></i> 举报</span>
                </div>
            </div>
            <div class="right">
                <img :src="data.n_user.avator" >
                <span>{{data.n_user.nickname}}</span>
            </div>
        </div>
    </div>
</template>
<script>
    import headModule from '../head'
    export default {
        components:{headModule},
        props: ['id'],
        data() {
            return {
                data: {
                    content: "天不生我键盘侠,万古键道如长夜.↵键来!!!!",
                    created_at: "2020-06-09 16:00:15",
                    img: null,
                    imgs: [""],
                    n_user: {
                        nickname: "好啊油古德摸你",
                        avator: "http://wlanya.oss-cn-shenzhen.aliyuncs.com/2020_06_09/09373880-bc04-cbb4-34e5-d79f67db418e.jpg"
                    },
                    nid: 56,
                    title: "天不生我键盘侠,万古",
                    type: "TT",
                    uid: 1090,
                }
            }
        },
        mounted() {
            console.log(this.$route.params)
        },
        created() {
            this.$axios.get('getArticleById', {
                params: {
                    nid: this.id
                }
            }).then(res => this.data=res.article)
        },
    }
</script>

<style lang='less'>
    .newsDetail {
        .header {
            margin: 0 auto;
            min-width: 1200px;
            box-sizing: border-box;
            padding: 0 140px;
            box-shadow: 0 1px 4px 0 rgba(0, 0, 0, .12);
            display: flex;
            justify-content: space-between;
            height: 65px;
            align-items: center;


            img {
                widows: 107px;
                height: 30px;
            }

            .searchBox {
                width: 340px;
                font-weight: 100;
                margin: 15px 0;
                display: flex;

                input {
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

                input:hover,
                input:focus {
                    border: 1px solid #428bd9;
                    border-right: 0px;
                }

                .btn {
                    border: none;
                    background-color: #428bd9;
                    color: white;
                    font-weight: 100;
                    border-top-left-radius: 0;
                    border-bottom-left-radius: 0;
                }
            }
        }

        .body {
            margin: 0 auto;
            min-width: 1200px;
            box-sizing: border-box;
            margin: auto;
            padding: 0 140px;
            display: flex;
            justify-content: space-between;
            .left{
                margin-top: 50px;
                width: 107px;
                min-width: 107px;
                height: 200px;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                justify-content: space-between;
                img{
                    width: 35px;
                    margin-bottom: 6px;
                }
                span {
                    width: 4em;
                    text-align: start;
                    text-indent: 0.5em;
                    font-weight: 200;
                }
            }
            .main{
                max-width: 900px;
                min-width: 600px;
                margin-top: 20px;
                box-sizing: border-box;
                padding: 0 20px;
                .p1{
                    font-size: 12px;
                    color: #9e9e9e;
                    margin: 20px 0;
                }
                .div2{
                    word-wrap: break-word;
                    font-size: 12px;
                    img{
                        max-width: 100%;
                    }
                }
                .div {
                    margin-top: 30px;
                    text-align: end;
                    font-size: 14px;    
                    color: #a4a4a4;
                    span,i{
                        margin: 0 4px;
                        cursor: pointer;
                    }
                }
            }
            .right{
                width:340px;
                min-width:340px;
                margin-top: 20px;
                height: 90px;
                border-top:2px solid  #e43c46;
                background-color: #f4f5f6;
                display: flex;
                align-items: center;
                padding: 20px;
                box-sizing: border-box;
                img{
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    margin-right: 20px;
                }
                span{
                    font-weight: 500;
                }
                
            }
        }
    }
</style>