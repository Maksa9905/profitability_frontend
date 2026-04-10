import { useI18n } from '#imports'
import { computed, type Ref } from 'vue'

import type { EStockFrequency } from './types'
import { getStocksPortfolioPeriodLabels } from '../lib/getStocksPortfolioPeriodLabels'

function localeTag(code: string): string {
  return code === 'en' ? 'en-US' : 'ru-RU'
}

export function useStocksPortfolioLineChart(
  portfolioGrowthGraph: Ref<number[]>,
  frequency: Ref<EStockFrequency>,
  lineColor: Ref<string>
) {
  const { locale, t } = useI18n()

  const chartOption = computed((): ECOption => {
    const values = portfolioGrowthGraph.value
    const tag = localeTag(locale.value)
    const xData = getStocksPortfolioPeriodLabels(
      values.length,
      frequency.value,
      tag
    )
    const nf = new Intl.NumberFormat(tag, {
      maximumFractionDigits: 0
    })

    return {
      color: [lineColor.value],
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: 48,
        right: 24,
        top: 40,
        bottom: 56,
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xData,
        name: t('toolItem.stocks.chart.axisTime'),
        nameLocation: 'middle',
        nameGap: 36,
        splitLine: {
          show: true,
          lineStyle: { opacity: 0.25 }
        },
        axisLabel: {
          hideOverlap: true
        }
      },
      yAxis: {
        type: 'value',
        name: t('toolItem.stocks.chart.axisPortfolio'),
        nameLocation: 'middle',
        nameGap: 60,
        axisLabel: {
          formatter: (v: number) => nf.format(v)
        },
        splitLine: {
          show: true,
          lineStyle: { opacity: 0.25 }
        }
      },
      series: [
        {
          type: 'line',
          name: t('toolItem.stocks.chart.portfolio'),
          data: values,
          smooth: false,
          showSymbol: values.length <= 36,
          lineStyle: { width: 2 },
          emphasis: { focus: 'series' }
        }
      ]
    }
  })

  return {
    chartOption
  }
}
