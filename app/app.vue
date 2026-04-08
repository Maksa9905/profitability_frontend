<script setup>
import Logotype from './shared/ui/Logotype';

const title = 'Nuxt Starter Template'
const description = 'A production-ready starter template powered by Nuxt UI. Build beautiful, accessible, and performant applications in minutes, not hours.'

useSeoMeta({
  title,
  description,
})
</script>

<template>
  <UApp>
    <UHeader>
      <template #left>
        <Logotype />
      </template>

      <template #right>
        <UButton color="neutral" icon="i-lucide-user" variant="ghost" size="sm">
          Войти
        </UButton>
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>

  </UApp>
</template>
