import { describe, expect, it } from 'vitest'

import { extractToken } from './useAuth'

describe('extractToken', () => {
  it('достаёт токен по известному ключу', () => {
    expect(extractToken({ accessToken: 'jwt-1' })).toBe('jwt-1')
    expect(extractToken({ token: 'jwt-2' })).toBe('jwt-2')
  })

  it('берёт первое непустое строковое значение, если ключ нестандартный', () => {
    expect(extractToken({ foo: '', bar: 'jwt-custom' })).toBe('jwt-custom')
  })

  it('возвращает null, если токен отсутствует', () => {
    expect(extractToken({ foo: '', bar: '   ' })).toBeNull()
  })
})
