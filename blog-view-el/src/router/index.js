import Router from "vue-router";
import Vue from "vue"

import index from "@/pages/index/index";
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: "/",
            name: "index",
            component: index
        }
    ]
})