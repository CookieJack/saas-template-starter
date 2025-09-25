<template>
  <h1>{{ $t('decoration.decoration-portal-details') }}</h1>
  <span>{{ $route.params.id }}</span>
  <n-button @click="handleBack">{{ $t('common.close') }}</n-button>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"

const router = useRouter()

const handleBack = () => {
  router.back()
}
</script>

<style scoped></style>