import { useI18n } from '#imports'
import { computed, type Ref } from 'vue'

import { getDepositCapitalMonthLabels } from '../lib/getDepositCapitalMonthLabels'

function localeTag(code: string): string {
  return code === 'en' ? 'en-US' : 'ru-RU'
}

export function useDepositCapitalLineChart(
  capitalGrowthGraph: Ref<number[]>,
  lineColor: Ref<string>
) {
  const { locale, t } = useI18n()

  const chartOption = computed((): ECOption => {
    const values = capitalGrowthGraph.value
    const tag = localeTag(locale.value)
    const xData = getDepositCapitalMonthLabels(values.length, tag)
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
        name: t('toolItem.deposits.chart.axisMonth'),
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
        name: t('toolItem.deposits.chart.axisCapital'),
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
          name: t('toolItem.deposits.chart.capital'),
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
