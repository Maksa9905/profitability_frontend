import { ref } from 'vue'
import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'

import ResultItemContainer from '~/features/investment-tools/ui/InvestmentTool/ResultItemContainer.vue'
import ru from '../../../../../i18n/locales/ru.json'
import en from '../../../../../i18n/locales/en.json'

import DepositCalculationResults from './DepositCalculationResults.vue'

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

describe('DepositCalculationResults', () => {
  it('выводит итоговую сумму, проценты и эффективную ставку', () => {
    const w = mount(DepositCalculationResults, {
      props: {
        item: ResultItemContainer,
        finalAmount: 115_000,
        accruedInterest: 15_000,
        effectiveRate: 12.5,
        frequency: 'MONTHLY',
        capitalization: false,
        capitalGrowthGraph: []
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
    expect(text).toContain('115000')
    expect(text).toContain('15000')
    expect(text).toContain('12.5%')
  })

  it('при капитализации показывает примечание к эффективной ставке', () => {
    const w = mount(DepositCalculationResults, {
      props: {
        item: ResultItemContainer,
        finalAmount: 100,
        accruedInterest: 10,
        effectiveRate: 11,
        frequency: 'MONTHLY',
        capitalization: true,
        capitalGrowthGraph: []
      },
      global: {
        plugins: [i18n],
        stubs: {
          ClientOnly: { template: '<div><slot /></div>' },
          VChart: true
        }
      }
    })

    expect(w.text()).toContain('с учётом капит')
  })

  it('не показывает график без массива капитала', () => {
    const w = mount(DepositCalculationResults, {
      props: {
        item: ResultItemContainer,
        finalAmount: 0,
        accruedInterest: 0,
        effectiveRate: 0,
        frequency: 'MONTHLY',
        capitalization: false,
        capitalGrowthGraph: []
      },
      global: {
        plugins: [i18n],
        stubs: {
          ClientOnly: { template: '<div><slot /></div>' },
          VChart: true
        }
      }
    })

    expect(w.find('.deposit-capital-chart').exists()).toBe(false)
  })
})
