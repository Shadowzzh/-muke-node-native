
const { login, register, getUserList } = require("../controller/user")
const { SuccessModel, ErrorModel } = require("../model/resModel.js")
const { set }  = require("../db/redis");


function handleUserRouter(req, res) {
    const { method, url, path, query, body } = req

    // 获取用户列表
    if (method === "GET" && path === "/api/user/getUserList") {
        const result = getUserList()
        return result.then(list => {
            return new SuccessModel(list)
        })
    }

    // 登录
    if (method === "POST" && path === "/api/user/login") {
        const { username, password } = body
        const result = login(username, password)
        return result.then(data => {
            if (data.username) {
                // 设置 session
                req.session.username = data.username
                req.session.userId = data.id
                // 同步到  session 
                set(req.sessionId, req.session)
                
                return new SuccessModel("登录成功")
            }
            return new ErrorModel("用户名或密码错误")
        })
    }

    // 注册
    if (method === "POST" && path === "/api/user/register") {
        const { username, password } = body
        const result = register(username, password) 
        return result.then(data => {
            if (data === 1) {
                return new ErrorModel("该用户名已经存在")
            } else {
                return new SuccessModel(data)
            }
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