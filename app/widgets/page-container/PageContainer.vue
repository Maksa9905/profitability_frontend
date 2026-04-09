<script setup lang="ts">
</script>

<template>
  <div class="page-container">
    <slot />
  </div>
</template>

<style scoped>
.page-container {
  max-width: var(--ui-container);
  padding-inline: calc(var(--spacing) * 8);
  padding-block: calc(var(--spacing) * 4);
  margin: 0 auto;
}
</style>