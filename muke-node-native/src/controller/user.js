/*
 * @Author: your name
 * @Date: 2020-05-27 08:17:45
 * @LastEditTime: 2020-05-29 10:01:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \muke-node-native\src\controller\user.js
 */ 
const { exec }  = require("../db/mysql");
const { genPassword }  = require("../utils/cryp");

/**
 * 登录
 * @param {*string} username 用户名
 * @param {*string} password 密码
 */
function login(username, password) {

    username = escape(username)
    password = escape(password)

    // 加密密码
    password = genPassword(password)

    const sql = `select username, password from users where 
        username='${username}' and password='${password}'`

    return exec(sql).then(rows => {
        return rows[0] || {}
    })
}

/**
 * 注册
 * @param {*string} username 用户名
 * @param {*string} password 密码
 */
async function register(username, password) {

    username = escape(username)
    password = escape(password)

    // 加密密码
    password = genPassword(password)

    const selectUser = `select username from users where username='${username}'`
    const selectUserReq = await exec(selectUser)
    if (selectUserReq.length) {
        return 1
    }

    const insertUser = `insert into users (username, password) values ("${username}", "${password}")`
    const sinsertUserReq = await exec(insertUser)
    return {
        id: sinsertUserReq.insertId
    }
}

module.exports = {
    login,
    register,
}