/*
 * @Author: your name
 * @Date: 2020-05-26 16:30:31
 * @LastEditTime: 2020-05-29 11:18:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \muke\app.js
 */

const querystring = require("querystring")

const handleBlogRouter = require("./src/router/blog")
const handleUserRouter = require("./src/router/user")
const { get, set } = require("./src/db/redis");

/**
 * 获取 cookie 的过期值 
 */
function getCookieExpires() {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    return d.toGMTString()
}

// session 数据
// const  SESSION_DATA = {}

/**
 * 处理 post data
 */
function getPostData(req) {
    const promise = new Promise((resolve, reject) => {

        if (req.method !== "POST") {
            resolve({})
            return
        }

        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }

        let postData = ""
        req.on("data", chunk => {
            postData += chunk.toString()
        })

        req.on("end", () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            )
        })
    })

    return promise
}

async function serverHandle(req, res) {
    const { url } = req

    // 返回格式为json
    res.setHeader("Content-type", "application/json")
    req.path = url.split("?")[0]


    // 解析 cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || ""
    cookieStr.split(";").forEach(item => {
        if (!item) {
            return
        }
        const arr = item.split("=")
        let [key, value] = arr
        key = key.trim()
        value = value.trim()
        req.cookie[key] = value
    })


    // 解析 query
    req.query = querystring.parse(url.split("?")[1])

    // 使用 reids 解析 session
    let needSetCookie = false
    let userId = req.cookie.userid
    if (!userId) {
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
        // 初始化 session
        set(userId, {})
    }

    req.sessionId = userId

    // 获取 session
    const sessionData = await get(req.sessionId)
    if (sessionData == null) {
        // 初始化 session 中的值
        set(req.sessionData, {})
        // 设置 session
        req.session = {}
    } else {
        // 设置 session
        req.session = sessionData
    }
    console.log("req.session", req.session)


    // 处理 post data
    const postData = await getPostData(req)
    req.body = postData


    // 处理 blog 路由
    const blogResult = handleBlogRouter(req, res)
    if (blogResult) {
        blogResult.then(blogData => {
            if (needSetCookie) {
                res.setHeader("Set-Cookie", `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()};`)
            }
            res.end(JSON.stringify(blogData))
        })
        return
    }


    // 处理 user 路由
    const userResult = handleUserRouter(req, res)
    if (userResult) {
        userResult.then(userData => {
            if (needSetCookie) {
                res.setHeader("Set-Cookie", `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()};`)
            }
            // console.log(userData)
            res.end(JSON.stringify(userData))
        })
        return
    }


    res.writeHead(404, { "Content-type": "text/plain" })
    res.write("404 Not Found \n")
    res.end()
}

module.exports = serverHandle