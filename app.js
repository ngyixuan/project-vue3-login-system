// 导入 express
const express = require("express");
// 创建服务器的实例对象
const app = express();
const joi = require("joi");
const config = require("./config");
const expressJWT = require("express-jwt");
// 导入并配置 cors 中间件
const cors = require("cors");
// 一定要在路由之前，封装 res.cc 函数
app.use((req, res, next) => {
  // status 默认值为 1，表示失败的情况
  // err 的值，可能是一个错误对象，也可能是一个错误的描述字符串
  res.cc = function (err, status = 1) {
    res.send({
      status,
      message: err instanceof Error ? err.message : err,
    });
  };
  next();
});
app.use(cors());

// 配置解析表单数据的中间件，注意：这个中间件，只能解析 application/x-www-form-urlencoded 格式的表单数据
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.urlencoded({ extended: false }))
app.use(
  expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] })
);

// 导入并使用用户路由模块
const userRouter = require("./router/user");
app.use("/api", userRouter);
//导入用户信息模块
const userinfoRouter = require("./router/userinfo");
app.use("/my", userinfoRouter);

//导入文章分类模块
const artCateRouter = require("./router/artcate");
app.use("/my/artcate", artCateRouter);
//导入发布文章模块
const articleRouter = require("./router/article");
app.use("/my/article", articleRouter);

// 托管静态资源文件
app.use("/uploads", express.static("./uploads"));
// 定义错误级别的中间件
app.use((err, req, res, next) => {
  // 验证失败导致的错误
  if (err instanceof joi.ValidationError) return res.cc(err);
  if (err.name === "UnauthorizedError") return res.cc("身份认证失败！");
  // 未知的错误
  res.cc(err);
});

// 启动服务器
app.listen(3033, () => {
  console.log("api server running at http://127.0.0.1:3033");
});
