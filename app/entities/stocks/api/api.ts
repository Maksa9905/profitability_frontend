import type { components } from '~/shared/api/generated/invest'

import { parseStockRouteToRequest } from '../model/mappers'
import { GET_STOCKS_LIST_KEY } from './constants'

type Schemas = components['schemas']

const STOCK_CALCULATE_KEY = 'investment-stock-calculate'

export function useStocksList() {
  const { $api } = useNuxtApp()
  return useAsyncData(GET_STOCKS_LIST_KEY, () =>
    $api
      .get<Schemas['StockHistoryResponse'][]>(`/api/investment/stock/list`)
      .then((r) => r.data)
  )
}

export function useStocksCalculate() {
  const { $api } = useNuxtApp()
  const route = useRoute()

  return useAsyncData(
    STOCK_CALCULATE_KEY,
    async () => {
      const payload = parseStockRouteToRequest(route.query)
      if (payload === null) {
        return null
      }
      return $api
        .post<Schemas['StockResponse']>(`/api/investment/stock/add`, payload)
        .then((r) => r.data)
    },
    {
      watch: [() => route.fullPath],
      immediate: true,
      default: () => null
    }
  )
}
