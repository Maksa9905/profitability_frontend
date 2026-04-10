import { z, type RefinementCtx } from 'zod'
import {
  requiredPositiveInt,
  requiredPositiveNumber,
  zodSilentMsg
} from '~/shared/lib/zodForm'
import { EDepositFrequency } from './types'

export function createDepositFormSchema() {
  const msg = zodSilentMsg
  const base = z.object({
    amount: requiredPositiveNumber(msg),
    interestRate: requiredPositiveNumber(msg),
    termMonths: requiredPositiveInt(msg),
    capitalization: z.boolean(),
    frequency: z.nativeEnum(EDepositFrequency).optional()
  })

  return base.superRefine((data: z.infer<typeof base>, ctx: RefinementCtx) => {
    if (data.capitalization && data.frequency === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: msg,
        path: ['frequency']
      })
    }
  })
}
