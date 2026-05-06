import { expect, test } from '@playwright/test'

import { depositCase, generateE2eUser } from './fixtures/e2e-data'
import { registerUserByApi } from './pom/auth-api'
import { AuthPage } from './pom/AuthPage'
import { DepositPage } from './pom/DepositPage'

test.describe('E2E: депозит', () => {
  const e2eUser = generateE2eUser()

  test.beforeAll(async ({ request }) => {
    await registerUserByApi(request, e2eUser)
  })

  test.beforeEach(async ({ page }) => {
    const authPage = new AuthPage(page)
    await authPage.loginOrRegister(e2eUser)
  })

  test('расчет, проверка результатов и сохранение в историю', async ({
    page
  }) => {
    const depositPage = new DepositPage(page)

    await depositPage.open()
    await depositPage.fillForm(depositCase.input)
    await depositPage.calculate()
    await depositPage.assertResults(depositCase.expectedResults)

    await depositPage.save()
    await depositPage.assertHistoryHasEntries(1)
    await expect(
      page.getByText(
        /Сохранённые расчёты по депозитам|Saved deposit calculations/
      )
    ).toBeVisible()
    await depositPage.openFirstHistoryItem()
    await expect(page).toHaveURL(/amount=250000/)
  })
})
