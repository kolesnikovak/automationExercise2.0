import {test, expect} from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';
import { HomePage } from '../pages/HomePage';

test.describe('Happy Path -  Update quantity in Cart', () => {
    let homePage: HomePage;
    let productsPage: ProductsPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        productsPage = new ProductsPage(page);
        await page.goto(process.env.BASE_URL!);
    });
    test('Update product quantity and add to cart', async ({ page }) => {
        await homePage.clickOnNavLink('Products');
        await productsPage.searchForProduct('Dress');
        await productsPage.clickOnTheFirstViewProduct();
        await productsPage.addProductQuantityToCart(4);
        await productsPage.addToCartOnViewProductPage();
        await productsPage.clickOnViewCartButton();
        await expect(page).toHaveURL(/.*view_cart/);
    });
});