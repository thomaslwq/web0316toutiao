<template>
<div class='more'>
    <h3>更多</h3>
    <ul class="item-ul">
        <li class="item" v-for="item,i in moreLink" :key="i">
            <a :href="item.href">{{item.title}}</a>
        </li>
    </ul>
</div>
</template>

<script>

export default {
    components: {},
    data() {
    return {
            moreLink: [
            { title: '关于头条', href : 'https://toutiao.com/about/'},
            { title: '加入头条', href : 'https://job.bytedance.com'},
            { title: '媒体报道', href : 'https://toutiao.com/report/'},
            { title: '媒体合作', href : 'https://toutiao.com/media_partners/'},
            { title: '产品合作', href : 'https://toutiao.com/cooperation/'},
            { title: '合作说明', href : 'https://toutiao.com/media_cooperation/'},
            { title: '广告投放', href : 'https://www.oceanengine.com/?source=pchomemore'},
            { title: '联系我们', href : 'https://toutiao.com/contact/'},
            { title: '用户协议', href : 'https://toutiao.com/user_agreement/'},
            { title: '隐私政策', href : 'https://toutiao.com/privacy_protection/'},
            { title: '侵权投诉', href : 'https://toutiao.com/complain/'},
            { title: '廉洁举报', href : 'https://toutiao.com/corrupt_report/'},
            { title: '企业认证', href : 'javascript:;'},
            { title: '肺炎求助', href : 'javascript:;'},
            { title: '辟谣专区', href : 'javascript:;'},
        ],
    };
    },
}
</script>
<style lang='less' scoped>
.more{
    margin-top: 20px;
    border-top: 2px solid var(--themeColor);
    width: 340px;
    background-color: var(--bgColor);
    padding:0 20px;
    h3 {
        margin-top: 10px;
    }

    .item-ul {
        display: flex;
        flex-wrap: wrap;
    .item {
        width: 75px;
        height: 40px;
        line-height: 40px;
            a {
                color: #777;
                font-size: 14px;
            }
        }
    }
}
</style>