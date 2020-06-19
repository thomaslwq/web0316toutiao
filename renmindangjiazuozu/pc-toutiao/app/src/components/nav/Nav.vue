<template>
    <div class='nav-container'>
        <h3>今日头条</h3>
        <ul :style="{height: `${navHeight}px`}">
            <li v-for="e ,i in data" @click="toggleNav(i)" :class="{active: clickNav == i}">{{e.text}}</li>
        </ul>
        <div :class="['arrow' ,{'rotate': arrowRotate}]" @click="arrowRotate = !arrowRotate"></div>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
components: {

},
data() {
//这里存放数据
return {
    arrowRotate: false,
    clickNav: "",
    navHeight: "",
    data: [
        { 
            id: 1, 
            text: "推荐" 
        },
        { 
            id: 2, 
            text: "西瓜视频" 
        },
        { 
            id: 3, 
            text: "财经" 
        },
        { 
            id: 4,
            text: "热点"
        },
        { 
            id: 5, 
            text: "直播" 
        },
        { 
            id: 6, 
            text: "图片" 
        },
        { 
            id: 7, 
            text: "科技" 
        },
        { 
            id: 8, 
            text: "娱乐" 
        },
        { 
            id: 9, 
            text: "游戏" 
        },
        { 
            id: 10, 
            text: "体育" 
        },
        { 
            id: 11, 
            text: "懂车帝" 
        },
        { 
            id: 12, 
            text: "热点" 
        }
    ]
};
},
//监听属性 类似于data概念
computed: {

},
//监控data中的数据变化
watch: {
    arrowRotate: function() {
        if(this.arrowRotate) {
            this.navHeight = 0;
        }
        else {
            this.navHeight = this.data.length * 40 + 60;
        }
    }
},
//方法集合
methods: {
    toggleNav: function(i) {
        this.clickNav = i;
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    this.navHeight = this.data.length * 40 + 60;
},
//生命周期 - 创建之前
beforeCreate() {

},
//生命周期 - 挂载之前
beforeMount() {

},
//生命周期 - 更新之前
beforeUpdate() {

},
 //生命周期 - 更新之后
updated() {

},
//生命周期 - 销毁之前
beforeDestroy() {

},
//生命周期 - 销毁完成
destroyed() {

},
//如果页面有keep-alive缓存功能，这个函数会触发
activated() {

},
}
</script>
<style lang='less' scoped>
    @red: #d84b4b;
    .nav-container {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: auto;

        .arrow {
            position: relative;
            bottom: 0;
            display: inline-block;
            width: 100%;
            height: 25px;
            transition: all ease-in-out .5s;

            &.rotate {
                transform: rotate(180deg);
            }

            &::after {
                content: "\21E7";
                position: absolute;
                font-size: 25px;
                left: 50%;
                bottom: -20%;
                transform: translateX(-50%);
                cursor: pointer;
                animation: shake ease-in-out 1s infinite;
            }
        }

        h3 {
            font-size: 30px;
            user-select: none;
            color: #e43c46;
        }
        ul {
            width: 100%;
            overflow: hidden;
            transition: all ease-in-out .2s;

            li {
                margin: 5px 0;
                height: 40px;
                font-size: 20px;
                line-height: 40px;
                user-select: none;
                cursor: pointer;
                border-radius: 10px;
                transition: all ease-in-out .3s;
            }
            li:hover {
                background-color: @red;
                color: white
            }
            li.active {
                background-color: @red;
                color: white
            }
        }
    }

    @keyframes shake {
        0% {
            bottom: -20%;
            color: black;
        }

        50% {
            bottom: 5%;
            color: grey;
        }

        100% {
            bottom: -20%;
            color: black;
        }
    }
</style>