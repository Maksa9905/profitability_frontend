import { describe, expect, it } from 'vitest'
import { defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'

import ru from '../../../../i18n/locales/ru.json'
import en from '../../../../i18n/locales/en.json'

import { EStockFrequency } from './types'
import { useStocksFrequencyOptions } from './useStocksFrequencyOptions'

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'ru',
  messages: { ru, en }
})

describe('useStocksFrequencyOptions', () => {
  it('возвращает варианты частоты дивидендов с переводами (ru)', () => {
    const Cmp = defineComponent({
      setup() {
        const opts = useStocksFrequencyOptions()
        return { opts }
      },
      template: '<div />'
    })
    const w = mount(Cmp, { global: { plugins: [i18n] } })
    const opts = w.vm.opts as { label: string; value: EStockFrequency }[]

    expect(opts).toHaveLength(Object.values(EStockFrequency).length)
    expect(opts.find((o) => o.value === EStockFrequency.ANNUALLY)?.label).toBe(
      'Ежегодно'
    )
  })
})
