<script lang="ts" setup>
import { bondIcon } from '../../lib/constants'
import { useBondsFrequencyOptions } from '../../model/options'
import type { IBondsForm } from '../../model/types'

const { locale } = useI18n()

const form = ref<IBondsForm>({
  nominal: undefined,
  purchasePricePercent: undefined,
  couponRate: undefined,
  frequency: undefined,
  termMonths: undefined,
  taxRate: undefined,
  isCustomRate: false
})

const frequencyOptions = useBondsFrequencyOptions()

const purchasePriceHintAmount = computed(() => {
  const n = form.value.nominal
  const p = form.value.purchasePricePercent
  if (n == null || p == null) {
    return ''
  }
  const amount = (Number(n) * Number(p)) / 100
  return new Intl.NumberFormat(locale.value === 'en' ? 'en-US' : 'ru-RU', {
    maximumFractionDigits: 2
  }).format(amount)
})
</script>

<template>
  <section class="bonds-form">
    <header class="form-header">
      <UIcon :name="bondIcon" class="form-icon" />
      <h2 class="form-title">{{ $t('toolItem.bonds.form.title') }}</h2>
    </header>

    <form class="form-content">
      <UFormField :label="$t('toolItem.bonds.form.nominal.label')">
        <UInput
          v-model="form.nominal"
          :placeholder="$t('toolItem.bonds.form.nominal.placeholder')"
          trailing-icon="i-lucide-russian-ruble"
          type="number"
          class="form-input"
        />
      </UFormField>

      <UFormField :label="$t('toolItem.bonds.form.purchasePricePercent.label')">
        <UInput
          v-model="form.purchasePricePercent"
          :placeholder="
            $t('toolItem.bonds.form.purchasePricePercent.placeholder')
          "
          trailing-icon="i-lucide-percent"
          type="number"
          class="form-input"
        />
        <template v-if="form.nominal && form.purchasePricePercent" #help>
          <p class="text-sm text-muted">
            {{
              $t('toolItem.bonds.form.purchasePricePercent.help', {
                amount: purchasePriceHintAmount
              })
            }}
          </p>
        </template>
      </UFormField>

      <UFormField :label="$t('toolItem.bonds.form.couponRate.label')">
        <UInput
          v-model="form.couponRate"
          :placeholder="$t('toolItem.bonds.form.couponRate.placeholder')"
          trailing-icon="i-lucide-percent"
          type="number"
          class="form-input"
        />
      </UFormField>

      <UFormField :label="$t('toolItem.bonds.form.frequency.label')">
        <USelect
          v-model="form.frequency"
          :placeholder="$t('toolItem.bonds.form.frequency.placeholder')"
          class="w-full"
          :items="frequencyOptions"
        />
      </UFormField>

      <UFormField :label="$t('toolItem.bonds.form.termMonths.label')">
        <UInput
          v-model="form.termMonths"
          :placeholder="$t('toolItem.bonds.form.termMonths.placeholder')"
          class="form-input"
        />
      </UFormField>

      <USeparator />

      <UFormField :label="$t('toolItem.bonds.form.taxRate.label')">
        <UInput
          v-model="form.taxRate"
          :placeholder="$t('toolItem.bonds.form.taxRate.placeholder')"
          trailing-icon="i-lucide-percent"
          type="number"
          class="form-input"
        />
      </UFormField>
    </form>
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
