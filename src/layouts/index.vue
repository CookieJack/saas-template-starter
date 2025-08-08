<template>
    <n-layout position="absolute">
        <n-layout-header style="height: 64px; padding: 24px" bordered>
            <Header />
        </n-layout-header>
        <n-layout has-sider position="absolute" style="top: 64px; bottom: 64px">
            <n-layout-sider bordered content-style="padding: 24px;">
                <Sidebar />
            </n-layout-sider>
            <n-layout-content>
                <router-view></router-view>
            </n-layout-content>
        </n-layout>
        <n-layout-footer bordered position="absolute" style="height: 64px; padding: 24px">
            <Footer />
        </n-layout-footer>
    </n-layout>
</template>

<script setup lang="ts">
import Header from "./header/index.vue"
import Footer from "./footer/index.vue"
import Sidebar from "./sidebar/index.vue"
</script>

<style lang="scss" scoped></style>