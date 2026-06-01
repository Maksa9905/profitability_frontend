import { afterEach, describe, expect, it } from 'vitest'

import {
  AUTH_REFRESH_TOKEN_STORAGE_KEY,
  AUTH_TOKEN_STORAGE_KEY
} from './constants'
import { readTokenFromClient, writeTokenToClient } from './auth-tokens'

describe('readTokenFromClient', () => {
  afterEach(() => {
    localStorage.clear()
  })

  it('возвращает значение из localStorage, если оно есть', () => {
    localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, 'access-from-storage')

    expect(
      readTokenFromClient(AUTH_TOKEN_STORAGE_KEY, 'access-from-cookie')
    ).toBe('access-from-storage')
  })

  it('возвращает cookie, если localStorage пуст', () => {
    expect(
      readTokenFromClient(AUTH_REFRESH_TOKEN_STORAGE_KEY, 'refresh-from-cookie')
    ).toBe('refresh-from-cookie')
  })

  it('возвращает null, если токен отсутствует', () => {
    expect(readTokenFromClient(AUTH_TOKEN_STORAGE_KEY, null)).toBeNull()
  })
})

describe('writeTokenToClient', () => {
  afterEach(() => {
    localStorage.clear()
  })

  it('сохраняет токен в localStorage', () => {
    writeTokenToClient(AUTH_TOKEN_STORAGE_KEY, 'access-token')

    expect(localStorage.getItem(AUTH_TOKEN_STORAGE_KEY)).toBe('access-token')
  })

  it('удаляет токен из localStorage', () => {
    localStorage.setItem(AUTH_REFRESH_TOKEN_STORAGE_KEY, 'refresh-token')

    writeTokenToClient(AUTH_REFRESH_TOKEN_STORAGE_KEY, null)

    expect(localStorage.getItem(AUTH_REFRESH_TOKEN_STORAGE_KEY)).toBeNull()
  })
})
