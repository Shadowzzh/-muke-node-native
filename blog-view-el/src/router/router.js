import Router from "vue-router";
import Vue from "vue"

import home from "@/pages/home/home";
import login from "@/pages/login/login";
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: "/",
            name: "home",
            component: home
        },
        {
            path: "/login",
            name: "login",
            component: login
        },
    ]
})