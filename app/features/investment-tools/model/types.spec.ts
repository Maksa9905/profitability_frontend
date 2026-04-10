import { describe, expect, it } from 'vitest'

import { EToolItem } from './types'

describe('EToolItem', () => {
  it('значения перечисления совпадают со slug маршрутов инструментов', () => {
    expect(EToolItem.DEPOSIT).toBe('deposits')
    expect(EToolItem.BOND).toBe('bonds')
    expect(EToolItem.STOCK).toBe('stocks')
  })
})
