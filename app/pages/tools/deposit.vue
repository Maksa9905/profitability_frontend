<script setup lang="ts">
import {
  DepositCalculationResults,
  DepositForm,
  depositFormId,
  useDepositCalculate
} from '~/entities/deposit'

import {
  EPrimaryColor,
  PrimaryColorProvider
} from '~/features/dynamical-primary-color'
import { InvestmentTool } from '~/features/investment-tools'
import { parseBooleanQuery, queryParamFirst } from '~/shared/lib/routeQuery'

const route = useRoute()

const { data: depositData } = useDepositCalculate()

const capitalizationFromQuery = computed(() =>
  parseBooleanQuery(queryParamFirst(route.query, 'capitalization'))
)
</script>

<template>
  <PrimaryColorProvider :color="EPrimaryColor.DEPOSITS">
    <InvestmentTool
      :calculate-form-id="depositFormId"
      :title="$t('toolItem.deposits.label')"
      :description="$t('toolItem.deposits.description')"
    >
      <template #form>
        <DepositForm />
      </template>
      <template #visualization>
        <DepositCalculationResults
          :item="InvestmentTool.ResultItemContainer"
          :final-amount="depositData?.finalAmount ?? 0"
          :accrued-interest="depositData?.accruedInterest ?? 0"
          :effective-rate="depositData?.effectiveRate ?? 0"
          :frequency="depositData?.frequency ?? 'MONTHLY'"
          :capitalization="capitalizationFromQuery"
          :capital-growth-graph="depositData?.capitalGrowthGraph ?? []"
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
