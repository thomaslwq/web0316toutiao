import axios from "axios"
axios.defaults.baseURL = "http://tt.linweiqin.com/api/tt/";
// 添加一个请求的拦截器
axios.interceptors.request.use(function(config) {
    // 防御性代码
    let data = config.data || {};
    // 1. 获取用户本地数据
    let userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
    // 2. 获取token数据
    let oauth_token = userInfo["oauth_token"] || "";
    // 3. 将token添加到 config.data中去
    if (oauth_token) {
        data["oauth_token"] = oauth_token;
    }
    config.data = data;
    return config;
}, function(error) {
    return Promise.reject(error);
});

//添加一个获取结果的拦截器
axios.interceptors.response.use(function(response) {
    return response.data;
}, function(error) {
    return Promise.reject(error);
})


//  导出 axios
export default axios;