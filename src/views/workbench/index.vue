<template>
    <div class="space-y-4">
        <n-button @click="handleLogout">{{ $t('common.logout') }}</n-button>
        <n-button @click="handleGoToDecoration" type="primary">跳转到装修页面</n-button>
        <n-input v-model:value="inputValue" clearable />
        <n-popselect v-model:value="settingsStore.locale" :options="localeOptions" trigger="hover"
            @update:value="handleUpdateLocale">
            <n-button>{{ $t(`common.${settingsStore.locale}`) }}</n-button>
        </n-popselect>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import useSettingsStore from "$/modules/settings"
import useUserStore from "$/modules/user"
import Cookies from "js-cookie"

const router = useRouter()
const { t, locale } = useI18n()
const settingsStore = useSettingsStore()
const userStore = useUserStore()

const inputValue = ref<string | null>(null)

const localeOptions = [
    {
        label: t('common.zh'),
        value: 'zh'
    },
    {
        label: t('common.en'),
        value: 'en'
    }
]

const handleUpdateLocale = (value: string) => {
    settingsStore.locale = value
    locale.value = settingsStore.locale
    window.location.reload()
}

const handleGoToDecoration = () => {
    router.push({ path: '/decoration/portal' })
}

const handleLogout = async () => {
    await userStore.logOut()
    router.push({ path: "/login", query: { redirect: '/dashboard/workbench' }, replace: true })
}
</script>
<style scoped></style>