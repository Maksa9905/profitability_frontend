import { useAuthTokenStorage } from '~/features/auth/model/auth-tokens'

export default defineNuxtPlugin({
  name: 'auth-tokens',
  setup() {
    const authTokenStorage = useAuthTokenStorage()

    return {
      provide: {
        authTokenStorage
      }
    }
  }
})
