<template>
    <n-menu ref="menuRef" v-model:value="router.currentRoute.value.path" :options="options"
        @update:value="handleMenuItemClick" />
</template>

<script setup lang="ts">
import { ref, onMounted, h } from "vue"
import { RouterLink, useRouter } from "vue-router"
import type { MenuOption, MenuInst } from "naive-ui"
import { MenuOutline as MenuOutlineIcon } from "@vicons/ionicons5"
import { useNaiveUIRender } from "@/hooks/useRender"

const { renderIcon } = useNaiveUIRender()
const router = useRouter()

const options = ref<MenuOption[]>([])
const menuRef = ref<MenuInst | null>(null)

const handleMenuItemClick = (key: string, item: MenuOption) => {
    if (item.children) return
    router.push({ path: key })
}

// 递归构建菜单项的函数
const buildMenuItem = (route: any, parentPath = ''): MenuOption => {
    const fullPath = parentPath ? `${parentPath}/${route.path}` : route.path
    const hasChildren = route.children && route.children.length > 0

    return {
        label: () => hasChildren ? route.meta?.title : h(RouterLink, { to: { path: fullPath } }, { default: () => route.meta?.title }),
        key: fullPath,
        icon: () => renderIcon(route.meta?.icon || MenuOutlineIcon),
        children: hasChildren ? route.children.map((child: any) => buildMenuItem(child, fullPath)) : undefined
    }
}

onMounted(() => {
    //@ts-ignore
    options.value = router.options.routes
        .filter(route => !route.meta?.hidden)
        .map(route => buildMenuItem(route))
})
</script>

<style scoped></style>