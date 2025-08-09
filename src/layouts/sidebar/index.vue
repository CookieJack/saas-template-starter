<template>
    <n-menu :options="options" @update:value="handleMenuItemClick" />
</template>

<script setup lang="ts">
import { ref, onMounted, h } from "vue"
import { RouterLink, useRouter } from "vue-router"
import type { MenuOption } from "naive-ui"
import { MenuOutline as MenuOutlineIcon } from "@vicons/ionicons5"
import { useNaiveUIRender } from "@/hooks/useRender"

const { renderIcon } = useNaiveUIRender()
const router = useRouter()

const options = ref<MenuOption[]>([])

const handleMenuItemClick = (key: string, item: MenuOption) => {
    if (item.children) return
    console.log(key, item)
}

onMounted(() => {
    //@ts-ignore
    options.value = router.options.routes.filter(route => !route.meta?.hidden).map(route => {
        console.log(route)
        return {
            label: () => route.children ? route.meta?.title : h(RouterLink, { to: { path: route.path } }, { default: () => route.meta?.title }),
            key: route.path,
            icon: () => renderIcon(route.meta?.icon || MenuOutlineIcon),
            children: route.children?.map(child => ({
                label: () => child.children ? child.meta?.title : h(RouterLink, { to: { path: `${route.path}/${child.path}` } }, { default: () => child.meta?.title }),
                key: `${route.path}/${child.path}`,
                icon: () => renderIcon(child.meta?.icon || MenuOutlineIcon),
                children: child.children?.map(grandchild => ({
                    label: () => grandchild.children ? grandchild.meta?.title : h(RouterLink, { to: { path: `${route.path}/${child.path}/${grandchild.path}` } }, { default: () => grandchild.meta?.title }),
                    key: `${route.path}/${child.path}/${grandchild.path}`,
                    icon: () => renderIcon(grandchild.meta?.icon || MenuOutlineIcon)
                }))
            }))
        }
    })
})
</script>

<style scoped></style>