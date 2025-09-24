<template>
    <div class="header-container">
        <div class="container-left">
            <n-image preview-disabled :src="LogoImage" :width="30" :height="30" />
            <span class="text-lg">{{ appStore.name }}</span>
        </div>
        <div class="flex-grow"></div>
        <n-popselect v-model:value="settingsStore.locale" :options="localeOptions" trigger="hover"
            @update:value="handleUpdateLocale">
            <n-button>{{ $t(`common.${settingsStore.locale}`) }}</n-button>
        </n-popselect>
        <div class="container-right">
            <n-dropdown trigger="hover" :show-arrow="true" :options="avatarOptions" @select="handleAvatarOptionSelect">
                <n-avatar :src="LogoImage" :size="30" round />
            </n-dropdown>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import { useMessage, useDialog } from "naive-ui"
import { PersonCircleOutline as PersonCircleOutlineIcon, LogOutOutline as LogOutOutlineIcon } from "@vicons/ionicons5"
import { useNaiveUIRender } from "@/hooks/useRender"
import useAppStore from "$/modules/app"
import useUserStore from "$/modules/user"
import useSettingsStore from "$/modules/settings"
import LogoImage from "@/assets/images/evo-v.jpeg"

const { t, locale } = useI18n()
const router = useRouter()
const appStore = useAppStore()
const userStore = useUserStore()
const settingsStore = useSettingsStore()
const message = useMessage()
const dialog = useDialog()
const { renderIcon } = useNaiveUIRender()

const avatarOptions = [
    {
        label: t('common.profile'),
        key: 'profile',
        icon: () => renderIcon(PersonCircleOutlineIcon)
    },
    {
        label: t('common.logout'),
        key: 'logout',
        icon: () => renderIcon(LogOutOutlineIcon)
    }
]

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

const handleAvatarOptionSelect = (key: string | number) => {
    switch (key) {
        case 'profile':
            message.info('个人中心')
            break
        case 'logout':
            const d = dialog.warning({
                title: t('common.logout'),
                content: t('common.logout-comment'),
                positiveText: t('common.confirm'),
                negativeText: t('common.cancel'),
                onPositiveClick: async () => {
                    await userStore.logOut()
                    router.replace({ path: '/login', query: { redirect: '/dashboard/workbench' } })
                    d.destroy()
                }
            })
            break
        default:
            break
    }
}
</script>

<style scoped>
.header-container {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    gap: 20px;

    .container-left {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        gap: 5px;
    }

    .container-right {
        display: flex;
        flex-flow: row-reverse nowrap;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
    }
}
</style>