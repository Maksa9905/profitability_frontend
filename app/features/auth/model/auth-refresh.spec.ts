import { beforeEach, describe, expect, it, vi } from 'vitest'

import { createAuthRefreshHandler } from './auth-refresh'

const authTokensMock = vi.hoisted(() => ({
  setAuthTokens: vi.fn(),
  clearAuthTokens: vi.fn(),
  syncAuthState: vi.fn()
}))

vi.mock('./auth-tokens', async (importOriginal) => {
  const original = await importOriginal<typeof import('./auth-tokens')>()

  return {
    ...original,
    setAuthTokens: authTokensMock.setAuthTokens,
    clearAuthTokens: authTokensMock.clearAuthTokens,
    syncAuthState: authTokensMock.syncAuthState
  }
})

describe('createAuthRefreshHandler', () => {
  beforeEach(() => {
    authTokensMock.setAuthTokens.mockReset()
    authTokensMock.clearAuthTokens.mockReset()
    authTokensMock.syncAuthState.mockReset()
  })

  it('возвращает новый access-токен и сохраняет пару', async () => {
    const refreshFn = vi.fn().mockResolvedValue({
      accessToken: 'new-access',
      refreshToken: 'new-refresh'
    })
    const requestRefresh = createAuthRefreshHandler(refreshFn)

    await expect(requestRefresh()).resolves.toBe('new-access')

    expect(refreshFn).toHaveBeenCalledTimes(1)
    expect(authTokensMock.setAuthTokens).toHaveBeenCalledWith({
      accessToken: 'new-access',
      refreshToken: 'new-refresh'
    })
    expect(authTokensMock.syncAuthState).toHaveBeenCalledWith({
      accessToken: 'new-access',
      refreshToken: 'new-refresh'
    })
  })

  it('дедуплицирует параллельные refresh-запросы', async () => {
    let resolveRefresh:
      | ((value: { accessToken: string; refreshToken: string }) => void)
      | undefined

    const refreshFn = vi.fn(
      () =>
        new Promise<{ accessToken: string; refreshToken: string }>(
          (resolve) => {
            resolveRefresh = resolve
          }
        )
    )
    const requestRefresh = createAuthRefreshHandler(refreshFn)

    const firstCall = requestRefresh()
    const secondCall = requestRefresh()

    resolveRefresh?.({
      accessToken: 'queued-access',
      refreshToken: 'queued-refresh'
    })

    await expect(Promise.all([firstCall, secondCall])).resolves.toEqual([
      'queued-access',
      'queued-access'
    ])
    expect(refreshFn).toHaveBeenCalledTimes(1)
  })

  it('очищает сессию, если refresh вернул null', async () => {
    const requestRefresh = createAuthRefreshHandler(async () => null)

    await expect(requestRefresh()).resolves.toBeNull()

    expect(authTokensMock.clearAuthTokens).toHaveBeenCalledTimes(1)
    expect(authTokensMock.syncAuthState).toHaveBeenCalledWith(null)
  })

  it('очищает сессию при ошибке refresh', async () => {
    const requestRefresh = createAuthRefreshHandler(async () => {
      throw new Error('refresh failed')
    })

    await expect(requestRefresh()).resolves.toBeNull()

    expect(authTokensMock.clearAuthTokens).toHaveBeenCalledTimes(1)
    expect(authTokensMock.syncAuthState).toHaveBeenCalledWith(null)
  })
})
