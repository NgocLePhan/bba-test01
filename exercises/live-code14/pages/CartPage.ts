import {Page, Locator} from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage{
    readonly btnCheck: Locator;
    readonly totalPrice: Locator;

    constructor(page: Page){
        super(page);
        this.btnCheck = page.locator('#btn-checkout');
        this.totalPrice = page.locator('#total-price')
    }
    async clickCheckout(){
       await this.btnCheck.click();
    }
}