import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import { EToolItem } from '../../model/types'
import InvestmentToolIcon from './InvestmentToolIcon.vue'

describe('InvestmentToolIcon', () => {
  it('передаёт в UIcon имя из toolsIcons для выбранного инструмента', () => {
    const w = mount(InvestmentToolIcon, {
      props: { item: EToolItem.DEPOSIT },
      shallow: true
    })
    const iconStub = w.findComponent({ name: 'UIcon' })
    expect(iconStub.props('name')).toBe('i-lucide-landmark')
  })
})
