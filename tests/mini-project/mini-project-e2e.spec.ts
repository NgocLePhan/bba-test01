import {test, expect} from "@playwright/test";

test.describe("Mini Project Hybrid", () => {
    const baseURL = process.env.API_BASE_URL || '';
    const apiKey = process.env.API_KEY || '';
    let createdUserId : string;
    const username= process.env.API_TEST_USER;
    const password=process.env.API_TEST_PASS;

    test("Create a User by API", async({request}) => {
        const response = await request.post(`${baseURL}/api/users`, {
            headers:{
                'x-api-key': apiKey,
                'Conten-Type': 'application/json'
            },
            data:{
                name: "Playwright Master",
                job: "Fullstack QA Senior"
            }
        });

        expect(response.status()).toBe(201);
        const responseBody = await response.json();
        expect(responseBody.name).toBe("Playwright Master");
        expect(responseBody.job).toBe("Fullstack QA Senior");
        expect(responseBody.id).toBeDefined();

        createdUserId = responseBody.id;
        console.log(`[API Step1]- Create user successfully with ID: ${createdUserId}`);
    });

    test("Step 3-4-5: get Token -> input Token on Context-> Open UI", async({request, context, page}) => {
        // Step 3: Login qua API
        const loginResponse = await request.get(`${baseURL}/api/login`, {
            headers:{
                'x-api-key': apiKey,
                'Conten-Type': 'application/json'
            },
            data:{
                'email': username,
                'password': password
            }
        });

        expect(loginResponse.status()).toBe(200);

        const {token} = await loginResponse.json();
        console.log(`[API token] Get token successful ${token}`);

        //Step 4: Injet token
        await context.addCookies([{
            name: 'authtoken',
            value: token,
            domain: 'reqres.in',
            path:'/'
        }]);

        //Step 5: Open Ui
        await page.goto('https://reqres.in/');

        const title = page.locator('h2.tagline');
        await expect(title).toBeVisible();

        console.log("Step 5 final finish");
    })
})