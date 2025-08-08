import { defineStore } from "pinia"
import Cookies from "js-cookie"

interface User {
    id: number | null
    nickname: string | null
    phone: string | null
    email: string | null
    avatar: string | null
    permissions: string[] | null
}

const useUserStore = defineStore('user', {
    state: () => ({
        id: null,
        nickname: null,
        phone: null,
        email: null,
        avatar: null,
        permissions: null
    } as User),
    getters: {

    },
    actions: {
        logOut() {
            return new Promise((resolve, reject) => {
                try {
                    this.id = null
                    this.nickname = null
                    this.phone = null
                    this.email = null
                    this.avatar = null
                    Cookies.remove('token')
                    resolve(true)
                } catch (error) {
                    reject(error)
                }
            })
        }
    },
    persist: true
})

export default useUserStore
