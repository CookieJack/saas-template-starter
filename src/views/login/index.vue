<template>
    <n-button @click="handleLogin">{{ $t('common.login') }}</n-button>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from "vue-router"
import Cookies from "js-cookie"

const router = useRouter()
const route = useRoute()

const handleLogin = () => {
    Cookies.set("token", "123456", { expires: 7 })
    router.push({ path: route.query.redirect as string || "/", replace: true })
}
</script>

<style scoped></style>