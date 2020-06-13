import axios from "axios"
axios.defaults.baseURL = "http://tt.linweiqin.com/api/tt/";
// 添加一个请求的拦截器
axios.interceptors.request.use(function(config) {
    return config
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