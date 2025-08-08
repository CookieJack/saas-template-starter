import type { App } from "vue"

const directives = import.meta.glob('./modules/*.ts')

export default {
    install(app: App) {
        Object.keys(directives).forEach(key => {
            const directive = directives[key]
            const regex = /\.\/modules\/([^/]+)\.ts/
            const match = directive.name.match(regex)
            if (match) app.directive(match[1], directive)
        })
    }
}