import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import ResultItemContainer from './ResultItemContainer.vue'

describe('ResultItemContainer', () => {
  it('отображает заголовок и значение', () => {
    const w = mount(ResultItemContainer, {
      props: {
        active: false,
        title: 'Заголовок',
        value: '1 000 ₽'
      }
    })
    expect(w.get('.calculation-results-item-title').text()).toBe('Заголовок')
    expect(w.get('.calculation-results-item-value').text()).toBe('1 000 ₽')
  })

  it('при active=true выставляет data-active и рендерит описание при наличии', () => {
    const w = mount(ResultItemContainer, {
      props: {
        active: true,
        title: 'T',
        value: 'V',
        description: 'Подсказка'
      }
    })
    expect(w.get('.calculation-results-item').attributes('data-active')).toBe(
      'true'
    )
    expect(w.get('.calculation-results-item-description').text()).toBe(
      'Подсказка'
    )
  })

  it('не показывает блок описания без пропа description', () => {
    const w = mount(ResultItemContainer, {
      props: {
        active: false,
        title: 'T',
        value: 'V'
      }
    })
    expect(w.find('.calculation-results-item-description').exists()).toBe(false)
  })
})
