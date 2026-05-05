import type { components } from '~/shared/api/generated/invest'
import type { LocationQuery } from 'vue-router'

import {
  buildFormStateQuery,
  parseBooleanQuery,
  parseOptionalFiniteNumber,
  parseQueryEnumMember,
  queryParamFirst
} from '~/shared/lib/routeQuery'

import { EStockFrequency } from './types'

export const DEFAULT_STOCK_REQUEST_TITLE = 'Позиция'

type StockRequest = components['schemas']['StockRequest']
type StockHistoryResponse = components['schemas']['StockHistoryResponse']

export function parseStockRouteToRequest(
  query: LocationQuery
): StockRequest | null {
  const purchasePrice = parseOptionalFiniteNumber(
    queryParamFirst(query, 'purchasePrice')
  )
  const targetPrice = parseOptionalFiniteNumber(
    queryParamFirst(query, 'targetPrice')
  )
  const holdingMonths = parseOptionalFiniteNumber(
    queryParamFirst(query, 'holdingMonths')
  )
  const dividendRate = parseOptionalFiniteNumber(
    queryParamFirst(query, 'dividendRate')
  )
  const frequency = parseQueryEnumMember(
    queryParamFirst(query, 'frequency'),
    EStockFrequency
  )
  const withCommission = parseBooleanQuery(
    queryParamFirst(query, 'withCommission')
  )
  let commission = parseOptionalFiniteNumber(
    queryParamFirst(query, 'commission')
  )
  const taxRate =
    parseOptionalFiniteNumber(queryParamFirst(query, 'taxRate')) ?? 0

  if (
    purchasePrice == null ||
    targetPrice == null ||
    holdingMonths == null ||
    dividendRate == null ||
    frequency == null
  ) {
    return null
  }

  if (withCommission) {
    if (commission == null) {
      return null
    }
  } else {
    commission = commission ?? 0
  }

  return {
    title: DEFAULT_STOCK_REQUEST_TITLE,
    purchasePrice,
    targetPrice,
    holdingMonths,
    dividendRate,
    frequency,
    commission,
    taxRate
  }
}

export function buildStockHistoryQuery(item: StockHistoryResponse) {
  return buildFormStateQuery({
    purchasePrice: item.purchasePrice,
    targetPrice: item.targetPrice,
    holdingMonths: item.holdingMonths,
    dividendRate: item.dividendRate,
    frequency: item.frequency,
    commission: item.commission,
    taxRate: 0,
    withCommission: item.commission > 0
  })
}
