import {test as base} from '@playwright/test';
import {CartPage} from '../pages/CartPage';

type MyPageFixtures = {
    cartPage: CartPage;
};

export const test = base.extend<MyPageFixtures>({
    cartPage: async ({page}, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    },
});

export{expect} from '@playwright/test'