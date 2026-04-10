<script setup lang="ts">
import { StocksCalculationResults, StocksForm, EStockFrequency } from '~/entities/stocks';
import {
  PrimaryColorProvider,
  EPrimaryColor
} from '~/features/dynamical-primary-color'
import { InvestmentTool } from '~/features/investment-tools';
</script>

<template>
  <PrimaryColorProvider :color="EPrimaryColor.STOCKS">
    <InvestmentTool :title="$t('toolItem.stocks.label')" :description="$t('toolItem.stocks.description')">
      <template #form>
        <StocksForm />
      </template>
      <template #visualization>
        <StocksCalculationResults :item="InvestmentTool.ResultItemContainer" :totalYieldPercent="20" :totalYieldAmount="100000" :netYield="10000" :capitalGain="10000" :dividendIncome="10000" :frequency="EStockFrequency.MONTHLY" :portfolioGrowthGraph="[10000, 20000, 30000, 40000, 50000]" />
      </template>
    </InvestmentTool>
  </PrimaryColorProvider>
</template>
