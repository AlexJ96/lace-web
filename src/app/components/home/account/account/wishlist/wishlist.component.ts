import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';

@Component({
    selector: 'wishlist',
    templateUrl: 'wishlist.component.html',
    styleUrls: ['wishlist.component.css', '../account.component.css']
})
export class WishlistComponent implements OnInit {

    currentWishlist: any;

    constructor(private account: AccountService, private route: Router) { }

    async ngOnInit() {
        this.currentWishlist = await this.account.loadWishlist();
        if (this.currentWishlist.wishlistItems.length == 0) {
            this.currentWishlist = this.account.getWishlist();
        }
        console.log(this.currentWishlist);
    }

    async removeItemFromWishlist(item) {
        let response = await this.account.removeItemFromWishlist(item.id);
        if (response == 'true') {
            this.currentWishlist = await this.account.loadWishlist();
            if (this.currentWishlist.wishlistItems.length == 0) {
                this.currentWishlist = this.account.getWishlist();
            }
        }
    }

    redirect(link) {
        this.route.navigateByUrl(link);
    }

    navigate(wishlistItem) {
        localStorage.setItem("item", JSON.stringify(wishlistItem.itemSpec));
        this.route.navigateByUrl("/shop/product/"+wishlistItem.itemSpec.item.id);
    }
}
