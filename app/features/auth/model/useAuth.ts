import type { components } from '~/shared/api/generated/auth'

import {
  AUTH_REFRESH_TOKEN_STATE_KEY,
  AUTH_TOKEN_STATE_KEY,
  useAuthTokenStorage,
  type AuthTokens
} from './auth-tokens'

type LoginRequest = components['schemas']['LoginRequest']
type RegisterRequest = components['schemas']['RegisterRequest']
type JwtResponse = components['schemas']['JwtResponse']

export function extractToken(payload: Record<string, string>): string | null {
  const tokenKeys = [
    'token',
    'accessToken',
    'access_token',
    'jwt',
    'jwtToken',
    'id_token'
  ]

  for (const key of tokenKeys) {
    const token = payload[key]
    if (typeof token === 'string' && token.trim().length > 0) {
      return token
    }
  }

  const firstStringValue = Object.values(payload).find(
    (value) => typeof value === 'string' && value.trim().length > 0
  )

  return firstStringValue ?? null
}

function parseJwtResponse(data: unknown): AuthTokens | null {
  if (typeof data !== 'object' || data === null) {
    return null
  }

  const { accessToken, refreshToken } = data as Record<string, unknown>

  if (
    typeof accessToken !== 'string' ||
    accessToken.trim().length === 0 ||
    typeof refreshToken !== 'string' ||
    refreshToken.trim().length === 0
  ) {
    return null
  }

  return { accessToken, refreshToken }
}

export function useAuth() {
  const { $api } = useNuxtApp()
  const authTokenStorage = useAuthTokenStorage()
  const token = useState<string | null>(AUTH_TOKEN_STATE_KEY, () =>
    authTokenStorage.getAccessToken()
  )
  const refreshToken = useState<string | null>(
    AUTH_REFRESH_TOKEN_STATE_KEY,
    () => authTokenStorage.getRefreshToken()
  )
  const initialized = useState<boolean>('auth-initialized', () => false)

  const isAuthenticated = computed(() => Boolean(token.value))

  const applyTokens = (tokens: AuthTokens) => {
    authTokenStorage.setAuthTokens(tokens)
    token.value = tokens.accessToken
    refreshToken.value = tokens.refreshToken
  }

  const init = () => {
    if (initialized.value) {
      return
    }

    token.value = authTokenStorage.getAccessToken()
    refreshToken.value = authTokenStorage.getRefreshToken()
    initialized.value = true
  }

  const login = async (payload: LoginRequest) => {
    const data = await $api
      .post<JwtResponse>('/api/auth/login', payload)
      .then((response) => response.data)

    const tokens = parseJwtResponse(data)
    if (!tokens) {
      throw new Error('Auth tokens not found in login response')
    }

    applyTokens(tokens)
  }

  const register = async (payload: RegisterRequest) => {
    const data = await $api
      .post<Record<string, string>>('/api/auth/register', payload)
      .then((response) => response.data)

    const jwtTokens = parseJwtResponse(data)
    if (jwtTokens) {
      applyTokens(jwtTokens)
      return
    }

    if (extractToken(data)) {
      await login({ email: payload.email, password: payload.password })
      return
    }

    await login({ email: payload.email, password: payload.password })
  }

  const refreshTokens = async (): Promise<boolean> => {
    const currentRefreshToken = authTokenStorage.getRefreshToken()
    if (!currentRefreshToken) {
      return false
    }

    try {
      const data = await $api
        .post<JwtResponse>('/api/auth/refresh', {
          refreshToken: currentRefreshToken
        })
        .then((response) => response.data)

      const tokens = parseJwtResponse(data)
      if (!tokens) {
        throw new Error('Auth tokens not found in refresh response')
      }

      applyTokens(tokens)
      return true
    } catch {
      logout()
      return false
    }
  }

  const logout = () => {
    authTokenStorage.clearAuthTokens()
    token.value = null
    refreshToken.value = null
    authTokenStorage.syncAuthState(null)
  }

  return {
    token: readonly(token),
    refreshToken: readonly(refreshToken),
    isAuthenticated,
    init,
    login,
    register,
    refreshTokens,
    logout
  }
}
