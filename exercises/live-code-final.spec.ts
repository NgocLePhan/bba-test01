import {test, expect} from '@playwright/test';

test('Final Test', async({page, request}) => {
    //Bypass Login
    const reponseLogin = await request.post('http://www.app.com/api/v1/auth/login', {
        data: {
            "username": "admin_vip", 
            "password": "Pass123!"
        }
    });

    await expect(reponseLogin.status()).toBe(200);

    const reponseBody = await reponseLogin.json();
    const token = reponseBody.token;

    await page.goto('http://www.app.com/admin/login');

    await page.evaluate((authToken) => {
        localStorage.setItem('adminToken', authToken);
    }, token);

    //API Data Setup
    const reponseProduct = await request.post('http://www.app.com/api/v1/admin/products', {
        data: {
            "productName": "MacBook M3 VIP", 
            "price": 2000, 
            "stock": 10
        }
    });

    await expect(reponseProduct.status()).toBe(200);

    const reponseProductBody = await reponseProduct.json();
    const productId = reponseProductBody.productId;

    // Mocking Error Toast
    await page.route('**/api/v1/currency/rate**', async(route) => {
        await route.fulfill({
            status: 500,
            contentType: 'application/json',
            body: JSON.stringify({message: 'Internal Server Error!' })
        });
    });

    // UI Navigation & Dynamic Table Handling
    await page.goto('http://www.app.com/admin/products');

    const alert = page.getByRole('alert');
    await expect(alert).toBeVisible();
    await expect(alert).toHaveText('Không thể cập nhật tỷ giá!');
    await expect(alert).toBeHidden();

    const productRow = page.locator('#product-table tbody tr').filter({hasText: 'MacBook M3 VIP'});

    await expect(productRow).toContainText('$2,000');
    await productRow.getByRole('button', {name: 'Publish'}).click();
    await expect(productRow.getByRole('button', {name: 'Publish'})).toBeDisabled();
    await expect(productRow.locator('.status-badge')).toHaveText('Published');

    //Data Cleanup
    const reponseDelete = await request.delete(`http://www.app.com/api/v1/admin/products/${productId}`, {
        headers: {
            'Authorization': `Bear ${token}`
        }
    })

    expect([200, 204]).toContain(reponseDelete.status());
    await expect(productRow).toBeHidden();
})