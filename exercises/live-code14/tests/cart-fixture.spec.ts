import {test, expect} from '../fixtures/page-fixtures';

test('Live code 14', async({cartPage}) => {
    await cartPage.navigateTo('http://www.app.com/cart');
    await cartPage.clickCheckout();
    await expect(cartPage.totalPrice).toHaveText("$2,000");
})