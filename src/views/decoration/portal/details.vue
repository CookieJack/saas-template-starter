<template>
  <n-card :title="$t('decoration.decoration-portal-details')">
    <span>{{ $route.params.id }}</span>
    <n-button @click="handleBack">{{ $t('common.close') }}</n-button>
  </n-card>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"

const router = useRouter()

const handleBack = () => {
  router.back()
}
</script>

<style scoped></style>