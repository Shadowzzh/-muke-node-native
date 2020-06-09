import $http from "./http"

export default {
    /**
     * 获取全部文章
     */
    async getGlobalArticle() {
        const globalArticleRes = await $http.get("blog/globalList")
        return globalArticleRes.data
    },

    /**
     * 获取 导航bar 的那么
     * @param {number} otherId 用户id 
     */
    async getNavigateName(otherId) {
        const loginRes = await $http.get("navigate/getNavigateName", {
            otherId
        })
        return loginRes.data
    },

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