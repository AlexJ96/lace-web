import { OnInit, Component, ElementRef, ViewChild } from "@angular/core";
import { ActivatedRoute, Params, Route, Router } from "@angular/router";
import { ShopService } from "src/app/services/shop.service";
import { AccountService } from "src/app/services/account.service";
import { ApiService } from 'src/app/services/api.service';

@Component({
    selector: 'shop',
    templateUrl: 'shop.component.html',
    styleUrls: ['shop.component.css', '../../../account/account/account.component.css']
})
export class ShopComponent implements OnInit {

    @ViewChild('shopFilter') filterMenu: ElementRef;
    filterMenuOpen: boolean = false;

    @ViewChild('shopSort') sortMenu: ElementRef;
    sortMenuOpen: boolean = false;

    @ViewChild('itemAmt') itemMenu: ElementRef;
    itemAmtMenuOpen: boolean = false;

    @ViewChild('itemAmtTwo') itemMenuTwo: ElementRef;
    itemAmtTwoMenuOpen: boolean = false;

    filters: any;
    sizesFilterOpen: boolean = false;
    coloursFilterOpen: boolean = false;
    brandsFilterOpen: boolean = false;
    items: any;
    shownItemsAmount = 10;
    canLoadMoreItems = true;
    waysToSort = [{ Id: 0, Name: 'Price (Highest to Lowest)', checked: false, type: 'Highest' }, { Id: 1, Name: 'Price (Lowest to Highest)', checked: false, type: 'Lowest' }, { Id: 2, Name: 'Newest to Oldest', checked: false, type: "newest" }, { Id: 3, Name: 'Oldest to Newest', checked: false, type: "oldest" }];
    itemsPerPage = [{ Id: 0, Name: '25', checked: false, Amount: 25 }, { Id: 1, Name: '50', checked: false, Amount: 50 }, { Id: 2, Name: '100', checked: false, Amount: 100 }, { Id: 3, Name: 'All', checked: false, Amount: -1 }];
    currentPage = 1;
    totalPages = 1;

    filter = {
        Brand: '',
        Colour: '',
        Size: '',
        Category: 'Jeans',
        CurrentPage: this.currentPage,
        Count: this.shownItemsAmount,
        Order: ''
    }

    currentWishlist: any;

    constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private shopService: ShopService, private account: AccountService) { }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            if (params['id'] != null) {
                this.filter.Category = params['id'];
            }
        });
        this.loadShopItems();
    }

    loadItemPage(item) {
        localStorage.setItem("item", JSON.stringify(item));
        this.router.navigateByUrl("shop/product/" + item.id);
    }

    async loadShopItems() {
        this.filters = await this.shopService.loadFilters(this.filter, ["Shop"]);
        this.filters.SIZE_FILTERS.forEach(element => {
            element.checked = false;
        });

        this.filters.COLOUR_FILTERS.forEach(element => {
            element.checked = false;
        });

        this.filters.BRAND_FILTERS.forEach(element => {
            element.checked = false;
        });
        
        this.items = await this.shopService.loadItemsByFilter(this.filter, ["Shop"]);
        this.items.forEach(item => {
            item.wishlist = false;
        });

        this.currentWishlist = await this.account.loadWishlist();
        if (this.currentWishlist.wishlistItems.length == 0) {
            this.currentWishlist = this.account.getWishlist();
        }
        this.currentWishlist.wishlistItems.forEach(wishlistItem => {
            let itemId = wishlistItem.itemSpec.item.id;
            let exists = this.items.find(item => item.item.id == itemId);
            if (exists != undefined || exists != null) {
                exists.wishlist = true;
            }
        });
        this.refreshPageCount();
    }

    async reloadShopItems(filter) {
        this.items = await this.shopService.loadItemsByFilter(filter, ["Shop"]);
        this.refreshPageCount();
    }

    refreshPageCount() {
        this.totalPages = Math.ceil(this.filters.TOTAL_COUNT[0].keyCount / this.shownItemsAmount);
    }

    async pageDown() {
        if (this.currentPage <= 1) {
            return;
        }
        this.currentPage--;
        this.filter.CurrentPage = this.currentPage;
        await this.reloadShopItems(this.filter);
    }

    async pageUp() {
        if (this.currentPage == this.totalPages)
            return;
        this.currentPage++;
        this.filter.CurrentPage = this.currentPage;
        await this.reloadShopItems(this.filter);
    }

    async applyFilters() {
        this.currentPage = 1;
        this.totalPages = 1;
        let sizeFilters = "";
        let colourFilters = "";
        let brandFilters = "";

        this.filters.SIZE_FILTERS.forEach(element => {
            if (element.checked) {
                sizeFilters += element.key + ",";
            }
        });

        this.filters.COLOUR_FILTERS.forEach(element => {
            if (element.checked) {
                colourFilters += element.key + ",";
            }
        });

        this.filters.BRAND_FILTERS.forEach(element => {
            if (element.checked) {
                brandFilters += element.key + ",";
            }
        });

        this.filter.Colour = colourFilters;
        this.filter.Size = sizeFilters;
        this.filter.Brand = brandFilters;

        if (this.filter.Colour == "" && this.filter.Size == "" && this.filter.Brand == "") {
            this.clearFilters();
            return;
        }
        let newFilter = await this.shopService.loadFilters(this.filter, ["Shop"]);
        this.items = await this.shopService.loadItemsByFilter(this.filter, ["Shop"]);
        this.filters.TOTAL_COUNT[0].keyCount = newFilter.TOTAL_COUNT[0].keyCount;
        this.displayFilterMenu();
        this.refreshPageCount();
    }

    async clearFilters() {
        this.filter.Colour = '';
        this.filter.Size = '';

        this.filters.SIZE_FILTERS.forEach(element => {
            if (element.checked) {
                element.checked = false;
            }
        });

        this.filters.COLOUR_FILTERS.forEach(element => {
            if (element.checked) {
                element.checked = false;
            }
        });
        this.items = await this.shopService.loadItemsByFilter(this.filter, ["Shop"]);
        this.filters = await this.shopService.loadFilters(this.filter, ["Shop"]);
        this.displayFilterMenu();
        this.refreshPageCount();
    }

    displayFilterMenu() {
        let displayType = this.filterMenu.nativeElement.style.display;

        this.coloursFilterOpen = false;
        this.sizesFilterOpen = false;

        if (displayType == 'none' || displayType == "") {
            this.filterMenu.nativeElement.style.display = 'block';
            this.filterMenuOpen = true;
        } else {
            this.filterMenu.nativeElement.style.display = 'none';
            this.filterMenuOpen = false;
        }
    }

    displaySizesMenu() {
        this.sizesFilterOpen = !this.sizesFilterOpen;
        this.coloursFilterOpen = false;
        this.brandsFilterOpen = false;
    }

    displayColoursMenu() {
        this.coloursFilterOpen = !this.coloursFilterOpen;
        this.sizesFilterOpen = false;
        this.brandsFilterOpen = false;
    }

    displayBrandsMenu() {
        this.brandsFilterOpen = !this.brandsFilterOpen;
        this.sizesFilterOpen = false;
        this.coloursFilterOpen = false;
    }

    displaySortMenu() {
        let displayType = this.sortMenu.nativeElement.style.display;

        if (displayType == 'none' || displayType == "") {
            this.sortMenu.nativeElement.style.display = 'block';
            this.sortMenuOpen = true;
        } else {
            this.sortMenu.nativeElement.style.display = 'none';
            this.sortMenuOpen = false;
        }
    }

    async orderBy(selected) {
        this.waysToSort.forEach(element => {
            if (element.Name != selected.Name)
                element.checked = false;
        });
        selected.checked = true;

        this.filter.Order = selected.type;
        await this.reloadShopItems(this.filter);
        this.displaySortMenu();
    }

    async selectItemsPerPage(amount) {
        this.itemsPerPage.forEach(element => {
            if (element.Name != amount.Name)
                element.checked = false;
        });
        amount.checked = true;
        this.shownItemsAmount = amount.Amount;
        this.filter.Count = amount.Amount;

        this.currentPage = 1;
        this.filter.CurrentPage = this.currentPage;

        this.totalPages = 1;

        this.closeAllItemAmountMenus();
        await this.reloadShopItems(this.filter);
    }

    closeAllItemAmountMenus() {
        this.itemMenu.nativeElement.style.display = 'none';
        this.itemAmtMenuOpen = false;
        this.itemMenuTwo.nativeElement.style.display = 'none';
        this.itemAmtTwoMenuOpen = false;
    }

    displayItemAmountMenu() {
        if (!this.canLoadMoreItems)
            return;

        let displayType = this.itemMenu.nativeElement.style.display;

        if (displayType == 'none' || displayType == "") {
            this.itemMenu.nativeElement.style.display = 'block';
            this.itemAmtMenuOpen = true;
        } else {
            this.itemMenu.nativeElement.style.display = 'none';
            this.itemAmtMenuOpen = false;
        }
    }

    displayItemAmountTwoMenu() {
        if (!this.canLoadMoreItems)
            return;

        let displayType = this.itemMenuTwo.nativeElement.style.display;

        if (displayType == 'none' || displayType == "") {
            this.itemMenuTwo.nativeElement.style.display = 'block';
            this.itemAmtTwoMenuOpen = true;
        } else {
            this.itemMenuTwo.nativeElement.style.display = 'none';
            this.itemAmtTwoMenuOpen = false;
        }
    }

    getProductsAmount() {
        if (this.filters != undefined) {
            let total = this.filters.TOTAL_COUNT[0].keyCount;
            return "(" + total + (total > 1 ? " Products" : " Product") + ")";
        } else {
            return "(0 Products)";
        }
    }

    getCurrentShownItemsAmount() {
        if (this.shownItemsAmount < 0) {
            this.canLoadMoreItems = false;
            return "All";
        }

        if (this.filters != undefined) {
            let total = this.filters.TOTAL_COUNT[0].keyCount;
            if (total < this.shownItemsAmount) {
                this.canLoadMoreItems = false;
                return "All";
            } else {
                this.canLoadMoreItems = true;
                return this.shownItemsAmount;
            }
        } else {
            this.canLoadMoreItems = true;
            return this.shownItemsAmount;
        }
    }

    async saveItemToWishlist(item) {
        console.log(item);
        let itemId = item.item.id;
        let response = await this.account.addItemToWishlist(itemId);
        if (response == 'true') {
            item.wishlist = true;
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
                item.wishlist = false;
                this.currentWishlist = await this.account.loadWishlist();
                if (this.currentWishlist.wishlistItems.length == 0) {
                    this.currentWishlist = this.account.getWishlist();
                }
            }
        }
    }

    scrollToTop() {
        let scrollToTop = window.setInterval(() => {
            let pos = window.pageYOffset;
            if (pos > 0) {
                window.scrollTo(0, pos - 20); // how far to scroll on each step
            } else {
                window.clearInterval(scrollToTop);
            }
        }, 8);
    }

}
