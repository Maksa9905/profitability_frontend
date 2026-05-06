import type { Page } from '@playwright/test'

import type { BondInput } from '../fixtures/e2e-data'
import { ToolPage } from './ToolPage'

export class BondsPage extends ToolPage {
  constructor(page: Page) {
    super(page, '/tools/bonds')
  }

  async fillForm(input: BondInput): Promise<void> {
    await this.page
      .getByLabel(/Номинал облигации|Face value/)
      .fill(input.nominal)
    await this.page
      .getByLabel(
        /Цена покупки \(% от номинала\)|Purchase price \(% of face value\)/
      )
      .fill(input.purchasePricePercent)
    await this.page
      .getByLabel(/Купонная ставка|Coupon rate/)
      .fill(input.couponRate)
    await this.selectFrequency(this.frequencyLabel(input.frequency))
    await this.page
      .getByLabel(/Срок до погашения|Time to maturity/)
      .fill(input.termMonths)
    await this.page.getByLabel(/Налог на доходы|Income tax/).fill(input.taxRate)
  }

  private frequencyLabel(value: BondInput['frequency']): RegExp {
    const map: Record<BondInput['frequency'], RegExp> = {
      MONTHLY: /Ежемесячно|Monthly/,
      QUARTERLY: /Ежеквартально|Quarterly/,
      SEMI_ANNUALLY: /Раз в полгода|Semi-annually/,
      ANNUALLY: /Ежегодно|Annually/
    }
    return map[value]
  }
}
