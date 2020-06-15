const express = require("./like-express");
const app = express()

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

app.use("/api/get-cookie", loginCheck, (req, res, next) => {
    console.log("get /api/get-cookie")
    res.json({
        errno: 0,
        data: req.cookie
    })
})
app.use(function (req, res, next) {
    res.json({
        msg: 404
    });
});

app.listen(8082, (e) => {
    console.log("listen 8082")
})