<script setup lang="ts">
import Logotype from './shared/ui/Logotype'
import Navigation from './widgets/navigation'
import PageContainer from './widgets/page-container'
import {
  APP_LOCALE_STORAGE_KEY,
  APP_THEME_STORAGE_KEY,
  useAuth
} from './features/auth'

type AppTheme = 'light' | 'dark'

const route = useRoute()
const { locale, setLocale } = useI18n()
const { isAuthenticated, init, logout } = useAuth()
const themeCookie = useCookie<AppTheme>(APP_THEME_STORAGE_KEY, {
  sameSite: 'lax'
})
const localeCookie = useCookie<'ru' | 'en' | null>(APP_LOCALE_STORAGE_KEY, {
  sameSite: 'lax'
})
const resolvedTheme = computed<AppTheme>(() =>
  themeCookie.value === 'dark' ? 'dark' : 'light'
)

const isMenuOpen = ref(false)
const isDarkMode = ref(false)
const selectedLocale = ref<'ru' | 'en'>('ru')
const isClientReady = ref(false)

const localeOptions = [
  { label: 'Русский', value: 'ru' },
  { label: 'English', value: 'en' }
]

const navigateToAuth = async () => {
  isMenuOpen.value = false
  await navigateTo({
    path: '/auth',
    query: {
      redirect: route.fullPath
    }
  })
}

const handleProfileClick = async () => {
  if (!isAuthenticated.value) {
    await navigateToAuth()
    return
  }
  isMenuOpen.value = !isMenuOpen.value
}

const handleLogout = () => {
  logout()
  isMenuOpen.value = false
}

watch(
  () => route.fullPath,
  () => {
    isMenuOpen.value = false
  }
)

watch(isDarkMode, (value) => {
  if (!isClientReady.value) {
    return
  }
  const nextTheme: AppTheme = value ? 'dark' : 'light'
  themeCookie.value = nextTheme
})

watch(selectedLocale, async (nextLocale) => {
  if (!isClientReady.value) {
    return
  }

  await setLocale(nextLocale)
  localeCookie.value = nextLocale
})

onMounted(async () => {
  init()
  isDarkMode.value = resolvedTheme.value === 'dark'

  const savedLocale = localeCookie.value
  const initialLocale =
    savedLocale === 'ru' || savedLocale === 'en'
      ? savedLocale
      : locale.value === 'en'
        ? 'en'
        : 'ru'

  selectedLocale.value = initialLocale
  if (locale.value !== initialLocale) {
    await setLocale(initialLocale)
  }
  localeCookie.value = initialLocale

  isClientReady.value = true
})

useHead(() => ({
  htmlAttrs: {
    class: resolvedTheme.value
  }
}))

useSiteSeo()
</script>

<template>
  <UApp>
    <UHeader>
      <template #left>
        <NuxtLink to="/">
          <Logotype />
        </NuxtLink>
      </template>

      <template #default>
        <Navigation />
      </template>

      <template #body>
        <Navigation orientation="vertical" />
      </template>

      <template #right>
        <div class="profile-menu">
          <UButton
            color="neutral"
            icon="i-lucide-user"
            variant="ghost"
            size="md"
            @click="handleProfileClick"
          >
            {{ isAuthenticated ? $t('header.profile') : $t('header.signIn') }}
          </UButton>

          <div
            v-if="isAuthenticated && isMenuOpen"
            class="profile-menu__dropdown"
          >
            <div class="profile-menu__row">
              <span>{{ $t('header.menu.theme') }}</span>
              <USwitch v-model="isDarkMode" />
            </div>

            <UFormField :label="$t('header.menu.language')">
              <USelect
                v-model="selectedLocale"
                :items="localeOptions"
                value-key="value"
                class="w-full"
              />
            </UFormField>

            <UButton
              color="neutral"
              variant="outline"
              block
              icon="i-lucide-log-out"
              @click="handleLogout"
            >
              {{ $t('header.menu.logout') }}
            </UButton>
          </div>
        </div>
      </template>
    </UHeader>

    <UMain>
      <PageContainer>
        <NuxtPage />
      </PageContainer>
    </UMain>
  </UApp>
</template>

<style scoped>
.profile-menu {
  position: relative;
}

.profile-menu__dropdown {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  width: 16rem;
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 3);
  padding: calc(var(--spacing) * 3);
  border-radius: 0.75rem;
  box-shadow: var(--shadow-md);
  background-color: var(--ui-bg);
}

.profile-menu__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
