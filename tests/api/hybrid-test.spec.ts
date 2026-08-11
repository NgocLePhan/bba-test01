import {test, expect} from "@playwright/test";
import dotenv from 'dotenv'
dotenv.config();

test.describe("HYBRID TESTING (API + UI KẾT HỢP)", () =>{
    test('Create User by API -> Set Cookie/LocalStorage -> Verify UI', async({request, page, context}) => {
        const baseURL = process.env.API_BASE_URL || 'https://reqres.in';
        const apiKey = process.env.API_KEY || '';

        const loginRequest = await request.post(`${baseURL}/api/login`,{
            headers:{
                'x-api-key': apiKey,
                'Content-Type': 'application/json'
            },

            data:{
                email: "eve.holt@reqres.in",
                password: "cityslicka"
            }
        });

        expect(loginRequest.status()).toBe(200);
        const loginData = await loginRequest.json();
        const userToken = loginData.token;
        console.log("Get API Token successful", userToken);

        await context.addCookies([{
            name: 'session_token',
            value: userToken,
            domain: 'reqres.in',
            path: '/',
        }]);

        await page.goto('https://reqres.in/');

        const logo = page.locator(`header h1, .logo, a[href="/"]`);
        await expect(logo.first()).toBeVisible();

        console.log('Open UI with session from API');
    });
});