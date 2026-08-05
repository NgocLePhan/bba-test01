import {test, expect} from "@playwright/test";

test('Working with Iframes & Shadow DOM', async({page}) => {
    // Kịch bản 1: Tương tác với Element bên trong Iframe
    await page.goto('http://www.app.com/checkout');

    const paymentFrame = page.frameLocator('#payment-iframe');
    await paymentFrame.locator('.card-number').fill('4111 2222 3333 4444');
    await paymentFrame.locator('.card-cvv').fill('123');

    await page.getByRole('button', {name:'Pay Now'}).click();

    await expect(page.locator('#payment-status')).toHaveText('Payment Successful');

    // Kịch bản 2: Shadow DOM Auto-piercing (Xuyên qua Shadow DOM)
    await page.locator('#shadow-search').fill('Playwright Cours');
    await expect(page.locator('#shadow-search')).toHaveValue('Playwright Course');
})