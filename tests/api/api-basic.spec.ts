import {test, expect} from '@playwright/test';

test.describe('API TESTING BASIC', () => {
    const baseURL = process.env.API_BASE_URL;
    const apiKey = process.env.API_KEY;

    // Get Rquest: Lấy danh sách Users
    test('GET - Get List users', async({request}) => { 
        console.log(`${baseURL}`);

        const response = await request.get(`${baseURL}/api/users?page=2`, {
            headers:{
                'x-api-key': apiKey || '',
                'Content-Type': 'application/json'
            },
        });

        

        // Status code is 200
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        console.log('List User:', responseBody);

        expect(responseBody.page).toBe(2);
        expect(responseBody.data.length).toBeGreaterThan(0);
    });

    test('POST - Create ne user', async({request}) => {
        const response = await request.post(`${baseURL}/api/users`, {
            headers: {
                'x-api-key': apiKey || '',
                'Content-Type': 'application/json'
            },
            data: {
                name: "morpheus",
                job: "leader"
            }
        });

        expect(response.status()).toBe(201);

        const responseBody = await response.json();
        expect(responseBody.name).toBe('morpheus');
        expect(responseBody).toHaveProperty('id');
    })
});