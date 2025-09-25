<template>
  <n-button @click="handleBack">关闭</n-button>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"

const router = useRouter()

const handleBack = () => {
  router.back()
}
</script>

<style scoped></style>