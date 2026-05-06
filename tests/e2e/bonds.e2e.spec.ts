import { expect, test } from '@playwright/test'

import { bondsCase, generateE2eUser } from './fixtures/e2e-data'
import { registerUserByApi } from './pom/auth-api'
import { AuthPage } from './pom/AuthPage'
import { BondsPage } from './pom/BondsPage'

test.describe('E2E: облигации', () => {
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
    const bondsPage = new BondsPage(page)

    await bondsPage.open()
    await bondsPage.fillForm(bondsCase.input)
    await bondsPage.calculate()
    await bondsPage.assertResults(bondsCase.expectedResults)

    await bondsPage.save()
    await bondsPage.assertHistoryHasEntries(1)
    await expect(
      page.getByText(
        /Сохранённые расчёты по облигациям|Saved bond calculations/
      )
    ).toBeVisible()
    await bondsPage.openFirstHistoryItem()
    await expect(page).toHaveURL(/nominal=100000/)
  })
})
