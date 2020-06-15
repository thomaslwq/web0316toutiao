import axios from 'axios'
axios.defaults.baseURL = 'http://tt.linweiqin.com/api/tt/'

//请求拦截
axios.interceptors.request.use(function(config){
    //拦截请求 如果有的话每次加上token
    let data = config.data || {};
    let userInfo = JSON.parse(localStorage.getItem("userInfo")||'{}');
    let oauth_token = userInfo['oauth_token']||"";
    if(oauth_token){
        data['oauth_token'] = oauth_token
        config.data = data
    }
    
    // console.log(data);
    // console.log(oauth_token);
    // console.log(config);
    return config;
},function(error){
    return Promise.reject(error);
});

//响应的拦截器
axios.interceptors.response.use(function(response){
    //过滤得到的数据 
    return response.data;
},function(error){
    return Promise.reject(error);
});

//导出axios
export default axios;