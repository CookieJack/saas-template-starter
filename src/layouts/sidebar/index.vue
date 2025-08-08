<template>
    <n-menu :options="options"/>
</template>

<script setup lang="ts">
import { ref } from "vue"
import type { MenuOption } from "naive-ui"
import { useNaiveUIRender } from "@/hooks/useRender"
import { HomeOutline as HomeOutlineIcon } from "@vicons/ionicons5"

const { renderIcon } = useNaiveUIRender()


const options: MenuOption[] = [
    {
        label: '首页',
        key: 'home',
        icon: () => renderIcon(HomeOutlineIcon),
    },
]
</script>

<style scoped></style>