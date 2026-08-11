import {test, expect} from '@playwright/test';
import userData from '../data/users.json';
import dotenv from 'dotenv';
dotenv.config();

test.describe('DataDriven E2E', () => {
    const baseURL = process.env.API_BASE_URL || '';
    const apiKey = process.env.API_KEY || '';

    userData.forEach((user) => {

        test(`API create user: ${user.testName}`, async({request}) => {
            const reponse = await request.post(`${baseURL}/api/users`, {
                headers: {
                    'x-api-key': apiKey,
                    'Conten-Type': 'application/json'
                },
                data: {
                    name: user.name,
                    job: user.job
                }
            });

            expect(reponse.status()).toBe(201);

            const reponseBody = await reponse.json();

            expect(reponseBody.name).toBe(user.name);
            expect(reponseBody.job).toBe(user.job);

            console.log(`✅ [Data-Driven PASS] ${user.testName} - ID: ${reponseBody.id}`);
        });
    });
})

