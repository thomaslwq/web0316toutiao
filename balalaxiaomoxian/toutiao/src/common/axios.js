import axios from "axios"
axios.defaults.baseURL = "http://tt.linweiqin.com/api/tt/";


// 请求拦截器
axios.interceptors.request.use(function(config) {

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