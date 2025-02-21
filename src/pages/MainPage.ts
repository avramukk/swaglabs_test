import BasePage from "./BasePage";
import { Item } from "../types";

export default class MainPage extends BasePage {
    private itemCardLocator = this.page.getByTestId('inventory-item');
    private itemNameLocator = this.page.locator('.inventory_item_name');
    private itemDescriptionLocator = this.page.locator('.inventory_item_desc');
    private itemPriceLocator = this.page.locator('[data-test="inventory-item-price"]');

    async openMainPage() {
        await this.page.goto('/inventory.html');
    }

    private findItemLocator(itemName: any) {
        return this.page.locator(`button[data-test="add-to-cart-${itemName.dataTestValue}"]`)
    }

    async addItemToCart(itemName: any) {
        await this.findItemLocator(itemName).click();
    }

    async parseAllItems() {
        const arrayOfAllItems: Item[] = [];
        const itemsCount = await this.itemCardLocator.count();
        for (let i = 0; i < itemsCount; i++) {
            const item: Item = {
                name: await this.getItemName(i),
                description: await this.getItemDescription(i),
                price: await this.getItemPrice(i)
            };
            arrayOfAllItems.push(item);
        }
        return arrayOfAllItems;
    }

    private async getItemName(index: number): Promise<string> {
        const name = await this.itemNameLocator.nth(index).textContent();
        if (name === null) {
            throw new Error(`Item name not found at index ${index}`);
        }
        return name;
    }

    private async getItemDescription(index: number): Promise<string> {
        const description = await this.itemDescriptionLocator.nth(index).textContent();
        if (description === null) {
            throw new Error(`Item description not found at index ${index}`);
        }
        return description;
    }

    private async getItemPrice(index: number): Promise<string> {
        const price = await this.itemPriceLocator.nth(index).textContent();
        if (price === null) {
            throw new Error(`Item price not found at index ${index}`);
        }
        return price;
    }
}