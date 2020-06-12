<template>
  <el-tabs class="write-box box" v-model="activeName" >
        <el-tab-pane label="发头条" name="tt"  >
            <el-input
                type="textarea"
                placeholder="有什么新鲜事想告诉大家"
                maxlength="2000"
                :autosize="{ minRows: 7, maxRows: 8}"
                v-model="writeTt"
                show-word-limit
                class="textarea">
            </el-input>
            <div class="write-bottom">
                <div class="wb-left">
                    <el-popover
                        placement="bottom-start"
                        width="400"
                        trigger="click"
                        >
                    <el-upload 
                        action="http://tt.linweiqin.com/api/tt/aliossUpload" 
                        multiple 
                        :limit="3"
                        :http-request="uploadImg"
                        :on-success="uploadImgSuccess"
                        :file-list="fileList"
                        accept='.jpg,.png'
                        :on-exceed='exceed'
                        list-type="picture-card" >
                        <i class="el-icon-plus el-icon--right el-upload-icon"></i>
                        <div slot="tip" class="el-upload__tip" style="color:red">
                            只能上传jpg/png文件，且不超过500kb
                        </div>
                    </el-upload>
                    <el-button slot="reference" class="wb-upload-btn"><i class="el-icon-picture-outline el-icon--right wb-upload-icon"></i>图片</el-button>
                    </el-popover>
                </div>
                <div class="wb-right" >
                    <el-button class="wb-fabu-btn" @click="releasett">发布</el-button>
                </div>
            </div>
        </el-tab-pane>
        <el-tab-pane label="写文章" name="xwz">
            <el-input
            type="text"
            placeholder="请输入内容"
            maxlength="30"
            show-word-limit
            class="wel-input input"
            v-model="writewzTitle"></el-input>
            <vue-editor id="editor" 
            v-model="writewzText"  
            use-custom-image-handler 
            placeholder="请输入正文……" 
            :editor-toolbar="customToolbar" 
            class='wa-editor' 
            />
            <div class="write-bottom">
                <div class="wb-right">
                    <el-button class="wb-fabu-btn" type="danger" @click="releasewz">发布</el-button>
                </div>
            </div>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { mapState } from 'vuex'
import { mapMutations } from 'vuex'
export default {
    components: { VueEditor },
    data(){
        return {
             customToolbar: [
                ["bold","underline","italic", ], 
                [{ header: [1, 2, 3, 4, 5, 6] }],
                ["blockquote"],
                [{ align: "" },
                { align: "center" },
                { align: "right" },
                { align: "justify" }],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link","image"]
            ],
            activeName :'tt',
            writeTt:'',
            writewzTitle:'',
            writewzText:'',
            resdata:[],
            fileList:[],
        }
    },
    computed:{
        ...mapState(['isLogin','userinfo']),
    },
    methods: {
            ...mapMutations(['updateTTCount','updateArticleCount']),
            exceed(){
                this.$message('文件最多3个')
            },
            releasett(){
                if(!this.isLogin){
                    return this.$message({
                        message:'请先登录',
                        type:'error'
                    })
                }
                if(!this.writeTt){
                    return this.$message({
                        message:'没有输入内容',
                        type:'error'
                    })
                }
                let imgs = this.fileList.map(e => e.response.url)
                let param = new FormData();
                param.append('content',this.writeTt);
                param.append('imgs',imgs.join(','));
                param.append('oauth_token',this.userinfo.oauth_token);
                this.$axios.post('/createTT',param)
                .then(response=>{
                    if (response.ret == 0){
                        this.$message(`${response.msg}`)
                        this.updateTTCount(this.userinfo.tt_count + 1);
                        return true;
                    }else{
                        response.status = 'fail';
                        this.$message(`发布头条失败_${response.msg}`)
                        return  false;
                    }
                })
            },
            releasewz(){
                if(!this.isLogin){
                    return this.$message({
                        message:'请先登录',
                        type:'error'
                    })
                }
                let param = new FormData();
                    param.append('content',this.writewzText);
                    param.append('img','');
                    param.append('title',this.writewzTitle);
                    param.append('oauth_token',this.userinfo.oauth_token);
                    this.$axios.post('/createArticle',param)
                    .then(response=>{
                    if (response.ret == 0){
                        response.status = 'success';
                        this.$message(`${response.msg}`)
                        this.updateArticleCount(this.userinfo.article_count + 1)
                        return true;
                    }else{
                        response.status = 'fail';
                        this.$message(`发布文章失败_${response.msg}`)
                        return  false;
                    }
                })
            },
            uploadImgSuccess(response, file, fileList){
                this.fileList = fileList;
            },
            uploadImg(f){
                let param = new FormData();
                    param.append('file',f.file);
                    this.$axios.post(f.action,param)
                    .then(response=>{
                        if (response.ret == 0){
                            response.status = 'success';
                            f.onSuccess(response)
                        }
                    })
            },
        },
}
</script>

<style lang='less' >
    .write-box.box{
        border: 1px solid #e8e8e8;
        .el-tabs__header{
        margin: 0;
        }
        .el-tabs__nav-scroll{
        padding-left: 20px;
        }
        .el-input__inner{
        border: none;
        background-color: #f4f5f6;
        height: 50px;
        }
        .ql-toolbar.ql-snow{
        border: none;
        }
        .ql-container.ql-snow {
        border: none;
        }
        .ql-editor.ql-blank,.ql-editor{
        background-color: #f4f5f6;
        }
          .ql-snow .ql-picker.ql-header .ql-picker-item::before {
        margin-top: -70px;
        float: left;
        height: 104px;
        width: 94%;
        text-align: start;
        }
        .ql-picker-label,.ql-snow .ql-picker.ql-header .ql-picker-label::before{
            float: left;
        }.el-textarea__inner{
        border: none;
        background-color: #f4f5f6;
        margin-top: 25px;
    }
    .el-textarea{
        background-color:#f4f5f6;
    }
    .write-bottom{
        
        height: 50px;
        .wb-left{
            height: 100%;
            width: 130px;   
            float: left
        }
        .wb-right{
            float: right;
            height: 100%;
            .wb-fabu-btn{
                border: none;
                width: 130px;
                height: 100%;
                background-color: #ed8b8e;
                border-radius: 0;
                color:white
            }
            .wb-fabu-btn:hover{
                background-color: #edf5ff;
                color:#5b99fe;
            }
        }
    }
    .wb-upload-btn{
        border: none;
        height: 100%;
        width: 100%;
        .wb-upload-icon{
            color: #e75c62;
            margin-right: 5px;
        }
    }
    .refresh-mode{
        background-color: #eff6fc;
        border: 1px solid #93c1e8;
        color: #93c1e8;
        font-weight: 200;
        width: 100%;
        margin: 20px 0;
    }
    .text{
        padding: 0 10px;
        margin-bottom: 20px;
        border-bottom: 1px solid #f0f0f0;
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
            }
            span {
                margin: 0 5px;
                color: #a4a4a4;
            }
        }
        
    }
    }

    
</style>