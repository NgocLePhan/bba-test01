import {test, expect} from '@playwright/test';
import {CartPage} from '../pages/CartPage';

test('Live code 13', async({page}) =>{
    const cartPage = new CartPage(page);
    await cartPage.navigateTo('http://www.app.com/cart');
    await cartPage.clickCheckout();
    await expect(cartPage.totalPrice).toHaveText("$2,000");
})