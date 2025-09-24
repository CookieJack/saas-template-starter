<template>
    <n-menu ref="menuRef" v-model:value="currentPath" :options="options" @update:value="handleMenuItemClick" />
</template>

<script setup lang="ts">
import { ref, computed, watchEffect, watch } from "vue"
import { useRouter, useRoute } from "vue-router"
import { useI18n } from "vue-i18n"
import type { MenuOption, MenuInst } from "naive-ui"
import { MenuOutline as MenuOutlineIcon } from "@vicons/ionicons5"
import { useNaiveUIRender } from "@/hooks/useRender"
import useCachedViewsStore from "$/modules/cached-views"

const cachedViewsStore = useCachedViewsStore()
const { renderIcon } = useNaiveUIRender()
const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const menuRef = ref<MenuInst | null>(null)
const options = ref<MenuOption[]>([])

// 响应式的当前路径
const currentPath = computed(() => route.path)

const handleMenuItemClick = (key: string) => {
    router.push({ path: key })
}

// 递归构建菜单项的函数
const buildMenuItem = (route: any, parentPath = ''): MenuOption => {
    const fullPath = parentPath ? `${parentPath}/${route.path}` : route.path
    const hasChildren = route.children && route.children.length > 0

    return {
        label: () => t(route.meta?.title) || '',
        key: fullPath,
        icon: () => renderIcon(route.meta?.icon || MenuOutlineIcon),
        children: hasChildren ? route.children.map((child: any) => buildMenuItem(child, fullPath)) : undefined
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