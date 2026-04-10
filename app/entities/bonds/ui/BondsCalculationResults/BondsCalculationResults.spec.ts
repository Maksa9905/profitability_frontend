import { ref } from 'vue'
import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'

import ResultItemContainer from '~/features/investment-tools/ui/InvestmentTool/ResultItemContainer.vue'
import ru from '../../../../../i18n/locales/ru.json'
import en from '../../../../../i18n/locales/en.json'

import { EBondFrequency } from '../../model/types'
import BondsCalculationResults from './BondsCalculationResults.vue'

vi.mock('~/shared/lib/useMediaQuery', () => ({
  useMediaQuery: () => ref(false)
}))

vi.mock('~/features/dynamical-primary-color', () => ({
  resolveUiPrimaryForChart: vi.fn(() => '')
}))

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'ru',
  messages: { ru, en }
})

describe('BondsCalculationResults', () => {
  it('отображает YTM, прибыль и чистую доходность', () => {
    const w = mount(BondsCalculationResults, {
      props: {
        item: ResultItemContainer,
        ytm: 8.25,
        netYield: 7.1,
        totalProfitAmount: 12_500,
        totalProfitPercent: 12.5,
        frequency: EBondFrequency.QUARTERLY,
        couponPaymentsGraph: []
      },
      global: {
        plugins: [i18n],
        stubs: {
          ClientOnly: { template: '<div><slot /></div>' },
          VChart: true
        }
      }
    })

    const text = w.text()
    expect(text).toContain('8.25%')
    expect(text).toContain('7.1%')
    expect(text).toContain('12500')
    expect(text).toContain('+12.5%')
  })

  it('скрывает график купонов при пустых данных', () => {
    const w = mount(BondsCalculationResults, {
      props: {
        item: ResultItemContainer,
        ytm: 0,
        netYield: 0,
        totalProfitAmount: 0,
        totalProfitPercent: 0,
        frequency: EBondFrequency.MONTHLY,
        couponPaymentsGraph: []
      },
      global: {
        plugins: [i18n],
        stubs: {
          ClientOnly: { template: '<div><slot /></div>' },
          VChart: true
        }
      }
    })

    expect(w.find('.bonds-coupon-chart').exists()).toBe(false)
  })
})
