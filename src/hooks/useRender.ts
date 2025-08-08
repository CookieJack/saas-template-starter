import { h } from "vue"
import type { Component } from 'vue'
import { NIcon } from "naive-ui"

export const useNaiveUIRender = () => {
    const renderIcon = (icon: Component) => {
        return h(NIcon, null, { default: () => h(icon) })
    }

    return {
        renderIcon
    }
}

export const useCustomRender = () => {
    return {

    }
}