import {test, expect} from "@playwright/test";

test('Quản lý Danh sách Người dùng', async({page}) => {
   // 1. Đi tới trang quản lý
    await page.goto('http://www.User.com');

    // 2. Cô lập chính xác dòng (Row) của Bob dựa vào Email (Sửa lỗi Selector bảng)
    const bobRow = page.locator('#user-table tbody tr').filter({ hasText: 'bob@example.com' });
    
    // 3. Xác thực trạng thái ban đầu của Bob là Pending
    // Tìm phần tử có class 'badge' nằm TRONG dòng của Bob để check text
    const bobStatusBadge = bobRow.locator('.badge');
    await expect(bobStatusBadge).toHaveText('Pending');

    // 4. Click nút Approve cùng nằm trên dòng của Bob
    await bobRow.getByRole('button', { name: 'Approve' }).click();
    
    // 5. Xác thực trạng thái của Bob đã chuyển sang Active thành công (Nếu FE cập nhật realtime)
    await expect(bobStatusBadge).toHaveText('Active');
})

test('Xử lý Bảng Hóa đơn & Thao tác Hàng loạt', async({page}) =>{
    await page.goto('http://www.invoice.com');

    const userRow = page.locator(`#invoice-table tbody tr`).filter({hasText:/(?=.*Nguyễn Văn A)(?=.*\$500)/i});
    await userRow.getByRole('checkbox').check();

    const deleteButton = page.getByRole('button', {name: `Delete Selected (1)`});
    await expect(deleteButton).toBeEnabled();
    await deleteButton.click();
})

test('Kiểm tra và Cập nhật Quyền hạn Project', async({page}) =>{
    await page.goto('http://www.project.com');

    const userRow = page.locator(`#project-grid tbody tr`).filter({hasText:"Mobile App Development"});
   
    const publicStatus = userRow.getByRole('checkbox', {name: `Toggle Public Status`});
     await publicStatus.check();
     await expect(publicStatus).toBeChecked();
})