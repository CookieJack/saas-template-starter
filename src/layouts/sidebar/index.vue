<template>
    <n-menu ref="menuRef" v-model:value="currentPath" :options="options"
        @update:value="handleMenuItemClick" :expanded-keys="expandedKeys" />
</template>

<script setup lang="ts">
import { ref, onMounted, h, computed, watch, nextTick } from "vue"
import { RouterLink, useRouter, useRoute } from "vue-router"
import type { MenuOption, MenuInst } from "naive-ui"
import { MenuOutline as MenuOutlineIcon } from "@vicons/ionicons5"
import { useNaiveUIRender } from "@/hooks/useRender"

const { renderIcon } = useNaiveUIRender()
const router = useRouter()
const route = useRoute()

const options = ref<MenuOption[]>([])
const menuRef = ref<MenuInst | null>(null)
const expandedKeys = ref<string[]>([])

// 响应式的当前路径
const currentPath = computed(() => route.path)

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

// 根据路由路径找到需要展开的菜单项
const findExpandedKeys = (path: string, menuOptions: MenuOption[]): string[] => {
    const keys: string[] = []
    
    const findParentKeys = (options: MenuOption[], targetPath: string): boolean => {
        for (const option of options) {
            if (option.key === targetPath) {
                return true
            }
            
            if (option.children) {
                const found = findParentKeys(option.children, targetPath)
                if (found) {
                    keys.push(option.key as string)
                    return true
                }
            }
        }
        return false
    }
    
    findParentKeys(menuOptions, path)
    return keys
}

// 同步菜单与路由的方法
const syncMenuWithRoute = (targetRoute?: any) => {
    const targetPath = targetRoute ? targetRoute.path : route.path
    
    // 更新展开的菜单项
    nextTick(() => {
        expandedKeys.value = findExpandedKeys(targetPath, options.value)
    })
}

// 监听路由变化，自动展开对应菜单
watch(
    () => route.path,
    () => {
        syncMenuWithRoute()
    },
    { immediate: true }
)

onMounted(() => {
    //@ts-ignore
    options.value = router.options.routes
        .filter(route => !route.meta?.hidden)
        .map(route => buildMenuItem(route))
    
    // 初始化时同步菜单
    syncMenuWithRoute()
})

// 暴露方法给父组件
defineExpose({
    syncMenuWithRoute
})
</script>

<style scoped></style>