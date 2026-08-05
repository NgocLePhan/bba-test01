import {test, expect} from '../fixtures/page-fixtures';

test('Live Code Final Pharse 2', async({loginPage,productPage,cartPage}) => {
    await test.step('Login', async() => {
        await loginPage.navigateTo('https://www.saucedemo.com/');
        await loginPage.inputUserPass('standard_user', 'secret_sauce');
        await loginPage.clickButton();
    });
    
    await test.step('Add a product on cart', async() => {
        await productPage.verifyURL();
        await productPage.addProduct();
        await productPage.verifyBadge('1');
        await productPage.clickOnCart();
    });
    
    // Testcase3
    await test.step(' Verify cart and Checkout', async() => {
        await cartPage.verifyItemCart('Sauce Labs Backpack');
        await cartPage.clickCheckout();
        await cartPage.verifyURL();
    })
})