const express = require("express");
const router = express.Router()
const { login, register, getUserList, getUserDetail } = require("../controller/user")
const { SuccessModel, ErrorModel } = require("../model/resModel.js")
const { set } = require("../db/redis");

// 登录
router.post("/login", function (req, res, next) {
    const { username, password } = req.body
    const result = login(username, password)
    return result.then(data => {
        if (data.username) {
            // 设置 session
            req.session.username = data.username
            req.session.userId = data.id
            // 同步到  session 
            set(req.sessionId, req.session)
            res.json(new SuccessModel("登录成功"))
        }
        res.json(new SuccessModel("用户名或密码错误")) 
    })
})
// 获取用户信息详情
router.post("/getUserDetail", function (req, res, next) {
    const selfId = req.session.userId
    const result = getUserDetail(selfId)
    return result.then(detail => {
        if (detail) {
            res.json(new SuccessModel(detail))
        }
        res.json(new ErrorModel(detail))
    })
})

// 获取用户列表
router.post("/getUserList", function (req, res, next) {
    const { id } = query
    const selfId = req.session.userId
    const result = getUserList(selfId, id)
    return result.then(list => {
        res.json(new SuccessModel(list))
    })
})

// 注册
router.post("/register", function (req, res, next) {
    const { username, password } = body
    const result = register(username, password)
    return result.then(data => {
        if (data === 1) {
            res.json(new ErrorModel("该用户名已经存在"))
        } else {
            res.json(new SuccessModel(data))
        }
    })
})

router.get("/session-test", (req, res, next) => {
    const session = req.session
    if (session.viewNum == null) {
        session.viewNum = 0
    }
    session.viewNum ++
})

module.exports = router