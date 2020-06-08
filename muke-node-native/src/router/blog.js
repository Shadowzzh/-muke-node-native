/*
 * @Author: your name
 * @Date: 2020-05-26 17:11:07
 * @LastEditTime: 2020-05-28 17:13:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \muke\src\router\blog.js
 */
const { getList, getDetail, newBlog, updateBlog, delBlog, getGlobalList } = require("../controller/blog")
const { SuccessModel, ErrorModel } = require("../model/resModel.js")

function loginCheck(req) {
    if (!req.session.username) {
        return Promise.resolve(new ErrorModel("尚未登陆"))
    }
}

const handleBlogRouter = (req, res) => {
    const { method, url, path, query, body } = req
    const { id } = query
    
    // 获取所有博客列表
    if (method === "GET" && path === "/api/blog/globalList") {
        const { rank } = query
        const result = getGlobalList(rank)
        return result.then(listData => {
            return new SuccessModel(listData)
        })
    }

    // 获取博客列表
    if (method === "GET" && path === "/api/blog/list") {
        // let { author = "", keyword = "" } = query
        const { userId, username } = req.session
        // if (req.query.isadmin) {
        //     const loginCheckResult = loginCheck(req)
        //     if (loginCheckResult) {
        //         // 未登录
        //         return loginCheckResult
        //     }
        //     // 强制查询自己的博客
        //     author = req.session.username
        // }

        const result = getList(username, userId)
        return result.then(listData => {
            return new SuccessModel(listData)
        })
    }

    // 获取博客详情
    if (method === "GET" && path === "/api/blog/detail") {
        const result = getDetail(id)
        return result.then(data => {
            return new SuccessModel(data)
        })
    }

    // 新建一篇博客
    if (method === "POST" && path === "/api/blog/new") {
        // const { title = "", author = "" } = query

        const loginCheckResult = loginCheck()
        if (loginCheckResult) {
            return loginCheckResult
        }

        req.body.author = req.session.username
        const result = newBlog(body)
        return result.then(data => {
            return new SuccessModel(data)
        })
    }

    // 更新一篇博客
    if (method === "POST" && path === "/api/blog/update") {
        const loginCheckResult = loginCheck()
        if (loginCheckResult) {
            return loginloginCheckResultCheck
        }

        const result = updateBlog(id, req.body)
        return result.then(val => {
            return val ? new SuccessModel() : new ErrorModel('更新博客失败')
        })
    }


    // 删除一篇博客
    if (method === "POST" && path === "/api/blog/delete") {
        const loginCheckResult = loginCheck()
        if (loginCheckResult) {
            return loginCheckResult
        }
        req.body.author = req.session.username
        const result = delBlog(id, author)
        return result.then(val => {
            return val ? new SuccessModel() : new ErrorModel('删除博客失败')
        })
    }
}

module.exports = handleBlogRouter