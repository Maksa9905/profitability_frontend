// https://nuxt.com/docs/api/configuration/nuxt-config
const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'https://profit.hakolr.dev'

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
  app: {
    head: {
      htmlAttrs: {
        prefix: 'og: https://ogp.me/ns#'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'referrer', content: 'strict-origin-when-cross-origin' },
        { name: 'format-detection', content: 'telephone=no' },
        { property: 'og:title', content: 'профитабилити.ру' },
        { property: 'og:description', content: 'Ваш финансовый аналитик' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'профитабилити.ру' },
        {
          property: 'og:image',
          content: `${siteUrl}/og/preview.jpg`
        },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:type', content: 'image/jpeg' },
        { name: 'twitter:card', content: 'summary_large_image' },
        {
          name: 'twitter:image',
          content: `${siteUrl}/og/preview.jpg`
        }
      ]
    }
  },

  css: ['~/assets/css/main.css'],
  ui: {
    colorMode: false
  },

  runtimeConfig: {
    public: {
      /**
       * Публичный URL сайта (без завершающего `/`) для canonical и Open Graph.
       * `NUXT_PUBLIC_SITE_URL`.
       */
      siteUrl: 'https://profit.hakolr.dev',
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
  }
})
