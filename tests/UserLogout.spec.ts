import {test, expect} from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { faker } from '@faker-js/faker';

test.describe('Happy User Logout', () => {
    let homePage: HomePage;
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await page.goto(process.env.BASE_URL!);
        loginPage = new LoginPage(page);
    });

    test('Logout user', async ({ page }) => {
        await homePage.clickOnNavLink('Signup / Login');
        await loginPage.fillEmail();
        await loginPage.fillPassword();
        await loginPage.clickLoginButton();
        await homePage.clickOnNavLink('Logout');
        await expect(page).toHaveURL(/.*login/);
    });
});