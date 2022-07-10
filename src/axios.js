import axios from "axios";
import qs from "qs";
import { getToken } from "@/auth/auth";
import { success, warning } from "@/auth/notification";
const service = axios.create({
  baseURL: "/api",
  timeout: 3000,
});
// service.defaults.headers['Content-Type'] = 'application/x-www-form-urlencode'
// qs就是将某个对象变成
service.defaults.transformRequest = (data) => qs.stringify(data);

//请求拦截
service.interceptors.request.use(
  (config) => {
    //获取token
    // let token = localStorage.getItem("token");

    // 往Header头部自动添加token
    // const cookie = useCookies()
    // const token  =cookie.get("token")
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = token;
      // config.headers["token"] = token
      // config.headers.token = token
    }

    // if(token){
    //     config.headers.token = token
    // }

    //有其他需求可以写在这里====
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

//拦截器 相应拦截器
service.interceptors.response.use(
  (res) => {
    // localStorage.setItem('token', res.data.token)

    //可以设定是返回res还是res.data
    return res.data;
  },
  (err) => {
    //如果权限失效，可再次做处理
    //比如token有时间限制
    console.log(err);
    warning(err.message || "操作失败");

    return Promise.reject(err);
  }
);

export default service;
