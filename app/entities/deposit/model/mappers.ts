import type { components } from '~/shared/api/generated/invest'
import type { LocationQuery } from 'vue-router'

import {
  buildFormStateQuery,
  parseBooleanQuery,
  parseOptionalFiniteNumber,
  parseQueryEnumMember,
  queryParamFirst
} from '~/shared/lib/routeQuery'

import { EDepositFrequency } from './types'

export const DEFAULT_DEPOSIT_REQUEST_TITLE = 'Вклад'

type DepositRequest = components['schemas']['DepositRequest']
type DepositHistoryResponse = components['schemas']['DepositHistoryResponse']

export function parseDepositRouteToRequest(
  query: LocationQuery
): DepositRequest | null {
  const amount = parseOptionalFiniteNumber(queryParamFirst(query, 'amount'))
  const interestRate = parseOptionalFiniteNumber(
    queryParamFirst(query, 'interestRate')
  )
  const termMonths = parseOptionalFiniteNumber(
    queryParamFirst(query, 'termMonths')
  )
  const capitalization = parseBooleanQuery(
    queryParamFirst(query, 'capitalization')
  )
  const frequency = parseQueryEnumMember(
    queryParamFirst(query, 'frequency'),
    EDepositFrequency
  )

  if (amount == null || interestRate == null || termMonths == null) {
    return null
  }

  if (capitalization && frequency == null) {
    return null
  }

  return {
    title: DEFAULT_DEPOSIT_REQUEST_TITLE,
    amount,
    interestRate,
    termMonths,
    capitalization,
    frequency: frequency ?? EDepositFrequency.MONTHLY
  }
}

export function buildDepositHistoryQuery(item: DepositHistoryResponse) {
  return buildFormStateQuery({
    amount: item.amount,
    interestRate: item.interestRate,
    termMonths: item.termMonths,
    capitalization: item.capitalization,
    frequency: item.frequency
  })
}
