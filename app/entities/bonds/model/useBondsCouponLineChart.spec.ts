import { ref, defineComponent } from 'vue'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'

import ru from '../../../../i18n/locales/ru.json'
import en from '../../../../i18n/locales/en.json'

import { EBondFrequency } from './types'
import { useBondsCouponLineChart } from './useBondsCouponLineChart'

vi.mock('~/shared/lib/useMediaQuery', () => ({
  useMediaQuery: () => ref(false)
}))

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'ru',
  messages: { ru, en }
})

describe('useBondsCouponLineChart', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2024-01-10T12:00:00.000Z'))
  })

  it('строит опцию графика купонов с учётом частоты', () => {
    const Cmp = defineComponent({
      setup() {
        const couponPaymentsGraph = ref([10, 20])
        const frequency = ref<EBondFrequency>(EBondFrequency.MONTHLY)
        const lineColor = ref('#8b36fe')
        const { chartOption } = useBondsCouponLineChart(
          couponPaymentsGraph,
          frequency,
          lineColor
        )
        return { chartOption }
      },
      template: '<div />'
    })
    const w = mount(Cmp, { global: { plugins: [i18n] } })
    const opt = w.vm.chartOption as {
      xAxis: { data: string[] }
      series: { data: number[] }[]
    }

    expect(opt.series[0]?.data).toEqual([10, 20])
    expect(opt.xAxis.data).toHaveLength(2)
  })
})
