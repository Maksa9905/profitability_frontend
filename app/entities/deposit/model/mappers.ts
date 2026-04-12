import type { components } from '~/shared/api/generated/invest'
import type { LocationQuery } from 'vue-router'

import {
  parseBooleanQuery,
  parseOptionalFiniteNumber,
  parseQueryEnumMember,
  queryParamFirst
} from '~/shared/lib/routeQuery'

import { EDepositFrequency } from './types'

export const DEFAULT_DEPOSIT_REQUEST_TITLE = 'Вклад'

type DepositRequest = components['schemas']['DepositRequest']

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
