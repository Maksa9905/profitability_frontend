<script setup lang="ts"></script>

<template>
  <div class="page-container-wrapper">
    <div class="page-container">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.page-container-wrapper {
  background-color: var(--ui-bg-muted);
  min-height: calc(100dvh - var(--ui-header-height));
  width: 100vw;
}
.page-container {
  max-width: var(--ui-container);
  padding-inline: calc(var(--spacing) * 8);
  padding-block: calc(var(--spacing) * 4);
  margin: 0 auto;
  height: 100%;
}
</style>
