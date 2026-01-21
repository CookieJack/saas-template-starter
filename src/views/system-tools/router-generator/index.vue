<template>
    <n-card :title="t('routerGen.title')" hoverable :segmented="{ content: true, footer: 'soft' }">
        <template #header-extra>
            <n-button type="primary" size="small" @click="handleAddRoute">{{ t('common.add') }}</n-button>
        </template>
        <n-data-table :columns="columns" :data="validRoutes" :row-key="(route: any) => route.path" :single-line="false"
            :single-column="false" />
    </n-card>
</template>

<script setup lang="ts">
import { computed, h } from "vue"
import { NEl } from "naive-ui"
import { useI18n } from "vue-i18n"
import { useRouter } from "vue-router"

const { t } = useI18n()
const router = useRouter()

const validRoutes = computed(() => router.getRoutes().filter((item) => !!item.children && item.children.length > 0))

const columns = [
    {
        title: () => t('routerGen.table-title'),
        key: 'title',
        render(row: any) {
            return h(NEl, { tag: 'span' }, () => t(row.meta.title))
        }
    },
    {
        title: () => t('routerGen.table-path'),
        key: 'path',
        render(row: any) {
            return h(NEl, { tag: 'span' }, () => row.path)
        }
    }
]

const handleAddRoute = () => {
    router.push({ path: '/system-tools/router-gen/details' })
}
</script>

<style scoped></style>