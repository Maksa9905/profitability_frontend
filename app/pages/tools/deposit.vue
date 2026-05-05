<script setup lang="ts">
import {
  buildDepositHistoryQuery,
  DepositCalculationResults,
  DepositForm,
  depositFormId,
  parseDepositRouteToRequest,
  saveDeposit,
  useDepositCalculate,
  useDepositList
} from '~/entities/deposit'
import { GET_DEPOSIT_LIST_KEY } from '~/entities/deposit/api/constants'

import {
  EPrimaryColor,
  PrimaryColorProvider
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
import { parseBooleanQuery, queryParamFirst } from '~/shared/lib/routeQuery'

type DepositHistoryResponse = components['schemas']['DepositHistoryResponse']

const route = useRoute()
const { locale, t } = useI18n()
const { isAuthenticated, init } = useAuth()

init()
const { data: depositData, pending: depositPending } = useDepositCalculate()
const { data: depositsHistory, pending: depositsHistoryPending } =
  useDepositList()
const isDepositsHistoryRefreshing = ref(false)

const capitalizationFromQuery = computed(() =>
  parseBooleanQuery(queryParamFirst(route.query, 'capitalization'))
)

const isDepositsHistoryLoading = computed(
  () => depositsHistoryPending.value || isDepositsHistoryRefreshing.value
)

const getFrequencyLabel = (frequency: DepositHistoryResponse['frequency']) =>
  t(`toolItem.deposits.form.frequency.${frequency}`)

const depositsHistoryItems = computed<InvestmentHistoryItem[]>(() =>
  (depositsHistory.value ?? []).map((item) => ({
    id: item.id,
    createdAt: item.createdAt,
    query: buildDepositHistoryQuery(item),
    details: [
      {
        label: t('toolItem.deposits.form.amount.label'),
        value: formatHistoryNumber(item.amount, locale.value)
      },
      {
        label: t('toolItem.deposits.form.interestRate.label'),
        value: formatHistoryPercent(item.interestRate, locale.value)
      },
      {
        label: t('toolItem.deposits.form.termMonths.label'),
        value: String(item.termMonths)
      },
      {
        label: t('toolItem.deposits.results.finalAmount'),
        value: formatHistoryNumber(item.finalAmount, locale.value)
      },
      {
        label: t('toolItem.deposits.results.effectiveRate'),
        value: formatHistoryPercent(item.effectiveRate, locale.value)
      },
      {
        label: t('toolItem.deposits.form.capitalization.label'),
        value: item.capitalization
          ? t('history.values.yes')
          : t('history.values.no')
      },
      {
        label: t('toolItem.deposits.form.capitalizationFrequency.label'),
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

  const payload = parseDepositRouteToRequest(route.query)
  if (payload === null) {
    return
  }

  isDepositsHistoryRefreshing.value = true
  try {
    await saveDeposit(payload)
    await refreshNuxtData(GET_DEPOSIT_LIST_KEY)
  } finally {
    isDepositsHistoryRefreshing.value = false
  }
}
</script>

<template>
  <PrimaryColorProvider :color="EPrimaryColor.DEPOSITS">
    <InvestmentTool
      :calculate-form-id="depositFormId"
      :title="$t('toolItem.deposits.label')"
      :description="$t('toolItem.deposits.description')"
      :is-loading="depositPending"
      @save="handleSave"
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

    <InvestmentHistory
      v-if="isAuthenticated"
      :title="$t('history.deposits.title')"
      :items="depositsHistoryItems"
      :is-loading="isDepositsHistoryLoading"
      :locale="locale"
      :empty-text="$t('history.empty')"
      @select="openHistoryItem"
    />
  </PrimaryColorProvider>
</template>
