import type { components } from '~/shared/api/generated/auth'

import {
  AUTH_REFRESH_TOKEN_COOKIE_KEY,
  AUTH_REFRESH_TOKEN_STORAGE_KEY,
  AUTH_TOKEN_COOKIE_KEY,
  AUTH_TOKEN_STORAGE_KEY
} from './constants'

export type AuthTokens = Pick<
  components['schemas']['JwtResponse'],
  'accessToken' | 'refreshToken'
>

export const AUTH_TOKEN_STATE_KEY = 'auth-token'
export const AUTH_REFRESH_TOKEN_STATE_KEY = 'auth-refresh-token'

export function readTokenFromClient(
  storageKey: string,
  cookieValue: string | null | undefined
): string | null {
  if (import.meta.client) {
    return localStorage.getItem(storageKey) ?? cookieValue ?? null
  }

  return cookieValue ?? null
}

export function writeTokenToClient(
  storageKey: string,
  value: string | null
): void {
  if (!import.meta.client) {
    return
  }

  if (value) {
    localStorage.setItem(storageKey, value)
    return
  }

  localStorage.removeItem(storageKey)
}

export function getAccessToken(): string | null {
  const accessCookie = useCookie<string | null>(AUTH_TOKEN_COOKIE_KEY, {
    sameSite: 'lax'
  })

  return readTokenFromClient(AUTH_TOKEN_STORAGE_KEY, accessCookie.value)
}

export function getRefreshToken(): string | null {
  const refreshCookie = useCookie<string | null>(
    AUTH_REFRESH_TOKEN_COOKIE_KEY,
    {
      sameSite: 'lax'
    }
  )

  return readTokenFromClient(
    AUTH_REFRESH_TOKEN_STORAGE_KEY,
    refreshCookie.value
  )
}

export function setAuthTokens(tokens: AuthTokens | null): void {
  const accessCookie = useCookie<string | null>(AUTH_TOKEN_COOKIE_KEY, {
    sameSite: 'lax'
  })
  const refreshCookie = useCookie<string | null>(
    AUTH_REFRESH_TOKEN_COOKIE_KEY,
    {
      sameSite: 'lax'
    }
  )

  if (tokens) {
    accessCookie.value = tokens.accessToken
    refreshCookie.value = tokens.refreshToken
    writeTokenToClient(AUTH_TOKEN_STORAGE_KEY, tokens.accessToken)
    writeTokenToClient(AUTH_REFRESH_TOKEN_STORAGE_KEY, tokens.refreshToken)
    return
  }

  accessCookie.value = null
  refreshCookie.value = null
  writeTokenToClient(AUTH_TOKEN_STORAGE_KEY, null)
  writeTokenToClient(AUTH_REFRESH_TOKEN_STORAGE_KEY, null)
}

export function clearAuthTokens(): void {
  setAuthTokens(null)
}

export function syncAuthState(tokens: AuthTokens | null): void {
  useState<string | null>(AUTH_TOKEN_STATE_KEY).value =
    tokens?.accessToken ?? null
  useState<string | null>(AUTH_REFRESH_TOKEN_STATE_KEY).value =
    tokens?.refreshToken ?? null
}
