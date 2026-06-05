import type { AuthTokenStorageMutations, AuthTokens } from './auth-tokens'

type RefreshFn = () => Promise<AuthTokens | null>

export function createAuthRefreshHandler(
  refreshFn: RefreshFn,
  tokens: AuthTokenStorageMutations
) {
  let refreshPromise: Promise<string | null> | null = null

  return (): Promise<string | null> => {
    if (!refreshPromise) {
      refreshPromise = (async () => {
        try {
          const result = await refreshFn()

          if (!result) {
            tokens.clearAuthTokens()
            tokens.syncAuthState(null)
            return null
          }

          tokens.setAuthTokens(result)
          tokens.syncAuthState(result)
          return result.accessToken
        } catch {
          tokens.clearAuthTokens()
          tokens.syncAuthState(null)
          return null
        } finally {
          refreshPromise = null
        }
      })()
    }

    return refreshPromise
  }
}
