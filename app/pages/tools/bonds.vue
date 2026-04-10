<script setup lang="ts">
import {
  BondsCalculationResults,
  BondsForm,
  EBondFrequency
} from '~/entities/bonds'
import {
  EPrimaryColor,
  PrimaryColorProvider
} from '~/features/dynamical-primary-color'
import { InvestmentTool } from '~/features/investment-tools'

const mockCouponPaymentsGraph = [20, 30, 40, 50, 60, 70, 190, 20, 30, 40, 50, 60, 70, 190]
</script>

<template>
  <PrimaryColorProvider :color="EPrimaryColor.BONDS">
    <InvestmentTool
      :title="$t('toolItem.bonds.label')"
      :description="$t('toolItem.bonds.description')"
    >
      <template #form>
        <BondsForm />
      </template>
      <template #visualization>
        <BondsCalculationResults
          :item="InvestmentTool.ResultItemContainer"
          :ytm="10"
          :net-yield="10"
          :total-profit-amount="10000"
          :total-profit-percent="10"
          :frequency="EBondFrequency.QUARTERLY"
          :coupon-payments-graph="mockCouponPaymentsGraph"
        />
      </template>
    </InvestmentTool>
  </PrimaryColorProvider>
</template>
