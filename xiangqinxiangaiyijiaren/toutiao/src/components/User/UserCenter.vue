<template>
    <!-- 用户详情 -->
    <div class="usercenter">
        <head-module>
            <search-box class="search" :searchData='searchData'></search-box>
        </head-module>
        <div class="main">
            <div class="head">
                <img src="../../assets/bg_profile.png" @click='goindex'>
                <div class="user">
                    <img :src="userinfo.avator">
                    <span>{{userinfo.nickname}}</span>
                    <el-button type="primary" icon="el-icon-edit" circle @click='goUserData'></el-button>
                </div>
            </div>
            <div class="left">
                <el-tabs class="write-box" v-model="active">
                    <el-tab-pane label="微头条" name="tt">
                        <div v-for='(item,index) in ttData' :key='index' class="text">
                            <div class="avator">
                                <img :src="userinfo.avator" class="img">
                                <span>{{userinfo.nickname}}</span>
                            </div>

                            <p class="p1"><img :src="item.img" v-if="item.img">{{item.title}}</p>
                            <p class="p2">{{item.created_at}}
                                <span class="remove" @click='remove(item)'>删除</span>
                            </p>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="文章" name="xwz">
                        <div v-for='(item,index) in wzData' :key='index' class="text">
                            <div class="avator">
                                <img :src="userinfo.avator" class="img">
                                <span>{{userinfo.nickname}}</span>
                            </div>
                            <p class="p1">{{item.title}}</p>
                            <p class="p2">{{item.created_at}}
                                <span class="remove" @click='remove(item)'>删除</span>
                            </p>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <div class="rigth">
                <div class="ttcount">
                    <p class="p1"><span>{{ttData.length}}</span></p>
                    <p class="p2"><span>头条数</span></p>
                </div>
                <div class="artcount">
                    <p class="p1"><span>{{wzData.length}}</span></p>
                    <p class="p2"><span>文章数</span></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        mapState
    } from 'vuex'
    import headModule from '../modules/Head'
    import SearchBox from '../modules/SearchBox'
    import {
        mapMutations
    } from 'vuex'
    export default {
        components: {
            headModule,
            SearchBox
        },
        computed: {
            ...mapState(['userinfo']),
            searchData(){
                return [...this.ttData,...this.wzData]
            }
        },
        data() {
            return {
                ttData: [],
                wzData: [],
                active: 'tt'
            }
        },
        mounted() {
            let str = `/getArticlesByType?type=TT&oauth_token=${this.userinfo.oauth_token}`
            let str2 = `/getArticlesByType?type=Article&oauth_token=${this.userinfo.oauth_token}`
            this.$axios.get(str).then(res => {
                this.ttData = res.articles
            })
            this.$axios.get(str2).then(res => {
                this.wzData = res.articles
            })
        },
        methods: {
            ...mapMutations(['updateTTCount', 'updateArticleCount']),
            remove({
                nid,
                type
            }) {
                let oauth_token = this.userinfo.oauth_token
                this.$axios.post('/deleteArticle', {
                    nid,
                    oauth_token
                }).then(res => {
                    if (res.ret) return;
                    if (type === 'TT') {
                        this.updateTTCount(--this.userinfo.tt_count)
                        this.ttData.forEach((e, i) => e.nid == nid && this.ttData.splice(i, 1))
                    } else {
                        this.updateArticleCount(--this.userinfo.article_count)
                        this.wzData.forEach((e, i) => e.nid == nid && this.ttData.splice(i, 1))
                    }
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    })
                })
            },
            goUserData() {
                this.$router.push('userData')
            },
            goindex() {
                this.$router.push('/')
            }
        },
    }
</script>

<style lang='less' scoped>
    .usercenter {
        background-color: #f4f5f6;

        .main {
            background-color: #f4f5f6;
            width: 1200px;
            margin: auto;
            padding: 20px 140px;
            margin-top: 5px;
            height: 100vh;

            .head {
                margin: auto;
                height: 250px;
                box-sizing: border-box;
                background-color: #ffffff;
                max-width: 1200px;
                margin-bottom: 20px;

                img {
                    width: 100%;
                    height: 160px;
                }

                .user {
                    img {
                        width: 100px;
                        height: 100px;
                        transform: translateY(-40%);
                        margin: 0 20px;
                        border-radius: 50%;
                        float: left;
                    }

                    span {
                        font-weight: 900;
                        font-size: 20px;
                        float: left;
                        margin: 10px 5px 0 0;
                        letter-spacing: 3px
                    }
                }


            }

            .rigth {
                width: 340px;
                float: right;
                background-color: #fff;
                box-sizing: border-box;
                text-align: center;
                padding: 20px 10px;

                .artcount,
                .ttcount {
                    display: inline-block;
                    width: 50%;

                    .p1 {
                        font-weight: 900;
                        font-size: 20px;

                    }

                    .p2 {
                        color: #aaaaaa;
                        font-size: 14px;
                        font-weight: 200;
                    }
                }

                .ttcount {
                    box-sizing: border-box;
                    border-right: 1px solid #eee;
                }
            }

            .left {
                width: 850px;
                float: left;
                background-color: #fff;

                .write-box {
                    border: none;
                    
                    /deep/.el-tabs__nav.is-top{
                        margin-left: 20px;
                    }
                    .text {
                        padding: 30px;
                        margin: 0;

                        .avator {
                            display: flex;
                            align-items: center;

                            .img {
                                width: 30px;
                                height: 30px;
                                border-radius: 50%;
                                margin-right: 5px;
                            }

                            span {
                                font-size: 17px;
                                font-weight: 900;
                                letter-spacing: 2px
                            }
                        }

                        p {
                            display: block;

                            img {
                                width: 50px;
                                margin: 5px 5px 5px 0;
                                vertical-align: top;
                            }
                        }

                        .p1 {
                            margin: 10px 0;
                        }

                        .p2 {
                            color: #919191;
                            font-size: 14px;
                            font-weight: 200;
                            display: flex;
                            justify-content: space-between;

                            .remove {
                                display: none;
                            }
                        }

                    }

                    .text:hover .remove {
                        display: block
                    }
                }
            }
        }
    }
</style>