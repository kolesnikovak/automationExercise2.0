import { Locator, Page } from "@playwright/test";
import { faker } from "@faker-js/faker";

export class SignUpPage {
    private mrRadio: Locator;
    private mrsRadio: Locator;
    private passwordField: Locator;
    private daysSelect: Locator;
    private monthsSelect: Locator
    private yearsSelect: Locator;
    private newsletterCheckbox: Locator;
    private specialOffersCheckbox: Locator
    private firstNameField: Locator;
    private lastNameField: Locator;
    private companyField: Locator;
    private address1Field: Locator;
    private address2Field: Locator;
    private cityField: Locator;
    private zipcodeField: Locator;
    private mobileNumberField: Locator
    private countryField: Locator;
    private stateField: Locator
    private createAccountButton: Locator;
    private emailFieldOnSignupLoginPage: Locator;
    private nameFieldOnSignupLoginPage: Locator;
    private signUpButton: Locator; 

    constructor(page: Page) {
        this.mrRadio = page.getByRole('radio', { name: 'Mr.' })
        this.mrsRadio = page.getByRole('radio', { name: 'Mrs.' })
        this.passwordField = page.getByRole('textbox', { name: 'Password *' })
        this.daysSelect = page.locator('#days')
        this.monthsSelect = page.locator('#months')
        this.yearsSelect = page.locator('#years')
        this.newsletterCheckbox = page.getByRole('checkbox', { name: 'Sign up for our newsletter!' })
        this.specialOffersCheckbox = page.getByRole('checkbox', { name: 'Receive special offers from' })
        this.firstNameField = page.getByRole('textbox', { name: 'First name *' })
        this.lastNameField = page.getByRole('textbox', { name: 'Last name *' })
        this.companyField = page.getByRole('textbox', { name: 'Company', exact: true })
        this.address1Field = page.getByRole('textbox', { name: 'Address * (Street address, P.' })
        this.address2Field = page.getByRole('textbox', { name: 'Address 2' })
        this.countryField = page.getByLabel('Country *')
        this.stateField = page.getByRole('textbox', { name: 'State *' })
        this.cityField = page.getByRole('textbox', { name: 'City * Zipcode *' })
        this.zipcodeField = page.locator('#zipcode')
        this.mobileNumberField = page.getByRole('textbox', { name: 'Mobile Number *' })
        this.createAccountButton = page.getByRole('button', { name: 'Create Account' })
        this.emailFieldOnSignupLoginPage = page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address')
        this.nameFieldOnSignupLoginPage = page.getByRole('textbox', { name: 'Name' })
        this.signUpButton = page.getByRole('button', { name: 'Signup' })
    }

    async fillAccountDetails(mrOrMrs: string, password: string, day: string, month: string, year: string) {
        if (mrOrMrs.toLowerCase() === 'mr') {
            await this.mrRadio.check();
        } else if (mrOrMrs.toLowerCase() === 'mrs') {
            await this.mrsRadio.check();
        } else{
            throw new Error(`Invalid title: ${mrOrMrs}. Please use "Mr" or "Mrs".`);
        }
        await this.passwordField.fill(password);
        await this.daysSelect.selectOption(day);
        await this.monthsSelect.selectOption(month);
        await this.yearsSelect.selectOption(year);
    }

  async fillEmailAndName(email: string, name: string) {
        await this.nameFieldOnSignupLoginPage.fill(name);
        await this.emailFieldOnSignupLoginPage.fill(email);
    }

    async signUpButtonClick(){
        await this.signUpButton.click();
    }

    async fillPersonalInformation() {
        await this.firstNameField.fill(faker.person.firstName());
        await this.lastNameField.fill(faker.person.lastName());
        await this.companyField.fill(faker.company.name());
        await this.address1Field.fill(faker.location.streetAddress());
        await this.address2Field.fill(faker.location.secondaryAddress());
        await this.cityField.fill(faker.location.city());
        await this.stateField.fill(faker.location.state());
        await this.zipcodeField.fill(faker.location.zipCode());
        await this.mobileNumberField.fill(faker.string.numeric(10));
    }

    async checkNewsLetterCheckbox() {
        await this.newsletterCheckbox.check();
    }

    async uncheckNewsLetterCheckbox() {
        await this.newsletterCheckbox.uncheck();
    }

    async checkSpecialOffersCheckbox(){
        await this.specialOffersCheckbox.check();
    }
    async uncheckSpecialOffersCheckbox(){
        await this.specialOffersCheckbox.uncheck();
    }

    async selectCountry(country: string){
        await this.countryField.selectOption({ label: country });
    }

    async clickCreateAccountButton() {
        await this.createAccountButton.click();
    }

    
}