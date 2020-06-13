<template>
<div class="post">
    <div class="tab">
        <div :class="['tabs-item',{'active':tab.id===activeTab}]"
            v-for="tab in tabsItem"
            @click="switchTab(tab.id)"
        >
            <div>{{tab.text}}</div>
        </div>
    </div>
    <div class="tab-content">
        <div class="content-toutiao" v-show="activeTab=='toutiao'">
            <textarea class="textarea" rows="10" placeholder="有什么新鲜事想告诉大家"></textarea>
            <div class="toutiao-buttom">
                <div class="buttom-pic"
                    @click.stop="uploadImg"
                >
                    <i class="iconfont icon-picture"></i>图片
                </div>
                <div class="buttom-emoji"
                    @click.stop="openEmoji"
                >
                    <i class="iconfont icon-biaoqing-xue"></i>表情
                </div>
                <div class="arcticle-publish">发布</div>
            </div>
            <!-- 显示图片开始 -->
            <div class="uploadImg" v-show="isShowUploadImg">
                <div class="fileIcon">+</div>
                <input type="file" class="inputFile" multiple @change="fileImgsUpload" accept=".jpg, .png">
                <div class="img-item" 
                    v-for="(img,index) in uploadImgs" :key="img"
                >
                    <img :src="img" />
                    <div class="deleteImg" 
                    @click.stop="deleteImg(index)">X</div>
                </div>
            </div>
            <!-- 显示图片结束 -->

            <!-- 显示表情开始 -->
            <div v-show="isShowEmoji">表情</div>
            <!-- 显示表情结束 -->
        </div>
        <div class="content-article" v-show="activeTab=='article'">
            <input class="article-title" type="text" placeholder="请输入标题"/>
            <vue-editor v-model="richContent" class="rich-editor" />
            <div class="article-bottom">
                <div class="bottom-publish">发布</div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {VueEditor} from "vue2-editor"
export default {
components: {
    VueEditor
},
data() {
   return {
       tabsItem:[
           {id:"toutiao",text:"发微头条"},
           {id:"article",text:"写文章"},
        ],
        activeTab:"toutiao",
        isShowUploadImg:false,
        isShowEmoji:false,
        uploadImgs:[],
        richContent: "",
   };
},
methods: {
    switchTab:function(tabId){
        this.activeTab = tabId
    },
    uploadImg:function(){
        this.isShowUploadImg = !this.isShowUploadImg;
        this.isShowEmoji = false
    },
    fileImgsUpload:function(e){
        // console.log(e.target.files);
        // console.log(Array.from(e.target.files));
        Array.from(e.target.files).forEach(f=>{
            let param = new FormData()
            param.append("file",f)
            this.$axios.post("/aliossUpload",param).then(res=>{
                this.uploadImgs.push(res.url)
            })
        })
    },
    deleteImg:function(index){
        this.uploadImgs.splice(index,1)
    },
    openEmoji:function(){
        this.isShowUploadImg = false;
        this.isShowEmoji = !this.isShowEmoji;
    }
},
}
</script>
<style lang='less' scoped>
@import "../../assets/iconfont.css";
.post{
    .tab{
        width: 100%;
        border: 1px solid #ddd;
        display: flex;
        .tabs-item{
            margin: 10px;
            color: black;
            cursor: pointer;
            div{

            }
        }
        .active{
            border-bottom:2px solid var(--themeColor) ;
            color: #46a0fc;
        }
    }
    .tab-content{
        .content-toutiao {
            .textarea {
                width: 100%;
                height: 100%;
                border: 1px solid #ddd;
                outline: none;
                padding: 15px;
                font-size: 15px;
                background-color: var(--bgColor);
                resize:none;//禁止拖拽窗口哦
            }
            .toutiao-buttom {
                width: 100%;
                height: 40px;
                border: 1px solid #ddd;
                margin-top: -7px;
                display: flex;
                line-height: 40px;
                font-size: 15px;
                position: relative;
                .buttom-pic {
                    padding:0 20px;
                    transition: all 1s;
                }

                .buttom-emoji {
                    padding:0 20px;
                    transition: all 1s;
                }
                .buttom-pic:hover,.buttom-emoji:hover{
                    background-color: #edf5ff;
                    color: #70a7fe;
                    cursor: pointer;
                }
                .arcticle-publish{
                    position: absolute;
                    right: 0;
                    width: 100px;
                    background-color: #eb8a8e;
                    color: white;
                    text-align: center;
                    cursor: pointer;
                }
                .arcticle-publish:hover{
                    transition: all 0.5s;
                    background-color:#e13a46;
                }
            }
            .uploadImg{
                position: relative;
                background-color: white;
                box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.3);
                border-radius: 10px;
                margin: 10px;
                padding: 10px;
                display: flex;
                flex-wrap: wrap;
                .fileIcon{
                    width: 100px;
                    height: 100px;
                    border: 1px dashed #777;
                    border-radius: 10px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 50px;
                    font-weight: 100;
                    cursor: pointer;
                    margin: 20px;
                }
                
                .inputFile{
                    width: 100px;
                    height: 100px;
                    position: absolute;
                    top: 0;
                    opacity: 0;
                }
                .inputFile:hover{
                    cursor: pointer;
                }
                .img-item{
                    width: 100px;
                    height: 100px;
                    border-radius: 10px;
                    margin: 20px;
                    border: 1px dashed #ddd;
                    position: relative;
                    img{
                        padding: 5px;
                        width: 100px;
                        height: 100px;
                    }
                    .deleteImg{
                        position: absolute;
                        top: 0;
                        width: 100px;
                        height: 100px;
                        font-weight: 900;
                        position: absolute;
                        display: none;
                        text-align: center;
                        line-height: 100px;
                    }
                    &:hover{
                        transition: all 1s;
                        background-color: #ddd;
                        opacity: .5;
                        .deleteImg{
                            width: 100px;
                            height: 100px;
                            color: white;
                            display: block;
                        }
                    }
                }
            }
        }
        .content-article {
            .article-title {
                height: 60px;
                width: 100%;
                background-color: var(--bgColor);
                border: 1px solid #ddd;
                padding: 10px;
                font-size: 18px;
                font-weight: 700;
                outline: none;
            }

            .rich-editor {
                background-color:var(--bgColor);

            }
            .article-bottom {
                width: 100%;
                height: 40px;
                border: 1px solid #ddd;
                position: relative;
                .bottom-publish {
                    position: absolute;
                    right: 0;
                    width: 100px;
                    text-align: center;
                    line-height: 40px;
                    background-color: #eb8a8e;
                    color: white;
                }
                .bottom-publish:hover{
                    background-color: var(--themeColor);
                }
            }
        }
    }
}
// 图标样式
.iconfont{
    color: var(--themeColor);
}
</style>