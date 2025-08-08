import { createRouter, createWebHashHistory } from "vue-router"
import { createDiscreteApi } from "naive-ui"
import Layout from "@/layouts/index.vue"
import Cookies from "js-cookie"

const { message, loadingBar } = createDiscreteApi(["message", "loadingBar"])

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            name: 'Root',
            redirect: '/dashboard',
            component: Layout,
            children: [
                {
                    path: "dashboard",
                    name: "Dashboard",
                    component: () => import("../views/dashboard/index.vue")
                },
                {
                    path: "workbench",
                    name: "Workbench",
                    component: () => import("@/views/workbench/index.vue")
                }
            ]
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import("../views/login/index.vue")
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: () => import("@/views/exceptions/404.vue")
        }
    ]
})

router.beforeEach((to, from) => {
    loadingBar.start()
    const token = Cookies.get("token")
    // 白名单
    const whiteList = ['/login', '/404', '/500']
    if (whiteList.includes(to.path)) {
        return true
    } else {
        if (!token) {
            return { path: '/login', query: { redirect: to.fullPath } }
        } else {
            return true
        }
    }
})

router.afterEach(() => {
    loadingBar.finish()
})

export default router