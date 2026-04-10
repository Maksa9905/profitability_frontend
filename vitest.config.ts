import { defineVitestProject } from '@nuxt/test-utils/config'

export default defineVitestProject({
  test: {
    environment: 'nuxt',
    environmentOptions: {
      nuxt: {
        overrides: {
          i18n: {
            lazy: false
          }
        }
      }
    }
  }
})
