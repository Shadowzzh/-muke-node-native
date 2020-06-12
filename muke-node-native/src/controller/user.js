/*
 * @Author: your name
 * @Date: 2020-05-27 08:17:45
 * @LastEditTime: 2020-05-29 10:01:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \muke-node-native\src\controller\user.js
 */ 
const { exec }  = require("../db/mysql");
const { genPassword, enUserId, deUserId } = require("../utils/cryp");

/**
 * 获取用户详细信息
 */
function getUserDetail(selfId) {
    const sql = `select username, realname, id from users where id=${selfId}`
    return exec(sql).then(rows => {
        rows[0].id = enUserId(String(rows[0].id))
        return rows[0]
    })
}

/**
 * 获取用户列表
 */
function getUserList(selfId, userId) {
    let sql = [`select username, id from users where 1=1`]

    // 去除自己
    if (selfId) {
        sql.push(` and id<>${selfId}`)
    }
    if (userId) {
        sql.push(` and id='${userId}'`)
    }
    sql = sql.join("")
    return exec(sql).then(rows => {
        rows.forEach(item => {
            item.id = enUserId(String(item.id))
        })
        return rows
    })
}
/**
 * 查找用户
 * @param {*number} userId 用户id
 */
function findUser(userId) {
    const sql = `select username, id from users where id = ${userId}`
    return exec(sql).then(rows => {
        return rows[0] || {}
    })
}
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

    const sql = `select username, id from users where 
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
    findUser,
    getUserList,
    getUserDetail,
}