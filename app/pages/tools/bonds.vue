<script setup lang="ts">
import {
  buildBondHistoryQuery,
  BondsCalculationResults,
  BondsForm,
  bondsFormId,
  EBondFrequency,
  parseBondRouteToRequest,
  saveBond,
  useBondsCalculate,
  useBondsList
} from '~/entities/bonds'
import { GET_BONDS_LIST_KEY } from '~/entities/bonds/api/constants'
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

type BondHistoryResponse = components['schemas']['BondHistoryResponse']

const route = useRoute()
const { locale, t } = useI18n()
const { isAuthenticated, init } = useAuth()

init()
const { data: bondData, pending: bondPending } = useBondsCalculate()
const { data: bondsHistory, pending: bondsHistoryPending } = useBondsList()
const isBondsHistoryRefreshing = ref(false)

const bondFrequency = computed(
  () =>
    (bondData.value?.frequency ?? EBondFrequency.QUARTERLY) as EBondFrequency
)

const isBondsHistoryLoading = computed(
  () => bondsHistoryPending.value || isBondsHistoryRefreshing.value
)

const getFrequencyLabel = (frequency: BondHistoryResponse['frequency']) =>
  t(`toolItem.bonds.form.frequency.${frequency}`)

const bondsHistoryItems = computed<InvestmentHistoryItem[]>(() =>
  (bondsHistory.value ?? []).map((item) => ({
    id: item.id,
    createdAt: item.createdAt,
    query: buildBondHistoryQuery(item),
    details: [
      {
        label: t('toolItem.bonds.form.nominal.label'),
        value: formatHistoryNumber(item.nominal, locale.value)
      },
      {
        label: t('toolItem.bonds.form.couponRate.label'),
        value: formatHistoryPercent(item.couponRate, locale.value)
      },
      {
        label: t('toolItem.bonds.form.termMonths.label'),
        value: String(item.termMonths)
      },
      {
        label: t('toolItem.bonds.form.frequency.label'),
        value: getFrequencyLabel(item.frequency)
      },
      {
        label: t('toolItem.bonds.results.ytm'),
        value: formatHistoryPercent(item.ytm, locale.value)
      },
      {
        label: t('history.fields.netYield'),
        value: formatHistoryPercent(item.netYield, locale.value)
      },
      {
        label: t('toolItem.bonds.results.totalProfit'),
        value: `${formatHistoryNumber(item.totalProfitAmount, locale.value)} (${formatHistoryPercent(item.totalProfitPercent, locale.value)})`
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

  const payload = parseBondRouteToRequest(route.query)
  if (payload === null) {
    return
  }

  isBondsHistoryRefreshing.value = true
  try {
    await saveBond(payload)
    await refreshNuxtData(GET_BONDS_LIST_KEY)
  } finally {
    isBondsHistoryRefreshing.value = false
  }
}
</script>

<template>
  <PrimaryColorProvider :color="EPrimaryColor.BONDS">
    <InvestmentTool
      :calculate-form-id="bondsFormId"
      :title="$t('toolItem.bonds.label')"
      :description="$t('toolItem.bonds.description')"
      :is-loading="bondPending"
      @save="handleSave"
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

    <InvestmentHistory
      v-if="isAuthenticated"
      :title="$t('history.bonds.title')"
      :items="bondsHistoryItems"
      :is-loading="isBondsHistoryLoading"
      :locale="locale"
      :empty-text="$t('history.empty')"
      @select="openHistoryItem"
    />
  </PrimaryColorProvider>
</template>
