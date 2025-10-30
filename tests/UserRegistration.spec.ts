import {test, expect} from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SignUpPage } from '../pages/SignUpPage';
import { faker } from '@faker-js/faker';

test.describe('Happy User Registration', () => {
    let homePage: HomePage;
    let signUpPage: SignUpPage;
    const randomName = faker.person.firstName();
    const randomEmail = faker.internet.email();

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        signUpPage = new SignUpPage(page); 
        await page.goto(process.env.BASE_URL!);
    });

    test('Signup/Login link validation', async ({ page }) => {
        await homePage.clickOnNavLink('Signup / Login');
        await expect(page).toHaveURL(/.*login/);
    });

    test('Register new user', async ({ page }) => {
        await homePage.clickOnNavLink('Signup / Login');
        await signUpPage.fillEmailAndName(randomEmail, randomName);
        await signUpPage.signUpButtonClick();
        await signUpPage.fillAccountDetails('Mr', 'Password123', '10', 'May', '1990');
        await signUpPage.checkNewsLetterCheckbox();
        await signUpPage.checkSpecialOffersCheckbox();
        await signUpPage.fillPersonalInformation();
        await signUpPage.selectCountry('United States');
        await signUpPage.clickCreateAccountButton();
        await expect(page.getByText('ACCOUNT CREATED!')).toBeVisible();
     });
});