import Router from "vue-router";
import Vue from "vue"
import { pathName } from "@/utils/config"
import index from "@/pages/index/index";
import login from "@/pages/login/login";
import home from "@/pages/home/home";
import user from "@/pages/user/user";

Vue.use(Router)

const router = new Router({
    mode: 'history', //去除地址栏#号
    routes: [
        {
            path: "",
            name: pathName.INDEX,
            redirect: { name: pathName.HOME },
            component: index,
            children: [
                {
                    path: "/home",
                    name: pathName.HOME,
                    component: home,
                },
                {
                    path: "/user",
                    name: pathName.USER,
                    component: user,
                },
                {
                    path: "/home/:userId",
                    component: home,
                    props: true,
                },
                {
                    path: "/myhome",
                    name: pathName.MYHOME,
                    redirect: { name: pathName.INDEX },
                },
            ]
        },
        {
            path: "/login",
            name: pathName.LOGIN,
            component: login
        },
    ]
})

// router.afterEach((to, from, next) => {
//     next()
//     // ...
// })

export default router