import Vue from 'vue'

Vue.prototype.$getUserInfo = function() {
    let userInfo = JSON.parse(sessionStorage.getItem("curr-user-info"))
    if (!userInfo) {
        userInfo = document.cookie
    }
    return userInfo
} 