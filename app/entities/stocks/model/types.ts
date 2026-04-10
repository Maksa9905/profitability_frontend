export enum EStockFrequency {
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  SEMI_ANNUALLY = 'SEMI_ANNUALLY',
  ANNUALLY = 'ANNUALLY'
}

export interface IStocksForm {
  purchasePrice: number | undefined
  targetPrice: number | undefined
  holdingMonths: number | undefined
  dividendRate: number | undefined
  frequency: EStockFrequency | undefined
  withCommission: boolean
  commission: number | undefined
  taxRate: number | undefined
}
