import {test, expect} from '@playwright/test';

test('Cấu hình Dynamic Form & Validate Trạng thái Đăng ký', async({page}) => {
    // Go to the page
    await page.goto(`http://www.companySize.com`);

    //cấu hình Dynamic Form
    const companySizeDropdown = page.getByRole('combobox', {name: `Quy mô doanh nghiệp`});
    await companySizeDropdown.selectOption(`small`);
    await page.getByRole('checkbox', {name: `Tôi đồng ý với các điều khoản điều kiện`}).check();

    const taxNumberArea = page.getByRole('textbox', {name: `Mã số thuế doanh nghiệp`});
    await expect(taxNumberArea).toBeVisible();
    await expect(taxNumberArea).toHaveText("0102030405");
    
    await page.getByRole('button', {name: `Xác nhận đăng ký`}).click();
})