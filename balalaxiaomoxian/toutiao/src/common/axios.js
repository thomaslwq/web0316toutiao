import axios from "axios"
axios.defaults.baseURL = "http://tt.linweiqin.com/api/tt/";


// 请求拦截器
axios.interceptors.request.use(function(config) {

    // 防御性代码
    let data = config.data || {};
    //1. 获取用户本地数据
    let userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
    // 2. 获取 token数据
    let oauth_token = userInfo["oauth_token"] || "";
    //3. 将token添加到 config.data 里面中
    if (oauth_token)
        data["oauth_token"] = oauth_token;
    config.data = data;
    //如果这段防御性代码不输入的话,发布的时候返回给后台将会出错
    //在NewList页面输出的用户头像和名字和登录进来的信息不一致

    return config;
}, function(error) {

    return Promise.reject(error);
});

// 响应的拦截器
axios.interceptors.response.use(function(response) {

    //有时候response返回的数据不一样，这里后面还要加data
    return response.data;
}, function(error) {

    return Promise.reject(error);
});

// 导出axios
export default axios;