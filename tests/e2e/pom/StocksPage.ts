import type { Page } from '@playwright/test'

import type { StockInput } from '../fixtures/e2e-data'
import { ToolPage } from './ToolPage'

export class StocksPage extends ToolPage {
  constructor(page: Page) {
    super(page, '/tools/stocks')
  }

  async fillForm(input: StockInput): Promise<void> {
    await this.page
      .getByLabel(/Цена покупки|Purchase price/)
      .fill(input.purchasePrice)
    await this.page
      .getByLabel(/Прогнозная цена|Target price/)
      .fill(input.targetPrice)
    await this.page
      .getByLabel(/Срок владения|Holding period/)
      .fill(input.holdingMonths)
    await this.page
      .getByLabel(/Дивидендная ставка|Dividend yield/)
      .fill(input.dividendRate)

    await this.selectFrequency(this.frequencyLabel(input.frequency))

    if (input.withCommission) {
      await this.page
        .getByRole('switch', { name: /Комиссия брокера|Broker commission/ })
        .click()
      await this.page
        .getByRole('spinbutton', { name: /Комиссия|Commission/ })
        .fill(input.commission)
    }
  }

  private frequencyLabel(value: StockInput['frequency']): RegExp {
    const map: Record<StockInput['frequency'], RegExp> = {
      MONTHLY: /Ежемесячно|Monthly/,
      QUARTERLY: /Ежеквартально|Quarterly/,
      SEMI_ANNUALLY: /Раз в полгода|Semi-annually/,
      ANNUALLY: /Ежегодно|Annually/
    }
    return map[value]
  }
}
