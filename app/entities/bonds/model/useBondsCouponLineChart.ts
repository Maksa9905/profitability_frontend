import { useI18n } from '#imports'
import { computed, type Ref } from 'vue'

import { useMediaQuery } from '~/shared/lib/useMediaQuery'
import type { components } from '~/shared/api/generated/invest'

import type { EBondFrequency } from './types'
import { getBondCouponPeriodLabels } from '../lib/getBondCouponPeriodLabels'

type BondFrequency = components['schemas']['BondResponse']['frequency']

function localeTag(code: string): string {
  return code === 'en' ? 'en-US' : 'ru-RU'
}

export function useBondsCouponLineChart(
  couponPaymentsGraph: Ref<number[]>,
  frequency: Ref<EBondFrequency | string>,
  lineColor: Ref<string>
) {
  const { locale, t } = useI18n()
  const isMobile = useMediaQuery('(max-width: 768px)')

  const chartOption = computed((): ECOption => {
    const values = couponPaymentsGraph.value
    const tag = localeTag(locale.value)
    const xData = getBondCouponPeriodLabels(
      values.length,
      frequency.value as BondFrequency,
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
        left: isMobile.value ? 16 : 24,
        right: isMobile.value ? 16 : 24,
        top: isMobile.value ? 16 : 24,
        bottom: isMobile.value ? 16 : 30,
        containLabel: isMobile.value ? false : true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xData,
        name: isMobile.value ? undefined : t('toolItem.bonds.chart.axisTime'),
        nameLocation: isMobile.value ? undefined : 'middle',
        nameGap: isMobile.value ? undefined : 36,
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
        name: isMobile.value ? undefined : t('toolItem.bonds.chart.axisPayment'),
        nameLocation: isMobile.value ? undefined : 'middle',
        nameGap: isMobile.value ? undefined : 44,
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
          name: t('toolItem.bonds.chart.coupon'),
          data: values,
          smooth: false,
          showSymbol: values.length <= 36,
          lineStyle: { width: 2 },
          emphasis: { focus: 'series' }
        }
      ]
    } satisfies ECOption
  })

  return {
    chartOption
  }
}
