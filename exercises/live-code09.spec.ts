import {test, expect} from '@playwright/test';
import { Buffer } from 'node:buffer';

test('Kịch bản 1: Single File Upload', async({page}) => {
    await page.goto('http://www.app.com/documents');

    await page.locator('#file-uploader').setInputFiles({
        name: "sample.pdf",
        mimeType: 'application/pdf',
        buffer: Buffer.from('Nội dung file test giả lập')
    });

    await page.getByRole('button', {name: 'Submit File'}).click();

    await expect(page.locator('#uploaded-filename')).toContainText('sample.pdf');

    // Kịch bản 2: File Download Verification
    

    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.getByRole('button', {name: 'Download Report'}).click()
    ]);

    expect(download.suggestedFilename()).toContain("annual-report-2026.xlsx");
    await download.saveAs('downloads/annual-report-2026.xlsx');
})

