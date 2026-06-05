import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig
} from 'axios'

import { createAuthRefreshHandler } from '~/features/auth/model/auth-refresh'
import type { components } from '~/shared/api/generated/auth'

type JwtResponse = components['schemas']['JwtResponse']

interface RetryAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}

const AUTH_ENDPOINTS = [
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/refresh'
]

function isAuthEndpoint(url?: string): boolean {
  if (!url) {
    return false
  }

  return AUTH_ENDPOINTS.some((endpoint) => url.includes(endpoint))
}

export default defineNuxtPlugin({
  name: 'api-axios',
  dependsOn: ['auth-tokens'],
  setup() {
    const config = useRuntimeConfig()
    const authTokenStorage = useNuxtApp().$authTokenStorage
    const baseURL = String(config.public.apiBaseUrl).replace(/\/$/, '')

    const api: AxiosInstance = axios.create({
      baseURL,
      timeout: 30_000,
      headers: {
        'Content-Type': 'application/json',
        'X-Pinggy-No-Screen': '123123',
        'Ngrok-skip-browser-warning': '123123',
        Accept: 'application/json'
      }
    })

    const rawApi = axios.create({
      baseURL,
      timeout: 30_000,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })

    const requestRefresh = createAuthRefreshHandler(async () => {
      const refreshToken = authTokenStorage.getRefreshToken()
      if (!refreshToken) {
        return null
      }

      const { data } = await rawApi.post<JwtResponse>('/api/auth/refresh', {
        refreshToken
      })

      return {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken
      }
    }, authTokenStorage)

    const userId = config.public.devAuthUserId
    api.interceptors.request.use((req) => {
      const token = authTokenStorage.getAccessToken()

      if (token) {
        req.headers.set('Authorization', `Bearer ${token}`)
      }

      if (userId) {
        req.headers.set('X-Auth-User-Id', String(userId))
      }

      return req
    })

    api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config as
          | RetryAxiosRequestConfig
          | undefined

        if (
          error.response?.status !== 401 ||
          !originalRequest ||
          originalRequest._retry ||
          isAuthEndpoint(originalRequest.url)
        ) {
          return Promise.reject(error)
        }

        if (!authTokenStorage.getRefreshToken()) {
          authTokenStorage.clearAuthTokens()
          authTokenStorage.syncAuthState(null)
          return Promise.reject(error)
        }

        originalRequest._retry = true

        const newAccessToken = await requestRefresh()
        if (!newAccessToken) {
          return Promise.reject(error)
        }

        originalRequest.headers.set('Authorization', `Bearer ${newAccessToken}`)
        return api(originalRequest)
      }
    )

    return {
      provide: {
        api
      }
    }
  }
})
