<template>
    <n-space vertical>
        <n-card :title="$t('decoration.decoration-portal')" hoverable>
            <n-button @click="handleDetails">{{ $t('common.view') }}</n-button>
        </n-card>
        <n-card title="Advantage Gallery" hoverable>
            <AdvantageGallery v-model="advantageGalleryData" />
        </n-card>
    </n-space>
</template>

<script setup lang="ts">
import { ref } from "vue"
import AdvantageGallery from "./components/lib/AdvantageGallery.vue"
import DefaultBackUp from "@/assets/data/advantage_gallery.json"
import { useRouter } from "vue-router"

const router = useRouter()

const paramsId = ref(61)
const advantageGalleryData = ref(JSON.parse(JSON.stringify(DefaultBackUp)))

const handleDetails = () => {
    router.push({ name: 'DecorationPortalDetails', params: { id: paramsId.value } })
}
</script>

<style scoped></style>