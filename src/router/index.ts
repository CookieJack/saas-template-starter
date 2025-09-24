import { createRouter, createWebHashHistory } from "vue-router"
import { createDiscreteApi } from "naive-ui"
import Layout from "@/layouts/index.vue"
import Cookies from "js-cookie"
import {
    HomeOutline as HomeOutlineIcon,
    LibraryOutline as LibraryOutlineIcon
} from "@vicons/ionicons5"

const { loadingBar } = createDiscreteApi(["loadingBar"])

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'Root',
            meta: {
                hidden: true
            },
            redirect: '/dashboard/workbench'
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            meta: {
                title: 'home.dashboard',
                icon: HomeOutlineIcon
            },
            component: Layout,
            children: [
                {
                    path: 'workbench',
                    name: 'Workbench',
                    meta: {
                        title: 'home.workbench',
                        isAffix: true,
                        icon: LibraryOutlineIcon
                    },
                    component: () => import("~/workbench/index.vue")
                },
            ]
        },
        {
            path: '/decoration',
            name: 'Decoration',
            meta: {
                title: 'decoration.decoration',
                icon: LibraryOutlineIcon
            },
            component: Layout,
            children: [
                {
                    path: 'portal',
                    name: 'DecorationPortal',
                    meta: {
                        title: 'decoration.decoration-portal',
                        icon: LibraryOutlineIcon
                    },
                    component: () => import("~/decoration/portal/index.vue")
                }
            ]
        },
        {
            path: '/login',
            name: 'Login',
            meta: {
                title: 'common.login',
                hidden: true
            },
            component: () => import("~/login/index.vue")
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            meta: {
                title: 'common.not-found',
                hidden: true
            },
            component: () => import("~/exceptions/404.vue")
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