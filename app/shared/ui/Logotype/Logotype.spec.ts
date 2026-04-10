import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'

import Logotype from './LogotypeComponent.vue'

import ru from '~/../i18n/locales/ru.json'
import en from '~/../i18n/locales/en.json'

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'ru',
  messages: { ru, en }
})

describe('Logotype', () => {
  it('should render logotype text', () => {
    const logotype = mount(Logotype, {
      global: {
        plugins: [i18n],
        stubs: {
          NuxtLink: {
            props: ['to'],
            template: '<a><slot /></a>'
          },
          UIcon: {
            template: '<span />',
            props: ['name', 'size', 'class']
          }
        }
      }
    })

    expect(logotype.get('h1').text()).toBe('профитабилити.ру')
    expect(logotype.get('p').text()).toBe('Ваш финансовый аналитик')

    expect(logotype.element).toMatchSnapshot()
  })
})
