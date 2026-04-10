import { depositeIcon } from '~/entities/deposit'
import { bondIcon } from '~/entities/bonds'
import { stocksIcon } from '~/entities/stocks'

import { EToolItem } from '../model/types'

export const toolsIcons = {
  [EToolItem.DEPOSIT]: depositeIcon,
  [EToolItem.BOND]: bondIcon,
  [EToolItem.STOCK]: stocksIcon
} as const
