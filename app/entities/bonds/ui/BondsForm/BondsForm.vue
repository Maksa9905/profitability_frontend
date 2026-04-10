<script lang="ts" setup>
import { bondIcon } from '../../lib/constants'
import { createBondsFormSchema } from '../../model/bondsFormSchema'
import { useBondsFrequencyOptions } from '../../model/options'
import { EBondFrequency, type IBondsForm } from '../../model/types'
import {
  buildFormStateQuery,
  parseBooleanQuery,
  parseOptionalFiniteNumber,
  parseQueryEnumMember,
  queryParamFirst
} from '~/shared/lib/routeQuery'
import { useRouteQueryFormSync } from '~/shared/lib/useRouteQueryFormSync'

const { locale } = useI18n()

const state = reactive<IBondsForm>({
  nominal: undefined,
  purchasePricePercent: undefined,
  couponRate: undefined,
  frequency: undefined,
  termMonths: undefined,
  taxRate: undefined,
  isCustomRate: false
})

const schema = computed(() => createBondsFormSchema())

const frequencyOptions = useBondsFrequencyOptions()

const purchasePriceHintAmount = computed(() => {
  const n = state.nominal
  const p = state.purchasePricePercent
  if (n == null || p == null) {
    return ''
  }
  const amount = (Number(n) * Number(p)) / 100
  return new Intl.NumberFormat(locale.value === 'en' ? 'en-US' : 'ru-RU', {
    maximumFractionDigits: 2
  }).format(amount)
})

const { route } = useRouteQueryFormSync((q) => {
  state.nominal = parseOptionalFiniteNumber(queryParamFirst(q, 'nominal'))
  state.purchasePricePercent = parseOptionalFiniteNumber(
    queryParamFirst(q, 'purchasePricePercent')
  )
  state.couponRate = parseOptionalFiniteNumber(queryParamFirst(q, 'couponRate'))
  state.frequency = parseQueryEnumMember(
    queryParamFirst(q, 'frequency'),
    EBondFrequency
  )
  state.termMonths = parseOptionalFiniteNumber(queryParamFirst(q, 'termMonths'))
  state.taxRate = parseOptionalFiniteNumber(queryParamFirst(q, 'taxRate'))
  state.isCustomRate = parseBooleanQuery(queryParamFirst(q, 'isCustomRate'))
})

const handleSubmit = () => {
  navigateTo({
    path: route.path,
    query: buildFormStateQuery({
      nominal: state.nominal,
      purchasePricePercent: state.purchasePricePercent,
      couponRate: state.couponRate,
      frequency: state.frequency,
      termMonths: state.termMonths,
      taxRate: state.taxRate,
      isCustomRate: state.isCustomRate
    })
  })
}
</script>

<template>
  <section class="bonds-form">
    <header class="form-header">
      <UIcon :name="bondIcon" class="form-icon" />
      <h2 class="form-title">{{ $t('toolItem.bonds.form.title') }}</h2>
    </header>

    <UForm
      id="bonds-investment-form"
      :schema="schema"
      :state="state"
      class="form-content"
      @submit="handleSubmit"
    >
      <UFormField
        :error="false"
        name="nominal"
        :label="$t('toolItem.bonds.form.nominal.label')"
      >
        <UInput
          v-model="state.nominal"
          :placeholder="$t('toolItem.bonds.form.nominal.placeholder')"
          trailing-icon="i-lucide-russian-ruble"
          type="number"
          class="form-input"
        />
      </UFormField>

      <UFormField
        :error="false"
        name="purchasePricePercent"
        :label="$t('toolItem.bonds.form.purchasePricePercent.label')"
      >
        <UInput
          v-model="state.purchasePricePercent"
          :placeholder="
            $t('toolItem.bonds.form.purchasePricePercent.placeholder')
          "
          trailing-icon="i-lucide-percent"
          type="number"
          class="form-input"
        />
        <template v-if="state.nominal && state.purchasePricePercent" #help>
          <p class="text-sm text-muted">
            {{
              $t('toolItem.bonds.form.purchasePricePercent.help', {
                amount: purchasePriceHintAmount
              })
            }}
          </p>
        </template>
      </UFormField>

      <UFormField
        :error="false"
        name="couponRate"
        :label="$t('toolItem.bonds.form.couponRate.label')"
      >
        <UInput
          v-model="state.couponRate"
          :placeholder="$t('toolItem.bonds.form.couponRate.placeholder')"
          trailing-icon="i-lucide-percent"
          type="number"
          class="form-input"
        />
      </UFormField>

      <UFormField
        :error="false"
        name="frequency"
        :label="$t('toolItem.bonds.form.frequency.label')"
      >
        <USelect
          v-model="state.frequency"
          :placeholder="$t('toolItem.bonds.form.frequency.placeholder')"
          class="w-full"
          :items="frequencyOptions"
        />
      </UFormField>

      <UFormField
        :error="false"
        name="termMonths"
        :label="$t('toolItem.bonds.form.termMonths.label')"
      >
        <UInput
          v-model="state.termMonths"
          :placeholder="$t('toolItem.bonds.form.termMonths.placeholder')"
          class="form-input"
        />
      </UFormField>

      <USeparator />

      <UFormField
        :error="false"
        name="taxRate"
        :label="$t('toolItem.bonds.form.taxRate.label')"
      >
        <UInput
          v-model="state.taxRate"
          :placeholder="$t('toolItem.bonds.form.taxRate.placeholder')"
          trailing-icon="i-lucide-percent"
          type="number"
          class="form-input"
        />
      </UFormField>
    </UForm>
  </section>
</template>

<style scoped>
.bonds-form {
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
