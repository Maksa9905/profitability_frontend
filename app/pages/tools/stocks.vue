<script setup lang="ts">
import {
  EStockFrequency,
  StocksCalculationResults,
  StocksForm,
  stocksFormId,
  useStocksCalculate
} from '~/entities/stocks'
import {
  PrimaryColorProvider,
  EPrimaryColor
} from '~/features/dynamical-primary-color'
import { InvestmentTool } from '~/features/investment-tools'

const { data: stockData } = useStocksCalculate()

const stockFrequency = computed(
  () =>
    (stockData.value?.frequency ?? EStockFrequency.MONTHLY) as EStockFrequency
)
</script>

<template>
  <PrimaryColorProvider :color="EPrimaryColor.STOCKS">
    <InvestmentTool
      :calculate-form-id="stocksFormId"
      :title="$t('toolItem.stocks.label')"
      :description="$t('toolItem.stocks.description')"
    >
      <template #form>
        <StocksForm />
      </template>
      <template #visualization>
        <StocksCalculationResults
          :item="InvestmentTool.ResultItemContainer"
          :total-yield-percent="stockData?.totalYieldPercent ?? 0"
          :total-yield-amount="stockData?.totalYieldAmount ?? 0"
          :net-yield="stockData?.netYield ?? 0"
          :capital-gain="stockData?.capitalGain ?? 0"
          :dividend-income="stockData?.dividendIncome ?? 0"
          :frequency="stockFrequency"
          :portfolio-growth-graph="stockData?.portfolioGrowthGraph ?? []"
        />
      </template>
    </InvestmentTool>
  </PrimaryColorProvider>
</template>
