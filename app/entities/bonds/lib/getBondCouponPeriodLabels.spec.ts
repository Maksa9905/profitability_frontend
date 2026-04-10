import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { getBondCouponPeriodLabels } from './getBondCouponPeriodLabels'

describe('getBondCouponPeriodLabels', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2024-06-15T12:00:00.000Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('возвращает пустой массив при pointCount <= 0', () => {
    expect(getBondCouponPeriodLabels(0, 'MONTHLY', 'ru-RU')).toEqual([])
  })

  it('MONTHLY: последовательные месяцы в формате локали', () => {
    const labels = getBondCouponPeriodLabels(2, 'MONTHLY', 'ru-RU')
    expect(labels).toHaveLength(2)
    expect(labels[0]).toMatch(/июн/i)
    expect(labels[1]).toMatch(/июл/i)
  })

  it('QUARTERLY: шаг по кварталам (ru)', () => {
    const labels = getBondCouponPeriodLabels(2, 'QUARTERLY', 'ru-RU')
    expect(labels[0]).toMatch(/кв/)
    expect(labels[1]).toMatch(/кв/)
  })

  it('QUARTERLY: шаг по кварталам (en)', () => {
    const labels = getBondCouponPeriodLabels(2, 'QUARTERLY', 'en-US')
    expect(labels[0]).toMatch(/Q\d/)
  })

  it('SEMI_ANNUALLY: полугодия (ru)', () => {
    const labels = getBondCouponPeriodLabels(2, 'SEMI_ANNUALLY', 'ru-RU')
    expect(labels[0]).toMatch(/пг/)
  })

  it('SEMI_ANNUALLY: полугодия (en)', () => {
    const labels = getBondCouponPeriodLabels(2, 'SEMI_ANNUALLY', 'en-US')
    expect(labels[0]).toMatch(/H\d/)
  })

  it('ANNUALLY: только годы', () => {
    const labels = getBondCouponPeriodLabels(3, 'ANNUALLY', 'ru-RU')
    expect(labels.every((l) => /202\d/.test(l))).toBe(true)
  })
})
