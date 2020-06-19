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
            <textarea class="textarea" rows="10" placeholder="有什么新鲜事想告诉大家" :maxlength="maxCount" v-model="textAreaMsg"></textarea>
            <div class="textWord">
                <span class="nowWord">{{textNum}}</span>
                <span>/</span>
                <span class="maxWord">{{maxCount}}</span>
            </div>
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
                <div class="arcticle-publish" @click.stop="publishMin">发布</div>
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
                <div class="uploadImg-tip">图片只能上传9张,支持格式 .jpg, .png</div>
            </div>
            <!-- 显示图片结束 -->

            <!-- 显示表情开始 -->
            <div v-show="isShowEmoji" class="emoji">表情</div>
            <!-- 显示表情结束 -->
        </div>
        <div class="content-article" v-show="activeTab=='article'">
            <input class="article-title" type="text" placeholder="请输入标题" v-model="title"/>
            <vue-editor 
            use-custom-image-handler
            v-model="richContent" 
            class="rich-editor" 
            @image-added="handleImageAdded"
            />
            <div class="article-bottom">
                <div class="bottom-publish" @click.stop="publishArticle">发布</div>
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
        maxCount:200,
        textAreaMsg:"",
        title:""
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
        if(this.uploadImgs.length>=10){
            return
        }
        // console.log(e.target.files.length);
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
    },
    publishMin:function(){
        if(!this.textAreaMsg){
            this.$message({
                msg:"内容不能为空"
            })
            return false
        }
        this.$axios.post("/createTT",{
            content:this.textAreaMsg,
            imgs:this.uploadImgs.join(",")
        }).then(res=>{
            this.$message({
                msg:res.msg
            });
            this.textAreaMsg = ""
            this.isShowUploadImg=false
            this.isShowEmoji=false
        })
    },
    publishArticle:function(){
        if(!this.title || !this.richContent){
            this.$message({
                msg:"请填写标题或内容"
            })
            return false
        }
        this.$axios.post("/createArticle",{
            content:this.richContent,
            img:"",
            title:this.title
        }).then(res=>{
            this.$message({
                msg:res.msg
            })
            if(res.status === 0){
                let userInfo = this.$store.state.userInfo
                userInfo.tt_count++;
                this.$store.commit("updateUserInfo",userInfo)
            }
        })
    },
    textAreaWord(){
        this.textNum = this.textAreaMsg.length
    },
    //修复Vue2 editor的控件
    handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
      console.log("vue2-editor上传图片");
      var formData = new FormData();
      formData.append("file", file);
      this.$axios.post("/aliossUpload", formData).then(res => {
        let url = res.url;
        Editor.insertEmbed(cursorLocation, "image", url);
        resetUploader();
      });
    },
},
computed:{
    textNum(){
        return this.textAreaMsg.length
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
            position:relative;
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
            .textWord{
                position: absolute;
                right: 20px;
                bottom: 50px;
                background-color: var(--bgColor);
                border-radius: 10px;
            }
            .toutiao-buttom {
                width: 100%;
                height: 40px;
                border: 1px solid #ddd;
                margin-top: -7px;
                display: flex;
                line-height: 40px;
                font-size: 15px;
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
                position: absolute;
                display:flex;
                background-color: white;
                box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.3);
                border-radius: 10px;
                margin: 10px;
                padding: 10px;
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
                    position: relative;
                    width: 100px;
                    height: 100px;
                    border-radius: 10px;
                    margin: 20px;
                    border: 1px dashed #ddd;
                    img{
                        padding: 5px;
                        width: 100px;
                        height: 100px;
                    }
                    .deleteImg{
                        width: 100px;
                        height: 100px;
                        position: absolute;
                        top: 0;
                        text-align: center;
                        color: white;
                        line-height: 100px;
                        font-weight: 900;
                        display: none;
                    }
                    &:hover{
                        transition: all 1s;
                        background-color: #ddd;
                        opacity: .5;
                        .deleteImg{
                            display: block;
                        }
                    }
                }
                .uploadImg-tip{
                    color: red;
                }
            }
            .emoji{
                position:absolute;
                width:100%;
                height:100px;
                box-shadow:0px 0px 25px 0px skyblue;
                background-color:pink;
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
                position: relative;
                width: 100%;
                height: 40px;
                border: 1px solid #ddd;
                .bottom-publish {
                    position: absolute;
                    right: 0;
                    width: 100px;
                    text-align: center;
                    line-height: 40px;
                    background-color: #eb8a8e;
                    color: white;
                    cursor: pointer;
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