import type { components } from '~/shared/api/generated/invest'

import { parseDepositRouteToRequest } from '../model/mappers'
import { GET_DEPOSIT_LIST_KEY } from './constants'

type Schemas = components['schemas']

const DEPOSIT_CALCULATE_KEY = 'investment-deposit-calculate'

export function useDepositList() {
  const { $api } = useNuxtApp()
  return useAsyncData(GET_DEPOSIT_LIST_KEY, () =>
    $api
      .get<Schemas['DepositHistoryResponse'][]>(`/api/investment/deposit/list`)
      .then((r) => r.data)
  )
}

export function useDepositCalculate() {
  const { $api } = useNuxtApp()
  const route = useRoute()

  return useAsyncData(
    DEPOSIT_CALCULATE_KEY,
    async () => {
      const payload = parseDepositRouteToRequest(route.query)
      if (payload === null) {
        return null
      }
      return $api
        .post<
          Schemas['DepositResponse']
        >(`/api/investment/deposit/calculate`, payload)
        .then((r) => r.data)
    },
    {
      watch: [() => route.fullPath],
      immediate: true,
      default: () => null
    }
  )
}

export function saveDeposit(payload: Schemas['DepositRequest']) {
  const { $api } = useNuxtApp()
  return $api
    .post<Schemas['DepositResponse']>(`/api/investment/deposit/save`, payload)
    .then((r) => r.data)
}
