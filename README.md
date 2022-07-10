# project-vue3-login-system
简单vue3+nodeJS后台登录页实现

## 示例图片：
![image](https://github.com/ngyixuan/project-vue3-login-system/blob/main/sample/login.png)
![image](https://github.com/ngyixuan/project-vue3-login-system/blob/main/sample/home.png)



## 前端技术栈
Vue3+Vite+ElementPlus+VueRouter+Vuex
Vue3 的
### 项目创建：


使用Vite构建工具快速构建Vue项目，具体代码如下：

```
//npm 7+，需要加上额外的双短横线
//查看npm版本是node-v
npm init vite@latest <project-name> -- --template vue

cd <project-name>
npm install
npm run dev
```
<sup>建议在插件市场搜索并安装volar（针对vue的vscode插件）
[Volar好处](https://pages.github.com/)</sup>
    



### 引入ElementPlus:
* 安装：
```
npm install element-plus --save

```
* 按需导入组件
按需引入只需要在vite.config配置文件中插入代码  
[查看文档：](https://element-plus.org/zh-CN/guide/quickstart.html#%E6%8C%89%E9%9C%80%E5%AF%BC%E5%85%A5)  
* 完整引入组件
*完整引入需要在main.js中引入elementplus  
[查看文档：](https://element-plus.org/zh-CN/guide/quickstart.html#%E5%AE%8C%E6%95%B4%E5%BC%95%E5%85%A5)  

### 引入Windicss工具库和安装插件:
安装后在vite.config.js和main.js中插入代码，具体看[文档](https://windicss.org/integrations/vite.html#install)
遇到语法识别windicss的样式，在根目录下创建windi.config.js文件
```
// @ts-check - enable TS check for js file
import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  /* 配置项... */
})
```
可以安装WindiCSS IntelliSense插件

### 引入VueRouter4:
* [安装](https://router.vuejs.org/zh/installation.html#npm) 
* router-view可以放在任意地方 
在App.vue或者主页面中放入router-view ， 将显示与 url 对应的组件  
* 动态路由匹配  
使用自定义的路径参数匹配任意路径，如果没有相应的路由就跳转404页面
* 编程式导航
这里登陆成功后导航到首页使用router.push方法，这个方法会向 history 栈添加一个新的记录  
注意：如果有参数可以用params命名路由或者使用query携带查询参数, params和path不能同时使用，path会自动忽略params
```
// 命名的路由，并加上参数，让路由建立 url
router.push({ name: 'user', params: { username: 'eduardo' } })

// 带查询参数，结果是 /register?plan=private
router.push({ path: '/register', query: { plan: 'private' } })
```



## 后端技术栈
NodeJS+Express+MySQL
登录密码：username:yixuan,password:111222



