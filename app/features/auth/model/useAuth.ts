import type { components } from '~/shared/api/generated/auth'

import { AUTH_TOKEN_COOKIE_KEY, AUTH_TOKEN_STORAGE_KEY } from './constants'

type LoginRequest = components['schemas']['LoginRequest']
type RegisterRequest = components['schemas']['RegisterRequest']

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

export function useAuth() {
  const { $api } = useNuxtApp()
  const tokenCookie = useCookie<string | null>(AUTH_TOKEN_COOKIE_KEY, {
    sameSite: 'lax'
  })
  const token = useState<string | null>(
    'auth-token',
    () => tokenCookie.value ?? null
  )
  const initialized = useState<boolean>('auth-initialized', () => false)

  const isAuthenticated = computed(() => Boolean(token.value))

  const init = () => {
    if (initialized.value) {
      return
    }

    if (!token.value && tokenCookie.value) {
      token.value = tokenCookie.value
    }

    if (import.meta.client && !token.value) {
      const localStorageToken = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY)
      if (localStorageToken) {
        token.value = localStorageToken
      }
    }

    tokenCookie.value = token.value

    if (import.meta.client) {
      if (token.value) {
        localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token.value)
      } else {
        localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY)
      }
    }

    initialized.value = true
  }

  const setToken = (nextToken: string | null) => {
    token.value = nextToken
    tokenCookie.value = nextToken
    if (!import.meta.client) {
      return
    }

    if (nextToken) {
      localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, nextToken)
      return
    }

    localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY)
  }

  const login = async (payload: LoginRequest) => {
    const data = await $api
      .post<Record<string, string>>('/api/auth/login', payload)
      .then((response) => response.data)

    const nextToken = extractToken(data)
    if (!nextToken) {
      throw new Error('Auth token not found in login response')
    }

    setToken(nextToken)
  }

  const register = async (payload: RegisterRequest) => {
    const data = await $api
      .post<Record<string, string>>('/api/auth/register', payload)
      .then((response) => response.data)

    const maybeToken = extractToken(data)
    if (maybeToken) {
      setToken(maybeToken)
      return
    }

    await login({ email: payload.email, password: payload.password })
  }

  const logout = () => {
    setToken(null)
  }

  return {
    token: readonly(token),
    isAuthenticated,
    init,
    login,
    register,
    logout
  }
}
