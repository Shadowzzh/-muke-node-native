const http = require("http")
const unCurry = fn => (context, handle) => fn.call(context, handle)
const slice = unCurry([].slice)
class LikeExpress {
    constructor() {
        // 存放中间件
        this.routes = {
            all: [],
            post: [],
            get: [],
        }
    }

    register(path) {
        const info = {}
        if (typeof path === "string") {
            info.path = path
            //  从第二个参数开始， 转换成数组， 存入 stack
            info.stack = slice(arguments, 1)
        } else {
            //  从第一个参数开始， 转换成数组， 存入 stack
            info.path = "/"
            info.stack = slice(arguments, 0)
        }
        return info
    }

    use() {
        const info = this.register.apply(this, arguments)
        this.routes.all.push(info)
    }

    get() {
        const info = this.register.apply(this, arguments)
        this.routes.get.push(info)
    }

    post() {
        const info = this.register.apply(this, arguments)
        this.routes.post.push(info)
    }

    match(method, url) {
        let stack = []
        if (url === "/favicon.ico") {
            return stack
        }

        //  获取 routes 
        const curRoutes = []
        curRoutes.push(...this.routes.all)
        curRoutes.push(...this.routes[method])

        curRoutes.forEach(routeInfo => {
            if (url.indexOf(routeInfo.path === 0)) {
                stack = stack.concat(routeInfo.stack)
            }
        })
        return stack
    }

    // 核心next机制
    handle(req, res, stack) {
        const next = () => {
            // 拿到第一个匹配的中间件
            const middleware = stack.shift()
            if (middleware) {
                // 执行中间件函数
                middleware(req, res, next)
            }
        }
        next()
    }

    callback() {
        return (req, res) => {
            // 输出值到网页
            res.json = (data) => {
                res.setHeader("Content-type", "application/json")
                res.end(
                    JSON.stringify(data)
                )
            }
            const url = req.url
            const method = req.method.toLowerCase()

            const resultList = this.match(method, url)
            this.handle(req, res, resultList)
        }
    }

    listen(...args) {
        const server = http.createServer(this.callback())
        server.listen(...args)
    }
}

module.exports = () => {
    return new LikeExpress()
}