import {test, expect} from '@playwright/test';

test('API Chained Requests & JSON Schema Verification', async({request}) =>{
    // POST api
    const reponsePost = await request.post('/api/v1/products', {
        data: {
            name: "Playwright Book",
            price: 150
        }
    });

    await expect(reponsePost.status()).toBe(201);

    const reponseBodyPost = await reponsePost.json();
    const id = reponseBodyPost.id;

    console.log(`User ID: ${id}`);

    // Get
    const reponseGet = await request.get(`/api/v1/products/${id}`);

    await expect(reponseGet.status()).toBe(200);

    const reponseBodyGet = await reponseGet.json();
    const name = reponseBodyGet.name;
    const price = reponseBodyGet.price;
    await expect(name).toBe("Playwright Book");
    await expect(price).toBe(150);

    //Delete
    const reponseDelete = await request.delete(`/api/v1/products/${id}`, {
        headers: {
            'Authorization': 'Bearer your_access_token_here',
        }
    })

    await expect([200,204]).toContain(reponseDelete.status());
})

test('Bài 6.2: Query Parameters & Array Filter API', async({request}) => {
    const reponse = await request.get('/api/v1/products', {
        params: {
            category: 'books', 
            limit: 5
        }
    })

    expect(reponse.status()).toBe(200);

    const reponseBody = await reponse.json();
    const products = reponseBody.products;
    expect(products.length).toBeLessThanOrEqual(5);

    for(const item of products){
        expect(item.category).toBe("books");
    }
})