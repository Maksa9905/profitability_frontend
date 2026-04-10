import { EDepositFrequency } from './types'
import { computed } from 'vue'

export const useDepositFrequencyOptions = () => {
  const { t } = useI18n()

  return computed(() =>
    Object.values(EDepositFrequency).map((frequency) => ({
      label: t(`toolItem.deposits.form.frequency.${frequency}`),
      value: frequency
    }))
  )
}
