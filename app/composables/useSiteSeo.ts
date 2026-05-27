const OG_IMAGE_WIDTH = 1536
const OG_IMAGE_HEIGHT = 1024

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

  const ogImageLight = computed(() => `${siteUrl.value}/og/light-preview.png`)
  const ogImageDark = computed(() => `${siteUrl.value}/og/dark-preview.png`)

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
    ogImage: () => [
      {
        url: ogImageLight.value,
        width: OG_IMAGE_WIDTH,
        height: OG_IMAGE_HEIGHT,
        type: 'image/png',
        alt: description.value
      },
      {
        url: ogImageDark.value,
        width: OG_IMAGE_WIDTH,
        height: OG_IMAGE_HEIGHT,
        type: 'image/png',
        alt: description.value
      }
    ],
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: ogImageLight,
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
