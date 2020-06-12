import $http from "./http"

export default {
    /**
     * 获取用户详细信息
     */
    async getUserDetail() {
        const userDetailRes = await $http.post("user/getUserDetail")
        return userDetailRes.data
    },
    /**
     * 获取用户列表
     */
    async getUserList() {
        const userListRes = await $http.get("user/getUserList")
        return userListRes.data
    },
    /**
     * 获取博客列表
     */
    async getArticle(user_id) {
        const articleRes = await $http.get("blog/list", {
            params: { user_id }
        })
        return articleRes.data
    },
    /**
     * 获取 导航 tab 的name
     */
    async getNavigateName(otherId) {
        const loginRes = await $http.get("navigate/getNavigateName", {
            params: { otherId }
        })
        return loginRes.data
    },
    /**
     * 用户登录
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
     */
    async register(username, password) {
        const loginRes = await $http.post("user/register", {
            username,
            password
        })
        return loginRes.data
    }
}