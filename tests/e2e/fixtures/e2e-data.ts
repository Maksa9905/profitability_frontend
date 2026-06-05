export type E2EUser = {
  email: string
  password: string
}

export type DepositInput = {
  amount: string
  interestRate: string
  termMonths: string
  capitalization: boolean
  frequency: 'MONTHLY' | 'QUARTERLY' | 'SEMI_ANNUALLY' | 'ANNUALLY'
}

export type BondInput = {
  nominal: string
  purchasePricePercent: string
  couponRate: string
  frequency: 'MONTHLY' | 'QUARTERLY' | 'SEMI_ANNUALLY' | 'ANNUALLY'
  termMonths: string
  taxRate: string
}

export type StockInput = {
  purchasePrice: string
  targetPrice: string
  holdingMonths: string
  dividendRate: string
  frequency: 'MONTHLY' | 'QUARTERLY' | 'SEMI_ANNUALLY' | 'ANNUALLY'
  withCommission: boolean
  commission: string
}

export type ToolCase<TInput> = {
  input: TInput
  expectedResults: Record<string, string>
}

export const generateE2eUser = (): E2EUser => ({
  email: `e2e_${Date.now()}@example.com`,
  password: 'E2ePassword_123'
})

export const depositCase: ToolCase<DepositInput> = {
  input: {
    amount: '250000',
    interestRate: '12',
    termMonths: '24',
    capitalization: true,
    frequency: 'MONTHLY'
  },
  expectedResults: {
    'Итоговая сумма': '317433.66 ₽',
    'Начисленные проценты': '67433.66 ₽',
    'Эффективная ставка': '13.49%'
  }
}

export const bondsCase: ToolCase<BondInput> = {
  input: {
    nominal: '100000',
    purchasePricePercent: '95',
    couponRate: '11',
    frequency: 'QUARTERLY',
    termMonths: '24',
    taxRate: '13'
  },
  expectedResults: {
    'Доходность к погашению (YTM)': '14.21%',
    'Общая прибыль': '23490 ₽',
    'Доходность (чистая)': '12.36%'
  }
}

export const stocksCase: ToolCase<StockInput> = {
  input: {
    purchasePrice: '1000',
    targetPrice: '1400',
    holdingMonths: '12',
    dividendRate: '7',
    frequency: 'MONTHLY',
    withCommission: true,
    commission: '25'
  },
  expectedResults: {
    'Общая доходность за весь период': '220 ₽',
    'Прибыль от дивидендов': '70 ₽',
    'Прибыль от роста стоимости': '150 ₽'
  }
}
