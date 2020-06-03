/*
 * @Author: your name
 * @Date: 2020-05-27 08:17:45
 * @LastEditTime: 2020-05-29 10:01:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \muke-node-native\src\controller\user.js
 */ 
const { exec }  = require("../db/mysql");

/**
 * 登录
 * @param {*string} username 用户名
 * @param {*string} password 密码
 */
function login(username, password) {
    const sql = `select username, password from users where 
        username='${username}' and password='${password}'`

    return exec(sql).then(rows => {
        return rows[0] || {}
    })
}

module.exports = {
    login,
}