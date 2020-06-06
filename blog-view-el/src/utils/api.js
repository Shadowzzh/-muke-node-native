import $http from "./http"

export default {
    /**
     * 用户登录
     * @param {*string} username 用户名 
     * @param {*string} password 密码
     */
    async login(username, password) {
        const loginRes = await $http.post("user/login", {
            username,
            password
        })
        return loginRes.data
    },
    /**
     * 用户注册
     * @param {*string} username 用户名 
     * @param {*string} password 密码
     */
    async register(username, password) {
        const loginRes = await $http.post("user/register", {
            username,
            password
        })
        return loginRes.data
    }
}