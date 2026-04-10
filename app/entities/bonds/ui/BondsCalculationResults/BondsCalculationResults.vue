<script lang="ts" setup>
import type { Component } from 'vue'

import { resolveUiPrimaryForChart } from '~/features/dynamical-primary-color'
import { useBondsCouponLineChart } from '../../model/useBondsCouponLineChart'
import type { EBondFrequency } from '../../model/types'

const props = withDefaults(
  defineProps<{
    item: Component
    ytm: number
    netYield: number
    totalProfitAmount: number
    totalProfitPercent: number
    frequency: EBondFrequency
    couponPaymentsGraph?: number[]
  }>(),
  {
    couponPaymentsGraph: () => []
  }
)

const couponPaymentsGraphRef = toRef(props, 'couponPaymentsGraph')
const frequencyRef = toRef(props, 'frequency')
const chartLineColor = ref('#8b36fe')
const rootRef = ref<HTMLElement | null>(null)

const { chartOption } = useBondsCouponLineChart(
  couponPaymentsGraphRef,
  frequencyRef,
  chartLineColor
)

onMounted(() => {
  const resolved = resolveUiPrimaryForChart(rootRef.value, '--color-bonds-400')
  if (resolved) {
    chartLineColor.value = resolved
  }
})
</script>

<template>
  <section ref="rootRef" class="bonds-calculation-results">
    <component
      :is="item"
      :active="true"
      :title="$t('toolItem.bonds.results.ytm')"
      :description="$t('toolItem.bonds.results.ytmHint')"
      :value="`${ytm}%`"
    />
    <component
      :is="item"
      :active="false"
      :title="$t('toolItem.bonds.results.totalProfit')"
      :description="
        $t('toolItem.bonds.results.totalProfitHint', {
          percent: totalProfitPercent
        })
      "
      :value="`${totalProfitAmount} ₽`"
    />
    <component
      :is="item"
      :active="false"
      :title="$t('toolItem.bonds.results.netYield')"
      :description="$t('toolItem.bonds.results.netYieldHint')"
      :value="`${netYield}%`"
    />
    <component
      :is="item"
      :active="false"
      :title="$t('toolItem.bonds.results.couponPerYear')"
      :description="$t('toolItem.bonds.results.couponYearHint')"
      value="—"
    />

    <div v-if="couponPaymentsGraph.length > 0" class="bonds-coupon-chart">
      <h3 class="bonds-coupon-chart-title">
        {{ $t('toolItem.bonds.chart.title') }}
      </h3>
      <div class="bonds-coupon-chart-inner">
        <ClientOnly>
          <VChart
            class="bonds-coupon-chart-vchart"
            :option="chartOption"
            autoresize
          />
        </ClientOnly>
      </div>
    </div>
  </section>
</template>

<style scoped>
.bonds-calculation-results {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: calc(var(--spacing) * 4);
}

.bonds-coupon-chart {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 3);
  min-height: 340px;
  background-color: var(--ui-bg);
  border-radius: 0.5rem;
  padding: calc(var(--spacing) * 4);
  box-shadow: var(--shadow-sm);
}

.bonds-coupon-chart-title {
  font-size: 1rem;
  font-weight: 600;
  line-height: 1;
  color: var(--ui-text);
}

.bonds-coupon-chart-inner {
  position: relative;
  width: 100%;
  min-height: 340px;
}

.bonds-coupon-chart-vchart {
  width: 100%;
  height: 340px;
}

@media (max-width: 576px) {
  .bonds-calculation-results {
    grid-template-columns: 1fr;
  }

  .bonds-coupon-chart {
    grid-column: 1;
    grid-row: 5;
  }

  .bonds-coupon-chart-title {
    font-size: 0.875rem;
  }
}
</style>
