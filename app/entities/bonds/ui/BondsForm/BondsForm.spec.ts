import { describe, expect, it } from 'vitest'

function formatPurchasePriceHint(
  nominal: number,
  purchasePricePercent: number,
  localeCode: 'ru' | 'en'
): string {
  const amount = (Number(nominal) * Number(purchasePricePercent)) / 100
  return new Intl.NumberFormat(localeCode === 'en' ? 'en-US' : 'ru-RU', {
    maximumFractionDigits: 2
  }).format(amount)
}

describe('BondsForm (логика подсказки цены покупки)', () => {
  it('считает сумму как номинал × процент / 100 и форматирует для ru', () => {
    expect(formatPurchasePriceHint(1000, 95, 'ru')).toMatch(/950/)
  })

  it('форматирует дробную сумму для en-US', () => {
    expect(formatPurchasePriceHint(100, 33.5, 'en')).toMatch(/33\.5/)
  })
})
