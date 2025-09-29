import { defineComponent } from "vue"
import { useRoute, useRouter } from "vue-router"

export default defineComponent({
  name: 'Redirect',
  setup(props, { emit }) {
    const route = useRoute()
    const router = useRouter()
    const redirectFullPath = route.query.redirect as string
    const redirectPath = redirectFullPath.split('&')[0]
    const redirectQuery = JSON.parse(redirectFullPath.split('&')[1])
    router.replace({ path: redirectPath, query: redirectQuery })
  }
})
