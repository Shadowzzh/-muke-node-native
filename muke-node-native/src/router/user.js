/*
 * @Author: your name
 * @Date: 2020-05-26 17:11:12
 * @LastEditTime: 2020-05-29 11:28:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \muke\src\router\user.js
 */
const { login } = require("../controller/user")
const { SuccessModel, ErrorModel } = require("../model/resModel.js")
const { set }  = require("../db/redis");


function handleUserRouter(req, res) {
    const { method, url, path, query, body } = req

    // 登录
    if (method === "POST" && path === "/api/user/login") {
        const { username, password } = body
        const result = login(username, password)
        return result.then(data => {
            // console.log(data)
            if (data.username) {
                // 设置 session
                req.session.username = data.username
                req.session.realName = data.realName
                // 同步到  session 
                set(req.sessionId, req.session)
                
                return new SuccessModel("登录成功")
            }
            return new ErrorModel("登录失败")
        })
    }

    // 验证登录的测试
    if (method === "GET" && req.path === "/api/user/login-test") {
        if (req.session && req.session.username) {
            return Promise.resolve(new SuccessModel({
                session: req.session
            }))
        }
        return Promise.resolve(new ErrorModel("尚未登陆"))
    }
}


module.exports = handleUserRouter