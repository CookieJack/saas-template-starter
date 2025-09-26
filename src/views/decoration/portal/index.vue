<template>
    <n-card :title="$t('decoration.decoration-portal')">
        <n-button @click="handleDetails">{{ $t('common.view') }}</n-button>
    </n-card>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

const paramsId = ref(61)

const handleDetails = () => {
    router.push({ name: 'DecorationPortalDetails', params: { id: paramsId.value } })
}
</script>

<style scoped></style>