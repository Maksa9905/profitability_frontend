import { describe, expect, it } from 'vitest'

import { depositeIcon, interestRates } from './constants'

describe('константы депозита', () => {
  it('иконка вклада задана', () => {
    expect(depositeIcon).toBe('i-lucide-landmark')
  })

  it('набор типовых ставок содержит ожидаемые значения', () => {
    expect([...interestRates]).toEqual([12, 14, 15, 18])
  })
})
