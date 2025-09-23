import { createRouter, createWebHashHistory } from "vue-router"
import { createDiscreteApi } from "naive-ui"
import Layout from "@/layouts/index.vue"
import Cookies from "js-cookie"
import i18n from "@/locale"
import {
    HomeOutline as HomeOutlineIcon,
    LibraryOutline as LibraryOutlineIcon
} from "@vicons/ionicons5"

const { loadingBar } = createDiscreteApi(["loadingBar"])

const { t } = i18n.global

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
                title: t('home.dashboard'),
                icon: HomeOutlineIcon
            },
            component: Layout,
            children: [
                {
                    path: 'workbench',
                    name: 'Workbench',
                    meta: {
                        title: t('home.workbench'),
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
                title: t('decoration.decoration'),
                icon: LibraryOutlineIcon
            },
            component: Layout,
            children: [
                {
                    path: 'portal',
                    name: 'DecorationPortal',
                    meta: {
                        title: t('decoration.decoration-portal'),
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
                title: t('common.login'),
                hidden: true
            },
            component: () => import("~/login/index.vue")
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            meta: {
                title: t('common.not-found'),
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