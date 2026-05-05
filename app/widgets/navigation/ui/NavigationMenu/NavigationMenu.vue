<script lang="ts" setup>
import type { EPrimaryColor } from '~/features/dynamical-primary-color'
import { PrimaryColorProvider } from '~/features/dynamical-primary-color'
import { useNavigationItems } from '../model/useNavigationItems'

const route = useRoute()
const items = useNavigationItems()

const { orientation = 'horizontal' } = defineProps<{
  orientation?: 'horizontal' | 'vertical'
}>()

const color = computed(() => {
  return route.path.split('/')[2] as EPrimaryColor
})
</script>

<template>
  <PrimaryColorProvider class="navigation" :color="color">
    <UNavigationMenu
      :orientation
      highlight
      :ui="{ link: 'after:bottom-[-16px]' }"
      :items="items"
    />
  </PrimaryColorProvider>
</template>

<style scoped>
.navigation {
  flex: 1;
}
</style>
