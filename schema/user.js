const joi = require("joi");
const username = joi.string().required();
const password = joi
  .string()
  .pattern(/^[\S]{6,12}$/)
  .required();
const page = joi.number().integer().required();
const size = joi.number().integer().required();
const mobile = joi.number().integer().required();
const id = joi.number().integer().min(1).required();
const role = joi.string().required();
const avatar = joi.string().dataUri().required();
const openTime = joi.string().required();

const title = joi.string().required();
const content = joi.string().required();

exports.reg_login_schema = {
  body: {
    username,
    password,
  },
};
exports.manage_user_schema = {
  body: {
    page,
    size,
  },
};
exports.update_userinfo_schema = {
  body: {
    id,
    role,
  },
};
exports.get_manage_user = {
  body: {
    id,
  },
};
exports.update_role = {
  body: {
    role: joi.array(),
  },
};
exports.import_user_manage = {
  body: {
    mobile,
    role,
    openTime,
  },
};

exports.update_password_schema = {
  body: {
    oldPwd: password,
    newPwd: joi.not(joi.ref("oldPwd")).concat(password),
  },
};
exports.update_avatar_schema = {
  body: {
    avatar,
  },
};
