// 引入axios封装
import axios from "axios";

let baseUrl = "";

// 创建axios实例
const request = axios.create({
  baseURL: "", // url = base url + request url
  timeout: 50000 // 50s超时
});

// 请求拦截器 一般写法模式
request.interceptors.request.use(
  config => {
    const httpUrl = config.url as String;
     if (httpUrl.startsWith("/api/")) {
      config.url = httpUrl.replace(/^\/api/, "");
      config.baseURL = baseUrl;
    }
    return config;
  },
  error => {
    // 请求失败则显示错误状态
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

// 导出request
export default request;
