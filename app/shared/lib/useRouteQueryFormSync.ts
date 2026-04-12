import { watch } from 'vue'
import type { LocationQuery } from 'vue-router'

export function useRouteQueryFormSync(sync: (query: LocationQuery) => void) {
  const route = useRoute()

  watch(
    () => route.query,
    () => {
      sync(route.query)
    },
    { immediate: true, deep: true }
  )

  return { route }
}
