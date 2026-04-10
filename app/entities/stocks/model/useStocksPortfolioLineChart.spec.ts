import { ref, defineComponent } from 'vue'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'

import ru from '../../../../i18n/locales/ru.json'
import en from '../../../../i18n/locales/en.json'

import { EStockFrequency } from './types'
import { useStocksPortfolioLineChart } from './useStocksPortfolioLineChart'

vi.mock('~/shared/lib/useMediaQuery', () => ({
  useMediaQuery: () => ref(false)
}))

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'ru',
  messages: { ru, en }
})

describe('useStocksPortfolioLineChart', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2024-01-10T12:00:00.000Z'))
  })

  it('строит опцию графика портфеля с данными и подписями оси времени', () => {
    const Cmp = defineComponent({
      setup() {
        const portfolioGrowthGraph = ref([5000, 5100])
        const frequency = ref(EStockFrequency.QUARTERLY)
        const lineColor = ref('#ff3666')
        const { chartOption } = useStocksPortfolioLineChart(
          portfolioGrowthGraph,
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
      series: { data: number[]; name: string }[]
    }

    expect(opt.series[0]?.data).toEqual([5000, 5100])
    expect(opt.series[0]?.name).toBe('Портфель')
    expect(opt.xAxis.data).toHaveLength(2)
  })
})
