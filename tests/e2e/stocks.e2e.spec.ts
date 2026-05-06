import { expect, test } from '@playwright/test'

import { generateE2eUser, stocksCase } from './fixtures/e2e-data'
import { registerUserByApi } from './pom/auth-api'
import { AuthPage } from './pom/AuthPage'
import { StocksPage } from './pom/StocksPage'

test.describe('E2E: акции', () => {
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
    const stocksPage = new StocksPage(page)

    await stocksPage.open()
    await stocksPage.fillForm(stocksCase.input)
    await stocksPage.calculate()
    await stocksPage.assertResults(stocksCase.expectedResults)

    await stocksPage.save()
    await stocksPage.assertHistoryHasEntries(1)
    await expect(
      page.getByText(/Сохранённые расчёты по акциям|Saved stock calculations/)
    ).toBeVisible()
    await stocksPage.openFirstHistoryItem()
    await expect(page).toHaveURL(/purchasePrice=1000/)
  })
})
