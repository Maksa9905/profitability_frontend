import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { getDepositCapitalMonthLabels } from './getDepositCapitalMonthLabels'

describe('getDepositCapitalMonthLabels', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2024-06-15T12:00:00.000Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('возвращает пустой массив при pointCount <= 0', () => {
    expect(getDepositCapitalMonthLabels(0, 'ru-RU')).toEqual([])
    expect(getDepositCapitalMonthLabels(-1, 'ru-RU')).toEqual([])
  })

  it('строит метки месяцев от первого числа текущего месяца (ru-RU)', () => {
    const labels = getDepositCapitalMonthLabels(3, 'ru-RU')
    expect(labels).toHaveLength(3)
    expect(labels[0]).toMatch(/июн/i)
    expect(labels[0]).toMatch(/2024/)
    expect(labels[1]).toMatch(/июл/i)
    expect(labels[2]).toMatch(/авг/i)
  })

  it('использует локаль en-US для английских подписей', () => {
    const labels = getDepositCapitalMonthLabels(2, 'en-US')
    expect(labels[0]).toMatch(/Jun/i)
    expect(labels[1]).toMatch(/Jul/i)
  })
})
