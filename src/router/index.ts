import { createRouter, createWebHashHistory } from "vue-router"
import { createDiscreteApi } from "naive-ui"
import i18n from "@/locale"
import { createPinia } from "pinia"
import useAppStore from "$/modules/app"
import { useHead } from "@unhead/vue"
import Layout from "@/layouts/index.vue"
import Cookies from "js-cookie"
import {
    HomeOutline as HomeOutlineIcon,
    LibraryOutline as LibraryOutlineIcon
} from "@vicons/ionicons5"

const { loadingBar } = createDiscreteApi(["loadingBar"])

const pinia = createPinia()

const { t } = i18n.global

const appStore = useAppStore(pinia)

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

router.beforeEach((to) => {
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
            useHead({
                title: `${appStore.name} | ${t(to.meta.title as string || 'common.not-found')}`,
            })
            return true
        }
    }
})

router.afterEach(() => {
    loadingBar.finish()
})

export default router