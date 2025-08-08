import { defineStore } from "pinia"
import { zhCN, enUS, dateZhCN, dateEnUS } from "naive-ui"

const useSettingsStore = defineStore('settings', {
    state: () => ({
        locale: 'zh'
    }),
    getters: {
        getNaiveUILocale(state) {
            switch (state.locale) {
                case 'zh':
                    return zhCN
                case 'en':
                    return enUS
                default:
                    return zhCN
            }
        },
        getNaiveUIDateLocale(state) {
            switch (state.locale) {
                case 'zh':
                    return dateZhCN
                case 'en':
                    return dateEnUS
                default:
                    return dateZhCN
            }
        }
    },
    actions: {
    },
    persist: true
})

export default useSettingsStore