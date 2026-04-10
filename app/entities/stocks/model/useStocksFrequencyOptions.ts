import { computed } from 'vue'

import { EStockFrequency } from './types'

export const useStocksFrequencyOptions = () => {
  const { t } = useI18n()

  return computed(() =>
    Object.values(EStockFrequency).map((frequency) => ({
      label: t(`toolItem.stocks.form.frequency.${frequency}`),
      value: frequency
    }))
  )
}
