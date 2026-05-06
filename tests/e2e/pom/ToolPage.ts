import { expect, type Locator, type Page } from '@playwright/test'

export class ToolPage {
  readonly root: Locator

  constructor(
    protected readonly page: Page,
    private readonly path: '/tools/deposit' | '/tools/bonds' | '/tools/stocks'
  ) {
    this.root = page.locator('.investment-tool-container')
  }

  async open(): Promise<void> {
    await this.page.goto(this.path)
    await expect(this.root).toBeVisible()
  }

  async calculate(): Promise<void> {
    await this.page
      .getByRole('button', { name: /Рассчитать|Calculate/ })
      .click()
    await this.waitCalculationCompleted()
  }

  async save(): Promise<void> {
    await this.page
      .getByRole('button', { name: /Сохранить расчёт|Save calculation/ })
      .click()
  }

  async waitCalculationCompleted(): Promise<void> {
    await expect(this.page.locator('.investment_tool__loader')).toHaveCount(0)
    await expect(
      this.page.locator('.investment_tool__visualization')
    ).toBeVisible()
  }

  async assertResultValue(title: string, value: string): Promise<void> {
    const normalized = value.trim()
    if (!normalized) {
      return
    }

    const card = this.page
      .locator('.calculation-results-item')
      .filter({
        has: this.page.locator('.calculation-results-item-title', {
          hasText: title
        })
      })
      .first()
    await expect(card).toBeVisible()
    await expect(card.locator('.calculation-results-item-value')).toHaveText(
      normalized
    )
  }

  async assertResults(expectedResults: Record<string, string>): Promise<void> {
    for (const [title, value] of Object.entries(expectedResults)) {
      await this.assertResultValue(title, value)
    }
  }

  async assertHistoryHasEntries(count = 1): Promise<void> {
    await expect(this.page.locator('.history .history-item')).toHaveCount(
      count,
      {
        timeout: 15_000
      }
    )
  }

  async openFirstHistoryItem(): Promise<void> {
    await this.page.locator('.history .history-item').first().click()
  }

  async selectFrequency(optionLabel: RegExp): Promise<void> {
    await this.page.locator('button[role="combobox"]').first().click()
    await this.page.getByRole('option', { name: optionLabel }).click()
  }
}
