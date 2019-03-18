import { Injectable } from "@angular/core";
import { Item } from "../models/item";
import { ApiService } from "./api.service";

@Injectable()
export class ShopService {

    shopItems: Array<Item> = new Array<Item>();

    constructor(private api: ApiService) {}

    async loadItems() {
        let itemsFromApi = await this.api.get("shop/all-items");
        itemsFromApi.forEach(element => {
            let item = new Item();
            Object.assign(item, element);
            this.shopItems.push(item);
        });
    }

    async loadItemsByBrand(brand: String) {
        let itemsFromApi = await this.api.post("shop/all-items-brand", { Brand: brand });
        console.log(itemsFromApi);
    }

    async loadItemsByColour(colour: String) {
        let itemsFromApi = await this.api.post("shop/all-items-colour", { Colour: colour });
        console.log(itemsFromApi);
    }
    
    async loadFilters(filter: any, blocker: Array<string> = []) {
        return this.api.post("shop/getFilters", filter, blocker);
    }

    async loadItemsByFilter(filter: any, blocker: Array<string> = []) {
        return this.api.post("shop/getItems", filter, blocker);
    }

    async getSpecForItem(itemId) {
        return this.api.post("shop/item-spec", { ItemId: itemId });
    }

    async applyDiscount(discountCode, totalPrice) {
        return this.api.post("shop/apply-discount", { DiscountCode: discountCode, TotalPrice: totalPrice });
    }

    getShopItems() {
        return this.shopItems;
    }
}