import {
  clearAuthTokens,
  setAuthTokens,
  syncAuthState,
  type AuthTokens
} from './auth-tokens'

type RefreshFn = () => Promise<AuthTokens | null>

export function createAuthRefreshHandler(refreshFn: RefreshFn) {
  let refreshPromise: Promise<string | null> | null = null

  return (): Promise<string | null> => {
    if (!refreshPromise) {
      refreshPromise = (async () => {
        try {
          const result = await refreshFn()

          if (!result) {
            clearAuthTokens()
            syncAuthState(null)
            return null
          }

          setAuthTokens(result)
          syncAuthState(result)
          return result.accessToken
        } catch {
          clearAuthTokens()
          syncAuthState(null)
          return null
        } finally {
          refreshPromise = null
        }
      })()
    }

    return refreshPromise
  }
}
