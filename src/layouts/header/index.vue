<template>
    <div class="header-container">
        <div class="container-left transition-all hover:scale-110">
            <n-image preview-disabled :src="LogoImage" :width="30" :height="30" />
            <span class="text-lg select-none">{{ appStore.name }}</span>
        </div>
        <n-breadcrumb>
            <n-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="index" :clickable="false">
                <n-icon v-if="item.icon" :component="item.icon" class="mr-1" />
                {{ $t(item.title) }}
            </n-breadcrumb-item>
        </n-breadcrumb>
        <div class="flex-grow"></div>
        <n-popselect v-model:value="settingsStore.locale" :options="localeOptions" trigger="hover"
            @update:value="handleUpdateLocale">
            <n-button size="small">{{ $t(`common.${settingsStore.locale}`) }}</n-button>
        </n-popselect>
        <n-button text @click="handleRefresh">
            <template #icon>
                <n-icon :component="RefreshOutlineIcon" />
            </template>
        </n-button>
        <n-button text @click="toggleFullscreen">
            <template #icon>
                <n-icon :component="isFullscreen ? ExitFullscreenIcon : FullscreenIcon" />
            </template>
        </n-button>
        <div class="container-right">
            <n-dropdown trigger="hover" :show-arrow="true" :options="avatarOptions" @select="handleAvatarOptionSelect">
                <n-avatar :src="LogoImage" :size="30" round />
            </n-dropdown>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useRouter, useRoute } from "vue-router"
import { useI18n } from "vue-i18n"
import { useDialog, NBreadcrumb, NBreadcrumbItem, NIcon } from "naive-ui"
import { useFullscreen } from "@vueuse/core"
import { PersonCircleOutline as PersonCircleOutlineIcon, LogOutOutline as LogOutOutlineIcon, RefreshOutline as RefreshOutlineIcon } from "@vicons/ionicons5"
import { ExpandOutline as FullscreenIcon, ContractOutline as ExitFullscreenIcon } from "@vicons/ionicons5"
import { useNaiveUIRender } from "@/hooks/useRender"
import useAppStore from "$/modules/app"
import useUserStore from "$/modules/user"
import useSettingsStore from "$/modules/settings"
import useCachedViewsStore from "$/modules/cached-views"
import LogoImage from "@/assets/images/evo-v.jpeg"

const { t, locale } = useI18n()
const router = useRouter()
const route = useRoute()
const appStore = useAppStore()
const userStore = useUserStore()
const settingsStore = useSettingsStore()
const cachedViewsStore = useCachedViewsStore()
const dialog = useDialog()
const { renderIcon } = useNaiveUIRender()

// 使用 useFullscreen 管理全屏状态
const { isFullscreen, toggle: toggleFullscreen } = useFullscreen()

// 计算面包屑数据
interface BreadcrumbItem {
    title: string
    path?: string
    icon?: any
}

const breadcrumbs = computed(() => {
    const matched = route.matched.filter(item => item.meta?.title && !item.meta.hidden)
    const result: BreadcrumbItem[] = []

    matched.forEach((item, index) => {
        // 跳过根路由和没有name的路由
        if (item.path === '/' || item.name === 'Root' || !item.name) return

        result.push({
            title: item.meta.title as string,
            path: index < matched.length - 1 ? (item.redirect as string || item.path) : undefined, // 最后一项不可点击
            icon: item.meta.icon
        })
    })

    return result
})

// 处理面包屑点击
const handleBreadcrumbClick = (item: BreadcrumbItem) => {
    if (item.path) {
        router.push(item.path)
    }
}

const avatarOptions = [
    {
        label: () => t('common.profile'),
        key: 'profile',
        icon: () => renderIcon(PersonCircleOutlineIcon)
    },
    {
        label: () => t('common.logout'),
        key: 'logout',
        icon: () => renderIcon(LogOutOutlineIcon)
    }
]

const localeOptions = [
    {
        label: t('common.zh'),
        value: 'zh'
    },
    {
        label: t('common.en'),
        value: 'en'
    }
]

const handleUpdateLocale = (value: string) => {
    settingsStore.locale = value
    locale.value = settingsStore.locale
}

const handleRefresh = () => {
    router.replace({ path: '/redirect', query: { redirect: route.path + '&' + JSON.stringify(route.query) } })
}

const handleAvatarOptionSelect = (key: string | number) => {
    switch (key) {
        case 'profile':
            router.push({ name: 'Profile' })
            break
        case 'logout':
            const d = dialog.warning({
                title: t('common.logout'),
                content: t('common.logout-comment'),
                positiveText: t('common.confirm'),
                negativeText: t('common.cancel'),
                onPositiveClick: async () => {
                    await userStore.logOut()
                    cachedViewsStore.clearAllViews()
                    router.replace({ path: '/login', query: { redirect: '/dashboard/workbench' } })
                    d.destroy()
                }
            })
            break
        default:
            break
    }
}
</script>

<style scoped>
.header-container {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    gap: 20px;

    .container-left {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        gap: 5px;
    }

    .container-right {
        display: flex;
        flex-flow: row-reverse nowrap;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
    }

    /* 面包屑样式 */
    :deep(.n-breadcrumb) {
        margin-left: 20px;

        .n-breadcrumb-item {
            cursor: pointer;

            &:last-child {
                cursor: default;
            }

            &:hover:not(:last-child) {
                color: var(--n-text-color-hover);
            }
        }
    }
}
</style>