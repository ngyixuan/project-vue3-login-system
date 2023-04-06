const express = require("express");
const expressJoi = require("@escook/express-joi");
const router = express.Router();
const userinfo_handler = require("../router_handler/userinfo");
const {
  manage_user_schema,
  usermanage_list_schema,
  update_userinfo_schema,
  update_password_schema,
  update_avatar_schema,
} = require("../schema/user");

//获取用户信息
router.get("/userinfo", userinfo_handler.getUserInfo);
//获取用户的项目功能
router.get("/userfeature", userinfo_handler.getUserFeature);
router.get("/userchapter", userinfo_handler.getUserChapter);
//获取员工列表
router.post(
  "/userManage/list",
  expressJoi(manage_user_schema),
  userinfo_handler.getUserManageList
);
router.post(
  "/userinfo",
  expressJoi(update_userinfo_schema),
  userinfo_handler.updateUserInfo
);
router.post(
  "/updatepwd",
  expressJoi(update_password_schema),
  userinfo_handler.updatePassword
);
router.post(
  "/update/avatar",
  expressJoi(update_avatar_schema),
  userinfo_handler.updateAvatar
);
module.exports = router;
