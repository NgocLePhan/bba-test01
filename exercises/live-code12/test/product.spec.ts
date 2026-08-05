import {test, expect} from '@playwright/test';
import { ProductPage} from '../page/ProductPage';

test('Search Product', async({page}) => {
    const productPage = new ProductPage(page);

    await productPage.goto();

    await productPage.searchProduct('MacBook Pro');
    await productPage.addToCart();
    
    await expect(productPage.cartBadge).toContainText('1');
})