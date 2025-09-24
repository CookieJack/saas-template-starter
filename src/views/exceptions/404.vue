<template>
    <div class="w-screen h-screen flex items-center justify-center">
        <n-result status="404" :title="$t('common.not-found')">
            <template #footer>
                <n-button @click="handleBackHome">{{ $t('common.back-home') }}</n-button>
            </template>
        </n-result>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"

const router = useRouter()

const handleBackHome = () => {
    router.push({
        path: '/',
        replace: true
    })
}
</script>

<style scoped></style>