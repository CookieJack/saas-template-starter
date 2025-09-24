import { defineStore } from "pinia"
import type { RouteLocationNormalized } from "vue-router"

export interface CachedView {
    path: string
    name: string
    title: string
    isAffix?: boolean
    query?: any
    params?: any
}

const useCachedViewsStore = defineStore('cachedViews', {
    state: () => ({
        cachedViews: [] as CachedView[],
        activeViewPath: '' as string
    }),
    getters: {
        getCachedViews: (state) => state.cachedViews,
        getActiveViewPath: (state) => state.activeViewPath,
        getAffixViews: (state) => state.cachedViews.filter(view => view.isAffix)
    },
    actions: {
        addCachedView(view: RouteLocationNormalized) {
            const { path, name, meta, query, params } = view
            const title = meta?.title || '未命名'
            const isAffix = meta?.isAffix || false

            // 检查是否已经存在
            const existingView = this.cachedViews.find(v => v.path === path)
            if (!existingView) {
                this.cachedViews.push({
                    path,
                    name: name as string,
                    title,
                    isAffix,
                    query,
                    params
                })
            }
        },

        removeCachedView(path: string) {
            const index = this.cachedViews.findIndex(view => view.path === path)
            if (index > -1) {
                const view = this.cachedViews[index]
                // 不允许删除固定标签
                if (!view.isAffix) {
                    this.cachedViews.splice(index, 1)
                }
            }
        },

        removeLeftViews(path: string) {
            const currentIndex = this.cachedViews.findIndex(view => view.path === path)
            if (currentIndex > -1) {
                // 保留当前和右侧的标签，以及所有固定标签
                const viewsToKeep = this.cachedViews.filter((view, index) => {
                    return index >= currentIndex || view.isAffix
                })
                this.cachedViews = viewsToKeep
            }
        },

        removeRightViews(path: string) {
            const currentIndex = this.cachedViews.findIndex(view => view.path === path)
            if (currentIndex > -1) {
                // 保留当前和左侧的标签，以及所有固定标签
                const viewsToKeep = this.cachedViews.filter((view, index) => {
                    return index <= currentIndex || view.isAffix
                })
                this.cachedViews = viewsToKeep
            }
        },

        removeOtherViews(path: string) {
            // 只保留当前标签和固定标签
            const currentAndAffixViews = this.cachedViews.filter(view => view.path === path || view.isAffix)
            
            // 如果除了当前标签和固定标签外没有其他标签，就不做任何操作
            if (currentAndAffixViews.length === this.cachedViews.length) {
                return
            }

            this.cachedViews = currentAndAffixViews
        },

        removeAllViews() {
            // 只保留固定标签
            this.cachedViews = this.cachedViews.filter(view => view.isAffix)
        },

        setActiveView(path: string) {
            this.activeViewPath = path
        },

        clearAllViews() {
            this.cachedViews = []
            this.activeViewPath = ''
        }
    },
    persist: true
})

export default useCachedViewsStore