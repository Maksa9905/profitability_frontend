import { z } from 'zod'

/** Текст для Zod; в UI не выводится при `UFormField :error="false"`. */
export const zodSilentMsg = '\u200b'

export function preprocessNumber(val: unknown): unknown {
  if (val === '' || val === null || val === undefined) return undefined
  if (typeof val === 'number') {
    return Number.isFinite(val) ? val : val
  }
  const n = Number(val)
  return Number.isNaN(n) ? val : n
}

export function requiredNumber(message: string) {
  return z.preprocess(
    preprocessNumber,
    z.number({ invalid_type_error: message }).finite()
  )
}

export function requiredPositiveNumber(message: string) {
  return requiredNumber(message).refine((n) => n > 0, message)
}

export function requiredPositiveInt(message: string) {
  return requiredPositiveNumber(message).refine(
    (n) => Number.isInteger(n),
    message
  )
}

export function requiredNonNegativeNumber(message: string) {
  return z.preprocess(
    preprocessNumber,
    z.number({ invalid_type_error: message }).finite().min(0, message)
  )
}

export function optionalNumber() {
  return z.preprocess(preprocessNumber, z.number().finite().optional())
}
