import {test, expect} from '@playwright/test';

test('Xử lý Toast Notification & Disabled Button Wait', async({page}) => {
    await page.goto('http://www.app.com/coupons');

    await expect(page.getByRole('heading',{name: 'Apply Coupon'})).toBeVisible();
    await page.getByRole('textbox', {name:'Enter coupon...'}).fill('SUMMER2026');

    await expect(page.getByRole('button', {name: 'Apply Coupon'})).toBeEnabled();
    await page.getByRole('button', {name: 'Apply Coupon'}).click();

    await expect(page.locator('.toast-success')).toBeVisible();
    await expect(page.locator('.toast-success')).toHaveText('Mã giảm giá đã được áp dụng thành công!');
    await expect(page.locator('.toast-success')).toBeHidden();
})