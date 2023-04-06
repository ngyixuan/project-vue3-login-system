const db = require("../db/index");
const bcrypt = require("bcryptjs");

exports.getUserInfo = (req, res) => {
  // const sql = `select * from ev_users where id=?`;
  //   const sql = `
  //   select id, username, password, avatar, title, role_id, (select group_concat(json_object( 'id',id,'title',title))  from ev_role where ev_role.id = ev_users.role_id ) as role from ev_users
  // `;
  const sql = `
select id, username, password, avatar, title, role_id, (select group_concat(json_object( 'id',id,'title',title))  from ev_role where ev_role.id = ev_users.role_id  ) as role from ev_users 
`;

  db.query(sql, req.user.id, (err, results) => {
    // 1. 执行 SQL 语句失败

    // 处理字符串对象
    // results[0].role = eval("(" + results[0].role + ")");

    if (err) return res.cc(err);
    // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
    if (results.length !== 1) return res.cc("获取用户信息失败！");
    // 3. 将用户信息响应给客户端
    res.send({
      status: 0,
      message: "获取用户基本信息成功！",
      data: results[0],
    });
  });
};
exports.getUserFeature = (req, res) => {
  const sql = "select * from ev_user_feature";
  // const sql = `select * from ev_users`;

  db.query(sql, (err, results) => {
    // console.log(results);
    if (err) return res.cc(err);
    // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1

    if (results.length == 0) return res.cc("获取用户信息失败！");
    // 3. 将用户信息响应给客户端
    res.send({
      status: 0,
      message: "获取用户基本信息成功！",
      data: results,
    });
  });
};
exports.getUserChapter = (req, res) => {
  const sql = "select * from ev_user_chapter";
  // const sql = `select * from ev_users`;

  db.query(sql, (err, results) => {
    // console.log(results);
    if (err) return res.cc(err);
    // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1

    if (results.length == 0) return res.cc("获取章节失败！");
    // 3. 将用户信息响应给客户端
    res.send({
      status: 0,
      message: "获取章节成功！",
      data: results,
    });
  });
};

exports.getUserManageList = (req, res) => {
  console.log(req.body);

  const sql = `select *,(select json_array(group_concat(json_object( 'id',id,'title',title)))  from ev_role where ev_role.id = ev_admin.role_id  ) as role from ev_admin`;
  db.query(sql, (err, results) => {
    // console.log(results);
    if (err) return res.cc(err);
    // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1

    if (results.length == 0) return res.cc("获取用户信息失败！");
    // 3. 将用户信息响应给客户端

    let pageSize = Math.ceil(results.length / req.body.size);
    console.log(results);
    results.forEach((element) => {
      element.role = eval("(" + element.role + ")");
      for (let i = 0; i < element.role.length; i++) {
        element.role[i] = eval("(" + element.role[i] + ")");
      }
      // element.role.forEach((i) => {
      //   i =  eval("(" + i + ")");
      //   // console.log("i", i);
      // });
    });
    console.log("results", results);
    res.send({
      status: 0,
      message: "获取用户基本信息成功！",
      data: {
        list: results,
        total: results.length,
        page: pageSize,
        size: req.body.size,
      },
    });
  });

  // let arr = [(current-1)*num,parseInt(num)];
  // sqlPool.connect("select * from user limit ?,?",arr,callback);
};
exports.updateUserInfo = (req, res) => {
  const sql = `update ev_users set ? where id=?`;
  db.query(sql, [req.body, req.body.id], (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err);
    // 执行 SQL 语句成功，但影响行数不为 1
    if (results.affectedRows !== 1) return res.cc("修改用户基本信息失败！");
    // 修改用户信息成功
    return res.cc("修改用户基本信息成功！", 0);
  });
};

exports.updatePassword = (req, res) => {
  console.log(req);
  const sql = `select * from ev_users where id=?`;
  db.query(sql, req.user.id, (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err);
    // 检查指定 id 的用户是否存在
    if (results.length !== 1) return res.cc("用户不存在！");
    // TODO：判断提交的旧密码是否正确
    const compareResult = bcrypt.compareSync(
      req.body.oldPwd,
      results[0].password
    );
    if (!compareResult) return res.cc("原密码错误！");
  });

  const sql2 = `update ev_users set password=? where id=?`;
  const newPwd = bcrypt.hashSync(req.body.newPwd, 10);
  db.query(sql2, [newPwd, req.user.id], (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows !== 1) return res.cc("更新密码失败!");
    res.cc("更新密码成功！", 0);
  });
};

exports.updateAvatar = (req, res) => {
  const sql = `update ev_users set user_pic=? where id=?`;
  db.query(sql, [req.body.avatar, req.user.id], (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows != 1) return res.cc("更新头像失败!");
    return res.cc("更新头像成功", 0);
  });
};
