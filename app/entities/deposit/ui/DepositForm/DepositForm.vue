<script setup lang="ts">
import { depositeIcon, interestRates } from '../../lib/constants'
import { useDepositFrequencyOptions } from '../../model/options'
import type { IDepositForm } from '../../model/types'

defineSlots<{
  form: () => VNode
}>()

const form = ref<IDepositForm>({
  amount: undefined,
  interestRate: undefined,
  termMonths: undefined,
  capitalization: false,
  frequency: undefined
})

const frequencyOptions = useDepositFrequencyOptions()
</script>

<template>
  <section class="deposit-form">
    <header class="form-header">
      <UIcon :name="depositeIcon" class="form-icon" />
      <h2 class="form-title">{{ $t('toolItem.deposits.form.title') }}</h2>
    </header>

    <form class="form-content">
      <UFormField :label="$t('toolItem.deposits.form.amount.label')">
        <UInput
          v-model="form.amount"
          :placeholder="$t('toolItem.deposits.form.amount.placeholder')"
          trailing-icon="i-lucide-russian-ruble"
          type="number"
          class="form-input"
        />
      </UFormField>

      <UFormField :label="$t('toolItem.deposits.form.interestRate.label')">
        <UInput
          v-model="form.interestRate"
          :placeholder="$t('toolItem.deposits.form.interestRate.placeholder')"
          trailing-icon="i-lucide-percent"
          type="number"
          class="form-input"
        />
        <template #help>
          <div class="form-interest-rate-buttons">
            <UButton
              v-for="interestRate in interestRates"
              :key="interestRate"
              :variant="
                form.interestRate === interestRate ? 'solid' : 'outline'
              "
              size="xs"
              @click="form.interestRate = interestRate"
            >
              {{ interestRate }}%
            </UButton>
          </div>
        </template>
      </UFormField>

      <UFormField :label="$t('toolItem.deposits.form.termMonths.label')">
        <UInput
          v-model="form.termMonths"
          :placeholder="$t('toolItem.deposits.form.termMonths.placeholder')"
          type="number"
          class="form-input"
        />
      </UFormField>

      <USeparator />

      <div class="flex gap-2 flex-col">
        <div class="flex justify-between items-center">
          <USwitch
            v-model="form.capitalization"
            class="form-capitalization"
            :label="$t('toolItem.deposits.form.capitalization.label')"
          />
          <UTooltip :text="$t('toolItem.deposits.form.capitalization.tooltip')"
            ><UIcon name="i-lucide-info"
          /></UTooltip>
        </div>

        <UCollapsible v-model:open="form.capitalization">
          <template #content>
            <UFormField
              :label="
                $t('toolItem.deposits.form.capitalizationFrequency.label')
              "
            >
              <USelect
                v-model="form.frequency"
                :placeholder="
                  $t('toolItem.deposits.form.frequency.placeholder')
                "
                class="w-full"
                :items="frequencyOptions"
              />
            </UFormField>
          </template>
        </UCollapsible>
      </div>
    </form>
  </section>
</template>

<style scoped>
.deposit-form {
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

.form-interest-rate-buttons {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
}

.form-capitalization {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
}
</style>
