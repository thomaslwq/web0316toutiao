import axios from "axios"
axios.defaults.baseURL = "http://tt.linweiqin.com/api/tt/";
// 请求拦截器
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    console.log(config.data)
    // 防御性代码
    let data = config.data || {};
    //1. 获取用户本地数据
    let userInfo = JSON.parse(localStorage.getItem("userInfo"))||{};
    // 2. 获取 token数据
    let oauth_token = userInfo["oauth_token"]||"";
    //3. 将token添加到 config.data 里面中
    if(oauth_token)
      data["oauth_token"] = oauth_token;
    config.data = data;
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// 响应的拦截器
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

// 导出axios
export default axios;