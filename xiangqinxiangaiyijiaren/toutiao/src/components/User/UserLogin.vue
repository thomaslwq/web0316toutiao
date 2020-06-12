<template>
    <div class="mask">
    <el-form :model="ruleForm"  :rules="rules" ref="ruleForm"  class="demo-ruleForm">
        <p >{{text}}</p>
        <el-form-item  prop="user">
            <el-input type="text" v-model="ruleForm.user" clearable placeholder='账号/邮箱' @change="isToken">
            </el-input>
        </el-form-item>
        <el-form-item prop="pwd" >
            <el-input type="password" v-model="ruleForm.pwd" placeholder='密码' show-password
            @change="isToken">
            </el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="danger" @click.stop='isToken'>确定</el-button>
        </el-form-item>
    </el-form>
    <div class="terms">
        <span >登录/注册即表示你同意
        <a href="https://www.toutiao.com/user_agreement/" target="_blank">用户协议</a> 和
        <a href="https://www.toutiao.com/privacy_protection/" target="_blank">隐私条款</a> 
        <a style="margin-left: 40px;" class="sign" @click='goSign'>{{text2}}</a></span>
    </div>
    </div>
</template>
<script>
import { mapMutations } from 'vuex'
    export default {
        data() {
            let validatePass = (rule, value, callback) => {
                value.trim().length?callback():callback(new Error('输入错误'))
            };
            return {
                text:'账密登录',
                text2:'注册用户',
                flag:'',
                ruleForm: {
                    user: '',
                    pwd:''
                },
                rules: {
                    user: [{
                        validator: validatePass,
                        trigger: 'blur'
                    }],
                    pwd:[{
                        validator: validatePass,
                        trigger: 'blur'
                    }]
                }
            };
        },
        
        methods: {
            ...mapMutations(['Login','userinfo']),
            isToken(){
               
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        if(this.text === '账密登录' ){
                            this.$axios.post('loginCheck',{username:this.ruleForm.user,password:this.ruleForm.pwd})
                            .then(res=>{
                                if(res.ret){
                                    this.$message({
                                        type:'error',
                                        message:'没有该用户'
                                    })
                                }else{
                                    this.userinfo(res.wdata)
                                    this.Login(true)
                                    this.$router.replace('/')
                                }
                            })
                        }else{
                            this.$axios.post('createUser',{username:this.ruleForm.user,password:this.ruleForm.pwd})
                            .then(res=>{
                                if(!res.ret){
                                    this.$message({message:res.msg,type:'success'})
                                }else{
                                    this.flag= true
                                    this.$message({message:res.msg,type:'error'})
                                }
                            })
                        }
                    } else {
                        return false;
                    }
                });
            },
            goSign(){
                [this.text,this.text2]=[this.text2,this.text]
                if(this.flag){
                    this.$axios.post('loginCheck',{username:this.ruleForm.user,password:this.ruleForm.pwd})
                        .then(res=>{
                                this.userinfo(res.wdata)
                                this.Login(true)
                                this.$router.replace('/')
                        })
                }
            }
        },
        
    }
</script>
<style lang="less" scoped>
    .demo-ruleForm{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 375px;
        height: 275px;
        padding: 0px 25px;
        box-sizing: border-box;
        background-color: #fff;
        p {
            text-align: center;
            height: 30px;
            border-bottom: 1px solid #d9d9d9;
            margin: 20px ;
        }
        .el-input__inner{
            font-weight: 100;
        }
        .el-button {
            width:320px
        }
        .password{
            width: 100px;
        }
    }
    .option{
        width: 200px;
        display: flex;
        justify-content: space-between;
    }
    .mask{
        position: fixed;
        width: 100%;
        height: 100%;
        background-image: url(//s3b.pstatp.com/toutiao/resource/ntoutiao_web/static/image/login/login_bg_7584f6a.png);
    background-repeat: no-repeat;
    background-position: top center;
    }
    .terms{
        position: absolute;
        width: 375px;
        font-size: 12px;
        color: #909090;
        text-align: center;
        left: 50%;
        top: 70%;
        transform: translate(-50% ,-50%);
        a{
            color: #788cb2;
        }
        .sign{
            cursor: pointer;
        }
    }
</style>