import axios from "axios";
import store from "@/store";
import { refreshToken } from "@/api/user";
const request = axios.create({
  baseURL: "https://shuige.vercel.app/course",
});
request.interceptors.request.use((config) => {
  config.headers.Authorization = store.state.tokenInfo?.access_token;
  return config;
});
request.interceptors.response.use(
  // 响应成功
  function (response) {
    // 对响应数据做点什么
    return response;
  },
  // 响应失败
  function (error) {
    // 对响应错误做点什么
    // token失效,则刷新token,重新请求
    if (error.response.status === 401) {
      return refreshToken().then(() => request(error.config));
    } else {
      // 如果不是token的错误,而是其他的错误,就不处理
      return Promise.reject(error);
    }
  }
);
export default request;
