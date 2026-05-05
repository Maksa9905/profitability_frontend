import { describe, expect, it } from 'vitest'

import type { components } from '~/shared/api/generated/invest'

import { buildStockHistoryQuery } from './mappers'

type StockHistoryResponse = components['schemas']['StockHistoryResponse']

describe('buildStockHistoryQuery', () => {
  it('мапит поля истории в query для восстановления формы', () => {
    const item: StockHistoryResponse = {
      id: 1,
      title: 'Акция',
      purchasePrice: 100,
      targetPrice: 150,
      holdingMonths: 12,
      dividendRate: 10,
      commission: 5,
      frequency: 'QUARTERLY',
      totalYieldPercent: 12,
      totalYieldAmount: 50,
      dividendIncome: 20,
      capitalGain: 30,
      netYield: 40,
      createdAt: '2026-01-01T10:00:00.000Z'
    }

    expect(buildStockHistoryQuery(item)).toEqual({
      purchasePrice: '100',
      targetPrice: '150',
      holdingMonths: '12',
      dividendRate: '10',
      frequency: 'QUARTERLY',
      commission: '5',
      taxRate: '0',
      withCommission: 'true'
    })
  })

  it('ставит withCommission=false при нулевой комиссии', () => {
    const item: StockHistoryResponse = {
      id: 2,
      title: 'Акция',
      purchasePrice: 100,
      targetPrice: 120,
      holdingMonths: 6,
      dividendRate: 0,
      commission: 0,
      frequency: 'MONTHLY',
      totalYieldPercent: 0,
      totalYieldAmount: 0,
      dividendIncome: 0,
      capitalGain: 0,
      netYield: 0,
      createdAt: '2026-01-01T10:00:00.000Z'
    }

    expect(buildStockHistoryQuery(item).withCommission).toBe('false')
  })
})
