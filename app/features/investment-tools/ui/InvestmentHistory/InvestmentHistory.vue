<script setup lang="ts">
import type { InvestmentHistoryItem } from '../../model/history'

import { formatHistoryDate } from '../../lib/historyFormatters'

const props = withDefaults(
  defineProps<{
    title: string
    items: InvestmentHistoryItem[]
    isLoading: boolean
    locale: string
    emptyText?: string
  }>(),
  {
    emptyText: ''
  }
)

const emit = defineEmits<{
  select: [query: Record<string, string>]
}>()

const handleSelect = (query: Record<string, string>) => {
  emit('select', query)
}
</script>

<template>
  <section class="history">
    <h2 class="history-title">{{ title }}</h2>

    <div v-if="isLoading" class="history-skeleton">
      <USkeleton class="h-24 w-full" />
      <USkeleton class="h-24 w-full" />
      <USkeleton class="h-24 w-full" />
    </div>

    <div v-else-if="items.length" class="history-list">
      <button
        v-for="item in items"
        :key="item.id"
        class="history-item"
        @click="handleSelect(item.query)"
      >
        <div class="history-item__details">
          <p v-for="detail in item.details" :key="detail.label">
            {{ detail.label }}: {{ detail.value }}
          </p>
        </div>
        <p class="history-item__date">
          {{ formatHistoryDate(item.createdAt, props.locale) }}
        </p>
      </button>
    </div>

    <p v-else class="history-empty">
      {{ emptyText }}
    </p>
  </section>
</template>

<style scoped>
.history {
  margin-top: calc(var(--spacing) * 6);
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 3);
  background-color: var(--ui-bg);
  padding: calc(var(--spacing) * 4);
  border-radius: 0.5rem;
  box-shadow: var(--shadow-sm);
}

.history-title {
  font-size: 1rem;
  font-weight: 700;
}

.history-skeleton,
.history-list {
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 2);
}

.history-item {
  width: 100%;
  text-align: left;
  border: 1px solid var(--ui-border);
  border-radius: 0.5rem;
  padding: calc(var(--spacing) * 3);
  display: flex;
  flex-direction: row;
  gap: calc(var(--spacing) * 2);
  transition: background-color 0.2s;
}

.history-item:hover {
  background-color: var(--ui-bg-elevated);
}

.history-item__date {
  color: var(--ui-text-muted);
  font-size: 0.875rem;
  text-align: right;
}

.history-item__details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: calc(var(--spacing) * 1.5) calc(var(--spacing) * 3);
  font-size: 0.875rem;
  flex: 1;
}

@media (max-width: 768px) {
  .history-item__details {
    grid-template-columns: 1fr;
  }
}

.history-empty {
  color: var(--ui-text-muted);
}
</style>
