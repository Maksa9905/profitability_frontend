<script setup lang="ts">
import { DepositCalculationResults, DepositForm } from '~/entities/deposit'

import {
  EPrimaryColor,
  PrimaryColorProvider
} from '~/features/dynamical-primary-color'
import { InvestmentTool } from '~/features/investment-tools'

const frequency = 'MONTHLY'
const capitalization = true

const mockCapitalGrowthGraph = Array.from({ length: 12 }, (_, i) =>
  Math.round(100_000 + (10_000 / 12) * (i + 1))
)
</script>

<template>
  <PrimaryColorProvider :color="EPrimaryColor.DEPOSITS">
    <InvestmentTool
      :title="$t('toolItem.deposits.label')"
      :description="$t('toolItem.deposits.description')"
    >
      <template #form>
        <DepositForm />
      </template>
      <template #visualization>
        <DepositCalculationResults
          :item="InvestmentTool.ResultItemContainer"
          :final-amount="100000"
          :accrued-interest="10000"
          :effective-rate="10"
          :frequency="frequency"
          :capitalization="capitalization"
          :capital-growth-graph="mockCapitalGrowthGraph"
        />
      </template>
    </InvestmentTool>
  </PrimaryColorProvider>
</template>

<style scoped>
.form-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
}

.form-icon {
  color: var(--ui-primary);
}
</style>
