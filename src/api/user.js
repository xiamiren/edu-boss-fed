import request from "@/utils/request";
import store from "@/store";
import router from "@/router";
// 登录
export const login = (data) => {
  return request({
    method: "POST",
    url: "/front/user/login",
    data: `phone=${data.phone}&password=${data.password}`,
  });
};
// 用户信息
export const getUserInfo = () => {
  return request({
    method: "get",
    url: "/front/user/getInfo",
  });
};
// 退出
export const logout = () => {
  return request({
    method: "post",
    url: "/front/user/logout",
  });
};
// 刷新token
let promiseRT = null;
let refreshing = false;
export const refreshToken = () => {
  if (refreshing) {
    return promiseRT;
  }
  refreshing = true;
  return (promiseRT = request({
    method: "POST",
    url: "/front/user/refresh_token",
    params: {
      refreshToken: store.state.tokenInfo.refresh_token,
    },
  })
    .then((res) => {
      if (res.data.succss) {
        // 成功拿到新的token
        store.commit("saveTokenInfo", res.data.content);
      } else {
        // 没有拿到新的token
        router.push({
          name: "login",
          query: {
            redirect: router.currentRoute.fullPath,
          },
        });
        throw new Error("刷新token失败");
      }
    })
    .finally(() => {
      refreshing = false;
    }));
};
