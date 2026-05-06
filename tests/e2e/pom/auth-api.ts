import type { APIRequestContext } from '@playwright/test'

import type { E2EUser } from '../fixtures/e2e-data'

function resolveApiBaseUrl(): string | null {
  const baseUrl = (
    globalThis as {
      process?: {
        env?: Record<string, string | undefined>
      }
    }
  ).process?.env?.NUXT_PUBLIC_API_BASE_URL

  if (!baseUrl) {
    return null
  }

  return baseUrl.replace(/\/$/, '')
}

export async function registerUserByApi(
  request: APIRequestContext,
  user: E2EUser
): Promise<void> {
  const baseUrl = resolveApiBaseUrl()
  if (!baseUrl) {
    return
  }

  await request.post(`${baseUrl}/api/auth/register`, {
    data: {
      email: user.email,
      password: user.password,
      role: 'USER'
    },
    failOnStatusCode: false
  })
}
