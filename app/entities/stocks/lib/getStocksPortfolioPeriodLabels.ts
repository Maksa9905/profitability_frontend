import { getBondCouponPeriodLabels } from '~/entities/bonds/lib/getBondCouponPeriodLabels'
import type { components } from '~/shared/api/generated/invest'

import type { EStockFrequency } from '../model/types'

type BondFrequency = components['schemas']['BondResponse']['frequency']

/** Подписи оси времени: шаг зависит от периодичности выплат дивидендов (как у купонов облигаций). */
export function getStocksPortfolioPeriodLabels(
  pointCount: number,
  frequency: EStockFrequency,
  locale: string
): string[] {
  return getBondCouponPeriodLabels(
    pointCount,
    frequency as BondFrequency,
    locale
  )
}
