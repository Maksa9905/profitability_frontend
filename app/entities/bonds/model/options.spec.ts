import { describe, expect, it } from 'vitest'
import { defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'

import ru from '../../../../i18n/locales/ru.json'
import en from '../../../../i18n/locales/en.json'

import { EBondFrequency } from './types'
import { useBondsFrequencyOptions } from './options'

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'ru',
  messages: { ru, en }
})

describe('useBondsFrequencyOptions', () => {
  it('возвращает варианты частоты купонов с переводами (ru)', () => {
    const Cmp = defineComponent({
      setup() {
        const opts = useBondsFrequencyOptions()
        return { opts }
      },
      template: '<div />'
    })
    const w = mount(Cmp, { global: { plugins: [i18n] } })
    const opts = w.vm.opts as { label: string; value: EBondFrequency }[]

    expect(opts).toHaveLength(Object.values(EBondFrequency).length)
    expect(opts.find((o) => o.value === EBondFrequency.QUARTERLY)?.label).toBe(
      'Ежеквартально'
    )
  })
})
