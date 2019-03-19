import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
    selector: 'orders',
    templateUrl: 'orders.component.html',
    styleUrls: ['orders.component.css', '../account.component.css']
})
export class OrdersComponent implements OnInit {

    collapse: boolean = true;
    orders: any;

    constructor(private account: AccountService) {}

    async ngOnInit() {
        this.orders = await this.account.getOrdersForAccount();
        this.orders.forEach(element => {
            element.collapsed = true;
        });
        console.log(this.orders);
    }

    getPriceForItem(orderItem) {
        return (orderItem.itemSpec.item.price * orderItem.quantity).toFixed(2);
    }

}
