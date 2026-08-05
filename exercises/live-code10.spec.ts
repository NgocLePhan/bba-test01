import {test, expect} from '@playwright/test';

test('Advanced Mouse Interactions & Drag and Drop', async({page}) => {
    //Kịch bản 1: Mouse Hover
    await page.goto('http://www.app.com/dashboard');

    await page.locator('#user-menu').hover();

    const accountSetting = page.locator('#item-settings');
    await expect(accountSetting).toBeVisible();
    await accountSetting.click();

    await expect(page).toHaveURL(/.*settings/);

    //Kịch bản 2: Context Menu (Right Click) & Double Click
    await page.goBack();

    const myFile = page.locator('#file-item');
    await expect(myFile).toBeVisible();
    await myFile.click({button: 'right'});

    const contextMenu = page.locator('#context-menu');
    await expect(contextMenu).toBeVisible();
    await expect(contextMenu).toContainText('Delete File');

    await page.locator('#folder-item').dblclick();
    await expect(page.locator('#folder-status')).toHaveText('Folder Opened');

    //Kịch bản 3: Drag and Drop (Kéo thả Element)
    await page.dragAndDrop('#card-todo','#column-done');
    await expect(page.locator('#column-done')).toContainText('Task A');
})