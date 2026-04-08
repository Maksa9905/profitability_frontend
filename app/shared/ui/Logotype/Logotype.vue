<script lang="ts" setup>
</script>

<template>
  <NuxtLink to='/stocks' class="container">
    <div class="w-[32px] h-[32px] self-center flex items-center justify-center p-1 bg-(--ui-text) rounded-md col-1 row-start-1 row-end-3">
      <UIcon size='24px' name="i-lucide-chart-bar" class="text-inverted" />
    </div>
    <h1 class="text-lg font-bold text-default col-2 row-1 leading-none self-center">профитабилити.ру</h1>
    <p class="text-xs text-default col-2 row-2 leading-none self-center">Ваш финансовый аналитик</p>
  </NuxtLink>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: auto 1fr;
  column-gap: 0.5rem;
  cursor: pointer;
  width: fit-content;
}
</style>