import type { Page } from '@playwright/test'

import type { DepositInput } from '../fixtures/e2e-data'
import { ToolPage } from './ToolPage'

export class DepositPage extends ToolPage {
  constructor(page: Page) {
    super(page, '/tools/deposit')
  }

  async fillForm(input: DepositInput): Promise<void> {
    await this.page.getByLabel(/Сумма вклада|Deposit amount/).fill(input.amount)
    await this.page
      .getByLabel(/Процентная ставка|Interest rate/)
      .fill(input.interestRate)
    await this.page.getByLabel(/Срок вклада|Term/).fill(input.termMonths)

    if (input.capitalization) {
      await this.page
        .getByRole('switch', { name: /Капитализация|Capitalization/ })
        .click()
      await this.selectFrequency(this.frequencyLabel(input.frequency))
    }
  }

  private frequencyLabel(value: DepositInput['frequency']): RegExp {
    const map: Record<DepositInput['frequency'], RegExp> = {
      MONTHLY: /Ежемесячно|Monthly/,
      QUARTERLY: /Ежеквартально|Quarterly/,
      SEMI_ANNUALLY: /Раз в полгода|Semi-annually/,
      ANNUALLY: /Ежегодно|Annually/
    }
    return map[value]
  }
}
