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
完整引入需要在main.js中引入elementplus
[查看文档：](https://element-plus.org/zh-CN/guide/quickstart.html#%E5%AE%8C%E6%95%B4%E5%BC%95%E5%85%A5)

### 引入ElementPlus:

## 后端技术栈
NodeJS+Express+MySQL
登录密码：username:yixuan,password:111222



