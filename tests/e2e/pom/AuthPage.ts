import { expect, type Page } from '@playwright/test'

import type { E2EUser } from '../fixtures/e2e-data'

export class AuthPage {
  constructor(private readonly page: Page) {}

  async open(redirect = '/tools/deposit'): Promise<void> {
    await this.page.goto(`/auth?redirect=${encodeURIComponent(redirect)}`)

    await this.page.waitForTimeout(1000)

    await expect(
      this.page.getByText(/Вход в аккаунт|Sign in to your account/)
    ).toBeVisible()
  }

  async switchToRegister(): Promise<void> {
    await this.page.getByRole('button', { name: /Регистрация|Sign up/ }).click()
  }

  async switchToLogin(): Promise<void> {
    await this.page.getByRole('button', { name: /Вход|Sign in/ }).click()
  }

  async login(user: E2EUser): Promise<void> {
    await this.switchToLogin()
    await this.page.getByLabel('Email').fill(user.email)
    await this.page.getByLabel(/Пароль|Password/).fill(user.password)

    await this.page
      .locator('.auth-card')
      .getByRole('button', { name: /Войти|Sign in/ })
      .click()

    await this.page.waitForTimeout(2000)
  }

  async register(user: E2EUser): Promise<void> {
    await this.switchToRegister()
    await this.page.getByLabel('Email').fill(user.email)
    await this.page.getByLabel(/Пароль|Password/).fill(user.password)
    await this.page
      .getByRole('button', { name: /Зарегистрироваться|Create account/ })
      .click()
  }

  async loginOrRegister(user: E2EUser): Promise<void> {
    await this.open()
    await this.login(user)

    const loginFailed = await this.page
      .getByText(/Не удалось выполнить вход|Could not sign in/)
      .isVisible({ timeout: 2_000 })
      .catch(() => false)

    if (loginFailed) {
      await this.register(user)
    }

    await expect(this.page).toHaveURL(/\/tools\/deposit/)
    await expect(
      this.page.getByRole('button', { name: /Профиль|Profile/ })
    ).toBeVisible()
  }
}
