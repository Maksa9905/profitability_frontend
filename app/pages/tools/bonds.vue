<script setup lang="ts">
import {
  BondsCalculationResults,
  BondsForm,
  bondsFormId,
  EBondFrequency,
  useBondsCalculate
} from '~/entities/bonds'
import {
  EPrimaryColor,
  PrimaryColorProvider
} from '~/features/dynamical-primary-color'
import { InvestmentTool } from '~/features/investment-tools'

const { data: bondData } = useBondsCalculate()

const bondFrequency = computed(
  () =>
    (bondData.value?.frequency ?? EBondFrequency.QUARTERLY) as EBondFrequency
)
</script>

<template>
  <PrimaryColorProvider :color="EPrimaryColor.BONDS">
    <InvestmentTool
      :calculate-form-id="bondsFormId"
      :title="$t('toolItem.bonds.label')"
      :description="$t('toolItem.bonds.description')"
    >
      <template #form>
        <BondsForm />
      </template>
      <template #visualization>
        <BondsCalculationResults
          :item="InvestmentTool.ResultItemContainer"
          :ytm="bondData?.ytm ?? 0"
          :net-yield="bondData?.netYield ?? 0"
          :total-profit-amount="bondData?.totalProfitAmount ?? 0"
          :total-profit-percent="bondData?.totalProfitPercent ?? 0"
          :frequency="bondFrequency"
          :coupon-payments-graph="bondData?.couponPaymentsGraph ?? []"
        />
      </template>
    </InvestmentTool>
  </PrimaryColorProvider>
</template>
