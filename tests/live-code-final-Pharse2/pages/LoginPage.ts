import { Page, Locator } from '@playwright/test';
import { BasePage } from '../pages/BasePage'

export class LoginPage extends BasePage {
    readonly username: Locator;
    readonly password: Locator;
    readonly btnLogin: Locator;

    constructor(page: Page) {
        super(page);
        this.username = page.locator('#user-name');
        this.password = page.locator('#password');
        this.btnLogin = page.locator('#login-button');
    }

    async inputUserPass(user: string, pass: string) {
        await this.username.fill(user);
        await this.password.fill(pass);
    }

    async clickButton() {
        await this.btnLogin.click();
    }
}