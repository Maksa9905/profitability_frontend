<script setup lang="ts">
import { stocksIcon } from '../../lib/constants'
import type { IStocksForm } from '../../model/types'
import { useStocksFrequencyOptions } from '../../model/useStocksFrequencyOptions'

const form = ref<IStocksForm>({
  purchasePrice: undefined,
  targetPrice: undefined,
  holdingMonths: undefined,
  dividendRate: undefined,
  frequency: undefined,
  commission: undefined,
  taxRate: undefined,
  withCommission: false
})

const frequencyOptions = useStocksFrequencyOptions()
</script>

<template>
  <section class="stocks-form">
    <header class="form-header">
      <UIcon :name="stocksIcon" class="form-icon" />
      <h2 class="form-title">{{ $t('toolItem.stocks.form.title') }}</h2>
    </header>

    <form class="form-content">
      <UFormField :label="$t('toolItem.stocks.form.purchasePrice.label')">
        <UInput
          v-model="form.purchasePrice"
          :placeholder="$t('toolItem.stocks.form.purchasePrice.placeholder')"
          type="number"
          trailing-icon="i-lucide-russian-ruble"
          class="form-input"
        />
      </UFormField>

      <UFormField :label="$t('toolItem.stocks.form.targetPrice.label')">
        <UInput
          v-model="form.targetPrice"
          :placeholder="$t('toolItem.stocks.form.targetPrice.placeholder')"
          trailing-icon="i-lucide-russian-ruble"
          type="number"
          class="form-input"
        />
      </UFormField>

      <UFormField :label="$t('toolItem.stocks.form.holdingMonths.label')">
        <UInput
          v-model="form.holdingMonths"
          :placeholder="$t('toolItem.stocks.form.holdingMonths.placeholder')"
          type="number"
          class="form-input"
          trailing-icon="i-lucide-calendar"
        />
      </UFormField>

      <UFormField :label="$t('toolItem.stocks.form.dividendRate.label')">
        <UInput
          v-model="form.dividendRate"
          :placeholder="$t('toolItem.stocks.form.dividendRate.placeholder')"
          type="number"
          class="form-input"
          trailing-icon="i-lucide-percent"
        />
      </UFormField>

      <UFormField :label="$t('toolItem.stocks.form.frequency.label')">
        <USelect
          v-model="form.frequency"
          :placeholder="$t('toolItem.stocks.form.frequency.placeholder')"
          class="w-full"
          trailing-icon="i-lucide-calendar"
          :items="frequencyOptions"
        />
      </UFormField>

      <USeparator />

      <div class="flex flex-col gap-1">
        <UButton
          variant="ghost"
          size="sm"
          @click="form.withCommission = !form.withCommission"
        >
          <UIcon name="i-lucide-percent" />
          <span>{{ $t('toolItem.stocks.form.commission.toggle') }}</span>
        </UButton>

        <UCollapsible v-model:open="form.withCommission">
          <template #content>
            <UFormField :label="$t('toolItem.stocks.form.commission.label')">
              <UInput
                v-model="form.commission"
                :placeholder="$t('toolItem.stocks.form.commission.placeholder')"
                type="number"
                class="w-full"
              />
            </UFormField>
          </template>
        </UCollapsible>
      </div>
    </form>
  </section>
</template>

<style scoped>
.stocks-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.form-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
}

.form-input {
  width: 100%;
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>