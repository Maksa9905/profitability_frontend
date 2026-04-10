import { ref, defineComponent } from 'vue'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'

import ru from '../../../../i18n/locales/ru.json'
import en from '../../../../i18n/locales/en.json'

import { useDepositCapitalLineChart } from './useDepositCapitalLineChart'

vi.mock('~/shared/lib/useMediaQuery', () => ({
  useMediaQuery: () => ref(false)
}))

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'ru',
  messages: { ru, en }
})

describe('useDepositCapitalLineChart', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2024-01-10T12:00:00.000Z'))
  })

  it('строит опцию графика с данными серии и цветом линии', () => {
    const Cmp = defineComponent({
      setup() {
        const capitalGrowthGraph = ref([1000, 1050, 1100])
        const lineColor = ref('#4f39f6')
        const { chartOption } = useDepositCapitalLineChart(
          capitalGrowthGraph,
          lineColor
        )
        return { chartOption }
      },
      template: '<div />'
    })
    const w = mount(Cmp, { global: { plugins: [i18n] } })
    const opt = w.vm.chartOption as {
      color: string[]
      series: { data: number[]; type: string }[]
    }

    expect(opt.color).toEqual(['#4f39f6'])
    expect(opt.series[0]?.type).toBe('line')
    expect(opt.series[0]?.data).toEqual([1000, 1050, 1100])
  })
})
