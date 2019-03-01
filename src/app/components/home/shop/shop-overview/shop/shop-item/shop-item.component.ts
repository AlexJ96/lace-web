import { Component } from '@angular/core';

@Component({
    selector: 'shop-item',
    templateUrl: 'shop-item.component.html',
    styleUrls: ['shop-item.component.css', '../shop.component.css', '../../../../account/account/account.component.css']
})
export class ShopItemComponent {


    sizes = [
        { sizeLabel: '6', inStock: true, selected: false },
        { sizeLabel: '8', inStock: false, selected: false },
        { sizeLabel: '10', inStock: true, selected: false },
        { sizeLabel: '12', inStock: true, selected: false },
        { sizeLabel: '14', inStock: false, selected: false },
        { sizeLabel: '16', inStock: true, selected: false },
        { sizeLabel: '18', inStock: true, selected: false },
    ];

    selectSize(size) {
        if (size.selected)
            return;
        this.sizes.forEach(size => {
            size.selected = false;
        });
        size.selected = true;
    }

    getButtonText() {
        let selectedSize = this.sizes.find(size => size.selected);
        return selectedSize != null ? "Add to Bag" : "Select a size";
    }
}
