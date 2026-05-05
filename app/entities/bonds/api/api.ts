import type { components } from '~/shared/api/generated/invest'

import { parseBondRouteToRequest } from '../model/mappers'
import { GET_BONDS_LIST_KEY } from './constants'

type Schemas = components['schemas']

const BOND_CALCULATE_KEY = 'investment-bond-calculate'

export function useBondsList() {
  const { $api } = useNuxtApp()
  return useAsyncData(GET_BONDS_LIST_KEY, () =>
    $api
      .get<Schemas['BondHistoryResponse'][]>(`/api/investment/bond/list`)
      .then((r) => r.data)
  )
}

/** Расчёт по облигациям из query → POST; SSR через `useAsyncData`. */
export function useBondsCalculate() {
  const { $api } = useNuxtApp()
  const route = useRoute()

  return useAsyncData(
    BOND_CALCULATE_KEY,
    async () => {
      const payload = parseBondRouteToRequest(route.query)
      if (payload === null) {
        return null
      }
      return $api
        .post<
          Schemas['BondResponse']
        >(`/api/investment/bond/calculate`, payload)
        .then((r) => r.data)
    },
    {
      watch: [() => route.fullPath],
      immediate: true,
      default: () => null
    }
  )
}

export function saveBond(payload: Schemas['BondRequest']) {
  const { $api } = useNuxtApp()
  return $api
    .post<Schemas['BondResponse']>(`/api/investment/bond/save`, payload)
    .then((r) => r.data)
}
