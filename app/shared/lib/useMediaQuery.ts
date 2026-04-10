import { ref, watchEffect } from 'vue'

export function useMediaQuery(query: string) {
  const matches = ref(false)

  watchEffect((onInvalidate) => {
    if (typeof window === 'undefined') {
      return
    }

    const media = window.matchMedia(query)
    matches.value = media.matches

    const onChange = () => {
      matches.value = media.matches
    }
    media.addEventListener('change', onChange)

    onInvalidate(() => {
      media.removeEventListener('change', onChange)
    })
  })

  return matches
}
