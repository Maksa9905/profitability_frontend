import type { ComputedRef } from 'vue'
import type { components } from '~/shared/api/generated/invest'

import { MACRO_CALCULATE_KEY } from './constants'

type Schemas = components['schemas']

export type MacroCalculatePayload = {
  amount: number
  nominalRate: number
}

export function useMacroCalculate(
  payload: ComputedRef<MacroCalculatePayload | null>
) {
  const { $api } = useNuxtApp()

  return useAsyncData(
    MACRO_CALCULATE_KEY,
    async () => {
      const request = payload.value
      if (request === null) {
        return null
      }

      return $api
        .post<
          Schemas['CalculationResponse']
        >('/api/investment/macro/calculate', request)
        .then((response) => response.data)
    },
    {
      watch: [payload],
      immediate: true,
      default: () => null
    }
  )
}
