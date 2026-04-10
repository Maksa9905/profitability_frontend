<script lang="ts" setup>
defineProps<{
  active: boolean
  title: string
  value: string
  description?: string
}>()
</script>

<template>
  <div class="calculation-results-item" :data-active="active">
    <h2 class="calculation-results-item-title">{{ title }}</h2>
    <div class="flex flex-row flex-wrap items-end gap-1 justify-between">
      <p class="calculation-results-item-value">{{ value }}</p>
      <p v-if="description" class="calculation-results-item-description">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.calculation-results-item {
  background-color: var(--ui-bg);
  border-radius: 0.5rem;
  padding: calc(var(--spacing) * 4);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: calc(var(--spacing) * 2);
  box-shadow: var(--shadow-sm);
}

.calculation-results-item[data-active='true'] {
  background-color: var(--ui-primary);

  .calculation-results-item-title, 
  .calculation-results-item-description,
  .calculation-results-item-value {
    color: white;
  }

}

.calculation-results-item-title {
  font-size: 1rem;
  font-weight: 400;
  line-height: 1;
  color: var(--ui-text);
  opacity: 0.8;
}

.calculation-results-item-value {
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1;
  color: var(--ui-text);
}

.calculation-results-item-description {
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1;
  color: var(--ui-text);
  opacity: 0.8;
  white-space: nowrap;
}
</style>
