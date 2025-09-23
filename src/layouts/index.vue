<template>
    <n-layout position="absolute">
        <n-layout-header style="height: 64px; padding: 24px" bordered>
            <Header />
        </n-layout-header>
        <n-layout has-sider position="absolute" style="top: 64px; bottom: 40px">
            <n-layout-sider collapse-mode="width" :collapsed-width="50" :width="200" show-trigger="arrow-circle"
                bordered content-style="padding: 0px;">
                <Sidebar ref="sidebarRef" />
            </n-layout-sider>
            <n-layout-content>
                <n-card hoverable :bordered="true" size="small" content-style="padding: 0px">
                    <n-scrollbar x-scrollable>
                        <n-tabs v-model:value="cachedViewsStore.activeViewPath" type="card" size="small"
                            @update:value="handleTabChange" @close="handleTabClose" @contextmenu="handleTabContextMenu">
                            <n-tab v-for="view in cachedViewsStore.getCachedViews" :key="view.path" :name="view.path"
                                :closable="!view.isAffix">
                                {{ $t(view.title) }}
                            </n-tab>
                        </n-tabs>
                    </n-scrollbar>
                </n-card>
                <div class="p-2">
                    <transition
                        mode="out-in"
                        enter-active-class="animate__animated animate__fadeInLeft animate__faster"
                        leave-active-class="animate__animated animate__fadeOutRight animate__faster"
                    >
                        <router-view></router-view>
                    </transition>
                </div>
            </n-layout-content>
        </n-layout>
        <n-layout-footer bordered position="absolute" style="height: 40px; padding: 10px">
            <Footer />
        </n-layout-footer>
    </n-layout>

    <!-- 右键菜单 -->
    <n-dropdown placement="bottom-start" trigger="manual" :x="contextMenuX" :y="contextMenuY"
        :options="contextMenuOptions" :show="showContextMenu" :on-clickoutside="() => showContextMenu = false"
        @select="handleContextMenuSelect" />
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from "vue"
import { useRoute, useRouter } from "vue-router"
import Header from "./header/index.vue"
import Footer from "./footer/index.vue"
import Sidebar from "./sidebar/index.vue"
import useCachedViewsStore from "$/modules/cached-views"
import { useI18n } from "vue-i18n"

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const cachedViewsStore = useCachedViewsStore()
const sidebarRef = ref()

// 右键菜单状态
const showContextMenu = ref(false)
const contextMenuX = ref(0)
const contextMenuY = ref(0)
const currentContextMenuTab = ref('')

// 右键菜单选项
const contextMenuOptions = [
    {
        label: t('common.close-left'),
        key: 'close-left'
    },
    {
        label: t('common.close-right'),
        key: 'close-right'
    },
    {
        label: t('common.close-other'),
        key: 'close-other'
    },
    {
        label: t('common.close-all'),
        key: 'close-all'
    }
]

// 监听路由变化，自动添加缓存
watch(
    () => route.path,
    (newPath) => {
        if (newPath && newPath !== '/login' && !newPath.includes('/:')) {
            console.log(route)
            cachedViewsStore.addCachedView(route)
            cachedViewsStore.setActiveView(newPath)

            // 同步侧边栏菜单
            nextTick(() => {
                if (sidebarRef.value) {
                    sidebarRef.value.syncMenuWithRoute(route)
                }
            })
        }
    },
    { immediate: true }
)

// 标签页切换
const handleTabChange = (path: string) => {
    cachedViewsStore.setActiveView(path)
    router.push(path)
}

// 标签页关闭
const handleTabClose = (path: string) => {
    const views = cachedViewsStore.getCachedViews
    const currentIndex = views.findIndex(view => view.path === path)

    if (currentIndex > -1) {
        cachedViewsStore.removeCachedView(path)

        // 如果关闭的是当前激活的标签，需要切换到其他标签
        if (path === cachedViewsStore.activeViewPath) {
            const remainingViews = cachedViewsStore.getCachedViews
            if (remainingViews.length > 0) {
                const nextView = remainingViews[Math.min(currentIndex, remainingViews.length - 1)]
                handleTabChange(nextView.path)
            }
        }
    }
}

// 右键菜单处理
const handleTabContextMenu = (e: MouseEvent, tabName: string) => {
    e.preventDefault()
    currentContextMenuTab.value = tabName
    contextMenuX.value = e.clientX
    contextMenuY.value = e.clientY
    showContextMenu.value = true
}

// 右键菜单选择
const handleContextMenuSelect = (key: string) => {
    const currentPath = currentContextMenuTab.value

    switch (key) {
        case 'close-left':
            cachedViewsStore.removeLeftViews(currentPath)
            break
        case 'close-right':
            cachedViewsStore.removeRightViews(currentPath)
            break
        case 'close-other':
            cachedViewsStore.removeOtherViews(currentPath)
            break
        case 'close-all':
            cachedViewsStore.removeAllViews()
            // 切换到第一个固定标签
            const affixViews = cachedViewsStore.getAffixViews
            if (affixViews.length > 0) {
                handleTabChange(affixViews[0].path)
            }
            break
    }

    showContextMenu.value = false
}

</script>

<style scoped></style>