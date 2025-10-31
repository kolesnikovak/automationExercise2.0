import {test, expect} from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
test.describe('Happy Search for Product', () => {
    let homePage: HomePage;
    let productsPage: ProductsPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        productsPage = new ProductsPage(page);
        await page.goto(process.env.BASE_URL!);
    });

    test('Search for a product', async ({ page }) => {
        await homePage.clickOnNavLink('Products');
        await productsPage.searchForProduct('Dress');
        await productsPage.clickOnTheFirstViewProduct();
        await expect(page).toHaveURL(/.*product_details/);
    });
});