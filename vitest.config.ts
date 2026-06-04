import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    setupFiles: ['vitest-setup.ts'],
    exclude: [
      'tests/e2e/**',
      '**/*.e2e.spec.ts',
      '**/*.visual.spec.ts',
      'playwright.config.ts'
    ],
    include: ['app/**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      reportsDirectory: './coverage',
      reporter: ['text', 'text-summary', 'html', 'lcov'],
      include: ['app/**/*.{ts,vue}'],
      exclude: ['app/**/*.spec.ts', 'app/shared/api/generated/**', '**/*.d.ts']
    }
  }
})
