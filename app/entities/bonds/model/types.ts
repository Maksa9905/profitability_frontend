export type IBondsForm = {
  nominal: number | undefined
  purchasePricePercent: number | undefined
  couponRate: number | undefined
  frequency: EBondFrequency | undefined
  termMonths: number | undefined
  taxRate: number | undefined
  isCustomRate: boolean
}

export enum EBondFrequency {
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  SEMI_ANNUALLY = 'SEMI_ANNUALLY',
  ANNUALLY = 'ANNUALLY'
}
