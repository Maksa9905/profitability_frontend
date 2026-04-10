<script lang="ts" setup>
defineSlots<{
  form: () => VNode
  visualization: () => VNode
}>()

defineProps<{
  title: string
  description: string
  calculateFormId?: string
}>()
</script>

<template>
  <section class="investment-tool-container">
    <div class="title-container">
      <h1 class="title">{{ title }}</h1>
      <p class="description">{{ description }}</p>
    </div>

    <div class="investment-tool">
      <div class="investment_tool__form">
        <slot name="form" />
        <UButton
          block
          :type="calculateFormId ? 'submit' : 'button'"
          :form="calculateFormId"
        >
          {{ $t('investmentTools.calculate') }}
        </UButton>
        <UButton block variant="outline">{{
          $t('investmentTools.save')
        }}</UButton>
      </div>
      <div class="investment_tool__visualization">
        <slot name="visualization" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.investment-tool-container {
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 8);
  margin-top: calc(var(--spacing) * 4);
}

.title-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-inline: 1rem;
  border-left: 4px solid var(--ui-primary);
}

.title {
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1;
  color: var(--ui-text);
}

.description {
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1;
  color: var(--ui-text-muted);
}

.investment-tool {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1fr;
  column-gap: calc(var(--spacing) * 4);
}

.investment_tool__form {
  grid-column: 1;
  grid-row: 1;
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 4);
  background-color: var(--ui-bg);
  padding: calc(var(--spacing) * 4);
  border-radius: 0.5rem;
  height: fit-content;
  box-shadow: var(--shadow-sm);
}

.investment_tool__visualization {
  grid-column: 2;
  grid-row: 1;
}

@media (max-width: 1024px) {
  .investment-tool {
    grid-template-columns: 1fr;
    row-gap: calc(var(--spacing) * 4);
  }

  .investment_tool__form {
    grid-column: 1;
    grid-row: 1;
  }

  .investment_tool__visualization {
    grid-column: 1;
    grid-row: 2;
  }
}
</style>
