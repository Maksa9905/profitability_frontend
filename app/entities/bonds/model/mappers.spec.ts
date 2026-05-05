import { describe, expect, it } from 'vitest'

import type { components } from '~/shared/api/generated/invest'

import { buildBondHistoryQuery } from './mappers'

type BondHistoryResponse = components['schemas']['BondHistoryResponse']

describe('buildBondHistoryQuery', () => {
  it('мапит историю облигации в query-параметры', () => {
    const item: BondHistoryResponse = {
      id: 11,
      title: 'ОФЗ',
      nominal: 1000,
      purchasePricePercent: 95,
      couponRate: 12,
      termMonths: 24,
      taxRate: 13,
      frequency: 'SEMI_ANNUALLY',
      ytm: 10,
      netYield: 8,
      totalProfitAmount: 100,
      totalProfitPercent: 10,
      createdAt: '2026-01-01T10:00:00.000Z'
    }

    expect(buildBondHistoryQuery(item)).toEqual({
      nominal: '1000',
      purchasePricePercent: '95',
      couponRate: '12',
      frequency: 'SEMI_ANNUALLY',
      termMonths: '24',
      taxRate: '13',
      isCustomRate: 'false'
    })
  })
})
