import type { AxiosInstance } from 'axios'

import type { AuthTokenStorage } from '~/features/auth/model/auth-tokens'

declare module '#app' {
  interface NuxtApp {
    $api: AxiosInstance
    $authTokenStorage: AuthTokenStorage
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $api: AxiosInstance
    $authTokenStorage: AuthTokenStorage
  }
}

export {}
