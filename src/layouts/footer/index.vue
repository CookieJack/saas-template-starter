<template>
    <p class="text-center">copyright {{ appStore.company }}{{ appStore.version }} 2021~present</p>
</template>

<script setup lang="ts">
import useAppStore from "@/store/modules/app"

const appStore = useAppStore()
</script>

<style scoped></style>