export interface IDepositForm {
  amount: number | undefined
  interestRate: number | undefined
  termMonths: number | undefined
  capitalization: boolean
  frequency: EDepositFrequency | undefined
}

export enum EDepositFrequency {
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  SEMI_ANNUALLY = 'SEMI_ANNUALLY',
  ANNUALLY = 'ANNUALLY'
}
