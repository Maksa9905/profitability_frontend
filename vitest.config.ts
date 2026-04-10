import { defineVitestProject } from '@nuxt/test-utils/config'

export default defineVitestProject({
  test: {
    environment: 'nuxt',
    setupFiles: ['vitest-setup.ts']
  }
})
