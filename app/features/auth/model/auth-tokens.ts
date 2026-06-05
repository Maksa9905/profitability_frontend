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

/** Cookies и токены — только из setup / plugin (не из axios interceptors). */
export function useAuthTokenStorage() {
  const nuxtApp = useNuxtApp()
  const accessCookie = useCookie<string | null>(AUTH_TOKEN_COOKIE_KEY, {
    sameSite: 'lax'
  })
  const refreshCookie = useCookie<string | null>(
    AUTH_REFRESH_TOKEN_COOKIE_KEY,
    {
      sameSite: 'lax'
    }
  )

  const getAccessToken = (): string | null =>
    readTokenFromClient(AUTH_TOKEN_STORAGE_KEY, accessCookie.value)

  const getRefreshToken = (): string | null =>
    readTokenFromClient(AUTH_REFRESH_TOKEN_STORAGE_KEY, refreshCookie.value)

  const setAuthTokens = (tokens: AuthTokens | null): void => {
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

  const clearAuthTokens = (): void => {
    setAuthTokens(null)
  }

  const syncAuthState = (tokens: AuthTokens | null): void => {
    nuxtApp.runWithContext(() => {
      useState<string | null>(AUTH_TOKEN_STATE_KEY).value =
        tokens?.accessToken ?? null
      useState<string | null>(AUTH_REFRESH_TOKEN_STATE_KEY).value =
        tokens?.refreshToken ?? null
    })
  }

  return {
    getAccessToken,
    getRefreshToken,
    setAuthTokens,
    clearAuthTokens,
    syncAuthState
  }
}

export type AuthTokenStorage = ReturnType<typeof useAuthTokenStorage>

export type AuthTokenStorageMutations = Pick<
  AuthTokenStorage,
  'setAuthTokens' | 'clearAuthTokens' | 'syncAuthState'
>
