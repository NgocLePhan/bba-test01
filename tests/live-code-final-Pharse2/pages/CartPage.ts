import { BasePage } from "./BasePage";
import { Page, Locator, expect } from "@playwright/test";

export class CartPage extends BasePage {
    readonly itemName: Locator;
    readonly checkoutBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.itemName = page.locator('.inventory_item_name');
        this.checkoutBtn = page.locator('#checkout');
    }

    async verifyItemCart(itemName: string) {
        await expect(this.itemName).toContainText(itemName);
    }

    async clickCheckout() {
        await this.checkoutBtn.click();
    }

    async verifyURL() {
        await expect(this.page).toHaveURL(/.*\/checkout-step-one\.html/)
    }
}