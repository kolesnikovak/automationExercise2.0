import  {Locator, Page, expect} from '@playwright/test';

export class HomePage{

    private homePageTitle: Locator;
    private topNavigationLocators: Locator;

    constructor(page: Page) {
        this.homePageTitle = page.getByRole('link', { name: 'Website for automation' })
        this.topNavigationLocators = page.locator('ul[class="nav navbar-nav"] li');
    }
        async clickOnNavLink(linkText: string) {
        await this.topNavigationLocators.getByText(linkText).click();
    }
}