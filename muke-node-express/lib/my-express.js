const http = require("http")

const methodNames = ["get", "use", "post", "delete", "pull"]
const unCurry = fn => (context, args) => fn.call(context, args)
const slice = unCurry([].slice)

function myExpress() {
    this.routes = {}
    // 存储 各个方法注册的 Info
    methodNames.forEach(name => {
        this.routes[name] = []
    })
}

// 存储 注册的 Info 到routes
methodNames.forEach(name => {
    myExpress.prototype[name] = function () {
        const info = this.register.apply(this, arguments)
        this.routes[name].push(info)
    }
})

/**
 * 把 注册的路由 拆分成 info 对象
 * 没有路径的 默认 /
 */
myExpress.prototype.register = function (path) {
    const info = {}
    if (typeof path === "string") {
        info.path = path
        info.stack = slice(arguments, 1)
    } else {
        info.path = "/"
        info.stack = slice(arguments, 0)
    }
    return info
}


/**
 * 获取命中路由的 info 的 stack
 */
myExpress.prototype.match = function (url, method) {
    const hitStack = []
    // 排除浏览器自动请求的的 ico
    if (url === "/favicon.ico") {
        return hitStack
    }
    const allInfoList = []
    allInfoList.push(...this.routes.use)
    allInfoList.push(...this.routes[method])

    allInfoList.forEach(info => {
        //  是否命中路由
        if (url.indexOf(info.path) === 0) { 
            hitStack.push(...info.stack)
        }
    })
    console.log(hitStack)
    return hitStack
}


/**
 *  传出 next 函数
 *  next函数拥有 handle 作用域
 *  每次调用 next 会 shift stack列表
 */
myExpress.prototype.handle = function (req, res, stack) {
    function next() {
        const middleware = stack.shift()
        if (middleware) {
            middleware(req, res, next)
        }
    }
    next()
}

/**
 *  createServer的回调函数
 */
function app(req, res) {
    // 返回给客户端数据（json）
    res.json = (data) => {
        res.setHeader("Content-type", "application/json")
        res.end(JSON.stringify(data))
    }

    let { url, method } = req
    method = method.toLowerCase()

    const stackList = this.match(url, method)
    this.handle(req, res, stackList)
}

myExpress.prototype.listen = function (...args) {
    const server = http.createServer(app.bind(this))
    server.listen(...args)
}

module.exports = () => {
    return new myExpress()
}