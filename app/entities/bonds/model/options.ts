import { EBondFrequency } from './types'

export const useBondsFrequencyOptions = () => {
  const { t } = useI18n()

  return computed(() =>
    Object.values(EBondFrequency).map((frequency) => ({
      label: t(`toolItem.bonds.form.frequency.${frequency}`),
      value: frequency
    }))
  )
}
