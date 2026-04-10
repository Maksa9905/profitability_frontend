import { describe, expect, it } from 'vitest'

import { bondIcon } from '~/entities/bonds'
import { depositeIcon } from '~/entities/deposit'
import { stocksIcon } from '~/entities/stocks'

import { toolsIcons } from './toolsIcons'
import { EToolItem } from '../model/types'

describe('toolsIcons', () => {
  it('сопоставляет каждый инструмент иконке из сущностей или общей иконке', () => {
    expect(toolsIcons[EToolItem.DEPOSIT]).toBe(depositeIcon)
    expect(toolsIcons[EToolItem.BOND]).toBe(bondIcon)
    expect(toolsIcons[EToolItem.STOCK]).toBe(stocksIcon)
  })
})
