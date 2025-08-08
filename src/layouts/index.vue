<template>
    <n-layout position="absolute">
        <n-layout-header style="height: 64px; padding: 24px" bordered>
            <Header />
        </n-layout-header>
        <n-layout has-sider position="absolute" style="top: 64px; bottom: 64px">
            <n-layout-sider collapse-mode="width" :collapsed-width="120" :width="210"
        show-trigger="arrow-circle" bordered content-style="padding: 24px;">
                <Sidebar />
            </n-layout-sider>
            <n-layout-content>
                <n-card :bordered="true" size="small" content-style="padding: 0px">
                    <n-scrollbar x-scrollable>
                        <n-tabs v-model:value="activeTab" type="card" size="small">
                            <n-tab name="home" :closable="false">首页</n-tab>
                            <n-tab name="decoration" :closable="true">官网装修</n-tab>
                        </n-tabs>
                    </n-scrollbar>
                </n-card>
                <div class="p-2">
                    <router-view></router-view>
                </div>
            </n-layout-content>
        </n-layout>
        <n-layout-footer bordered position="absolute" style="height: 64px; padding: 24px">
            <Footer />
        </n-layout-footer>
    </n-layout>
</template>

<script setup lang="ts">
import { ref } from "vue"
import Header from "./header/index.vue"
import Footer from "./footer/index.vue"
import Sidebar from "./sidebar/index.vue"

const activeTab = ref('home')

</script>

<style lang="scss" scoped></style>