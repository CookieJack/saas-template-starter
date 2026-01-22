<template>
    <n-menu ref="menuRef" v-model:value="$route.path" :options="options" @update:value="handleMenuItemClick" />
</template>

<script setup lang="ts">
import { ref, watchEffect, watch } from "vue"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import type { MenuOption, MenuInst } from "naive-ui"
import { MenuOutline as MenuOutlineIcon } from "@vicons/ionicons5"
import { useNaiveUIRender } from "@/composables/useRender"
import useCachedViewsStore from "$/modules/cached-views"

const cachedViewsStore = useCachedViewsStore()
const { renderIcon } = useNaiveUIRender()
const router = useRouter()
const { t } = useI18n()

const menuRef = ref<MenuInst | null>(null)
const options = ref<MenuOption[]>([])

const handleMenuItemClick = (key: string) => {
    router.push({ path: key })
}

// 递归构建菜单项的函数
const buildMenuItem = (route: any, parentPath = ''): MenuOption => {
    const fullPath = parentPath ? `${parentPath}/${route.path}` : route.path
    // 过滤掉hidden为true的子路由
    const visibleChildren = route.children?.filter((child: any) => !child.meta?.hidden) || []
    const hasChildren = visibleChildren.length > 0

    return {
        label: () => t(route.meta?.title) || '',
        key: fullPath,
        icon: () => renderIcon(route.meta?.icon || MenuOutlineIcon),
        children: hasChildren ? visibleChildren.map((child: any) => buildMenuItem(child, fullPath)) : undefined
    }
}

watchEffect(() => {
    //@ts-ignore
    options.value = router.options.routes
        .filter(route => !route.meta?.hidden)
        .map(route => buildMenuItem(route))
})

watch(() => cachedViewsStore.activeViewPath, (newValue) => {
    if (newValue) {
        menuRef.value?.showOption(newValue)
    }
}, { immediate: true })
</script>

<style scoped></style>