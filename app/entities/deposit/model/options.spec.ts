import { describe, expect, it } from 'vitest'
import { defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'

import ru from '../../../../i18n/locales/ru.json'
import en from '../../../../i18n/locales/en.json'

import { EDepositFrequency } from './types'
import { useDepositFrequencyOptions } from './options'

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'ru',
  messages: { ru, en }
})

describe('useDepositFrequencyOptions', () => {
  it('возвращает варианты для всех значений EDepositFrequency с переводами (ru)', () => {
    const Cmp = defineComponent({
      setup() {
        const opts = useDepositFrequencyOptions()
        return { opts }
      },
      template: '<div />'
    })
    const w = mount(Cmp, { global: { plugins: [i18n] } })
    const opts = w.vm.opts as { label: string; value: EDepositFrequency }[]

    expect(opts).toHaveLength(Object.values(EDepositFrequency).length)
    expect(opts.map((o) => o.value)).toEqual(
      expect.arrayContaining(Object.values(EDepositFrequency))
    )
    expect(opts.find((o) => o.value === EDepositFrequency.MONTHLY)?.label).toBe(
      'Ежемесячно'
    )
  })
})
