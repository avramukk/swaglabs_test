import { test, expect } from "../fixtures/fixtures";
import { validCheckoutInfo } from "../src/data/checkoutData";

test('End to end test', async({ app, page }) => {
    const allItems = await app.mainPage.inventoryList.parseAllItems();
    
    await test.step('Add 3 items to Cart', async () => {
        await app.mainPage.addItemToCart(allItems[0]);
        await app.mainPage.addItemToCart(allItems[1]);
        await app.mainPage.addItemToCart(allItems[2]);
        const shoppingCartBadgeQuantity = await app.header.getShoppingCartBadgeQuantity();
        expect (shoppingCartBadgeQuantity).toBe('3');
    });

    await test.step('Open cart and remove 1 item', async () => {
        await app.header.openShoppingCart();
        await expect(page).toHaveURL(app.cartPage.pagePath);
        await app.cartPage.removeItem(allItems[2])
        const shoppingCartBadgeQuantity = await app.header.getShoppingCartBadgeQuantity();
        expect (shoppingCartBadgeQuantity).toBe('2');
    });

    await test.step('Enter checkout data', async () => {
        await app.cartPage.checkout();
        await expect(page).toHaveURL(app.checkoutFlow.firstPage.pagePath);
        await app.checkoutFlow.firstPage.fillInCheckoutData(validCheckoutInfo);
    });

    await test.step('Finish checkout flow', async () => {
        await app.checkoutFlow.firstPage.continue();
        await expect(page).toHaveURL(app.checkoutFlow.overviewPage.pagePath);
        await app.checkoutFlow.overviewPage.finish();
        await expect(page).toHaveURL(app.checkoutFlow.completePage.pagePath);
    });
    
    await test.step('Back Home', async () => {
        await app.checkoutFlow.completePage.backHome();
        await expect(page).toHaveURL(app.mainPage.pagePath);
    });
});