<script setup>
import Logotype from './shared/ui/Logotype'
import Navigation from './widgets/navigation'
import PageContainer from './widgets/page-container'

const title = 'Nuxt Starter Template'
const description =
  'A production-ready starter template powered by Nuxt UI. Build beautiful, accessible, and performant applications in minutes, not hours.'

useSeoMeta({
  title,
  description
})
</script>

<template>
  <UApp>
    <UHeader>
      <template #left>
        <Logotype />
      </template>

      <template #default>
        <Navigation />
      </template>

      <template #right>
        <UButton
          color="neutral"
          icon="i-lucide-user"
          variant="ghost"
          size="md"
        >
          {{ $t("header.signIn") }}
        </UButton>
      </template>
    </UHeader>

    <UMain>
      <PageContainer>
        <NuxtPage />
      </PageContainer>
    </UMain>
  </UApp>
</template>
