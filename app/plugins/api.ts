import axios, { type AxiosInstance } from 'axios'

import { AUTH_TOKEN_COOKIE_KEY, AUTH_TOKEN_STORAGE_KEY } from '~/features/auth'

export default defineNuxtPlugin({
  name: 'api-axios',
  setup() {
    const config = useRuntimeConfig()
    const tokenCookie = useCookie<string | null>(AUTH_TOKEN_COOKIE_KEY, {
      sameSite: 'lax'
    })
    const baseURL = String(config.public.apiBaseUrl).replace(/\/$/, '')

    const api: AxiosInstance = axios.create({
      baseURL,
      timeout: 30_000,
      headers: {
        'Content-Type': 'application/json',
        'X-Pinggy-No-Screen': '123123',
        Accept: 'application/json'
      }
    })

    const userId = config.public.devAuthUserId
    api.interceptors.request.use((req) => {
      const token = import.meta.client
        ? (localStorage.getItem(AUTH_TOKEN_STORAGE_KEY) ?? tokenCookie.value)
        : tokenCookie.value

      if (token) {
        req.headers.set('Authorization', `Bearer ${token}`)
      }

      if (userId) {
        req.headers.set('X-Auth-User-Id', String(userId))
      }

      return req
    })

    return {
      provide: {
        api
      }
    }
  }
})
