import type { components } from '~/shared/api/generated/invest'
import type { LocationQuery } from 'vue-router'

import {
  parseOptionalFiniteNumber,
  parseQueryEnumMember,
  queryParamFirst
} from '~/shared/lib/routeQuery'

import { EBondFrequency } from './types'

export const DEFAULT_BOND_REQUEST_TITLE = 'Облигация'

type BondRequest = components['schemas']['BondRequest']

export function parseBondRouteToRequest(
  query: LocationQuery
): BondRequest | null {
  const nominal = parseOptionalFiniteNumber(queryParamFirst(query, 'nominal'))
  const purchasePricePercent = parseOptionalFiniteNumber(
    queryParamFirst(query, 'purchasePricePercent')
  )
  const couponRate = parseOptionalFiniteNumber(
    queryParamFirst(query, 'couponRate')
  )
  const frequency = parseQueryEnumMember(
    queryParamFirst(query, 'frequency'),
    EBondFrequency
  )
  const termMonths = parseOptionalFiniteNumber(
    queryParamFirst(query, 'termMonths')
  )
  const taxRate = parseOptionalFiniteNumber(queryParamFirst(query, 'taxRate'))

  if (
    nominal == null ||
    purchasePricePercent == null ||
    couponRate == null ||
    frequency == null ||
    termMonths == null ||
    taxRate == null
  ) {
    return null
  }

  return {
    title: DEFAULT_BOND_REQUEST_TITLE,
    nominal,
    purchasePricePercent,
    couponRate,
    frequency,
    termMonths,
    taxRate
  }
}
