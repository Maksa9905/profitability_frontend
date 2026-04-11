import axios, { type AxiosInstance } from 'axios'

export default defineNuxtPlugin({
  name: 'api-axios',
  setup() {
    const config = useRuntimeConfig()
    const baseURL = String(config.public.apiBaseUrl).replace(/\/$/, '')

    const api: AxiosInstance = axios.create({
      baseURL,
      timeout: 30_000,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })

    const userId = config.public.devAuthUserId
    if (userId) {
      api.interceptors.request.use((req) => {
        req.headers.set('X-Auth-User-Id', String(userId))
        return req
      })
    }

    return {
      provide: {
        api
      }
    }
  }
})
