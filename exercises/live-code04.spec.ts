import { test, expect } from '@playwright/test';

test('Mock API Lỗi Server (500) & Verify Thông báo Lỗi', async ({ page }) => {
    // Chặn API và giả lập Server rớt (HTTP 500)
    await page.route('**/api/v1/orders', async (route) => {
        await route.fulfill({
            status: 500, // HTTP Code báo lỗi Server
            contentType: 'application/json',
            body: JSON.stringify({ message: 'Internal Server Error' }) // Body lỗi đơn giản
        });
    });

    await page.goto('http://www.dashboard.com');

    // Verify UI
    const alertError = page.getByRole('alert');
    await expect(alertError).toBeVisible();
    await expect(alertError).toHaveText('Không thể tải danh sách đơn hàng. Vui lòng thử lại sau!');
});


test('Mock API Danh sách rỗng (Empty State)', async({page}) =>{
    await page.route('**/api/v1/orders', async(route) => {
        await route.fulfill({
            status: 200, 
            contentType: 'application/json',
            body: JSON.stringify([]) 
        });
    });

    await page.goto('http://www.dashboard.com');
    await expect(page.locator('.empty-text')).toHaveText('Bạn chưa có đơn hàng nào');
    await expect(page.locator('.btn-shop')).toBeVisible();
});

test('Thay đổi dữ liệu Response', async({page}) => {
    await page.route('**/api/v1/user/profile', async(route) => {
        const mockUser = {
                "username": "senior_qa",
                "fullName": "Nguyễn Senior QA",
                "role": "Admin"
            };

        await route.fulfill({
            status: 200, 
            contentType: 'application/json',
            body: JSON.stringify(mockUser) 
        });
    });

    await page.goto('http://www.dashboard.com');
    await expect(page.locator('#user-fullname')).toHaveText('Nguyễn Senior QA');
})

test('Combined Test', async({page}) => {
    await page.route('**/api/v1/employees', async(route) => {
        const mockEmployees = [
            {
                "id": "EMP-01",
                "name": "Nguyễn Văn Admin",
                "email": "admin@company.com",
                "status": "Active"
            },
            {
                "id": "EMP-02",
                "name": "Lê Văn Staff",
                "email": "staff_pending@company.com",
                "status": "Pending"
            }
        ];

        await route.fulfill({
            status: 200, 
            contentType: 'application/json',
            body: JSON.stringify(mockEmployees) 
        });
    });

    await page.goto('http://www.dashboard.com');
    const employee = page.locator('#employee-table tbody tr').filter({hasText: "staff_pending@company.com"});
    await expect(employee).toBeVisible();
    await expect(employee.locator('.badge')).toHaveText('Pending');
    await employee.locator('.btn-activate').click();
})