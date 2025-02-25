import { Item } from "../types";
import BaseComponent from "./BaseComponent";

export default class InventoryList extends BaseComponent {
    private itemCardLocator = this.page.getByTestId('inventory-item');
    private itemNameLocator = this.page.locator('.inventory_item_name');
    private itemDescriptionLocator = this.page.locator('.inventory_item_desc');
    private itemPriceLocator = this.page.locator('[data-test="inventory-item-price"]');
    private itemAddToCartButtonLocator = this.page.getByText('Add to cart', { exact: true})

    async parseAllItems() {
        const arrayOfAllItems: Item[] = [];
        const itemsCount = await this.itemCardLocator.count();
        if (itemsCount === 0) {
            throw new Error('No inventory items found on the page');
        }
        for (let i = 0; i < itemsCount; i++) {
            const item: Item = {
                name: await this.getItemName(i),
                description: await this.getItemDescription(i),
                price: await this.getItemPrice(i),
                addToCartButtonDataTest: await this.getItemAddToCartButtonDataTest(i),
                removeButtonDataTest: (await this.getItemAddToCartButtonDataTest(i)).replace('add-to-cart', 'remove')
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

    private async getItemAddToCartButtonDataTest(index: number): Promise<string> {
        const price = await this.itemAddToCartButtonLocator.nth(index).getAttribute('data-test');
        if (price === null) {
            throw new Error(`Item add to cart button not found at index ${index}`);
        }
        return price;
    }
}