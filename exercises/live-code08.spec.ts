import {test, expect} from '@playwright/test';

test('Xử lý JS Confirm Dialog', async({page}) => {

    await page.goto('http://www.app.com/settings');

    page.on('dialog', async dialog => await dialog.accept());

    const resetButton = page.getByRole('button', {name: 'Reset Account'});
    await resetButton.click();

    await expect(page.locator('#status-message')).toBeVisible();
    await expect(page.locator('#status-message')).toHaveText('Tài khoản đã được reset thành công!');

    //Xử lý Multi-Tabs - Mở Tab Mới
    await expect(page.locator('#link-terms')).toBeVisible();

    const [newPage] = await Promise.all([
        page.waitForEvent('popup'),
        page.locator('#link-terms').click()
    ]);

    await newPage.waitForLoadState();

    await expect(newPage).toHaveURL(/.*terms/);
    await expect(newPage.locator('h1')).toHaveText('Terms of Use');
})

test('Xử lý JS Prompt Dialog', async({page}) => {
    await page.goto('http://www.app.com/profile');

    page.on('dialog', async dialog => await dialog.accept('Alex QA'));
    await page.locator('#btn-change-name').click();

    await expect(page.locator('#current-name')).toBeVisible();
    await expect(page.locator('#current-name')).toHaveText('Alex QA');
})

test('Xử lý Tương tác Hai Chiều Giữa Tab Cũ & Tab Mới', async({page}) =>{
    await page.goto('http://www.app.com/dashboard');

    const [newPage] = await Promise.all([
        page.waitForEvent('popup'),
        page.locator('#link-report').click()
    ])

    await newPage.waitForLoadState();

    await expect(newPage.locator('#btn-export')).toBeVisible();
    await newPage.locator('#btn-export').click();
    await expect(newPage.locator('#export-status')).toBeVisible();
    await expect(newPage.locator('#export-status')).toHaveText('Export Completed');

    await page.locator('#btn-refresh').click();
    await expect(page.locator('#last-updated')).toBeVisible();
    await expect(page.locator('#last-updated')).toHaveText('Just now');
}) 

test('PlaywrightVN', async({page}) => {

    await page.goto('https://material.playwrightvn.com/06-new-tab.html');

    const [newPage] = await Promise.all([
        page.waitForEvent('popup'),
        page.getByRole('link', {name: 'Truy cập Example 1'}).click()
    ])

    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL(/.*example/);

})
