import {Page, Locator} from '@playwright/test'

export class ProductPage{
    readonly page: Page;
    readonly searchInput: Locator;
    readonly btnAdd: Locator;
    readonly cartBadge: Locator;

    constructor(page: Page){
        this.page = page;
        this.searchInput = page.locator('#search-box');
        this.btnAdd = page.locator('.btn-add-cart');
        this.cartBadge = page.locator('#cart-badge');
    }

    async goto() {
        await this.page.goto('http://www.app.com/products');
    }

    async searchProduct(productName: string){
        await this.searchInput.fill(productName);
    }

    async addToCart(){
        await this.btnAdd.click();
    }
}