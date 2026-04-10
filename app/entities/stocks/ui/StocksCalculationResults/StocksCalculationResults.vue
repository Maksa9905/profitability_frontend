<script lang="ts" setup>
import type { Component } from 'vue'

import { resolveUiPrimaryForChart } from '~/features/dynamical-primary-color'
import type { EStockFrequency } from '../../model/types'
import { useStocksPortfolioLineChart } from '../../model/useStocksPortfolioLineChart'

const props = withDefaults(
  defineProps<{
    item: Component
    totalYieldPercent: number
    totalYieldAmount: number
    netYield: number
    capitalGain: number
    dividendIncome: number
    frequency: EStockFrequency
    portfolioGrowthGraph?: number[]
  }>(),
  {
    portfolioGrowthGraph: () => []
  }
)

const portfolioGrowthGraphRef = toRef(props, 'portfolioGrowthGraph')
const frequencyRef = toRef(props, 'frequency')
const chartLineColor = ref('#ff3666')
const rootRef = ref<HTMLElement | null>(null)

const { chartOption } = useStocksPortfolioLineChart(
  portfolioGrowthGraphRef,
  frequencyRef,
  chartLineColor
)

function shareOfTotal(part: number): number {
  const total = props.totalYieldAmount
  if (total <= 0) {
    return 0
  }
  return Math.round((part / total) * 1000) / 10
}

const dividendSharePercent = computed(() => shareOfTotal(props.dividendIncome))
const capitalGainSharePercent = computed(() => shareOfTotal(props.capitalGain))

onMounted(() => {
  const resolved = resolveUiPrimaryForChart(rootRef.value, '--color-stocks-400')
  if (resolved) {
    chartLineColor.value = resolved
  }
})
</script>

<template>
  <section ref="rootRef" class="stocks-calculation-results">
    <component
      :is="item"
      :active="true"
      :title="$t('toolItem.stocks.results.totalYieldTitle')"
      :description="
        $t('toolItem.stocks.results.totalYieldHint', {
          percent: totalYieldPercent
        })
      "
      :value="`${totalYieldAmount} ₽`"
    />

    <component
      :is="item"
      :title="$t('toolItem.stocks.results.dividendTitle')"
      :value="`${dividendIncome} ₽`"
      :description="
        $t('toolItem.stocks.results.dividendHint', {
          percent: dividendSharePercent
        })
      "
    />

    <component
      :is="item"
      :title="$t('toolItem.stocks.results.capitalGainTitle')"
      :value="`${capitalGain} ₽`"
      :description="
        $t('toolItem.stocks.results.capitalGainHint', {
          percent: capitalGainSharePercent
        })
      "
    />

    <div v-if="portfolioGrowthGraph.length > 0" class="stocks-portfolio-chart">
      <h3 class="stocks-portfolio-chart-title">
        {{ $t('toolItem.stocks.chart.title') }}
      </h3>
      <div class="stocks-portfolio-chart-inner">
        <ClientOnly>
          <VChart
            class="stocks-portfolio-chart-vchart"
            :option="chartOption"
            autoresize
          />
        </ClientOnly>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stocks-calculation-results {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: calc(var(--spacing) * 4);
}

.stocks-portfolio-chart {
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

.stocks-portfolio-chart-title {
  font-size: 1rem;
  font-weight: 600;
  line-height: 1;
  color: var(--ui-text);
}

.stocks-portfolio-chart-inner {
  position: relative;
  width: 100%;
  min-height: 340px;
}

.stocks-portfolio-chart-vchart {
  width: 100%;
  height: 340px;
}

@media (max-width: 768px) {
  .stocks-calculation-results {
    grid-template-columns: 1fr;
  }

  .stocks-portfolio-chart {
    grid-column: 1;
    grid-row: 4;
  }

  .stocks-portfolio-chart-title {
    font-size: 0.875rem;
  }
}
</style>
