import { Locator, Page } from "@playwright/test";
import { faker } from "@faker-js/faker";

export class LoginPage {
    private emailField: Locator;
    private passwordField: Locator;
    private loginButton: Locator;

    constructor(page: Page) {
        this.emailField = page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address')
        this.passwordField = page.getByRole('textbox', { name: 'Password' })
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    async fillEmail() {
        await this.emailField.fill(process.env.EmailForLogin!);
    }

    async fillPassword() {
        await this.passwordField.fill(process.env.PasswordForLogin!);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }
}