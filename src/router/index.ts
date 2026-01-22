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
    LibraryOutline as LibraryOutlineIcon,
    ListOutline as ListOutlineIcon,
    BuildOutline as BuildOutlineIcon,
    TrailSignOutline as TrailSignOutlineIcon,
    HardwareChipOutline as HardwareChipOutlineIcon
} from "@vicons/ionicons5"

export interface RouteRaw {
    path: string,
    name: string,
    meta: {
        title: string,
        icon?: any,
        isAffix?: boolean,
        hidden?: boolean
    },
    component: any | null,
    children?: RouteRaw[]
}

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
                },
                {
                    path: 'portal/details/:id',
                    name: 'DecorationPortalDetails',
                    meta: {
                        title: 'decoration.decoration-portal-details',
                        icon: LibraryOutlineIcon,
                        hidden: true
                    },
                    component: () => import("~/decoration/portal/details.vue")
                }
            ]
        },
        {
            path: '/system-tools',
            name: 'SystemTools',
            meta: {
                title: 'sys.tools',
                icon: BuildOutlineIcon
            },
            component: Layout,
            children: [
                {
                    path: 'form-builder',
                    name: 'FormBuilder',
                    meta: {
                        title: 'fb.builder',
                        icon: BuildOutlineIcon
                    },
                    component: () => import("~/system-tools/form-builder/index.vue")
                },
                {
                    path: 'router-gen',
                    name: 'RouterGenerator',
                    meta: {
                        title: 'routerGen.title',
                        icon: TrailSignOutlineIcon
                    },
                    component: () => import("~/system-tools/router-generator/index.vue")
                },
                {
                    path: 'router-gen/details',
                    name: 'RouterGeneratorDetails',
                    meta: {
                        title: 'routerGen.details',
                        icon: LibraryOutlineIcon,
                        hidden: true
                    },
                    component: () => import("~/system-tools/router-generator/details.vue")
                }
            ]
        },
        {
            path: '/components',
            name: 'Components',
            meta: {
                title: 'components.title',
                icon: HardwareChipOutlineIcon
            },
            component: Layout,
            children: [
                {
                    path: 'cmp-list',
                    name: 'CmpList',
                    meta: {
                        title: 'cmpList.title',
                        icon: ListOutlineIcon
                    },
                    component: () => import('~/components/cmp-list/index.vue')
                }
            ]
        },
        {
            path: '/redirect',
            name: 'Redirect',
            meta: {
                hidden: true
            },
            component: () => import("~/redirect/index")
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
            path: '/profile',
            name: 'Profile',
            meta: {
                title: 'common.profile',
                hidden: true
            },
            component: () => import("~/profile/index.vue")
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
        useHead({
            title: () => `${appStore.name} | ${t('common.login')}`,
        })
        return true
    } else {
        if (!token) {
            useHead({
                title: () => `${appStore.name} | ${t('common.login')}`,
            })
            return { path: '/login', query: { redirect: to.fullPath } }
        } else {
            useHead({
                title: () => `${appStore.name} | ${t(to.meta.title as string || 'common.not-found')}`,
            })
            return true
        }
    }
})

router.afterEach(() => {
    loadingBar.finish()
})

export default router