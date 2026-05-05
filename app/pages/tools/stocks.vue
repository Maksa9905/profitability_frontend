<script setup lang="ts">
import {
  buildStockHistoryQuery,
  EStockFrequency,
  parseStockRouteToRequest,
  saveStock,
  StocksCalculationResults,
  StocksForm,
  stocksFormId,
  useStocksCalculate,
  useStocksList
} from '~/entities/stocks'
import { GET_STOCKS_LIST_KEY } from '~/entities/stocks/api/constants'
import {
  PrimaryColorProvider,
  EPrimaryColor
} from '~/features/dynamical-primary-color'
import { useAuth } from '~/features/auth'
import {
  formatHistoryNumber,
  formatHistoryPercent,
  InvestmentHistory,
  InvestmentTool
} from '~/features/investment-tools'
import type { InvestmentHistoryItem } from '~/features/investment-tools'
import type { components } from '~/shared/api/generated/invest'

type StockHistoryResponse = components['schemas']['StockHistoryResponse']

const route = useRoute()
const { locale, t } = useI18n()
const { isAuthenticated, init } = useAuth()

init()
const { data: stockData, pending: stockPending } = useStocksCalculate()
const { data: stocksHistory, pending: stocksHistoryPending } = useStocksList()
const isStocksHistoryRefreshing = ref(false)

const stockFrequency = computed(
  () =>
    (stockData.value?.frequency ?? EStockFrequency.MONTHLY) as EStockFrequency
)

const isStocksHistoryLoading = computed(
  () => stocksHistoryPending.value || isStocksHistoryRefreshing.value
)

const getFrequencyLabel = (frequency: StockHistoryResponse['frequency']) =>
  t(`toolItem.stocks.form.frequency.${frequency}`)

const stockHistoryItems = computed<InvestmentHistoryItem[]>(() =>
  (stocksHistory.value ?? []).map((item) => ({
    id: item.id,
    createdAt: item.createdAt,
    query: buildStockHistoryQuery(item),
    details: [
      {
        label: t('toolItem.stocks.form.purchasePrice.label'),
        value: formatHistoryNumber(item.purchasePrice, locale.value)
      },
      {
        label: t('toolItem.stocks.form.targetPrice.label'),
        value: formatHistoryNumber(item.targetPrice, locale.value)
      },
      {
        label: t('toolItem.stocks.form.holdingMonths.label'),
        value: String(item.holdingMonths)
      },
      {
        label: t('toolItem.stocks.form.dividendRate.label'),
        value: formatHistoryPercent(item.dividendRate, locale.value)
      },
      {
        label: t('toolItem.stocks.results.totalYieldTitle'),
        value: `${formatHistoryNumber(item.totalYieldAmount, locale.value)} (${formatHistoryPercent(item.totalYieldPercent, locale.value)})`
      },
      {
        label: t('history.fields.netYield'),
        value: formatHistoryNumber(item.netYield, locale.value)
      },
      {
        label: t('toolItem.stocks.form.frequency.label'),
        value: getFrequencyLabel(item.frequency)
      }
    ]
  }))
)

const openHistoryItem = async (query: Record<string, string>) => {
  await navigateTo(
    {
      path: route.path,
      query
    },
    { replace: true }
  )
}

const handleSave = async () => {
  if (!isAuthenticated.value) {
    await navigateTo({
      path: '/auth',
      query: { redirect: route.fullPath }
    })
    return
  }

  const payload = parseStockRouteToRequest(route.query)
  if (payload === null) {
    return
  }

  isStocksHistoryRefreshing.value = true
  try {
    await saveStock(payload)
    await refreshNuxtData(GET_STOCKS_LIST_KEY)
  } finally {
    isStocksHistoryRefreshing.value = false
  }
}
</script>

<template>
  <PrimaryColorProvider :color="EPrimaryColor.STOCKS">
    <InvestmentTool
      :calculate-form-id="stocksFormId"
      :title="$t('toolItem.stocks.label')"
      :description="$t('toolItem.stocks.description')"
      :is-loading="stockPending"
      @save="handleSave"
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

    <InvestmentHistory
      v-if="isAuthenticated"
      :title="$t('history.stocks.title')"
      :items="stockHistoryItems"
      :is-loading="isStocksHistoryLoading"
      :locale="locale"
      :empty-text="$t('history.empty')"
      @select="openHistoryItem"
    />
  </PrimaryColorProvider>
</template>
