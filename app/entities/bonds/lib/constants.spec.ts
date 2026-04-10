import { describe, expect, it } from 'vitest'

import { bondIcon } from './constants'

describe('константы облигаций', () => {
  it('иконка облигации задана', () => {
    expect(bondIcon).toBe('i-lucide-wallet')
  })
})
