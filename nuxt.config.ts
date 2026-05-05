// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/test-utils/module',
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    'nuxt-echarts'
  ],
  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],
  ui: {
    colorMode: false
  },
  runtimeConfig: {
    public: {
      /**
       * Базовый URL API (без завершающего `/`).
       * Прод: реальный бэкенд. До готовности — мок (Beeceptor и т.п.).
       * Задаётся через `NUXT_PUBLIC_API_BASE_URL`.
       */
      apiBaseUrl: 'https://profitability.free.beeceptor.com',
      /**
       * UUID для заголовка `X-Auth-User-Id` (investment-controller в OpenAPI).
       * `NUXT_PUBLIC_DEV_AUTH_USER_ID`; в проде заменить на сессию/токен.
       */
      devAuthUserId: '00000000-0000-4000-8000-000000000001'
    }
  },

  compatibilityDate: '2025-01-15',

  echarts: {
    charts: ['LineChart'],
    components: ['GridComponent', 'TooltipComponent']
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  i18n: {
    defaultLocale: 'ru',
    strategy: 'no_prefix',
    langDir: 'locales',
    locales: [
      { code: 'ru', language: 'ru-RU', name: 'Русский', file: 'ru.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' }
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_locale',
      redirectOn: 'all'
    }
  },
})
