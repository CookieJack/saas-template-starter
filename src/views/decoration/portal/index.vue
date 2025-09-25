<template>
    <div class="p-4">
        <h1 class="text-2xl font-bold mb-4">{{ $t('decoration.decoration-portal') }}</h1>
        <n-button @click="handleDetails">{{ $t('common.view') }}</n-button>
    </div>
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