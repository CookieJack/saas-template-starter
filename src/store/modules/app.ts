import { defineStore } from "pinia"

const useAppStore = defineStore('app', {
    state: () => ({
        name: 'SaaS Template',
        company: '新腾科技',
        version: 'v1.0.0'
    }),
    getters: {

    },
    actions: {

    },
    persist: true
})

export default useAppStore