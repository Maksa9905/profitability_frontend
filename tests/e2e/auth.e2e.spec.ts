import { expect, test } from '@playwright/test'

import { generateE2eUser } from './fixtures/e2e-data'
import { registerUserByApi } from './pom/auth-api'
import { AuthPage } from './pom/AuthPage'

const e2eUser = generateE2eUser()

test.describe('E2E: авторизация', () => {
  test.beforeAll(async ({ request }) => {
    await registerUserByApi(request, e2eUser)
  })

  test('пользователь может войти в систему', async ({ page }) => {
    const authPage = new AuthPage(page)

    await authPage.loginOrRegister(e2eUser)
    await expect(page).toHaveURL(/\/tools\/deposit/)
    await expect(
      page.getByRole('button', { name: /Профиль|Profile/ })
    ).toBeVisible()
  })
})
