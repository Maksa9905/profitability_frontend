<script lang="ts" setup></script>

<template>
  <NuxtLink to="/stocks" class="logotype">
    <div class="logotype__mark">
      <UIcon size="24px" name="i-lucide-chart-bar" class="logotype__icon" />
    </div>
    <h1 class="logotype__title">{{ $t('logotype.title') }}</h1>
    <p class="logotype__tagline">{{ $t('logotype.tagline') }}</p>
  </NuxtLink>
</template>

<style scoped>
.logotype {
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: auto 1fr;
  column-gap: 0.5rem;
  cursor: pointer;
  width: fit-content;
  text-decoration: none;
  color: inherit;
}

.logotype__mark {
  width: 32px;
  height: 32px;
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  background-color: var(--ui-text);
  border-radius: 0.375rem;
  grid-column: 1;
  grid-row: 1 / 3;
}

.logotype__icon {
  color: var(--ui-bg);
}

.logotype__title {
  margin: 0;
  align-self: center;
  grid-column: 2;
  grid-row: 1;
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1;
  color: var(--ui-text);
}

.logotype__tagline {
  margin: 0;
  align-self: center;
  grid-column: 2;
  grid-row: 2;
  font-size: 0.75rem;
  line-height: 1;
  color: var(--ui-text);
}
</style>
