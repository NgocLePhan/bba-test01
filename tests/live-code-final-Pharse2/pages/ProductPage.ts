import { BasePage } from '../pages/BasePage';
import { Page, Locator, expect } from '@playwright/test';

export class ProductPage extends BasePage {
    readonly addBackpack: Locator;
    readonly cartBadge: Locator;
    readonly cartLink: Locator;

    constructor(page: Page) {
        super(page);
        this.addBackpack = page.locator('#add-to-cart-sauce-labs-backpack');
        this.cartBadge = page.locator('#shopping_cart_container .shopping_cart_link .shopping_cart_badge');
        this.cartLink = page.locator('#shopping_cart_container .shopping_cart_link');
    }

    async verifyURL() {
        await expect(this.page).toHaveURL(/inventory\.html$/);
    }

    async addProduct() {
        await this.addBackpack.click();
    }

    async verifyBadge(count: string) {
        await expect(this.cartBadge).toHaveText(count);
    }

    async clickOnCart() {
        await this.cartLink.click();
    }
}