import { defineVitestProject } from '@nuxt/test-utils/config'

export default defineVitestProject({
  test: {
    environment: 'nuxt',
    setupFiles: ['vitest-setup.ts'],
    exclude: [
      'tests/e2e/**',
      '**/*.e2e.spec.ts',
      '**/*.visual.spec.ts',
      'playwright.config.ts'
    ],
    include: ['app/**/*.spec.ts']
  }
})
