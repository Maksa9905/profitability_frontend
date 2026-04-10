<script setup lang="ts">
import { depositeIcon, interestRates } from '../../lib/constants'
import { createDepositFormSchema } from '../../model/depositFormSchema'
import { useDepositFrequencyOptions } from '../../model/options'
import { EDepositFrequency, type IDepositForm } from '../../model/types'
import {
  buildFormStateQuery,
  parseBooleanQuery,
  parseOptionalFiniteNumber,
  parseQueryEnumMember,
  queryParamFirst
} from '~/shared/lib/routeQuery'
import { useRouteQueryFormSync } from '~/shared/lib/useRouteQueryFormSync'

defineSlots<{
  form: () => VNode
}>()

const state = reactive<IDepositForm>({
  amount: undefined,
  interestRate: undefined,
  termMonths: undefined,
  capitalization: false,
  frequency: undefined
})

const schema = computed(() => createDepositFormSchema())

const frequencyOptions = useDepositFrequencyOptions()

const { route } = useRouteQueryFormSync((q) => {
  state.amount = parseOptionalFiniteNumber(queryParamFirst(q, 'amount'))
  state.interestRate = parseOptionalFiniteNumber(
    queryParamFirst(q, 'interestRate')
  )
  state.termMonths = parseOptionalFiniteNumber(queryParamFirst(q, 'termMonths'))
  state.capitalization = parseBooleanQuery(queryParamFirst(q, 'capitalization'))
  state.frequency = parseQueryEnumMember(
    queryParamFirst(q, 'frequency'),
    EDepositFrequency
  )
})

const handleSubmit = () => {
  navigateTo({
    path: route.path,
    query: buildFormStateQuery({
      amount: state.amount,
      interestRate: state.interestRate,
      termMonths: state.termMonths,
      capitalization: state.capitalization,
      frequency: state.frequency
    })
  })
}
</script>

<template>
  <section class="deposit-form">
    <header class="form-header">
      <UIcon :name="depositeIcon" class="form-icon" />
      <h2 class="form-title">{{ $t('toolItem.deposits.form.title') }}</h2>
    </header>

    <UForm
      id="deposit-investment-form"
      :schema="schema"
      :state="state"
      class="form-content"
      @submit="handleSubmit"
    >
      <UFormField
        :error="false"
        name="amount"
        :label="$t('toolItem.deposits.form.amount.label')"
      >
        <UInput
          v-model="state.amount"
          :placeholder="$t('toolItem.deposits.form.amount.placeholder')"
          trailing-icon="i-lucide-russian-ruble"
          type="number"
          class="form-input"
        />
      </UFormField>

      <UFormField
        :error="false"
        name="interestRate"
        :label="$t('toolItem.deposits.form.interestRate.label')"
      >
        <UInput
          v-model="state.interestRate"
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
                state.interestRate === interestRate ? 'solid' : 'outline'
              "
              size="xs"
              @click="state.interestRate = interestRate"
            >
              {{ interestRate }}%
            </UButton>
          </div>
        </template>
      </UFormField>

      <UFormField
        :error="false"
        name="termMonths"
        :label="$t('toolItem.deposits.form.termMonths.label')"
      >
        <UInput
          v-model="state.termMonths"
          :placeholder="$t('toolItem.deposits.form.termMonths.placeholder')"
          type="number"
          class="form-input"
        />
      </UFormField>

      <USeparator />

      <div class="flex gap-2 flex-col">
        <div class="flex justify-between items-center">
          <USwitch
            v-model="state.capitalization"
            class="form-capitalization"
            :label="$t('toolItem.deposits.form.capitalization.label')"
          />
          <UTooltip :text="$t('toolItem.deposits.form.capitalization.tooltip')"
            ><UIcon name="i-lucide-info"
          /></UTooltip>
        </div>

        <UCollapsible v-model:open="state.capitalization">
          <template #content>
            <UFormField
              :error="false"
              name="frequency"
              :label="
                $t('toolItem.deposits.form.capitalizationFrequency.label')
              "
            >
              <USelect
                v-model="state.frequency"
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
    </UForm>
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
