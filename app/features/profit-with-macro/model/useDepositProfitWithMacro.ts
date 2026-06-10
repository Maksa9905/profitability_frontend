import type { components } from '~/shared/api/generated/invest'

import { parseDepositRouteToRequest } from '~/entities/deposit'

import { DEPOSIT_PROFIT_WITH_MACRO_KEY } from './constants'

type Schemas = components['schemas']

export function useDepositProfitWithMacro() {
  const route = useRoute()
  const { $api } = useNuxtApp()

  const { data: macroData, pending: macroPending } = useAsyncData(
    DEPOSIT_PROFIT_WITH_MACRO_KEY,
    async () => {
      const request = parseDepositRouteToRequest(route.query)
      if (request === null) {
        return null
      }

      const deposit = await $api
        .post<
          Schemas['DepositResponse']
        >('/api/investment/deposit/calculate', request)
        .then((response) => response.data)

      return $api
        .post<Schemas['CalculationResponse']>(
          '/api/investment/macro/calculate',
          {
            amount: request.amount,
            nominalRate: deposit.effectiveRate
          }
        )
        .then((response) => response.data)
    },
    {
      watch: [() => route.fullPath],
      immediate: true,
      default: () => null
    }
  )

  const macroRealProfit = computed(() => macroData.value?.realProfit ?? null)

  return {
    macroRealProfit,
    macroPending
  }
}
