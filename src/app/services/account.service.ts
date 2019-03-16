import { Injectable } from "@angular/core";
import { ApiService } from './api.service';

@Injectable()
export class AccountService {

    constructor(private api: ApiService) { }

    async attemptLogin(username, password) {
        let response = await this.api.post("account/login", { Username: username, Password: password });
        response = await this.handleTokenResponse(response);
        if (response != null)
            return response;
        else
            return "true";
    }

    async registerAccount(title, firstName, lastName, email, password, newsletter) {
        let response = await this.api.post("account/register", { title: title, firstName: firstName, lastName: lastName, emailAddress: email, password: password, newsletter: newsletter });
        response = await this.handleTokenResponse(response);
        if (response != null)
            return response;
        else
            return "true";
    }

    async updateAccount(account) {
        let response = await this.api.post("account/update", account);
        response = await this.handleTokenResponse(response);
        if (response != null)
            return response;
        else
            return "true";
    }

    async handleTokenResponse(response) {
        if (response.indexOf("Token:") != -1) {
            let token = response.slice(7);
            this.api.storeToken(token);
            return null;
        } else {
            return response;
        }
    }

    async attemptLogout() {
        let response = await this.api.post("account/logout");
        response = await this.handleTokenResponse(response);
        if (response != null)
            return response;
        else
            return "true";
    }

    /*
     * Wishlist Content
     */

    async loadWishlist() {
        return await this.api.post("account/wishlist", { Account: this.getAccount() });
    }

    async addItemToWishlist(itemId) {
        let response = await this.api.post("account/wishlist-add", { Account: this.getAccount(), Wishlist: this.getWishlist(), Cart: this.getCart(), ItemId: itemId });
        response = await this.handleTokenResponse(response);
        if (response != null)
            return response;
        else
            return "true";
    }

    async removeItemFromWishlist(wishlistItemId) {
        let response = await this.api.post("account/wishlist-remove", { Account: this.getAccount(), Wishlist: this.getWishlist(), Cart: this.getCart(), WishlistItemId: wishlistItemId });
        response = await this.handleTokenResponse(response);
        if (response != null)
            return response;
        else
            return "true";
    }

    /*
     * Cart Content
     */
    async loadCart() {
        return await this.api.post("account/cart", { Account: this.getAccount() });
    }

    async refreshCartData() {
        return await this.api.post("account/cart-reload", { Cart: this.getCart() });
    }

    async addItemToCart(itemSpec, amount) {
        let response = await this.api.post("account/cart-add", { Account: this.getAccount(), Wishlist: this.getWishlist(), Cart: this.getCart(), ItemSpec: itemSpec, Amount: amount });
        response = await this.handleTokenResponse(response);
        if (response != null)
            return response;
        else
            return "true";
    }

    async removeItemFromCart(cartItem) {
        let response = await this.api.post("account/cart-remove", { Account: this.getAccount(), Wishlist: this.getWishlist(), Cart: this.getCart(), CartItem: cartItem });
        response = await this.handleTokenResponse(response);
        if (response != null)
            return response;
        else
            return "true";
    }

    async loadAddresses() {
        return await this.api.post("account/address-load", this.getAccount());
    }

    async completeOrder(orderData) {
        let response = await this.api.post("account/confirm-order", orderData);
        console.log(response);
    }

    getAccount() {
        let token = this.api.getToken();
        if (token == undefined || token == null)
            return null;
        return token.info.token.account;
    }

    getWishlist() {
        let token = this.api.getToken();
        if (token == undefined || token == null)
            return null;
        return token.info.token.wishlist;
    }

    getCart() {
        let token = this.api.getToken();
        if (token == undefined || token == null)
            return null;
        return token.info.token.cart;
    }

    checkVariableNotEmpty(variable) {
        if (variable != undefined && variable != null) {
            if (!variable) {
                return true;
            }
            return false;
        }
        return false;
    }
}