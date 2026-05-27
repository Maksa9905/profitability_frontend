const OG_IMAGE_WIDTH = 1200
const OG_IMAGE_HEIGHT = 630

export function useSiteSeo() {
  const { t, locale } = useI18n()
  const route = useRoute()
  const config = useRuntimeConfig()

  const siteUrl = computed(() => config.public.siteUrl.replace(/\/$/, ''))

  const title = computed(() => t('logotype.title'))
  const description = computed(() => t('logotype.tagline'))

  const canonicalUrl = computed(() => {
    const path = route.path === '/' ? '' : route.path
    return `${siteUrl.value}${path}`
  })

  const ogImage = computed(() => `${siteUrl.value}/og/preview.jpg`)

  const ogLocale = computed(() => (locale.value === 'ru' ? 'ru_RU' : 'en_US'))

  useSeoMeta({
    title,
    description,
    applicationName: title,
    ogTitle: title,
    ogDescription: description,
    ogType: 'website',
    ogSiteName: title,
    ogUrl: canonicalUrl,
    ogLocale,
    ogImage,
    ogImageSecureUrl: ogImage,
    ogImageWidth: OG_IMAGE_WIDTH,
    ogImageHeight: OG_IMAGE_HEIGHT,
    ogImageType: 'image/jpeg',
    ogImageAlt: description,
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: ogImage,
    robots: 'index, follow, max-image-preview:large'
  })

  useHead(() => ({
    htmlAttrs: {
      lang: locale.value === 'ru' ? 'ru' : 'en'
    },
    link: [{ rel: 'canonical', href: canonicalUrl.value }],
    meta: [
      {
        name: 'theme-color',
        content: '#4f39f6',
        media: '(prefers-color-scheme: light)'
      },
      {
        name: 'theme-color',
        content: '#050097',
        media: '(prefers-color-scheme: dark)'
      }
    ]
  }))
}
