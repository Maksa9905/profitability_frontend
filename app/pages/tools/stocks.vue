<script setup lang="ts">
import {
  StocksCalculationResults,
  StocksForm,
  EStockFrequency
} from '~/entities/stocks'
import {
  PrimaryColorProvider,
  EPrimaryColor
} from '~/features/dynamical-primary-color'
import { InvestmentTool } from '~/features/investment-tools'
</script>

<template>
  <PrimaryColorProvider :color="EPrimaryColor.STOCKS">
    <InvestmentTool
      calculate-form-id="stocks-investment-form"
      :title="$t('toolItem.stocks.label')"
      :description="$t('toolItem.stocks.description')"
    >
      <template #form>
        <StocksForm />
      </template>
      <template #visualization>
        <StocksCalculationResults
          :item="InvestmentTool.ResultItemContainer"
          :total-yield-percent="20"
          :total-yield-amount="100000"
          :net-yield="10000"
          :capital-gain="10000"
          :dividend-income="10000"
          :frequency="EStockFrequency.MONTHLY"
          :portfolio-growth-graph="[10000, 20000, 30000, 40000, 50000]"
        />
      </template>
    </InvestmentTool>
  </PrimaryColorProvider>
</template>
