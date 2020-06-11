<template>
    <div class="newsList">
        <div class="searchBox">
            <input type="text" placeholder="搜索站内资讯, 视频或用户"/>
            <el-button class="btn" type='danger'>搜索</el-button>
        </div>
        <div class="login">
            <div class="content" v-if='!isLogin'>
                <p>登录后可以保存您的浏览喜好、评论、收藏,</p>
                <p>并与APP同步, 更可以发布微头条</p>
                <el-button class="btn" @click='goLogin'>登录</el-button>
                <div class="icon-login">
                    <!-- <div><img src="../../assets/qq.png">QQ</div>
                    <div><img src="../../assets/wx.png">微信</div> -->
                </div>
                
            </div>
            <div class="admin" v-else>
                <div class="loginOut"><span @click="islogout">退出登录</span></div>
                <img :src="userinfo.avator" @click='goUserCenter'>
                <div class="name"><span>{{userinfo.nickname}}</span></div>
                <div class="ttcount">
                    <p class="p1"><span>{{userinfo.tt_count}}</span></p>
                    <p class="p2"><span>头条数</span></p>
                </div>
                <div class="artcount">
                    <p class="p1"><span>{{userinfo.article_count}}</span></p>
                    <p class="p2"><span>文章数</span></p>
                </div>
            </div>
        </div>
        <new-pane :data='hotNews' :title='"24小时热闻"'></new-pane>
        <new-pane :data='moreLink' :title='"更多"'></new-pane>
        <new-pane :data='friendLink' :title='"友情链接"'></new-pane>
        <div class="company">
            <p> © 2020 今日头条</p>
            <p> 中国互联网举报中心 京ICP证140141号</p>
            <p> 京ICP备12025439号-3 网络文化经营许可证</p>
            <p> 营业执照</p>
            <p> 京-非经营性-2016-0081</p>
            <p> 互联网药品信息服务资格证书</p>
            <p> 跟帖评论自律管理承诺书</p>
            <p> 违法和不良信息举报：400-140-2108</p>
            <p> 举报邮箱：jubao@toutiao.com</p>
            <p> 公司名称：北京字节跳动科技有限公司</p>
            <p> 京公网安备 11000002002023号</p>
        </div>
    </div>
</template>

<script >
import NewPane from '../News/PaneModule'
import {mapState} from 'vuex'
import { mapMutations } from 'vuex'

export default {
    components:{NewPane},
    computed: {
        ...mapState(['isLogin','userinfo'])
    },
    data(){
        return {
            moreLink: [
					{ is_blank : true, title: '关于头条', ml_href : 'https://toutiao.com/about/'},
					{ is_blank : true, title: '加入头条', ml_href : 'https://job.bytedance.com'},
					{ is_blank : true, title: '媒体报道', ml_href : 'https://toutiao.com/report/'},
					{ is_blank : true, title: '媒体合作', ml_href : 'https://toutiao.com/media_partners/'},
					{ is_blank : true, title: '产品合作', ml_href : 'https://toutiao.com/cooperation/'},
					{ is_blank : true, title: '合作说明', ml_href : 'https://toutiao.com/media_cooperation/'},
					{ is_blank : true, title: '广告投放', ml_href : 'https://www.oceanengine.com/?source=pchomemore'},
					{ is_blank : true, title: '联系我们', ml_href : 'https://toutiao.com/contact/'},
					{ is_blank : true, title: '用户协议', ml_href : 'https://toutiao.com/user_agreement/'},
					{ is_blank : true, title: '隐私政策', ml_href : 'https://toutiao.com/privacy_protection/'},
					{ is_blank : true, title: '侵权投诉', ml_href : 'https://toutiao.com/complain/'},
					{ is_blank : true, title: '廉洁举报', ml_href : 'https://toutiao.com/corrupt_report/'}
				],
            friendLink: [
                { is_blank : true, title: '光明网', ml_href : 'http://www.gmw.cn'},
                { is_blank : true, title: '央广网', ml_href : 'http://www.cnr.cn'},
                { is_blank : true, title: '国际在线', ml_href : 'http://www.cri.cn'},
                { is_blank : true, title: '中国西藏网', ml_href : 'http://www.tibet.cn'},
                { is_blank : true, title: '参考消息', ml_href : 'http://www.cankaoxiaoxi.com'},
                { is_blank : true, title: '环球网', ml_href : 'http://www.huanqiu.com'},
                { is_blank : true, title: '中青在线', ml_href : 'http://www.cyol.com'},
                { is_blank : true, title: '中青网', ml_href : 'http://www.youth.cn'},
                { is_blank : true, title: '海外网', ml_href : 'http://www.haiwainet.cn'},
                { is_blank : true, title: '中国网', ml_href : 'http://h5.china.com.cn'}
            ],
            hotNews: [
                { ml_href:'https://toutiao.com/group/1667089134708739/', img : '//p3.pstatp.com/list/240x240/tos-cn-i-0022/456486626f6f464d94b5d4fbba5f2eca',title: '#赖弘国点赞绯闻女友# 最近，#赖弘国# 的绯闻女友陈怡安在社交软件上上传了自己的美照，照片中的她穿着红色比基尼狂秀身材，十分热辣。随后，有网友发现赖弘国点赞了这张照片。'},
                { ml_href:'https://toutiao.com/group/6828402238218568195/', img : '//p9.pstatp.com/list/240x240/pgc-image/1e4a9d9e2300495c950a21fd9b948577',title: '对中国独立审查？成立“THO”？疫苗成为全球谋霸工具？世界卫生大会辟谣'},
                { ml_href:'https://toutiao.com/group/6828413869761757704/', img : '//p1.pstatp.com/list/240x240/pgc-image/RzPHIRNta0fJ1',title: '舒兰感染链达45人，5岁男童确诊；病源尚未查明，怀疑四种可能'},
                { ml_href:'https://toutiao.com/group/6828431817993880071/', img : '//p1.pstatp.com/list/240x240/pgc-image/c600a14aa6974dfb9bacf9fde0642adb',title: '31省份一季度GDP出炉！仅两省破2万亿，山东领衔第二梯队'}
            ],
        }
    },
    methods: {
        ...mapMutations(['logout','Login']),
        islogout(){
            this.logout()
        },
        goLogin(){
            this.$router.push('/login')
        },
        goUserCenter(){
            this.$router.push('userCenter')
        },
        mounted() {
            if(this.Login){
                let now = new Date().getTime()
                let last = new Date(this.userinfo.oauth_expire_time).getTime()
                now > last &&  this.logout()
            }
        },
    },
}
</script>

<style lang='less' scoped>
.newsList{
    padding: 0 30px;
    .searchBox{
        width: 100%;
        font-weight: 100;
        margin: 15px 0;
        display: flex;
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
    .login{
        background-color: #f4f5f6;
        height: 230px;
        padding: 20px;
        box-sizing: border-box;
        .content{
            background-color: #fff;
            width: 100%;
            height: 100%;
            padding: 20px;
            box-sizing: border-box;
            font-size: 12px;
            color: #949494;
            .btn{
                width: 100%;
                background-color: #e43c46;
                color: white;
                font-weight: 100;
                margin: 15px 0;
            }
            .btn:hover{
                    opacity: .7;
                }
            .icon-login{
                display: flex;
                justify-content: center;
                div{
                    display: flex;
                    flex-direction: column;
                    margin:0 10px;
                }
                div:hover{
                    opacity: .7;
                }
            }
        }
        .admin{
            width: 100%;
            height: 100%;
            padding: 10px;
            box-sizing: border-box;
            background-color: white;
            .loginOut{
                font-size: 12px;
                text-align: end;
                color: #aaaaaa;
            }
            img{
                width: 60px;
                margin: auto;
                border-radius: 50%;
                cursor: pointer;
            }
            .ttcount,.artcount{
                width: 50%;
                display: inline-block;
                margin-top: 10px;
                .p1{
                    font-weight: 900;
                    font-size: 18px;
                    
                }
                .p2{
                    color: #aaaaaa;
                    font-size:14px ;
                    font-weight: 200;
                }
            }
            span:hover{
                color: #496399;
            }
            .ttcount{
                box-sizing: border-box;
                border-right:1px solid #f4f4f4;
            }
            
        }
    }
    .company{
        margin-top: 20px;
        background-color:#f4f5f6 ;
        padding: 20px;
        box-sizing: border-box;
        p{
            text-align: start;
            font-size: 14px;
            color: #979898;
            line-height: 30px;
        }
    }
}

</style>