import { createI18n } from "vue-i18n"
import languagePacks from "./language-packs"

const i18n = createI18n({
    legacy: false,
    locale: JSON.parse(window.localStorage.getItem('settings') || '{}')?.locale || 'zh',
    fallbackLocale: 'zh',
    globalInjection: true,
    messages: {
        ...languagePacks
    }
})

export default i18n