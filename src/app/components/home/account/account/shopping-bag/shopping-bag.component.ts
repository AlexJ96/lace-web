import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';

@Component({
    selector: 'shopping-bag',
    templateUrl: 'shopping-bag.component.html',
    styleUrls: ['shopping-bag.component.css', '../account.component.css']
})
export class ShoppingBagComponent implements OnInit {

    cart: any;

    constructor(private account: AccountService, private route: Router) { }

    async ngOnInit() {
        this.cart = await this.account.loadCart();
        if (this.cart.cartItems.length == 0) {
            this.cart = await this.account.refreshCartData();
        }
        console.log(this.cart);
    }

    async removeItem(cartItem) {
        let response = await this.account.removeItemFromCart(cartItem);
        if (response == "true") {
            this.cart = await this.account.loadCart();
            if (this.cart.cartItems.length == 0) {
                this.cart = await this.account.refreshCartData();
            }
        }
    }

    navigate() {
        this.route.navigateByUrl("/account/shopping-bag/checkout");
    }

    calculateTotalPrice() {
        let total = 0;
        this.cart.cartItems.forEach(element => {
            total += +this.getPriceForItem(element);
        });
        return total.toFixed(2);
    }

    getPriceForItem(cartItem) {
        if (cartItem.itemSpec.item.salePrice != '0')
            return (cartItem.itemSpec.item.salePrice * cartItem.quantity).toFixed(2);
        return (cartItem.itemSpec.item.price * cartItem.quantity).toFixed(2);
    }
}
