<template>
    <el-row :gutter="10" class="container">
        <el-col :span="2" class="start" >
            <div>下载APP</div>
        </el-col>
        <el-col :span="2" class="weather">
            <div>注册头条号</div>
        </el-col>
        <el-col :span="4" :offset='10' :pull='10' class="weather">
            <div v-if='weatherData' >
                <span>{{weatherData.city +' '}}</span>
                <span>{{weatherData.forecast[0].type  +' '}}</span>
                <span>{{weatherData.forecast[0].low.substr(3) +'/'}}</span>
                <span>{{weatherData.forecast[0].high.substr(3)}}</span>
                <i class="el-icon-arrow-down el-icon--right" @click="switchCity($event)" ref='btn'></i>
            </div>
        </el-col>
        <el-col :span="2" :pull='10' class="city" v-show='flag'>
            <input type="text" v-model="city" @keyup.enter='showWeather' placeholder="输入城市" @blur="resetBtn" ref='cityInput'>
        </el-col>
        <el-col :span="2"  class="end" :push='flag?0:2'>
            <div>侵权投诉</div>
        </el-col>
        <el-col :span="2" :push='flag?0:2'>
            <div>头条产品</div>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        data() {
            return {
                weatherData:'',
                city:'',
                flag:''
            }
        },
        created() {
            this.$axios.get('http://wthrcdn.etouch.cn/weather_mini?city=北京市').then(res=>{
                this.weatherData=res.data
            })
        },
        methods: {
            switchCity(e){
                e.target.style='transform: rotateZ(-90deg);'
                this.flag = true
            },
            showWeather(){
                if(!this.city)return
                this.$axios.get('http://wthrcdn.etouch.cn/weather_mini?city='+this.city).then(res=>{
                    if(res.data){
                        this.weatherData=res.data
                    }else{
                        this.$message('输出有误')
                    }
                    this.resetBtn()
                    this.city=''
                })
            },
            resetBtn(){
                this.$refs.btn.style='transform: rotateZ(0deg);'
                this.flag=false
            }
        },
    }
  
</script>

<style lang='less' scoped>
    .container {
        min-width: 1200px;
        background-color: #e7eaed;
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-weight: 200;
        color: #a29e9e;
        .end,.start{
            border-right: 1px solid #ddd;
        }
        .city{
            display: flex;
            align-items: center;
            input{
                background-color: #ddd;
                border: none;
                width: 70px;
                height: 30px;
                margin-top: 5px;
                margin-left: -15px;
                padding: 0px 5px;
                transition: all .7s;
            }
        }
    }
    .el-icon--right{
        transition: all .7s;
    }
</style>