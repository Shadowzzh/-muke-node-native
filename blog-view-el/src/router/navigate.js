
/**
 * native 封装
 * @param {tring | Object} historyObj 字符串路径，或者一个描述地址的对象 
 */
function go(historyObj) {
    this.$router.push(historyObj)
}

/**
 * router.push({ name: 'user', params: { userId }}) // -> /user/123
 * @param {String} name 路径名
 * @param {Object} params 参数
 */
function goToName(name, params) {
    this.$router.push({
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
function goToPath(path, query) {
    this.$router.push({
        path,
        query,
    })
}

Object.getPrototypeOf(go).name = goToName
Object.getPrototypeOf(go).path = goToPath


function back(delta = -1) {
    this.$router.go(delta)
}

module.exports = {
    go,
    back,
}