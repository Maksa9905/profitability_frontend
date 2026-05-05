import { describe, expect, it } from 'vitest'

import type { components } from '~/shared/api/generated/invest'

import { buildDepositHistoryQuery } from './mappers'

type DepositHistoryResponse = components['schemas']['DepositHistoryResponse']

describe('buildDepositHistoryQuery', () => {
  it('мапит историю вклада в query-параметры', () => {
    const item: DepositHistoryResponse = {
      id: 21,
      title: 'Вклад',
      amount: 100000,
      interestRate: 12,
      termMonths: 12,
      capitalization: true,
      frequency: 'MONTHLY',
      finalAmount: 112000,
      accruedInterest: 12000,
      effectiveRate: 12,
      createdAt: '2026-01-01T10:00:00.000Z'
    }

    expect(buildDepositHistoryQuery(item)).toEqual({
      amount: '100000',
      interestRate: '12',
      termMonths: '12',
      capitalization: 'true',
      frequency: 'MONTHLY'
    })
  })
})
