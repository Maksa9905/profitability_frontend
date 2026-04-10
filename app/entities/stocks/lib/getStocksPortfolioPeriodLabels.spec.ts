import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { getBondCouponPeriodLabels } from '~/entities/bonds/lib/getBondCouponPeriodLabels'

import { EStockFrequency } from '../model/types'
import { getStocksPortfolioPeriodLabels } from './getStocksPortfolioPeriodLabels'

describe('getStocksPortfolioPeriodLabels', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2024-03-10T12:00:00.000Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('совпадает с getBondCouponPeriodLabels для той же частоты и локали', () => {
    const n = 4
    const locale = 'ru-RU'
    for (const freq of Object.values(EStockFrequency)) {
      expect(getStocksPortfolioPeriodLabels(n, freq, locale)).toEqual(
        getBondCouponPeriodLabels(n, freq, locale)
      )
    }
  })
})
