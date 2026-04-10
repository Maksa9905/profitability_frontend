import { describe, expect, it } from 'vitest'

import { stocksIcon } from './constants'

describe('константы акций', () => {
  it('иконка инструмента «акции» задана', () => {
    expect(stocksIcon).toBe('i-lucide-chart-candlestick')
  })
})
