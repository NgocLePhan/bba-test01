import {test, expect} from '@playwright/test';

test('Inject Session Cookie trực tiếp vào Browser Context', async({page, context}) => {
    await context.addCookies([
        {
            name: 'session_id',
            value: 'abc123xyz',
            url: 'http://www.app.com'
        }
    ]);

    await page.goto('http://www.app.com');

    await expect(page.locator('.user-badge')).toBeVisible();
    await expect(page.locator('.user-badge')).toHaveText('Role: Admin');
})

test('Tái sử dụng Trạng thái Đăng nhập', async({page, request}) =>{
    const reponse = await request.post('http://www.app.com/api/v1/auth/login', {
        data:{
            username: 'qa_engineer',
            password:'Secret123!'
        }
    });

    expect(reponse.status()).toBe(200);

    const reponseBody = await reponse.json();
    const token = reponseBody.token;

    await page.goto('http://www.app.com/login');

    await page.evaluate((authToken) => {
        localStorage.setItem('accessToken', authToken);
    }, token);

    await page.context().storageState({ path: 'auth/userState.json' });

    await page.goto('http://www.app.com/login/profile');

    const element = page.locator('#status');
    await expect(element).toBeVisible();
    await expect(element).toHaveText('Online')

})

test('Authentication kết hợp Bearer Token gửi kèm Request Header', async({page, request}) => {
    const reponse = await request.post('http://www.app.com/api/v1/auth/login', {
        data: {
            username: 'qa_engineer',
            password: 'Secret123!'
        }
    });

    await expect(reponse.status()).toBe(200);

    const reponseBody = await reponse.json();
    const token = reponseBody.token;

    await page.setExtraHTTPHeaders({ 'Authorization': `Bearer ${token} `});

    await page.goto('http://www.app.com/login/cart');
    const cart = page.locator('#cart-title');
    await expect(cart).toBeVisible();
    await expect(cart).toHaveText('My Cart (2 items)');
})

test('Xử lý Bị Logout / Session Expired', async({page, request}) =>{
    await page.goto('http://www.app.com/login');
    
    await page.evaluate((authToken) => {
        localStorage.setItem('accessToken', authToken);
    }, 'EXPIRED_TOKEN_123');

    await page.goto('http://www.app.com/settings');

    await expect(page).toHaveURL(/.*login/);
    await expect(page.getByRole('alert')).toHaveText('Phiên đăng nhập đã hết hạn!');
})

test('Tổng hợp - Bypass Login UI + API Intercept Mock Role', async({page, request}) => {
    const reponse = await request.post('http://www.app.com/api/v1/auth/login', {
        data: {
            username: 'qa_engineer',
            password: 'Secret123!'
        }
    })

    await expect(reponse.status()).toBe(200);

    const reponseBody = await reponse.json();
    const token = reponseBody.token;

    await page.goto('http://www.app.com/login');

    await page.evaluate((authToken) => {
        localStorage.setItem('accessToken', authToken);
    }, token);

    await page.route('**/api/v1/user/role', async(route) =>{
        const mockData = {"role": "SuperAdmin"};

        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(mockData)
        })
    });

    await page.goto('http://www.app.com/admin-panel');

    const buttonLocator = page.locator('#btn-delete-all');
    await expect(buttonLocator).toBeVisible();
    
})