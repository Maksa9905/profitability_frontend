<script setup lang="ts">
import { stocksIcon } from '../../lib/constants'
import { createStocksFormSchema } from '../../model/stocksFormSchema'
import type { IStocksForm } from '../../model/types'
import { useStocksFrequencyOptions } from '../../model/useStocksFrequencyOptions'

const state = reactive<IStocksForm>({
  purchasePrice: undefined,
  targetPrice: undefined,
  holdingMonths: undefined,
  dividendRate: undefined,
  frequency: undefined,
  commission: undefined,
  taxRate: undefined,
  withCommission: false
})

const schema = computed(() => createStocksFormSchema())

const frequencyOptions = useStocksFrequencyOptions()
</script>

<template>
  <section class="stocks-form">
    <header class="form-header">
      <UIcon :name="stocksIcon" class="form-icon" />
      <h2 class="form-title">{{ $t('toolItem.stocks.form.title') }}</h2>
    </header>

    <UForm
      id="stocks-investment-form"
      :schema="schema"
      :state="state"
      class="form-content"
    >
      <UFormField
        :error="false"
        name="purchasePrice"
        :label="$t('toolItem.stocks.form.purchasePrice.label')"
      >
        <UInput
          v-model="state.purchasePrice"
          :placeholder="$t('toolItem.stocks.form.purchasePrice.placeholder')"
          type="number"
          trailing-icon="i-lucide-russian-ruble"
          class="form-input"
        />
      </UFormField>

      <UFormField
        :error="false"
        name="targetPrice"
        :label="$t('toolItem.stocks.form.targetPrice.label')"
      >
        <UInput
          v-model="state.targetPrice"
          :placeholder="$t('toolItem.stocks.form.targetPrice.placeholder')"
          trailing-icon="i-lucide-russian-ruble"
          type="number"
          class="form-input"
        />
      </UFormField>

      <UFormField
        :error="false"
        name="holdingMonths"
        :label="$t('toolItem.stocks.form.holdingMonths.label')"
      >
        <UInput
          v-model="state.holdingMonths"
          :placeholder="$t('toolItem.stocks.form.holdingMonths.placeholder')"
          type="number"
          class="form-input"
          trailing-icon="i-lucide-calendar"
        />
      </UFormField>

      <UFormField
        :error="false"
        name="dividendRate"
        :label="$t('toolItem.stocks.form.dividendRate.label')"
      >
        <UInput
          v-model="state.dividendRate"
          :placeholder="$t('toolItem.stocks.form.dividendRate.placeholder')"
          type="number"
          class="form-input"
          trailing-icon="i-lucide-percent"
        />
      </UFormField>

      <UFormField
        :error="false"
        name="frequency"
        :label="$t('toolItem.stocks.form.frequency.label')"
      >
        <USelect
          v-model="state.frequency"
          :placeholder="$t('toolItem.stocks.form.frequency.placeholder')"
          class="w-full"
          trailing-icon="i-lucide-calendar"
          :items="frequencyOptions"
        />
      </UFormField>

      <USeparator />

      <div class="flex flex-col gap-2">
        <USwitch
          v-model="state.withCommission"
          :label="$t('toolItem.stocks.form.commission.toggle')"
        />

        <UCollapsible v-model:open="state.withCommission">
          <template #content>
            <UFormField
              :error="false"
              name="commission"
              :label="$t('toolItem.stocks.form.commission.label')"
            >
              <UInput
                v-model="state.commission"
                :placeholder="$t('toolItem.stocks.form.commission.placeholder')"
                type="number"
                class="w-full"
              />
            </UFormField>
          </template>
        </UCollapsible>
      </div>
    </UForm>
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
