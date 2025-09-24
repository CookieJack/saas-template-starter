<template>
    <div class="space-y-4">
        <n-input v-model:value="inputValue" clearable />
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue"

const inputValue = ref<string | null>(null)
</script>
<style scoped></style>