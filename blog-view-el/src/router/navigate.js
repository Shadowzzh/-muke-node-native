
/**
 * native 封装
 * @param {tring | Object} historyObj 字符串路径，或者一个描述地址的对象 
 */
function go(content, historyObj) {
    // 当前路由 === 要跳转到的路由 直接跳出函数
    if (content.$router.history.current.name === historyObj.name) {
        // location.reload()
        return
    }
    content.$router.push(historyObj)
    // .catch(err => location.reload())
}

/**
 * router.push({ name: 'user', params: { userId }}) // -> /user/123
 * @param {String} name 路径名
 * @param {Object} params 参数
 */
function goToName(content, name, params) {
    go(content, {
        name,
        params,
    })
}
/**
 * router.push({ path: 'register', query: { plan: 'private' }})
 * 带查询参数，变成 /register?plan=private
 * @param {String} path 路径
 * @param {Object} query 参数
 */
function goToPath(content, path, query) {
    go(content, {
        path,
        query, 
    })
}

function back(content, delta = -1) {
    content.$router.go(delta)
}


module.exports = {
    go,
    back,
    goToName,
    goToPath,
}