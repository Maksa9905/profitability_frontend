import { z, type RefinementCtx } from 'zod'
import {
  optionalNumber,
  preprocessNumber,
  requiredPositiveInt,
  requiredPositiveNumber,
  zodSilentMsg
} from '~/shared/lib/zodForm'
import { EStockFrequency } from './types'

export function createStocksFormSchema() {
  const msg = zodSilentMsg
  const base = z.object({
    purchasePrice: requiredPositiveNumber(msg),
    targetPrice: requiredPositiveNumber(msg),
    holdingMonths: requiredPositiveInt(msg),
    dividendRate: requiredPositiveNumber(msg),
    frequency: z.nativeEnum(EStockFrequency).optional(),
    withCommission: z.boolean(),
    commission: z.preprocess(preprocessNumber, z.number().finite().optional()),
    taxRate: optionalNumber()
  })

  return base.superRefine((data: z.infer<typeof base>, ctx: RefinementCtx) => {
    if (data.frequency === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: msg,
        path: ['frequency']
      })
    }
    if (data.withCommission && data.commission === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: msg,
        path: ['commission']
      })
    }
  })
}
