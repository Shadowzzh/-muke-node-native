import Router from "vue-router";
import Vue from "vue"

import index from "@/pages/index/index";
import login from "@/pages/login/login";
import home from "@/pages/home/home";

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: "/",
            name: "index",
            component: index,
            children: [
                {
                    path: "/home",
                    name: "home",
                    component: home,
                }
            ]
        },
        {
            path: "/login",
            name: "login",
            component: login
        },
    ]
})