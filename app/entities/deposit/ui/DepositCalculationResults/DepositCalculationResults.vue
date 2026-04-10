<script lang="ts" setup>
import type { Component } from 'vue'

import { resolveUiPrimaryForChart } from '~/features/dynamical-primary-color'
import { useDepositCapitalLineChart } from '../../model/useDepositCapitalLineChart'

const props = withDefaults(
  defineProps<{
    item: Component
    finalAmount: number
    accruedInterest: number
    effectiveRate: number
    frequency: string
    capitalization: boolean
    capitalGrowthGraph?: number[]
  }>(),
  {
    capitalGrowthGraph: () => []
  }
)

const capitalGrowthGraphRef = toRef(props, 'capitalGrowthGraph')
const chartLineColor = ref('#4f39f6')
const rootRef = ref<HTMLElement | null>(null)

const { chartOption } = useDepositCapitalLineChart(
  capitalGrowthGraphRef,
  chartLineColor
)

onMounted(() => {
  const resolved = resolveUiPrimaryForChart(
    rootRef.value,
    '--color-deposits-400'
  )
  if (resolved) {
    chartLineColor.value = resolved
  }
})
</script>

<template>
  <section ref="rootRef" class="deposit-calculation-results">
    <component
      :is="item"
      :active="true"
      class="calculation-results-item"
      :title="$t('toolItem.deposits.results.finalAmount')"
      :value="`${finalAmount} ₽`"
    >
    </component>
    <component
      :is="item"
      class="calculation-results-item"
      :title="$t('toolItem.deposits.results.accruedInterest')"
      :value="`${accruedInterest} ₽`"
      :description="$t('toolItem.deposits.results.accruedInterestPeriod')"
    >
    </component>
    <component
      :is="item"
      class="calculation-results-item"
      :title="$t('toolItem.deposits.results.effectiveRate')"
      :value="`${effectiveRate}%`"
      :description="
        capitalization
          ? $t('toolItem.deposits.results.capitalizationNote')
          : undefined
      "
    >
    </component>

    <div v-if="capitalGrowthGraph.length > 0" class="deposit-capital-chart">
      <h3 class="deposit-capital-chart-title">
        {{ $t('toolItem.deposits.chart.title') }}
      </h3>
      <div class="deposit-capital-chart-inner">
        <ClientOnly>
          <VChart
            class="deposit-capital-chart-vchart"
            :option="chartOption"
            autoresize
          />
        </ClientOnly>
      </div>
    </div>
  </section>
</template>

<style scoped>
.deposit-calculation-results {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: calc(var(--spacing) * 4);
}

.deposit-capital-chart {
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

.deposit-capital-chart-title {
  font-size: 1rem;
  font-weight: 600;
  line-height: 1;
  color: var(--ui-text);
}

.deposit-capital-chart-inner {
  position: relative;
  width: 100%;
  min-height: 340px;
}

.deposit-capital-chart-vchart {
  width: 100%;
  height: 340px;
}

@media (max-width: 576px) {
  .deposit-calculation-results {
    grid-template-columns: 1fr;
  }

  .deposit-capital-chart {
    grid-column: 1;
    grid-row: 5;
  }
}
</style>
