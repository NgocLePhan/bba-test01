import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home_page';
import dotenv from 'dotenv';
dotenv.config();

test.describe('Mini Project POM', () => {
    const baseURL = process.env.API_BASE_URL || '';
    const apiKey = process.env.API_KEY || '';

    test('E2E Flow with POM Structure', async ({ request, context, page }) => {
        const homePage = new HomePage(page);
        const loginResponse = await request.post(`${baseURL}/api/login`, {
            headers: {
                'x-api-key': apiKey,
                'Conten-Type': 'application/json'
            },
            data: {
                email: "eve.holt@reqres.in",
                password: "cityslicka"
            }
        });

        const responseBody = await loginResponse.json();
        const token = responseBody.token || '';

        //const {token} = await loginResponse.json();

        await context.addCookies([{
            name: 'session_token',
            value: token,
            domain: 'reqres.in',
            path: '/'
        }]);

        await homePage.navigateToHomePage();
        await homePage.verifyHomePageLoaded();

        console.log('Test Suite work smoothly!');
    });
});
