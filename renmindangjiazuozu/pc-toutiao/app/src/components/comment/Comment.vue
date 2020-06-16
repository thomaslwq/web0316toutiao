<template>
    <div class='tt-comment'>
        <div class="comment-top">
            <el-tabs>
                <el-tab-pane label="发微头条">
                    <div class="comment-center">
                        <el-input type="textarea" :rows="10" maxlength="2000" show-word-limit placeholder="有什么新鲜事告诉大家" resize="vertical" v-model="elm_textarea"></el-input>
                    </div>
                    <div class="comment-bottom">
                        <div class="select-img-button" @click="toggleShow">
                            <i></i>
                            <span>图片</span>
                        </div>
                        <div :class="['selcet-img-container' ,status]">
                            <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" 
                            :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                            <span>只能上传jpg/png文件，且不超过500kb</span>
                        </div>
                        <div class="send-comment" @click="upload_wtt">发布</div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="写文章">
                    <div class="xwz-comment-center">
                        <el-input type="text" :rows="10" placeholder="请输入内容" maxlength="30" show-word-limit v-model="elm_text"></el-input>
                        <vue-editor use-custom-image-handler @image-added="handleImageAdded" v-model="editor_text" placeholder="请输入正文......"/>
                    </div>
                    <div class="xwz-comment-bottom">
                        <div class="xwz-send-comment" @click="upload_xwz">发布</div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { VueEditor } from "vue2-editor";

export default {
//import引入的组件需要注入到对象中才能使用
components: {
    VueEditor
},
data() {
//这里存放数据
return {
    elm_textarea: "",
    elm_text: "",
    editor_text: "",
    dialogImageUrl: '',
    dialogVisible: false,
    imgShow: false
};
},
//监听属性 类似于data概念
computed: {
    status: function() {
        return {
            show: !this.imgShow
        }
    }
},
//监控data中的数据变化
watch: {

},
//方法集合
methods: {
    toggleShow: function() {
        this.imgShow = !this.imgShow;
    },
    handleRemove(file, fileList) {
        console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
        console.log(file)
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
    },
    handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
        let formData = new FormData();
        formData.append("file", file);

        this.axios({
            url: "/aliossUpload",
            method: "POST",
            data: formData
        }).then(res => {
            // 将图片插入到当前光标位置
            Editor.insertEmbed(cursorLocation, "image", res.data.url);
            // 刷新富文本编辑器
            resetUploader();
        })
    },
    upload_wtt: function(type) {
        if(this.$store.state.loginStatus) {
            this.axios({
                method: 'POST',
                url: "/createTT",
                data: {
                    content: this.elm_textarea,
                    imgs: null,
                    oauth_token: this.$store.state.userInfo.oauth_token
                }
            }).then(res => {
                if(res.data.msg == "发布成功") {
                    this.$message({
                        type: "success",
                        message: res.data.msg
                    })
                    this.$store.commit({
                        type: "modifyToutiaoCount",
                        kind: "add"
                    })
                }
            })
        }
        else {
            this.$message({
                type: "warning",
                message: "请先登录"
            })
        }
    },
    upload_xwz: function() {
        if(this.$store.state.loginStatus) {
            this.axios({
                method: 'POST',
                url: "/createArticle",
                data: {
                    title: this.elm_text,
                    content: this.editor_text,
                    img: null,
                    oauth_token: this.$store.state.userInfo.oauth_token
                }
            }).then(res => {
                if(res.data.msg == "发布成功") {
                    this.$message({
                        type: "success",
                        message: res.data.msg
                    })
                    this.$store.commit({
                        type: "modifyArticleCount",
                        kind: "add"
                    })
                }
            })
        }
        else {
            this.$message({
                type: "warning",
                message: "请先登录"
            })
        }
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

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
/deep/ .el-textarea__inner {
    border-right: none;
    border-left: none;
    background-color: #f4f5f6;
}

/deep/ .el-input__inner {
    font-size: 20px;
    font-weight: bold;
    height: 80px;
    color: #c1c4cc;
    background-color: #f4f5f6;
    border: none;
}

/deep/ .el-tabs__content {
    overflow: visible;
}

/deep/ .el-tabs__header {
    margin: 0;
}

/deep/ .el-tabs__nav-scroll {
    padding: 0 15px;
}

/deep/ .el-upload--picture-card {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 100px;
    height: 100px;
}

/deep/ .el-upload-list--picture-card {
    display: flex;
    flex-wrap: wrap;
    width: 330px;
}

/deep/ .el-upload-list--picture-card .el-upload-list__item {
    width: 100px;
    height: 100px;
}

/deep/ .quillWrapper .ql-snow.ql-toolbar {
    border: none;
    padding: 10px 20px;
}

/deep/ .ql-container.ql-snow {
    border: none;
    padding: 10px;
    background-color: #f4f5f6;
}

/deep/ .ql-editor {
    min-height: 150px;
}

.tt-comment {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    .comment-center {
        width: 100%;
        height: auto;
    }

    .comment-bottom {
        display: flex;
        justify-content: space-between;
        height: 40px;
        width: 100%;

        & > div {
            display: flex;
            justify-content: center;
            align-items: center;
            user-select: none;
        }

        .select-img-button {
            position: relative;
            flex: 0 1 80px;
            padding: 5px 0;
            font-size: 14px;
            cursor: pointer;
            transition: all ease-in-out .3s;

            & > * {
                margin: 0 3px;
            }

            &:hover {
                background-color: #edf5ff;
                color: #5b99fe;
            }

            i {
                background-image: url("../../assets/images/img.png");
                background-repeat: no-repeat;
                background-size: contain;
                width: 16px;
                height: 16px;
            }
        }

        .selcet-img-container {
            position: absolute;
                top: calc(100% + 20px);
                left: 0;
                flex-direction: column;
                padding: 10px;
                width: 350px;
                height: auto;
                background-color: white;
                border: 1px solid #ebeef5;
                border-radius: 5px;
                box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);

                &.show {
                    display: none;
                }

                &::after {
                    content: "";
                    position: absolute;
                    top: -10px;
                    left: 50px;
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    background-color: white;
                    border-top: 1px solid #ebeef5;
                    border-right: 1px solid #ebeef5;
                    transform: rotate(-45deg);
                }

                span {
                    display: inline-block;
                    margin-top: 10px;
                    font-size: 12px;
                    color: red;
                }
            }

        .send-comment {
            flex: 0 1 120px;
            background-color: #ed8b8e;
            color: white;
            cursor: pointer;
        }
    }
    .xwz-comment-bottom {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            height: 40px;
            width: 100%;

            .xwz-send-comment {
                display: flex;
                justify-content: center;
                align-items: center;
                flex: 0 1 120px;
                height: 100%;
                background-color: #ed8b8e;
                color: white;
                cursor: pointer;
            }
        }
}
</style>