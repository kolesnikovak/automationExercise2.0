import { Locator, Page } from "@playwright/test";
import { faker } from "@faker-js/faker";

export class ProductsPage {
    private searchField: Locator;
    private searchButton: Locator;
    private firstViewProduct: Locator;
    private addToCartButtonOnViewProductPage: Locator;
    private viewCartButton: Locator;

    constructor(page: Page) {
        this.searchField = page.getByRole('textbox', { name: 'Search Product' })
        this.searchButton = page.getByRole('button', { name: '' })
        this.firstViewProduct = page.getByRole('link', { name: ' View Product' }).first();
        this.addToCartButtonOnViewProductPage = page.locator('button[class="btn btn-default cart"]');
        this.viewCartButton = page.getByRole('link', { name: 'View Cart' });
    }

    async searchForProduct(productName: string) {
        await this.searchField.fill(productName);
        await this.searchButton.click();
    }

    async clickOnTheFirstViewProduct(){
        await this.firstViewProduct.click();
    }

    async addToCartOnViewProductPage(){
        await this.addToCartButtonOnViewProductPage.click();
    }
    
    async clickOnViewCartButton(){
        await this.viewCartButton.click();
    }
}