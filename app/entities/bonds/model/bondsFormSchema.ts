import { z, type RefinementCtx } from 'zod'
import {
  requiredNonNegativeNumber,
  requiredPositiveInt,
  requiredPositiveNumber,
  zodSilentMsg
} from '~/shared/lib/zodForm'
import { EBondFrequency } from './types'

export function createBondsFormSchema() {
  const msg = zodSilentMsg
  const base = z.object({
    nominal: requiredPositiveNumber(msg),
    purchasePricePercent: requiredPositiveNumber(msg),
    couponRate: requiredPositiveNumber(msg),
    frequency: z.nativeEnum(EBondFrequency).optional(),
    termMonths: requiredPositiveInt(msg),
    taxRate: requiredNonNegativeNumber(msg),
    isCustomRate: z.boolean()
  })

  return base.superRefine((data: z.infer<typeof base>, ctx: RefinementCtx) => {
    if (data.frequency === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: msg,
        path: ['frequency']
      })
    }
  })
}
