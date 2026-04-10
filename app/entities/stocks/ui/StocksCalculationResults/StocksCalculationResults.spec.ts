import { ref } from 'vue'
import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'

import ResultItemContainer from '~/features/investment-tools/ui/InvestmentTool/ResultItemContainer.vue'
import ru from '../../../../../i18n/locales/ru.json'
import en from '../../../../../i18n/locales/en.json'

import { EStockFrequency } from '../../model/types'
import StocksCalculationResults from './StocksCalculationResults.vue'

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

describe('StocksCalculationResults', () => {
  it('показывает доли дивидендов и роста в подсказках при ненулевой общей доходности', () => {
    const w = mount(StocksCalculationResults, {
      props: {
        item: ResultItemContainer,
        totalYieldPercent: 10,
        totalYieldAmount: 1000,
        netYield: 8,
        capitalGain: 750,
        dividendIncome: 250,
        frequency: EStockFrequency.MONTHLY,
        portfolioGrowthGraph: []
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
    expect(text).toContain('250')
    expect(text).toContain('750')
    expect(text).toContain('25%')
    expect(text).toContain('75%')
  })

  it('не рендерит блок графика без данных портфеля', () => {
    const w = mount(StocksCalculationResults, {
      props: {
        item: ResultItemContainer,
        totalYieldPercent: 0,
        totalYieldAmount: 0,
        netYield: 0,
        capitalGain: 0,
        dividendIncome: 0,
        frequency: EStockFrequency.MONTHLY,
        portfolioGrowthGraph: []
      },
      global: {
        plugins: [i18n],
        stubs: {
          ClientOnly: { template: '<div><slot /></div>' },
          VChart: true
        }
      }
    })

    expect(w.find('.stocks-portfolio-chart').exists()).toBe(false)
  })
})
