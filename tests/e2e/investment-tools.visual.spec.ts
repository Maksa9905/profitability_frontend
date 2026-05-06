import { existsSync, readFileSync } from 'node:fs'

import {
  expect,
  test,
  type Locator,
  type Page,
  type TestInfo
} from '@playwright/test'
import pixelmatch from 'pixelmatch'
import { PNG } from 'pngjs'

async function waitForCalculation(page: Page): Promise<void> {
  await expect(page.locator('.investment_tool__loader')).toHaveCount(0)
  await expect(page.locator('.investment-tool-container')).toBeVisible()
  await page.waitForTimeout(6000)
}

async function compareWithMetrics(
  locator: Locator,
  snapshotName: string,
  testInfo: TestInfo
): Promise<void> {
  const actualBuffer = await locator.screenshot({ animations: 'disabled' })
  const expectedPath = testInfo.snapshotPath(snapshotName)

  if (existsSync(expectedPath)) {
    const expectedPng = PNG.sync.read(readFileSync(expectedPath))
    const actualPng = PNG.sync.read(actualBuffer)

    if (
      expectedPng.width === actualPng.width &&
      expectedPng.height === actualPng.height
    ) {
      const diffPng = new PNG({
        width: expectedPng.width,
        height: expectedPng.height
      })
      const diffPixels = pixelmatch(
        expectedPng.data,
        actualPng.data,
        diffPng.data,
        expectedPng.width,
        expectedPng.height
      )
      const totalPixels = expectedPng.width * expectedPng.height
      const matchPercent = ((1 - diffPixels / totalPixels) * 100).toFixed(4)
      const summary = `${snapshotName}: ${matchPercent}% match (${diffPixels}/${totalPixels} diff pixels)`

      testInfo.annotations.push({
        type: 'visual-match',
        description: summary
      })
      await testInfo.attach(`${snapshotName}.metrics.txt`, {
        body: summary,
        contentType: 'text/plain'
      })
      console.log(summary)
    } else {
      const summary = `${snapshotName}: size mismatch baseline ${expectedPng.width}x${expectedPng.height}, actual ${actualPng.width}x${actualPng.height}`
      testInfo.annotations.push({
        type: 'visual-match',
        description: summary
      })
      await testInfo.attach(`${snapshotName}.metrics.txt`, {
        body: summary,
        contentType: 'text/plain'
      })
      console.log(summary)
    }
  }

  await expect(actualBuffer).toMatchSnapshot(snapshotName)
}

test('депозит: верстка и результат из query-параметров', async ({
  page
}, testInfo) => {
  await page.goto(
    '/tools/deposit?amount=100000&interestRate=12&termMonths=12&capitalization=true&frequency=MONTHLY'
  )

  await waitForCalculation(page)
  await compareWithMetrics(
    page.locator('.investment-tool-container'),
    'deposit-query-layout.png',
    testInfo
  )
})

test('облигации: верстка и результат из query-параметров', async ({
  page
}, testInfo) => {
  await page.goto(
    '/tools/bonds?nominal=100000&purchasePricePercent=95&couponRate=10&frequency=QUARTERLY&termMonths=12&taxRate=13'
  )

  await waitForCalculation(page)
  await compareWithMetrics(
    page.locator('.investment-tool-container'),
    'bonds-query-layout.png',
    testInfo
  )
})

test('акции: верстка и результат из query-параметров', async ({
  page
}, testInfo) => {
  await page.goto(
    '/tools/stocks?purchasePrice=1000&targetPrice=1300&holdingMonths=12&dividendRate=8&frequency=MONTHLY&withCommission=true&commission=10&taxRate=0'
  )

  await waitForCalculation(page)
  await compareWithMetrics(
    page.locator('.investment-tool-container'),
    'stocks-query-layout.png',
    testInfo
  )
})
