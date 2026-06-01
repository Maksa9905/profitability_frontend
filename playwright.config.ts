import { defineConfig } from '@playwright/test'

const nodeProcess = (
  globalThis as {
    process?: {
      loadEnvFile?: (path?: string) => void
    }
  }
).process

if (nodeProcess?.loadEnvFile) {
  nodeProcess.loadEnvFile()
}

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 60_000,
  fullyParallel: false,
  workers: 1,
  reporter: 'list',
  expect: {
    timeout: 10_000,
    toHaveScreenshot: {
      animations: 'disabled',
      maxDiffPixelRatio: 0.01
    }
  },
  use: {
    baseURL: 'https://profit.hakolr.dev',
    viewport: { width: 1440, height: 900 },
    colorScheme: 'light',
    locale: 'ru-RU',
    timezoneId: 'Europe/Moscow',
    trace: 'on-first-retry'
  }
})
