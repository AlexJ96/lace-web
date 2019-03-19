import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { ShopService } from 'src/app/services/shop.service';

@Component({
    selector: 'shop-item',
    templateUrl: 'shop-item.component.html',
    styleUrls: ['shop-item.component.css', '../shop.component.css', '../../../../account/account/account.component.css']
})
export class ShopItemComponent implements OnInit {


    sizes = [
        { sizeLabel: '6', inStock: true, selected: false },
        { sizeLabel: '8', inStock: false, selected: false },
        { sizeLabel: '10', inStock: true, selected: false },
        { sizeLabel: '12', inStock: true, selected: false },
        { sizeLabel: '14', inStock: false, selected: false },
        { sizeLabel: '16', inStock: true, selected: false },
        { sizeLabel: '18', inStock: true, selected: false },
    ];

    amount = [
        { label: '1', amount: 1, active: true, selected: true },
        { label: '2', amount: 2, active: true, selected: false },
        { label: '3', amount: 3, active: true, selected: false },
        { label: '4', amount: 4, active: true, selected: false },
        { label: '5', amount: 5, active: true, selected: false },
        // { label: '6', amount: 6, active: true, selected: false },
        // { label: '7', amount: 7, active: true, selected: false },
        // { label: '8', amount: 8, active: true, selected: false },
        // { label: '9', amount: 9, active: true, selected: false },
        // { label: '10', amount: 10, active: true, selected: false },
    ];

    item: any;
    itemAmount: number = 1;
    currentWishlist: any;
    itemSpecList: any;
    defaultColor: any;
    itemSpecsForCurrentColor: any;
    sizeSelected: boolean = false;

    alertItem: any;
    showAlert: boolean = false;
    addedTo: string = "";

    constructor(private account: AccountService, private shop: ShopService) {}

    async ngOnInit() {
        this.currentWishlist = await this.account.loadWishlist();
        if (this.currentWishlist.wishlistItems.length == 0) {
            this.currentWishlist = this.account.getWishlist();
        }
        this.item = JSON.parse(localStorage.getItem("item"));
        this.itemSpecList = await this.shop.getSpecForItem(this.item.item.id);
        
        let index = 0;
        this.itemSpecList.forEach(element => {
            if (index == 0)
                element.selected = true;
            else 
                element.selected = false;
            index++;
        });

        this.itemSpecsForCurrentColor = this.itemSpecList[0].itemSpecs;
        this.itemSpecsForCurrentColor.forEach(element => {
            element.size.selected = false;
        });
    }

    selectColour(itemSpec) {
        if (itemSpec.selected)
            return;
        this.itemSpecList.forEach(element => {
            element.selected = false;
            element.itemSpecs.forEach(size => {
                size.size.selected = false;
            });
        });
        itemSpec.selected = true;
        this.sizeSelected = false;
        this.itemSpecsForCurrentColor = itemSpec.itemSpecs;
    }

    selectSize(itemSpec) {
        if (itemSpec.size.selected || itemSpec.quantity <= 0)
            return;
        this.itemSpecsForCurrentColor.forEach(element => {
            element.size.selected = false;
        });
        itemSpec.size.selected = true;
        this.sizeSelected = true;
        let quantity = itemSpec.quantity;
        let outOfStockAmount = this.amount.filter(c => c.amount > quantity);
        if (outOfStockAmount != null) {
            outOfStockAmount.forEach(element => {
                element.active = false;
            });
        }
    }

    selectAmount(amount) {
        if (!amount.active)
            return;
        this.amount.forEach(element => {
            element.selected = false;
        });
        amount.selected = true;
        this.itemAmount = amount.amount;
    }

    async submit() {
        let currentItemSpec = this.itemSpecList.find(itemSpec => itemSpec.selected);
        let itemSpec = currentItemSpec.itemSpecs.find(itemSpec => itemSpec.size.selected);
        await this.account.addItemToCart(itemSpec, this.itemAmount);
        this.alertItem = itemSpec;
        this.addedTo = "Shopping Bag";
        this.showAlertInterval();
    }

    getButtonText() {
        if (this.itemSpecsForCurrentColor == undefined)
            return "Select a size";
        let selectedSize = this.itemSpecsForCurrentColor.find(itemSpec => itemSpec.size.selected);
        return selectedSize != null ? "Add to Bag" : "Select a size";
    }

    async saveItemToWishlist(item) {
        let itemId = item.item.id;
        let response = await this.account.addItemToWishlist(itemId);
        if (response == 'true') {
            item.wishlist = true;
            this.alertItem = item;
            this.addedTo = "Wishlist";
            this.showAlertInterval();
            this.currentWishlist = await this.account.loadWishlist();
            if (this.currentWishlist.wishlistItems.length == 0) {
                this.currentWishlist = this.account.getWishlist();
            }
        }
    }

    async removeItemFromWishlist(item) {
        let wishlistItem = this.currentWishlist.wishlistItems.find(wishlistItem => wishlistItem.itemSpec.item.id == item.item.id);
        if (wishlistItem != undefined || wishlistItem != null) {
            let response = await this.account.removeItemFromWishlist(wishlistItem.id);
            if (response == 'true') {
                this.item.wishlist = false;
                this.currentWishlist = await this.account.loadWishlist();
                if (this.currentWishlist.wishlistItems.length == 0) {
                    this.currentWishlist = this.account.getWishlist();
                }
            }
        }
    }

    
    showAlertInterval() {
        let index = 5;
        let interval = setInterval(() => {
            this.showAlert = true;
            if (index <= 0) {
                clearInterval(interval);
                this.showAlert = false;
            }
            index--;
        }, 1000);
    }
}
