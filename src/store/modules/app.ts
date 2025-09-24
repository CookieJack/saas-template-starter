import { defineStore } from "pinia"

const useAppStore = defineStore('app', {
    state: () => ({
        name: 'SaaS Template',
        company: 'XX科技',
        version: 'v1.0.0'
    }),
    getters: {

    },
    actions: {

    },
    persist: true
})

export default useAppStore