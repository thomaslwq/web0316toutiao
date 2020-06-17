//导入axios
import axios from 'axios'
//设置默认请求地址
axios.defaults.baseURL = 'http://tt.linweiqin.com/api/tt/'

//设置请求拦截
axios.interceptors.request.use(function(config){
    return config
},function(err){
    return Promise.reject(err)
})
//设置响应拦截
axios.interceptors.response.use(function(res){
    return res.data
},function(err){
    return Promise.reject(err)
})

//导出axios
export default axios
