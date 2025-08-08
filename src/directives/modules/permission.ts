import type { Directive, DirectiveBinding } from 'vue'
import useUserStore from '@/store/modules/user'

export const permission: Directive = {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
        const { value } = binding
        const userStore = useUserStore()

        if (value && Array.isArray(value)) {
            const hasPermission = value.some(permission =>
                userStore.permissions?.includes(permission)
            )

            if (!hasPermission) {
                el.parentNode?.removeChild(el)
            }
        } else {
            throw new Error("v-permission value must be an array of permission strings")
        }
    }
}

export default permission