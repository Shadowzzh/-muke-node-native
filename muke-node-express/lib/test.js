const express = require("./my-express");
const app = express()
console.log(app)

app.use((req, res, next) => {
    console.log("请求开始...", req.method, req.url)
    next()
})

app.use((req, res, next) => {
    console.log("处理cookie ...")
    req.cookie = {
        userId: "123",
    }
    next()
})

app.use("/api", (req, res, next) => {
    console.log("处理 /api路由")
    next()
})

function loginCheck(req, res, next) {
    setTimeout(() => {
        console.log("模拟登录成功")
        next()
    }, 1000);
}

app.get("/api/get-cookie", loginCheck, (req, res, next) => {
    console.log("get /api/get-cookie")
    res.json({
        errno: 0,
        data: req.cookie
    })
})
app.listen(8082, (e) => {
    console.log("listen 8082")
})