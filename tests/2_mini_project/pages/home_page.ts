import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly logo: Locator;
    readonly tagLine: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logo = page.locator('header h1, .logo, a[href="/"]');
        this.tagLine = page.locator('h2.tagline');
    }

    async navigateToHomePage() {
        await this.page.goto('https://reqres.in/');
    }

    async verifyHomePageLoaded() {
        await expect(this.logo.first()).toBeVisible();
    }
}