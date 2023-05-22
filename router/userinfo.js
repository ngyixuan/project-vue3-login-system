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
  import_user_manage,
  get_manage_user,
  update_role,
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
//获取所有员工列表
router.get("/userManage/allList", userinfo_handler.getUserManageAllList);
//获取员工id
router.post(
  "/userManage/detail",
  expressJoi(get_manage_user),
  userinfo_handler.getUserManageDetail
);
//获取指定用户角色
router.post(
  "/userManage/role",
  expressJoi(get_manage_user),
  userinfo_handler.getUserManageRole
);
//为员工分配角色
router.post(
  "/userManage/updateRole",
  expressJoi(update_role),
  userinfo_handler.updateUserRole
);
//获取角色列表
router.get("/role/list", userinfo_handler.getRoleList);
//获取所有的权限
router.get("/permission/list", userinfo_handler.getPermission);
router.post(
  "/userinfo",
  expressJoi(update_userinfo_schema),
  userinfo_handler.updateUserInfo
);
//获取指定角色的权限
router.post(
  "/role/permission",
  expressJoi(get_manage_user),
  userinfo_handler.getUserPermission
);
router.post(
  "/userManage/batch/import",

  userinfo_handler.importUserManage
);

// router.post(
//   "/userManage/detail",
//   expressJoi(get_manage_user),
//   userinfo_handler.getUserManage
// );
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
